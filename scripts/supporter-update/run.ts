/**
 * Supporter-update (v0) — CLI runner.
 *
 * Drafts the periodic supporter/newsletter update from REAL published field
 * notes plus optional founder highlights. Defaults to a DRY RUN (assemble the
 * prompt + scan the input, no API call); pass --live (with ANTHROPIC_API_KEY)
 * to generate the draft. Runs with no input file at all — defaults pull the
 * recent field notes.
 *
 * Nothing is ever sent. Output goes to drafts/update-<period>/ for a human to
 * review and send. See ./README.md.
 *
 * Run via:  npm run newsletter -- [--input <file.json>] [--out <dir>] [--live]
 */
import fs from "node:fs";
import path from "node:path";
import {
  buildSystemPrompt,
  buildUserPrompt,
  selectNotes,
  updateSchema,
} from "./prompt";
import { runChecks, formatFindings, type Finding } from "../lib/checks";
import { callClaude } from "../lib/claude";
import { loadLocalEnv, slugify } from "../lib/util";
import type { SupporterUpdate, UpdateInput } from "./types";

const UPDATE_MANUAL_CHECKS: string[] = [
  "Everything reported actually happened — drawn from the field notes or the founder's highlights, nothing invented.",
  "No tax receipt or deductibility is implied — PRASM can't issue one yet.",
  "No detail could locate the village; no person is named beyond consent.",
  "Reads in PRASM's voice — warm, honest, gratitude over solicitation.",
  "A human has reviewed before sending.",
];

type Args = { input?: string; out: string; live: boolean };

function parseArgs(argv: string[]): Args {
  const args: Args = { out: "drafts", live: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--input" || a === "-i") args.input = argv[(i += 1)];
    else if (a === "--out" || a === "-o") args.out = argv[(i += 1)];
    else if (a === "--live") args.live = true;
    else if (a === "--dry-run") args.live = false;
    else if (a === "--help" || a === "-h") {
      printHelp();
      process.exit(0);
    }
  }
  return args;
}

function printHelp(): void {
  console.log(`Supporter-update (v0) — draft the periodic update from real field notes.

Usage:
  npm run newsletter -- [--input <file.json>] [--out <dir>] [--live]

  --input, -i   Optional input JSON ({ period, includeSlugs, sinceDays,
                highlights, audience }). With no input, the recent field notes
                are used automatically.
  --out,   -o   Output directory (default: drafts/)
  --live        Call the Claude API to generate the draft (needs ANTHROPIC_API_KEY).
                Without it, runs a dry run: assembles the prompt + scans the input.
  --help,  -h   Show this help.

Drafts are for human review only — never auto-sent. See scripts/supporter-update/README.md.`);
}

function loadInput(file?: string): UpdateInput {
  if (!file) return {};
  return JSON.parse(fs.readFileSync(file, "utf8")) as UpdateInput;
}

function renderMessage(period: string, u: SupporterUpdate): string {
  return [
    `# Supporter update — ${period} (DRAFT)`,
    "",
    "> DRAFT — review and edit before sending.",
    "",
    `**Subject:** ${u.subject}`,
    "",
    u.body,
    "",
    "---",
    "",
    `**Social blurb:** ${u.social}`,
    "",
  ].join("\n");
}

function renderReview(o: {
  live: boolean;
  period: string;
  noteTitles: string[];
  update: SupporterUpdate | null;
  findings: Finding[];
}): string {
  const { live, period, noteTitles, update, findings } = o;
  const lines: string[] = [
    `# Supporter-update review — ${period}`,
    "",
    "> **DRAFT — NOT FOR SENDING.** Written to assist, not to send. A human must review and send.",
    "",
    "## Source material",
    "",
    noteTitles.length
      ? noteTitles.map((t) => `- ${t}`).join("\n")
      : "- (no field notes in range)",
    "",
    "## Checklist",
    "",
    `Automated scan of ${live ? "the generated update" : "the founder-supplied text"}:`,
    "",
    findings.length
      ? findings.map((f) => `- ⚠️ **${f.section}:** ${f.note}`).join("\n")
      : "- ✅ No automated flags.",
    "",
    "Manual checks (always required):",
    "",
    UPDATE_MANUAL_CHECKS.map((c) => `- [ ] ${c}`).join("\n"),
    "",
  ];

  if (live && update) {
    lines.push(
      "## Update",
      "",
      `**Subject:** ${update.subject}`,
      "",
      update.body,
      "",
      `_Social blurb: ${update.social}_`,
      "",
    );
  } else {
    lines.push(
      "## Update",
      "",
      "_Dry run — no draft generated. Run with `--live` and `ANTHROPIC_API_KEY` set to produce the update._",
      "",
      "The full grounding prompt that would be sent is saved beside this file as `prompt.system.txt` and `prompt.user.txt`.",
      "",
    );
  }
  return lines.join("\n");
}

async function main(): Promise<void> {
  loadLocalEnv();
  const args = parseArgs(process.argv.slice(2));
  const input = loadInput(args.input);
  const period =
    input.period ??
    new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const notes = selectNotes(input);
  const system = buildSystemPrompt();
  const user = buildUserPrompt(input, notes);

  const haveKey = Boolean(process.env.ANTHROPIC_API_KEY);
  const live = args.live && haveKey;
  if (args.live && !haveKey) {
    console.error(
      "⚠  --live requested but ANTHROPIC_API_KEY is not set. Running a dry run instead.\n",
    );
  }

  const outDir = path.join(args.out, `update-${slugify(period)}`);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "prompt.system.txt"), system);
  fs.writeFileSync(path.join(outDir, "prompt.user.txt"), user);

  let update: SupporterUpdate | null = null;
  let findings: Finding[];

  if (live) {
    update = await callClaude<SupporterUpdate>({
      system,
      user,
      schema: updateSchema,
      model: process.env.SUPPORTER_UPDATE_MODEL,
    });
    fs.writeFileSync(
      path.join(outDir, "response.json"),
      JSON.stringify(update, null, 2),
    );
    fs.writeFileSync(
      path.join(outDir, "message.md"),
      renderMessage(period, update),
    );
    findings = runChecks([
      { label: "subject", text: update.subject },
      { label: "body", text: update.body },
      { label: "social", text: update.social },
    ]);
  } else {
    findings = input.highlights
      ? runChecks([{ label: "highlights", text: input.highlights }])
      : [];
  }

  fs.writeFileSync(
    path.join(outDir, "review.md"),
    renderReview({
      live,
      period,
      noteTitles: notes.map((n) => `"${n.title}" (${n.displayDate})`),
      update,
      findings,
    }),
  );

  console.log(
    `\nSupporter-update ${live ? "(live)" : "(dry run)"} → ${outDir}`,
  );
  console.log(
    `Period: ${period} · source notes: ${notes.length}${
      input.highlights ? " · founder highlights included" : ""
    }`,
  );
  console.log(
    `\nChecklist scan (${live ? "draft" : "founder-supplied text"}):`,
  );
  console.log(formatFindings(findings));
  console.log("\nManual checks (always required):");
  for (const c of UPDATE_MANUAL_CHECKS) console.log(`  [ ] ${c}`);
  console.log(
    `\nReview ${path.join(outDir, "review.md")} — nothing is sent until a human approves.`,
  );
  if (!live) {
    console.log(
      "\nThis was a dry run. Add --live (with ANTHROPIC_API_KEY set) to generate the update.",
    );
  }
}

main().catch((err: unknown) => {
  console.error(
    "Supporter-update failed:",
    err instanceof Error ? err.message : err,
  );
  process.exit(1);
});
