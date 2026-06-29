/**
 * Seed data for the village steward's money view (a simple cashbook) in the
 * /preview demo. Entirely fake and presentational. It mirrors how the real
 * finance model works (see scripts/finance/schema.ts): money the steward
 * receives, money he spends, each spend logged with a category and an optional
 * receipt, and a status the founder can confirm. Amounts are in Thai baht, the
 * steward's own currency.
 *
 * Nothing here is real. No real money moves and nothing is sent anywhere; the
 * demo only remembers entries in this browser.
 */

export type WalletDirection = "in" | "out";

/** A spend the steward logs is "logged" until the founder confirms it. */
export type WalletStatus = "logged" | "approved";

export type WalletEntry = {
  id: string;
  direction: WalletDirection;
  /** Display date, for example "Jun 3". Demo only. */
  date: string;
  /** Amount in Thai baht. */
  amount: number;
  category: string;
  note: string;
  /** A receipt photo, kept on the device. Live entries attach an object URL. */
  receiptUrl?: string;
  /** Applies to money out; money in is simply received. */
  status: WalletStatus;
};

/** Where money comes from. */
export const moneyInCategories = [
  "Monthly stipend",
  "Spark-fund advance",
  "Cost reimbursement",
  "Other",
] as const;

/** What the steward spends on, drawn from the costs the role actually covers. */
export const moneyOutCategories = [
  "Tablet charging and power",
  "Mobile data",
  "Local travel",
  "Learning materials",
  "Snacks for the children",
  "Other",
] as const;

/** Chronological. The view shows newest first. */
export const stewardWalletSeed: WalletEntry[] = [
  {
    id: "W-01",
    direction: "in",
    date: "Jun 1",
    amount: 4000,
    category: "Monthly stipend",
    note: "For the role this month.",
    status: "approved",
  },
  {
    id: "W-02",
    direction: "out",
    date: "Jun 3",
    amount: 60,
    category: "Tablet charging and power",
    note: "Charged the tablet at the shop.",
    status: "approved",
  },
  {
    id: "W-03",
    direction: "out",
    date: "Jun 5",
    amount: 200,
    category: "Mobile data",
    note: "Data top-up for the month.",
    status: "logged",
  },
  {
    id: "W-04",
    direction: "out",
    date: "Jun 6",
    amount: 80,
    category: "Local travel",
    note: "Songthaew to the next hamlet and back.",
    status: "approved",
  },
  {
    id: "W-05",
    direction: "in",
    date: "Jun 8",
    amount: 1000,
    category: "Spark-fund advance",
    note: "Advance for a botany kit, approved by the founder.",
    status: "approved",
  },
  {
    id: "W-06",
    direction: "out",
    date: "Jun 9",
    amount: 320,
    category: "Learning materials",
    note: "Seeds, two small pots, and a picture book.",
    status: "logged",
  },
];

export type WalletTotals = { inSum: number; outSum: number; balance: number };

export function walletTotals(entries: WalletEntry[]): WalletTotals {
  let inSum = 0;
  let outSum = 0;
  for (const e of entries) {
    if (e.direction === "in") inSum += e.amount;
    else outSum += e.amount;
  }
  return { inSum, outSum, balance: inSum - outSum };
}

/** Total spent per out-category, for a simple "where it went" breakdown. */
export function spentByCategory(
  entries: WalletEntry[],
): Record<string, number> {
  const out: Record<string, number> = {};
  for (const e of entries) {
    if (e.direction !== "out") continue;
    out[e.category] = (out[e.category] ?? 0) + e.amount;
  }
  return out;
}
