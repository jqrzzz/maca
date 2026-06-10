/**
 * Impact-report scaffold (v0) — NO API call, deliberately.
 *
 * An honest impact report is made of real numbers and real events, which only
 * the founder has. So this tool doesn't draft prose with a model — it assembles
 * the report STRUCTURE from the live content modules (boilerplate, programs,
 * stats, transparency) and leaves an explicit [to be provided] slot everywhere
 * a real figure or account belongs. Placeholder stats are surfaced as
 * placeholders, never as facts.
 *
 * Output: drafts/impact-report/<year>.md — fill it in, then publish however
 * suits (page, PDF, email).
 *
 * Run via:  npm run impact -- [--year <YYYY>] [--out <dir>]
 */
import fs from "node:fs";
import path from "node:path";
import { boilerplate } from "@/content/storyBank";
import { stats } from "@/content/stats";
import { activePrograms, roadmap } from "@/content/programs";
import { whereSupportGoes, statusStatement } from "@/content/transparency";
import { getAllFieldNotes } from "@/content/fieldNotes";

type Args = { year: string; out: string };

function parseArgs(argv: string[]): Args {
  const args: Args = { year: String(new Date().getFullYear()), out: "drafts" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--year" || a === "-y") args.year = argv[(i += 1)];
    else if (a === "--out" || a === "-o") args.out = argv[(i += 1)];
    else if (a === "--help" || a === "-h") {
      console.log(`Impact-report scaffold (v0) — assemble an honest report skeleton.

Usage:
  npm run impact -- [--year <YYYY>] [--out <dir>]

Reads the live content modules and emits drafts/impact-report/<year>.md with
[to be provided] slots for every real figure. No API call; nothing invented.`);
      process.exit(0);
    }
  }
  return args;
}

const TODO = "**[to be provided]**";

function main(): void {
  const args = parseArgs(process.argv.slice(2));
  const year = args.year;
  const notes = getAllFieldNotes().filter((n) => n.date.startsWith(year));

  const lines: string[] = [
    `# PRASM — the year in review, ${year} (DRAFT)`,
    "",
    "> **DRAFT — NOT FOR PUBLICATION.** Every " + TODO + " below needs a real,",
    "> defensible figure or account from the founder before this goes anywhere.",
    "> Placeholder site stats are marked as placeholders — do not publish them",
    "> as results.",
    "",
    "## Who we are",
    "",
    boilerplate.standard,
    "",
    `_${boilerplate.mission}_`,
    "",
    "## The year at a glance",
    "",
    "| What | This year |",
    "| --- | --- |",
    `| Funds received | ${TODO} |`,
    `| Funds reaching the community | ${TODO} |`,
    `| Hospital visits / treatments covered | ${TODO} |`,
    `| Medical records built or updated | ${TODO} |`,
    `| Families supported | ${TODO} |`,
    `| In-kind deliveries coordinated | ${TODO} |`,
    "",
    "Current site stats for cross-checking (placeholders flagged):",
    "",
    ...stats.map(
      (s) =>
        `- ${s.value} — ${s.label}${s.placeholder ? " _(PLACEHOLDER on the site — replace with the real figure)_" : ""}`,
    ),
    "",
    "## What we did",
    "",
  ];

  for (const p of activePrograms) {
    lines.push(
      `### ${p.title}`,
      "",
      `_${p.summary}_`,
      "",
      `What actually happened this year: ${TODO}`,
      "",
    );
  }

  lines.push(
    "## Where support went",
    "",
    "| Area | What it covers | Share / amount |",
    "| --- | --- | --- |",
    ...whereSupportGoes.map((w) => `| ${w.label} | ${w.body} | ${TODO} |`),
    "",
    "## A story from the field",
    "",
    `Pick one or two published field notes to retell briefly (already consented and published):`,
    "",
    ...(notes.length
      ? notes.map((n) => `- "${n.title}" (${n.displayDate}) — ${n.excerpt}`)
      : [
          `- (no field notes dated ${year} yet — list the year's notes here when they exist)`,
        ]),
    "",
    "## What's next",
    "",
    ...roadmap.items.map((r) => `- **${r.title}** — ${r.summary}`),
    "",
    "## An honest note on our status",
    "",
    ...statusStatement.body.map((p) => `${p}\n`),
    "## Thank you",
    "",
    `To everyone who gave, sent supplies, taught, translated, or simply followed along: ${TODO} (a personal word from the founder).`,
    "",
    "---",
    "",
    "_Checklist before publishing: every figure above is real and defensible;",
    "no detail locates the village; no person appears beyond their consent;",
    "nothing implies registration, tax-deductibility, or audited financials._",
    "",
  );

  const outDir = path.join(args.out, "impact-report");
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `${year}.md`);
  fs.writeFileSync(outFile, lines.join("\n"));

  const todoCount = (lines.join("\n").match(/\[to be provided\]/g) ?? [])
    .length;
  console.log(`\nImpact-report scaffold → ${outFile}`);
  console.log(
    `Programs: ${activePrograms.length} · field notes in ${year}: ${notes.length} · slots to fill: ${todoCount}`,
  );
  console.log(
    "\nNo API call was made and nothing was invented — fill the slots with real figures, then publish.",
  );
}

main();
