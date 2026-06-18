/**
 * Sample data for the internal-system preview (/preview). Entirely fake and
 * presentational: role-only handles, made-up expenses. Mirrors the shape of the
 * real team roster and finance ledger so the demo feels like the future console.
 */

export type DemoPerson = {
  name: string;
  role: "admin" | "treasurer" | "board" | "content-approver" | "volunteer";
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
