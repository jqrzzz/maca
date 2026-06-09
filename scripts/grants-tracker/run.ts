/**
 * Grants tracker (v0) — a read-only report of the grants pipeline.
 *
 * Reads scripts/grants-tracker/pipeline.json (your real, git-ignored pipeline)
 * or falls back to pipeline.example.json, and prints what needs attention by
 * deadline plus everything submitted/closed. Edit the JSON by hand to update it.
 *
 * Run via:  npm run grants:status -- [--due <days>] [--file <path>]
 */
import fs from "node:fs";
import type { GrantStatus, Pipeline, PipelineEntry } from "./types";

const DEFAULT_FILES = [
  "scripts/grants-tracker/pipeline.json",
  "scripts/grants-tracker/pipeline.example.json",
];

const OPEN: GrantStatus[] = ["researching", "drafting"];
const STATUS_LABEL: Record<GrantStatus, string> = {
  researching: "researching",
  drafting: "drafting",
  applied: "applied",
  won: "won",
  declined: "declined",
};

type Args = { file?: string; due?: number };

function parseArgs(argv: string[]): Args {
  const args: Args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--file" || a === "-f") args.file = argv[(i += 1)];
    else if (a === "--due" || a === "-d") args.due = Number(argv[(i += 1)]);
    else if (a === "--help" || a === "-h") {
      console.log(`Grants tracker (v0) — report the grants pipeline.

Usage:
  npm run grants:status -- [--due <days>] [--file <path>]

  --due,  -d   Only show open items due within <days> (and any overdue).
  --file, -f   Pipeline JSON (default: pipeline.json, else pipeline.example.json).
  --help, -h   Show this help.

Edit scripts/grants-tracker/pipeline.json by hand to update the pipeline.`);
      process.exit(0);
    }
  }
  return args;
}

function resolveFile(explicit?: string): string {
  if (explicit) return explicit;
  return DEFAULT_FILES.find((f) => fs.existsSync(f)) ?? DEFAULT_FILES[1];
}

function daysUntil(iso: string): number {
  const ms = Date.parse(`${iso}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((ms - today.getTime()) / 86_400_000);
}

function when(deadline?: string): string {
  if (!deadline) return "no deadline";
  const d = daysUntil(deadline);
  if (d < 0) return `OVERDUE ${-d}d ago`;
  if (d === 0) return "due TODAY";
  return `in ${d}d`;
}

function byDeadline(a: PipelineEntry, b: PipelineEntry): number {
  if (!a.deadline) return 1;
  if (!b.deadline) return -1;
  return a.deadline.localeCompare(b.deadline);
}

function main(): void {
  const args = parseArgs(process.argv.slice(2));
  const file = resolveFile(args.file);
  const pipeline = JSON.parse(fs.readFileSync(file, "utf8")) as Pipeline;

  const counts = pipeline.reduce<Record<string, number>>((acc, e) => {
    acc[e.status] = (acc[e.status] ?? 0) + 1;
    return acc;
  }, {});
  const countLine = (Object.keys(STATUS_LABEL) as GrantStatus[])
    .map((s) => `${STATUS_LABEL[s]} ${counts[s] ?? 0}`)
    .join(" · ");

  console.log(`\nPRASM grants pipeline — ${file}`);
  console.log(`${pipeline.length} opportunities · ${countLine}`);

  let open = pipeline.filter((e) => OPEN.includes(e.status)).sort(byDeadline);
  if (args.due !== undefined && !Number.isNaN(args.due)) {
    open = open.filter(
      (e) => e.deadline && daysUntil(e.deadline) <= (args.due as number),
    );
  }

  console.log(
    `\n⏰ Needs attention (open${args.due !== undefined ? `, due within ${args.due}d` : ""}, by deadline):`,
  );
  if (open.length) {
    for (const e of open) {
      const mark = e.deadline && daysUntil(e.deadline) < 0 ? "!" : "•";
      console.log(
        `  ${mark} ${when(e.deadline).padEnd(14)} ${e.funder} — ${e.status}${e.deadline ? ` — due ${e.deadline}` : ""}`,
      );
    }
  } else {
    console.log(
      "  (nothing open" + (args.due !== undefined ? " in range" : "") + ")",
    );
  }

  const closed = pipeline
    .filter((e) => !OPEN.includes(e.status))
    .sort(byDeadline);
  if (closed.length) {
    console.log("\nSubmitted / closed:");
    for (const e of closed) {
      console.log(
        `  ${e.status.padEnd(10)} ${e.funder}${e.amount ? ` — ${e.amount}` : ""}${e.notes ? ` — ${e.notes}` : ""}`,
      );
    }
  }
  console.log("");
}

main();
