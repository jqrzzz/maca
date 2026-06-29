/**
 * Demo data for the donor portal in /preview. Entirely fake and presentational.
 * Donors see only aggregate, celebratory impact, never identifiable child data
 * and never medical records. Amounts are in USD. Nothing here is a real tax
 * document; in the real system the foundation issues receipts and statements.
 */

export type GiftFund =
  | "Where needed most"
  | "Education"
  | "Medical care"
  | "Sustainable living"
  | "Identity and records";

export type GiftMethod = "Card" | "Bank transfer" | "Crypto";

export type Gift = {
  /** Receipt id, for example "R-2026-0007". */
  id: string;
  date: string;
  amountUsd: number;
  fund: GiftFund;
  method: GiftMethod;
  recurring: boolean;
};

export type DonorProfile = {
  id: string;
  name: string;
  emailMasked: string;
  since: string;
  /** Public recognition preference: give in the open or anonymously. */
  anonymous: boolean;
  /** Newest first. */
  gifts: Gift[];
};

export const demoDonor: DonorProfile = {
  id: "D-you",
  name: "Jordan Rivera",
  emailMasked: "j••••••@••••.org",
  since: "Dec 2025",
  anonymous: false,
  gifts: [
    {
      id: "R-2026-0007",
      date: "Jun 2, 2026",
      amountUsd: 250,
      fund: "Where needed most",
      method: "Card",
      recurring: true,
    },
    {
      id: "R-2026-0005",
      date: "May 2, 2026",
      amountUsd: 250,
      fund: "Where needed most",
      method: "Card",
      recurring: true,
    },
    {
      id: "R-2026-0003",
      date: "Apr 2, 2026",
      amountUsd: 250,
      fund: "Where needed most",
      method: "Card",
      recurring: true,
    },
    {
      id: "R-2026-0001",
      date: "Mar 15, 2026",
      amountUsd: 1000,
      fund: "Education",
      method: "Bank transfer",
      recurring: false,
    },
    {
      id: "R-2025-0012",
      date: "Dec 20, 2025",
      amountUsd: 500,
      fund: "Medical care",
      method: "Crypto",
      recurring: false,
    },
  ],
};

/** Where the foundation puts funds, at the program level. Illustrative. */
export type AllocationSlice = { label: string; pct: number; icon: string };

export const allocation: AllocationSlice[] = [
  { label: "Education", pct: 35, icon: "education" },
  { label: "Medical care", pct: 25, icon: "medical" },
  { label: "Sustainable living", pct: 20, icon: "sustainable" },
  { label: "Identity and records", pct: 10, icon: "identity" },
  { label: "Operations", pct: 10, icon: "operations" },
];

/** Aggregate, celebratory impact (Tier 0). No child is identified. */
export type ImpactStat = { label: string; value: string; icon: string };

export const donorImpact: ImpactStat[] = [
  { label: "Children learning", value: "24", icon: "learners" },
  { label: "Curiosity sessions", value: "180", icon: "sessions" },
  { label: "Sparks delivered", value: "12", icon: "sparks" },
  { label: "Clinic visits supported", value: "30", icon: "clinic" },
];

export type DonorDocument = {
  id: string;
  title: string;
  desc: string;
  kind: "statement" | "impact" | "policy";
  /** Policy documents link to a public page; statements download in-app. */
  href?: string;
};

export const donorDocuments: DonorDocument[] = [
  {
    id: "statement-2025",
    title: "Annual giving statement, 2025",
    desc: "A summary of your gifts for your records.",
    kind: "statement",
  },
  {
    id: "impact-2026-h1",
    title: "Impact report, first half 2026",
    desc: "Where funds went and what they made possible.",
    kind: "impact",
  },
  {
    id: "transparency",
    title: "Transparency and use of funds",
    desc: "How the foundation tracks and reports every baht and dollar.",
    kind: "policy",
    href: "/transparency",
  },
  {
    id: "funds-protection",
    title: "How funds are protected",
    desc: "The controls that keep giving safe and accountable.",
    kind: "policy",
    href: "/funds-protection",
  },
  {
    id: "governance",
    title: "Governance",
    desc: "How the foundation is run and held to account.",
    kind: "policy",
    href: "/governance",
  },
  {
    id: "responsible-ai",
    title: "Responsible AI",
    desc: "How AI is used carefully, with people in charge.",
    kind: "policy",
    href: "/responsible-ai",
  },
];
