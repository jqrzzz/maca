/**
 * Field-to-Story (v0) — CLI runner.
 *
 * Turns a field-input JSON file into three grounded DRAFTS (field note, donor
 * update, social caption), grounded in the Story Bank and drafted by Claude.
 * Defaults to a DRY RUN (assemble the prompt + scan the input, no API call);
 * pass --live (with ANTHROPIC_API_KEY) to generate the drafts.
 *
 * Nothing is ever published. Output is written to drafts/<date>-<slug>/ for a
 * human to review against the checklist. See ./README.md.
 *
 * Run via:  npm run draft -- [--input <file.json>] [--out <dir>] [--live]
 */
import fs from "node:fs";
import path from "node:path";
import { buildSystemPrompt, buildUserPrompt, draftSchema } from "./prompt";
import { runChecks, formatFindings, type Finding } from "../lib/checks";
import { callClaude } from "../lib/claude";
import { loadLocalEnv, slugify } from "../lib/util";
import type { DraftBundle, FieldInput } from "./types";

/** The human-in-the-loop checklist — always required, scans or no scans. */
const FIELD_MANUAL_CHECKS: string[] = [
  "No detail (place name, landmark, road, view) could locate the village.",
  "No person is named or shown beyond the consent on file; any quote from a real person is consented.",
  "Every figure traces to a VERIFIED fact (not a placeholder).",
  "Reads in PRASM's voice — dignity first, no pity, no overclaim.",
  "A human has approved this before anything is published or sent.",
];

type Args = { input: string; out: string; live: boolean };

function parseArgs(argv: string[]): Args {
  const args: Args = {
    input: "scripts/field-to-story/sample-input.json",
    out: "drafts",
    live: false,
  };
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
  console.log(`Field-to-Story (v0) — turn field input into grounded DRAFTS.

Usage:
  npm run draft -- [--input <file.json>] [--out <dir>] [--live]

  --input, -i   Field-input JSON (default: scripts/field-to-story/sample-input.json)
  --out,   -o   Output directory (default: drafts/)
  --live        Call the Claude API to generate drafts (needs ANTHROPIC_API_KEY).
                Without it, runs a dry run: assembles the prompt + scans the input.
  --help,  -h   Show this help.

Drafts are for human review only — never auto-published. See scripts/field-to-story/README.md.`);
}

function loadInput(file: string): FieldInput {
  const data = JSON.parse(fs.readFileSync(file, "utf8")) as FieldInput;
  if (typeof data.raw !== "string" || !data.raw.trim()) {
    throw new Error(`Input ${file} must have a non-empty "raw" field.`);
  }
  return data;
}

function renderFieldNoteTs(b: DraftBundle, slug: string, date: string): string {
  const displayDate = new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const body = b.fieldNote.body
    .map(
      (blk) =>
        `    { type: ${JSON.stringify(blk.type)}, text: ${JSON.stringify(blk.text)} },`,
    )
    .join("\n");
  return `import type { FieldNote } from "./types";

// DRAFT from scripts/field-to-story — review against the checklist before publishing.
// TODO[user]: set heroImage to a real, consented ImageKey (see lib/images.ts).
export const note: FieldNote = {
  slug: ${JSON.stringify(slug)},
  title: ${JSON.stringify(b.fieldNote.title)},
  date: ${JSON.stringify(date)},
  displayDate: ${JSON.stringify(displayDate)},
  tag: ${JSON.stringify(b.fieldNote.tag)},
  excerpt: ${JSON.stringify(b.fieldNote.excerpt)},
  heroImage: "needWar",
  body: [
${body}
  ],
};
`;
}

function renderReview(o: {
  live: boolean;
  bundle: DraftBundle | null;
  findings: Finding[];
  date: string;
}): string {
  const { live, bundle, findings, date } = o;
  const lines: string[] = [
    `# Draft review — ${date}`,
    "",
    "> **DRAFT — NOT FOR PUBLICATION.** Written to assist, not to publish. A human must review and approve before any of this is posted or sent.",
    "",
    "## Checklist",
    "",
    `Automated scan of ${live ? "the generated drafts" : "the field input"}:`,
    "",
    findings.length
      ? findings.map((f) => `- ⚠️ **${f.section}:** ${f.note}`).join("\n")
      : "- ✅ No automated flags.",
    "",
    "Manual checks (always required):",
    "",
    FIELD_MANUAL_CHECKS.map((c) => `- [ ] ${c}`).join("\n"),
    "",
  ];

  if (live && bundle) {
    lines.push(
      "## Field note",
      "",
      `**${bundle.fieldNote.title}**  ·  _${bundle.fieldNote.tag}_`,
      "",
      `_${bundle.fieldNote.excerpt}_`,
      "",
      ...bundle.fieldNote.body.map((blk) =>
        blk.type === "h"
          ? `### ${blk.text}`
          : blk.type === "quote"
            ? `> ${blk.text}`
            : blk.text,
      ),
      "",
      "## Donor update",
      "",
      `**Subject:** ${bundle.donorUpdate.subject}`,
      "",
      bundle.donorUpdate.body,
      "",
      "## Social caption",
      "",
      bundle.social.caption,
      "",
      `_Alt-text reminder: ${bundle.social.altTextNote}_`,
      "",
    );
  } else {
    lines.push(
      "## Drafts",
      "",
      "_Dry run — no drafts generated. Run with `--live` and `ANTHROPIC_API_KEY` set to produce the field note, donor update, and caption._",
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
  const date = input.date ?? new Date().toISOString().slice(0, 10);
  const system = buildSystemPrompt();
  const user = buildUserPrompt(input);

  const haveKey = Boolean(process.env.ANTHROPIC_API_KEY);
  const live = args.live && haveKey;
  if (args.live && !haveKey) {
    console.error(
      "⚠  --live requested but ANTHROPIC_API_KEY is not set. Running a dry run instead.\n",
    );
  }

  const outDir = path.join(args.out, `${date}-${input.slug ?? "draft"}`);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "prompt.system.txt"), system);
  fs.writeFileSync(path.join(outDir, "prompt.user.txt"), user);

  let bundle: DraftBundle | null = null;
  let sections: { label: string; text: string }[];

  if (live) {
    bundle = await callClaude<DraftBundle>({
      system,
      user,
      schema: draftSchema,
      model: process.env.FIELD_TO_STORY_MODEL,
    });
    fs.writeFileSync(
      path.join(outDir, "response.json"),
      JSON.stringify(bundle, null, 2),
    );
    const slug = input.slug ?? slugify(bundle.fieldNote.title);
    fs.writeFileSync(
      path.join(outDir, "fieldNote.draft.ts"),
      renderFieldNoteTs(bundle, slug, date),
    );
    sections = [
      {
        label: "field note",
        text: [
          bundle.fieldNote.title,
          bundle.fieldNote.excerpt,
          ...bundle.fieldNote.body.map((b) => b.text),
        ].join("\n"),
      },
      {
        label: "donor update",
        text: `${bundle.donorUpdate.subject}\n${bundle.donorUpdate.body}`,
      },
      { label: "social", text: bundle.social.caption },
    ];
  } else {
    sections = [{ label: "field input", text: input.raw }];
  }

  const findings = runChecks(sections);
  fs.writeFileSync(
    path.join(outDir, "review.md"),
    renderReview({ live, bundle, findings, date }),
  );

  console.log(`\nField-to-Story ${live ? "(live)" : "(dry run)"} → ${outDir}`);
  console.log(
    `Model: ${live ? (process.env.FIELD_TO_STORY_MODEL ?? "claude-opus-4-8") : "— (no API call)"}`,
  );
  console.log(`\nChecklist scan (${live ? "drafts" : "field input"}):`);
  console.log(formatFindings(findings));
  console.log("\nManual checks (always required):");
  for (const c of FIELD_MANUAL_CHECKS) console.log(`  [ ] ${c}`);
  console.log(
    `\nReview ${path.join(outDir, "review.md")} — nothing is published until a human approves.`,
  );
  if (!live) {
    console.log(
      "\nThis was a dry run. Add --live (with ANTHROPIC_API_KEY set) to generate the three drafts.",
    );
  }
}

main().catch((err: unknown) => {
  console.error(
    "Field-to-Story failed:",
    err instanceof Error ? err.message : err,
  );
  process.exit(1);
});
