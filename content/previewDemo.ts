/**
 * Sample data for the internal-system preview (/preview). Entirely fake and
 * presentational: role-only handles, made-up expenses and field captures.
 * Mirrors the shape of the real team roster, finance ledger, and field inbox so
 * the demo feels like the future console.
 */

export type Role =
  | "admin"
  | "treasurer"
  | "board"
  | "content-approver"
  | "volunteer";

export type DemoPerson = {
  name: string;
  role: Role;
  status: "active" | "inactive";
  onboarding: string[];
};

export const demoPeople: DemoPerson[] = [
  { name: "Founder (Dr.)", role: "admin", status: "active", onboarding: ["Conduct", "Safeguarding", "Data"] },
  { name: "Treasurer", role: "treasurer", status: "active", onboarding: ["Conduct", "Conflicts"] },
  { name: "Teacher", role: "volunteer", status: "active", onboarding: ["Conduct", "Safeguarding"] },
  { name: "Board member", role: "board", status: "active", onboarding: ["Conduct", "Data"] },
  { name: "Past volunteer", role: "volunteer", status: "inactive", onboarding: ["Conduct"] },
];

/** Roles an admin can assign when inviting someone (most invites are volunteers). */
export const roleOptions: { value: Role; label: string }[] = [
  { value: "volunteer", label: "Volunteer (field member)" },
  { value: "content-approver", label: "Content approver" },
  { value: "treasurer", label: "Treasurer" },
  { value: "board", label: "Board member" },
  { value: "admin", label: "Admin" },
];

export type DemoExpense = {
  id: string;
  date: string;
  payee: string;
  category: string;
  amountUsd: number;
  status: "approved" | "pending";
};

export const demoExpenses: DemoExpense[] = [
  { id: "E-2026-0001", date: "2026-06-09", payee: "Provincial Hospital", category: "Medical", amountUsd: 140, status: "approved" },
  { id: "E-2026-0002", date: "2026-06-11", payee: "Bookshop", category: "Education", amountUsd: 60, status: "approved" },
  { id: "E-2026-0003", date: "2026-06-12", payee: "Hardware Supplier", category: "In-kind & logistics", amountUsd: 320, status: "approved" },
  { id: "E-2026-0005", date: "2026-06-15", payee: "Water Co.", category: "Sustainable", amountUsd: 210, status: "pending" },
];

/** The field inbox: what members capture, waiting for a person to review. */
export type DemoCapture = {
  id: string;
  kind: "note" | "photo" | "voice" | "expense";
  by: string;
  at: string;
  summary: string;
  status: "pending" | "approved";
};

export const demoCaptures: DemoCapture[] = [
  { id: "C-001", kind: "note", by: "Teacher", at: "Jun 15, 09:12", summary: "New family arrived overnight; two children, mother needs antenatal care.", status: "pending" },
  { id: "C-002", kind: "photo", by: "Teacher", at: "Jun 15, 09:15", summary: "3 photos from the morning school session", status: "pending" },
  { id: "C-003", kind: "voice", by: "Founder (Dr.)", at: "Jun 14, 17:40", summary: "Voice memo · 0:42 · clinic visit notes", status: "pending" },
  { id: "C-004", kind: "expense", by: "Founder (Dr.)", at: "Jun 14, 16:02", summary: "Pharmacy receipt · $38 · Medical", status: "approved" },
];
