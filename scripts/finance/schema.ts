/**
 * Finance schema: the single source of truth for the expense ledger.
 *
 * Designed to lift into Supabase later without reshaping: each Expense field is a
 * future column, and `approval` / `receipt` become related rows. Until then the
 * ledger is JSONL in /finance (one record per line: easy to review in a PR
 * diff, trivial to parse, and a clean import into a database). Pure and
 * dependency-free, so both the CLI tools and a future admin UI / AI agent can
 * reuse the same validation and totals.
 *
 * Workflow (no backend yet): add an entry as `pending` in a PR; a second person
 * reviews, sets `approval`, and merges. The merge is the sign-off, and git
 * history is the audit trail.
 */

export const FUNDS = ["unrestricted", "restricted"] as const;
export type Fund = (typeof FUNDS)[number];

export const CURRENCIES = ["THB", "USD", "BTC", "ETH", "USDT"] as const;
export type Currency = (typeof CURRENCIES)[number];

/** Chart of accounts: spend categories mapped to the programs, plus operations. */
export const ACCOUNTS = [
  { code: "medical", label: "Medical care & transport" },
  { code: "education", label: "Education access" },
  { code: "sustainable", label: "Sustainable off-grid living" },
  { code: "inkind-logistics", label: "In-kind supplies & logistics" },
  { code: "identity-records", label: "Identity & records" },
  { code: "operations", label: "Operations & admin" },
  { code: "fees", label: "Payment & transfer fees" },
] as const;
export type AccountCode = (typeof ACCOUNTS)[number]["code"];
const ACCOUNT_CODES = new Set<string>(ACCOUNTS.map((a) => a.code));
export const accountLabel = (code: string): string =>
  ACCOUNTS.find((a) => a.code === code)?.label ?? code;

export const APPROVAL_STATUSES = ["pending", "approved", "rejected"] as const;
export type ApprovalStatus = (typeof APPROVAL_STATUSES)[number];

/**
 * Control thresholds, in USD-equivalent (set `amountUsd` at time of spend).
 * These mirror the Financial Controls & Expense Policy; change them in one place.
 */
export const THRESHOLDS = {
  /** At or above this, a second person must approve (dual control). */
  dualApprovalUsd: 200,
  /** At or above this, a receipt reference is required. */
  receiptUsd: 25,
};

export type Expense = {
  id: string; // e.g. "E-2026-0001"
  date: string; // ISO YYYY-MM-DD (incurred or paid)
  payee: string;
  category: AccountCode;
  fund: Fund;
  amount: number; // positive, in `currency`
  currency: Currency;
  amountUsd: number; // USD-equivalent at time of spend (for control + reporting)
  description: string;
  incurredBy: string; // who spent or requested
  method?: string; // cash | card | transfer | crypto | ...
  approval: {
    status: ApprovalStatus;
    by?: string; // approver; must differ from incurredBy above the dual-control threshold
    date?: string; // ISO
    note?: string;
  };
  receipt?: string; // receipt reference id (file in the private receipts store)
};

export type Issue = { level: "error" | "warn"; where: string; note: string };

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const ID_FORMAT = /^E-\d{4}-\d+$/;

/** Parse a JSONL ledger string into records, capturing per-line parse errors. */
export function parseLedger(text: string): {
  records: Expense[];
  issues: Issue[];
} {
  const records: Expense[] = [];
  const issues: Issue[] = [];
  text.split(/\r?\n/).forEach((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    try {
      records.push(JSON.parse(trimmed) as Expense);
    } catch {
      issues.push({
        level: "error",
        where: `line ${i + 1}`,
        note: "not valid JSON",
      });
    }
  });
  return { records, issues };
}

/** Validate a parsed ledger. Errors should block a merge; warnings are advisory. */
export function validateLedger(records: Expense[]): Issue[] {
  const issues: Issue[] = [];
  const err = (where: string, note: string) =>
    issues.push({ level: "error", where, note });
  const warn = (where: string, note: string) =>
    issues.push({ level: "warn", where, note });

  const seen = new Set<string>();
  const today = new Date().toISOString().slice(0, 10);

  for (const e of records) {
    const at = e.id || "(no id)";
    if (!e.id) err(at, "missing id");
    else {
      if (seen.has(e.id)) err(at, `duplicate id "${e.id}"`);
      seen.add(e.id);
      if (!ID_FORMAT.test(e.id)) warn(at, `id "${e.id}" is not E-YYYY-NNNN`);
    }

    if (!ISO_DATE.test(e.date || "")) err(at, `invalid date "${e.date}"`);
    else if (e.date > today) warn(at, `date ${e.date} is in the future`);

    if (!e.payee?.trim()) err(at, "missing payee");
    if (!e.description?.trim()) err(at, "missing description");
    if (!e.incurredBy?.trim()) err(at, "missing incurredBy");

    if (!ACCOUNT_CODES.has(e.category))
      err(at, `unknown category "${e.category}"`);
    if (!FUNDS.includes(e.fund)) err(at, `invalid fund "${e.fund}"`);
    if (!CURRENCIES.includes(e.currency))
      err(at, `invalid currency "${e.currency}"`);

    if (!(e.amount > 0)) err(at, `amount must be positive (got ${e.amount})`);
    if (!(e.amountUsd > 0))
      err(at, `amountUsd must be positive (got ${e.amountUsd})`);
    if (e.currency === "USD" && e.amount > 0 && e.amountUsd > 0) {
      const drift = Math.abs(e.amount - e.amountUsd) / e.amount;
      if (drift > 0.01)
        warn(at, "currency is USD but amount and amountUsd differ");
    }

    const status = e.approval?.status;
    if (!APPROVAL_STATUSES.includes(status))
      err(at, `invalid approval.status "${status}"`);

    if (status === "approved") {
      if (!e.approval.by?.trim()) err(at, "approved but no approval.by");
      if (!ISO_DATE.test(e.approval.date || ""))
        err(at, "approved but no valid approval.date");
      if (
        e.amountUsd >= THRESHOLDS.dualApprovalUsd &&
        e.approval.by &&
        e.approval.by.trim() === e.incurredBy?.trim()
      ) {
        err(
          at,
          `self-approved ${e.amountUsd} USD (>= ${THRESHOLDS.dualApprovalUsd}); needs a second approver`,
        );
      }
      if (e.amountUsd >= THRESHOLDS.receiptUsd && !e.receipt?.trim()) {
        err(
          at,
          `approved >= ${THRESHOLDS.receiptUsd} USD but no receipt reference`,
        );
      }
    } else if (status === "pending") {
      warn(at, "still pending approval");
    }
  }
  return issues;
}

export type Summary = {
  count: number;
  approvedUsd: number;
  pendingUsd: number;
  pendingCount: number;
  byCategory: Record<string, number>;
  byFund: Record<string, number>;
  unreceipted: number;
  from?: string;
  to?: string;
};

/** Totals for the use-of-funds report. Counts approved spend only. */
export function summarize(records: Expense[]): Summary {
  const s: Summary = {
    count: records.length,
    approvedUsd: 0,
    pendingUsd: 0,
    pendingCount: 0,
    byCategory: {},
    byFund: {},
    unreceipted: 0,
  };
  for (const e of records) {
    if (e.date) {
      s.from = !s.from || e.date < s.from ? e.date : s.from;
      s.to = !s.to || e.date > s.to ? e.date : s.to;
    }
    if (e.approval?.status === "approved") {
      s.approvedUsd += e.amountUsd || 0;
      s.byCategory[e.category] = (s.byCategory[e.category] || 0) + e.amountUsd;
      s.byFund[e.fund] = (s.byFund[e.fund] || 0) + e.amountUsd;
      if (e.amountUsd >= THRESHOLDS.receiptUsd && !e.receipt?.trim())
        s.unreceipted += 1;
    } else if (e.approval?.status === "pending") {
      s.pendingUsd += e.amountUsd || 0;
      s.pendingCount += 1;
    }
  }
  return s;
}

const usd = (n: number) =>
  `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
export { usd };
