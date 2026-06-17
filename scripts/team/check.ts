/**
 * Team roster check (v0) — deterministic, no API.
 *
 * Validates the roster against the people/roles model: valid roles + statuses,
 * required onboarding (Code of Conduct for active members, safeguarding for
 * anyone near vulnerable people), and good-governance advisories (data
 * agreement, conflict-of-interest for finance approvers). Errors exit 1 (block a
 * merge); warnings exit 0.
 *
 * Run via:  npm run team:check  [-- path/to/roster.jsonl]
 */
import fs from "node:fs";
import path from "node:path";
import { parseRoster, validateRoster, type Issue } from "./schema";

const argPath = process.argv[2];
const real = path.join("team", "roster.jsonl");
const sample = path.join("team", "roster.sample.jsonl");
const file = argPath ?? (fs.existsSync(real) ? real : sample);

if (!fs.existsSync(file)) {
  console.error(`No roster found at ${file}`);
  process.exit(1);
}
const usingSample = file === sample;

const { people, issues: parseIssues } = parseRoster(fs.readFileSync(file, "utf8"));
const issues: Issue[] = [...parseIssues, ...validateRoster(people)];
const errors = issues.filter((i) => i.level === "error");
const warnings = issues.filter((i) => i.level === "warn");

console.log(
  `\nTeam roster check — ${people.length} ${people.length === 1 ? "person" : "people"} in ${file}${
    usingSample ? "  (sample; set team/roster.jsonl for the real one)" : ""
  }`,
);
if (!issues.length) {
  console.log("✅ clean — no errors, no warnings\n");
} else {
  for (const i of issues)
    console.log(`  ${i.level === "error" ? "✖" : "⚠"} [${i.where}] ${i.note}`);
  console.log(`\n${errors.length} error(s), ${warnings.length} warning(s)\n`);
}
process.exit(errors.length ? 1 : 0);
