/**
 * Donor-thanks (v0) — CLI runner.
 *
 * Turns a donation-event JSON file into a warm, honest thank-you DRAFT, grounded
 * in the Story Bank and drafted by Claude. Defaults to a DRY RUN (assemble the
 * prompt + scan the founder-supplied text, no API call); pass --live (with
 * ANTHROPIC_API_KEY) to generate the draft.
 *
 * Nothing is ever sent. Output is written to drafts/thanks-<donor>/ for a human
 * to review and send. See ./README.md.
 *
 * Run via:  npm run thanks -- [--input <donation.json>] [--out <dir>] [--live]
 */
import fs from "node:fs";
import path from "node:path";
import { buildSystemPrompt, buildUserPrompt, thankSchema } from "./prompt";
import { runChecks, formatFindings, type Finding } from "../lib/checks";
import { callClaude } from "../lib/claude";
import { argValue, loadLocalEnv, slugify } from "../lib/util";
import type { DonationEvent, ThankYou } from "./types";

const DONOR_MANUAL_CHECKS: string[] = [
  "No tax receipt or deductibility is implied — PRASM can't issue one yet.",
  "Any mention of impact is grounded — no invented outcomes, numbers, or names.",
  "The donor's name and details are correct and used respectfully.",
  "Warm and personal, in PRASM's voice — gracious, not gushing.",
  "A human has reviewed before sending.",
];

type Args = { input: string; out: string; live: boolean };

function parseArgs(argv: string[]): Args {
  const args: Args = {
    input: "scripts/donor-thanks/sample-donation.json",
    out: "drafts",
    live: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--input" || a === "-i") args.input = argValue(argv, (i += 1), a);
    else if (a === "--out" || a === "-o")
      args.out = argValue(argv, (i += 1), a);
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
  console.log(`Donor-thanks (v0) — draft a warm, honest thank-you for a gift.

Usage:
  npm run thanks -- [--input <donation.json>] [--out <dir>] [--live]

  --input, -i   Donation-event JSON (default: scripts/donor-thanks/sample-donation.json)
  --out,   -o   Output directory (default: drafts/)
  --live        Call the Claude API to generate the draft (needs ANTHROPIC_API_KEY).
                Without it, runs a dry run: assembles the prompt + scans the input.
  --help,  -h   Show this help.

Drafts are for human review only — never auto-sent. See scripts/donor-thanks/README.md.`);
}

function loadEvent(file: string): DonationEvent {
  return JSON.parse(fs.readFileSync(file, "utf8")) as DonationEvent;
}

/** The clean, sendable message (no checklist). */
function renderMessage(e: DonationEvent, t: ThankYou): string {
  return [
    `# Thank-you — ${e.donor ?? "supporter"} (DRAFT)`,
    "",
    "> DRAFT — review and edit before sending.",
    "",
    `**Subject:** ${t.subject}`,
    "",
    t.body,
    "",
    "---",
    "",
    `**Short version (text/DM):** ${t.shortVersion}`,
    "",
  ].join("\n");
}

function renderReview(o: {
  live: boolean;
  event: DonationEvent;
  thanks: ThankYou | null;
  findings: Finding[];
}): string {
  const { live, event, thanks, findings } = o;
  const who = event.donor ?? "supporter";
  const lines: string[] = [
    `# Thank-you review — ${who}`,
    "",
    "> **DRAFT — NOT FOR SENDING.** Written to assist, not to send. A human must review and send.",
    "",
    "## Checklist",
    "",
    `Automated scan of ${live ? "the generated message" : "the founder-supplied text"}:`,
    "",
    findings.length
      ? findings.map((f) => `- ⚠️ **${f.section}:** ${f.note}`).join("\n")
      : "- ✅ No automated flags.",
    "",
    "Manual checks (always required):",
    "",
    DONOR_MANUAL_CHECKS.map((c) => `- [ ] ${c}`).join("\n"),
    "",
  ];

  if (live && thanks) {
    lines.push(
      "## Message",
      "",
      `**Subject:** ${thanks.subject}`,
      "",
      thanks.body,
      "",
      `_Short version: ${thanks.shortVersion}_`,
      "",
    );
  } else {
    lines.push(
      "## Message",
      "",
      "_Dry run — no message generated. Run with `--live` and `ANTHROPIC_API_KEY` set to produce the thank-you._",
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
  const event = loadEvent(args.input);
  const system = buildSystemPrompt();
  const user = buildUserPrompt(event);

  const haveKey = Boolean(process.env.ANTHROPIC_API_KEY);
  const live = args.live && haveKey;
  if (args.live && !haveKey) {
    console.error(
      "⚠  --live requested but ANTHROPIC_API_KEY is not set. Running a dry run instead.\n",
    );
  }

  const outDir = path.join(
    args.out,
    `thanks-${slugify(event.donor ?? "supporter")}`,
  );
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "prompt.system.txt"), system);
  fs.writeFileSync(path.join(outDir, "prompt.user.txt"), user);

  let thanks: ThankYou | null = null;
  let findings: Finding[];

  if (live) {
    thanks = await callClaude<ThankYou>({
      system,
      user,
      schema: thankSchema,
      model: process.env.DONOR_THANKS_MODEL,
    });
    fs.writeFileSync(
      path.join(outDir, "response.json"),
      JSON.stringify(thanks, null, 2),
    );
    fs.writeFileSync(
      path.join(outDir, "message.md"),
      renderMessage(event, thanks),
    );
    findings = runChecks([
      { label: "subject", text: thanks.subject },
      { label: "body", text: thanks.body },
      { label: "short version", text: thanks.shortVersion },
    ]);
  } else {
    const founderText = [event.personal, event.note].filter(Boolean).join("\n");
    findings = founderText
      ? runChecks([{ label: "donor input", text: founderText }])
      : [];
  }

  fs.writeFileSync(
    path.join(outDir, "review.md"),
    renderReview({ live, event, thanks, findings }),
  );

  console.log(`\nDonor-thanks ${live ? "(live)" : "(dry run)"} → ${outDir}`);
  console.log(
    `Model: ${live ? (process.env.DONOR_THANKS_MODEL ?? "claude-opus-4-8") : "— (no API call)"}`,
  );
  console.log(
    `\nChecklist scan (${live ? "message" : "founder-supplied text"}):`,
  );
  console.log(formatFindings(findings));
  console.log("\nManual checks (always required):");
  for (const c of DONOR_MANUAL_CHECKS) console.log(`  [ ] ${c}`);
  console.log(
    `\nReview ${path.join(outDir, "review.md")} — nothing is sent until a human approves.`,
  );
  if (!live) {
    console.log(
      "\nThis was a dry run. Add --live (with ANTHROPIC_API_KEY set) to generate the thank-you.",
    );
  }
}

main().catch((err: unknown) => {
  console.error(
    "Donor-thanks failed:",
    err instanceof Error ? err.message : err,
  );
  process.exit(1);
});
