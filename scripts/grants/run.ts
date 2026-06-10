/**
 * Grants copilot (v0) — CLI runner.
 *
 * Turns a funder-profile JSON file into a tailored grant-application DRAFT,
 * grounded in the Story Bank and drafted by Claude. Defaults to a DRY RUN
 * (assemble the prompt + scan the founder-supplied text, no API call); pass
 * --live (with ANTHROPIC_API_KEY) to generate the draft.
 *
 * Nothing is ever submitted. Output is written to drafts/grant-<funder>/ for a
 * human to review, refine, and submit. See ./README.md.
 *
 * Run via:  npm run grant -- [--input <funder.json>] [--out <dir>] [--live]
 */
import fs from "node:fs";
import path from "node:path";
import { buildSystemPrompt, buildUserPrompt, grantSchema } from "./prompt";
import { runChecks, formatFindings, type Finding } from "../lib/checks";
import { callClaude } from "../lib/claude";
import { argValue, loadLocalEnv, slugify } from "../lib/util";
import type { FunderProfile, GrantDraft } from "./types";

const GRANT_MANUAL_CHECKS: string[] = [
  "Every funder question is answered, in their order, within any word limit.",
  "Every figure is real and grounded, or marked [to be provided] — nothing invented.",
  "Status is stated honestly — no implied charity registration, tax-deductibility, or audited financials.",
  "No detail could locate the village; no person is named beyond consent.",
  "Reads in PRASM's voice — dignity first, no pity, no overclaim.",
  "The internal fitNote is removed before submission.",
  "A human has reviewed and approved before submitting.",
];

type Args = { input: string; out: string; live: boolean };

function parseArgs(argv: string[]): Args {
  const args: Args = {
    input: "scripts/grants/sample-funder.json",
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
  console.log(`Grants copilot (v0) — draft a funder-tailored application.

Usage:
  npm run grant -- [--input <funder.json>] [--out <dir>] [--live]

  --input, -i   Funder-profile JSON (default: scripts/grants/sample-funder.json)
  --out,   -o   Output directory (default: drafts/)
  --live        Call the Claude API to generate the draft (needs ANTHROPIC_API_KEY).
                Without it, runs a dry run: assembles the prompt + scans the input.
  --help,  -h   Show this help.

Drafts are for human review only — never auto-submitted. See scripts/grants/README.md.`);
}

function loadProfile(file: string): FunderProfile {
  const data = JSON.parse(fs.readFileSync(file, "utf8")) as FunderProfile;
  if (typeof data.funder !== "string" || !data.funder.trim()) {
    throw new Error(`Input ${file} must have a non-empty "funder" field.`);
  }
  if (!Array.isArray(data.questions) || data.questions.length === 0) {
    throw new Error(`Input ${file} must have a non-empty "questions" array.`);
  }
  return data;
}

const wordCount = (s: string) => (s.trim().match(/\S+/g) ?? []).length;

/** Structural checks the text scans can't see (coverage, word limits). */
function structuralFindings(p: FunderProfile, d: GrantDraft): Finding[] {
  const out: Finding[] = [];
  if (d.answers.length !== p.questions.length) {
    out.push({
      section: "answers",
      note: `Answered ${d.answers.length} of ${p.questions.length} questions — make sure none were dropped or merged.`,
    });
  }
  d.answers.forEach((a, i) => {
    if (!a.answer.trim()) {
      out.push({ section: `answer ${i + 1}`, note: "Empty answer." });
    }
    if (p.wordLimit && wordCount(a.answer) > p.wordLimit * 1.1) {
      out.push({
        section: `answer ${i + 1}`,
        note: `~${wordCount(a.answer)} words — over the ~${p.wordLimit}-word guidance.`,
      });
    }
  });
  return out;
}

/** The clean, submittable document (no internal fit note). */
function renderApplication(p: FunderProfile, d: GrantDraft): string {
  const lines: string[] = [
    `# ${p.funder} — PRASM application (DRAFT)`,
    "",
    "> DRAFT — review and edit before submitting.",
    "",
    "## Summary",
    "",
    d.summary,
    "",
    "## Responses",
    "",
  ];
  d.answers.forEach((a, i) => {
    lines.push(`### ${i + 1}. ${a.question}`, "", a.answer, "");
  });
  lines.push("## A note on our status", "", d.statusDisclosure, "");
  return lines.join("\n");
}

function renderReview(o: {
  live: boolean;
  profile: FunderProfile;
  draft: GrantDraft | null;
  findings: Finding[];
}): string {
  const { live, profile, draft, findings } = o;
  const lines: string[] = [
    `# Grant draft review — ${profile.funder}`,
    "",
    "> **DRAFT — NOT FOR SUBMISSION.** Written to assist, not to submit. A human must review, refine, and submit.",
    "",
    "## Checklist",
    "",
    `Automated scan of ${live ? "the generated draft" : "the founder-supplied text"}:`,
    "",
    findings.length
      ? findings.map((f) => `- ⚠️ **${f.section}:** ${f.note}`).join("\n")
      : "- ✅ No automated flags.",
    "",
    "Manual checks (always required):",
    "",
    GRANT_MANUAL_CHECKS.map((c) => `- [ ] ${c}`).join("\n"),
    "",
  ];

  if (live && draft) {
    lines.push(
      "## Internal — funder fit (do not submit)",
      "",
      draft.fitNote,
      "",
      "## Summary",
      "",
      draft.summary,
      "",
      "## Responses",
      "",
    );
    draft.answers.forEach((a, i) => {
      lines.push(
        `### ${i + 1}. ${a.question}`,
        "",
        a.answer,
        "",
        `_(${wordCount(a.answer)} words)_`,
        "",
      );
    });
    lines.push("## A note on our status", "", draft.statusDisclosure, "");
  } else {
    lines.push(
      "## Draft",
      "",
      "_Dry run — no draft generated. Run with `--live` and `ANTHROPIC_API_KEY` set to produce the application._",
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
  const profile = loadProfile(args.input);
  const system = buildSystemPrompt();
  const user = buildUserPrompt(profile);

  const haveKey = Boolean(process.env.ANTHROPIC_API_KEY);
  const live = args.live && haveKey;
  if (args.live && !haveKey) {
    console.error(
      "⚠  --live requested but ANTHROPIC_API_KEY is not set. Running a dry run instead.\n",
    );
  }

  const outDir = path.join(args.out, `grant-${slugify(profile.funder)}`);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "prompt.system.txt"), system);
  fs.writeFileSync(path.join(outDir, "prompt.user.txt"), user);

  let draft: GrantDraft | null = null;
  let findings: Finding[];

  if (live) {
    draft = await callClaude<GrantDraft>({
      system,
      user,
      schema: grantSchema,
      model: process.env.GRANTS_MODEL,
    });
    fs.writeFileSync(
      path.join(outDir, "response.json"),
      JSON.stringify(draft, null, 2),
    );
    fs.writeFileSync(
      path.join(outDir, "application.md"),
      renderApplication(profile, draft),
    );
    const sections = [
      { label: "summary", text: draft.summary },
      ...draft.answers.map((a, i) => ({
        label: `answer ${i + 1}`,
        text: a.answer,
      })),
      { label: "status", text: draft.statusDisclosure },
    ];
    findings = [...runChecks(sections), ...structuralFindings(profile, draft)];
  } else {
    const founderText = [profile.project, profile.notes]
      .filter(Boolean)
      .join("\n");
    findings = founderText
      ? runChecks([{ label: "funder profile", text: founderText }])
      : [];
  }

  fs.writeFileSync(
    path.join(outDir, "review.md"),
    renderReview({ live, profile, draft, findings }),
  );

  console.log(`\nGrants copilot ${live ? "(live)" : "(dry run)"} → ${outDir}`);
  console.log(
    `Model: ${live ? (process.env.GRANTS_MODEL ?? "claude-opus-4-8") : "— (no API call)"}`,
  );
  console.log(
    `\nChecklist scan (${live ? "draft" : "founder-supplied text"}):`,
  );
  console.log(formatFindings(findings));
  console.log("\nManual checks (always required):");
  for (const c of GRANT_MANUAL_CHECKS) console.log(`  [ ] ${c}`);
  console.log(
    `\nReview ${path.join(outDir, "review.md")} — nothing is submitted until a human approves.`,
  );
  if (!live) {
    console.log(
      "\nThis was a dry run. Add --live (with ANTHROPIC_API_KEY set) to generate the application.",
    );
  }
}

main().catch((err: unknown) => {
  console.error(
    "Grants copilot failed:",
    err instanceof Error ? err.message : err,
  );
  process.exit(1);
});
