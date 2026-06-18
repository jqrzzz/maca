/**
 * Use-of-funds report (v0) — deterministic, no API.
 *
 * Summarizes approved spend from the ledger by category and fund, and flags
 * what's still pending or missing a receipt. Honest by construction: it reports
 * only what's recorded, and invents nothing. Pair it with `npm run impact` to
 * fill the "where support goes" section of an impact report.
 *
 * Run via:  npm run finance:report  [-- path/to/ledger.jsonl]
 */
import fs from "node:fs";
import path from "node:path";
import {
  parseLedger,
  summarize,
  accountLabel,
  usd,
} from "./schema";

const argPath = process.argv[2];
const real = path.join("finance", "ledger.jsonl");
const sample = path.join("finance", "ledger.sample.jsonl");
const file = argPath ?? (fs.existsSync(real) ? real : sample);

if (!fs.existsSync(file)) {
  console.error(`No ledger found at ${file}`);
  process.exit(1);
}

const { records } = parseLedger(fs.readFileSync(file, "utf8"));
const s = summarize(records);
const range = s.from ? `${s.from} to ${s.to}` : "no dated entries";

console.log(`\nUse of funds — ${file}`);
console.log(`Period: ${range}`);
console.log(`Approved spend: ${usd(s.approvedUsd)} across ${s.count} entr${s.count === 1 ? "y" : "ies"}`);
console.log("");

console.log("By category:");
const cats = Object.entries(s.byCategory).sort((a, b) => b[1] - a[1]);
if (!cats.length) console.log("  (none approved yet)");
for (const [code, amt] of cats) {
  const pct = s.approvedUsd ? Math.round((amt / s.approvedUsd) * 100) : 0;
  console.log(`  ${accountLabel(code).padEnd(32)} ${usd(amt).padStart(10)}  ${pct}%`);
}

console.log("\nBy fund:");
for (const [fund, amt] of Object.entries(s.byFund))
  console.log(`  ${fund.padEnd(32)} ${usd(amt).padStart(10)}`);

console.log("\nControls:");
console.log(`  Pending approval: ${s.pendingCount} (${usd(s.pendingUsd)})`);
console.log(
  `  Approved without a receipt: ${s.unreceipted}${s.unreceipted ? "  ⚠ fix before reporting" : ""}`,
);
console.log(
  "\nNote: figures are only as complete as the ledger. Reconcile against bank/processor payouts before publishing.\n",
);
