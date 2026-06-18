/**
 * Finance ledger check (v0) — deterministic, no API.
 *
 * Validates the expense ledger against the Financial Controls & Expense Policy:
 * required fields, known categories/funds/currencies, positive amounts, the
 * dual-approval threshold (no self-approval above it), and the receipt
 * requirement. Errors exit 1 (block a merge); warnings (e.g. still-pending
 * items) exit 0.
 *
 * Run via:  npm run finance:check  [-- path/to/ledger.jsonl]
 */
import fs from "node:fs";
import path from "node:path";
import { parseLedger, validateLedger, type Issue } from "./schema";

const argPath = process.argv[2];
const real = path.join("finance", "ledger.jsonl");
const sample = path.join("finance", "ledger.sample.jsonl");
const file = argPath ?? (fs.existsSync(real) ? real : sample);

if (!fs.existsSync(file)) {
  console.error(`No ledger found at ${file}`);
  process.exit(1);
}
const usingSample = file === sample;

const text = fs.readFileSync(file, "utf8");
const { records, issues: parseIssues } = parseLedger(text);
const issues: Issue[] = [...parseIssues, ...validateLedger(records)];

const errors = issues.filter((i) => i.level === "error");
const warnings = issues.filter((i) => i.level === "warn");

console.log(
  `\nFinance ledger check — ${records.length} entr${records.length === 1 ? "y" : "ies"} in ${file}${
    usingSample ? "  (sample; set finance/ledger.jsonl for the real one)" : ""
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
