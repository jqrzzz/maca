/**
 * Team roster report (v0) — deterministic, no API.
 *
 * Lists active people by role, shows who is authorized to approve finance, and
 * flags onboarding gaps. A quick "who's who and who can do what" view.
 *
 * Run via:  npm run team:roster  [-- path/to/roster.jsonl]
 */
import fs from "node:fs";
import path from "node:path";
import { parseRoster, can, ROLE_CAPABILITIES, type Person } from "./schema";

const argPath = process.argv[2];
const real = path.join("team", "roster.jsonl");
const sample = path.join("team", "roster.sample.jsonl");
const file = argPath ?? (fs.existsSync(real) ? real : sample);

if (!fs.existsSync(file)) {
  console.error(`No roster found at ${file}`);
  process.exit(1);
}

const { people } = parseRoster(fs.readFileSync(file, "utf8"));
const active = people.filter((p) => p.status === "active");
const inactive = people.filter((p) => p.status !== "active");

console.log(`\nTeam roster — ${file}`);
console.log(`Active: ${active.length}   Inactive: ${inactive.length}`);

console.log("\nActive members by role:");
const byRole = new Map<string, Person[]>();
for (const p of active) byRole.set(p.role, [...(byRole.get(p.role) ?? []), p]);
for (const [role, members] of byRole) {
  console.log(`  ${role}:`);
  for (const m of members) console.log(`    - ${m.name}`);
}

console.log("\nCan approve finance:");
const approvers = active.filter((p) => can(p.role, "approveFinance"));
console.log(approvers.length ? approvers.map((p) => `  - ${p.name} (${p.role})`).join("\n") : "  (none)");

console.log("\nCan see sensitive (Tier 2) data:");
const t2 = active.filter((p) => can(p.role, "accessTier2"));
console.log(t2.length ? t2.map((p) => `  - ${p.name} (${p.role})`).join("\n") : "  (none)");

console.log("\nOnboarding gaps (active):");
const gaps: string[] = [];
for (const p of active) {
  const ob = p.onboarding ?? {};
  const missing: string[] = [];
  if (!ob.codeOfConduct) missing.push("code of conduct");
  if (p.worksWithVulnerable && !ob.safeguarding) missing.push("safeguarding");
  if (can(p.role, "accessTier1") && !ob.dataAgreement) missing.push("data agreement");
  if (can(p.role, "approveFinance") && !ob.conflictOfInterest) missing.push("conflict of interest");
  if (missing.length) gaps.push(`  - ${p.name}: ${missing.join(", ")}`);
}
console.log(gaps.length ? gaps.join("\n") : "  none — all clear");

// Reference: the role -> capability matrix that becomes RLS later.
console.log("\nRole capabilities:");
for (const [role, caps] of Object.entries(ROLE_CAPABILITIES))
  console.log(`  ${role.padEnd(16)} ${caps.length ? caps.join(", ") : "(read-only)"}`);
console.log("");
