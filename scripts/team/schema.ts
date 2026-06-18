/**
 * Team schema: the roster of people who act for PRASM, and what each role may do.
 *
 * This is the backbone the rest of the internal system runs on. Roles map to
 * capabilities (who can approve finance, who may see which data tier from the
 * Responsible AI Policy), so authorization is by role, not by a name typed into
 * a field. It is shaped to lift into Supabase later: people become a table,
 * roles drive row-level-security policies, and `onboarding` dates become
 * compliance records. Pure and dependency-free.
 *
 * No backend yet: the roster is JSONL in /team, validated by `npm run team:check`,
 * and changed via pull request (the merge is the sign-off; git history is the
 * audit trail).
 */

export const ROLES = [
  "admin",
  "treasurer",
  "content-approver",
  "board",
  "volunteer",
  "viewer",
] as const;
export type Role = (typeof ROLES)[number];

export const STATUSES = ["active", "inactive"] as const;
export type Status = (typeof STATUSES)[number];

/** Capabilities a role grants. These become Supabase RLS policies later. */
export type Capability =
  | "manageTeam"
  | "approveFinance"
  | "approveContent"
  | "accessTier1" // operational data (donors, grants, finance)
  | "accessTier2"; // sensitive data (beneficiary identities, medical) — least privilege

export const ROLE_CAPABILITIES: Record<Role, Capability[]> = {
  admin: [
    "manageTeam",
    "approveFinance",
    "approveContent",
    "accessTier1",
    "accessTier2",
  ],
  treasurer: ["approveFinance", "accessTier1"],
  board: ["approveFinance", "accessTier1"],
  "content-approver": ["approveContent", "accessTier1"],
  volunteer: [],
  viewer: [],
};

export const can = (role: Role, cap: Capability): boolean =>
  ROLE_CAPABILITIES[role]?.includes(cap) ?? false;

export type Person = {
  id: string; // e.g. "P-001"
  name: string; // display name, or a role-only handle where privacy is preferred
  role: Role;
  status: Status;
  email?: string;
  phone?: string;
  emergencyContact?: string;
  joined?: string; // ISO YYYY-MM-DD
  location?: string;
  /** True for anyone working near children or vulnerable people (safeguarding gate). */
  worksWithVulnerable?: boolean;
  /** Compliance sign-offs, as dates. Tie to the published policy suite. */
  onboarding: {
    codeOfConduct?: string;
    dataAgreement?: string; // confidentiality / PDPA
    conflictOfInterest?: string;
    safeguarding?: string; // training/clearance
  };
  notes?: string;
};

export type Issue = { level: "error" | "warn"; where: string; note: string };

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function parseRoster(text: string): {
  people: Person[];
  issues: Issue[];
} {
  const people: Person[] = [];
  const issues: Issue[] = [];
  text.split(/\r?\n/).forEach((line, i) => {
    const t = line.trim();
    if (!t) return;
    try {
      people.push(JSON.parse(t) as Person);
    } catch {
      issues.push({ level: "error", where: `line ${i + 1}`, note: "not valid JSON" });
    }
  });
  return { people, issues };
}

export function validateRoster(people: Person[]): Issue[] {
  const issues: Issue[] = [];
  const err = (where: string, note: string) =>
    issues.push({ level: "error", where, note });
  const warn = (where: string, note: string) =>
    issues.push({ level: "warn", where, note });

  const seen = new Set<string>();
  for (const p of people) {
    const at = p.id || p.name || "(no id)";
    if (!p.id) err(at, "missing id");
    else {
      if (seen.has(p.id)) err(at, `duplicate id "${p.id}"`);
      seen.add(p.id);
    }
    if (!p.name?.trim()) err(at, "missing name/handle");
    if (!ROLES.includes(p.role)) err(at, `invalid role "${p.role}"`);
    if (!STATUSES.includes(p.status)) err(at, `invalid status "${p.status}"`);
    if (p.joined && !ISO_DATE.test(p.joined)) err(at, `invalid joined date "${p.joined}"`);
    if (p.email && !EMAIL.test(p.email)) warn(at, `email "${p.email}" looks malformed`);

    const ob = p.onboarding ?? {};
    const active = p.status === "active";
    const validRole = ROLES.includes(p.role);

    // Safety-critical: active members must accept the Code of Conduct; anyone
    // near vulnerable people must have safeguarding clearance.
    if (active && !ob.codeOfConduct)
      err(at, "active member without Code of Conduct acceptance");
    if (p.worksWithVulnerable && !ob.safeguarding)
      err(at, "works with vulnerable people but no safeguarding clearance");

    // Good-governance advisories.
    if (active && validRole && can(p.role, "accessTier1") && !ob.dataAgreement)
      warn(at, "handles operational data without a signed data agreement");
    if (active && validRole && can(p.role, "approveFinance") && !ob.conflictOfInterest)
      warn(at, "finance approver without a conflict-of-interest declaration");
  }

  // At least one active admin should exist (someone can manage the team).
  if (!people.some((p) => p.status === "active" && p.role === "admin"))
    warn("roster", "no active admin");

  return issues;
}
