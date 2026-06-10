/**
 * Grants copilot (v0) — types. Drafts a funding application tailored to one
 * funder, grounded in the Story Bank. See ./README.md and docs/concept.md →
 * Grants & Fundraising Copilot.
 */

/** A funding opportunity the founder wants to apply for. */
export type FunderProfile = {
  /** Funder / foundation / program name. */
  funder: string;
  /** Their stated focus or mission. */
  focus?: string;
  /** What they fund. */
  funds?: string;
  /** Geographic priorities. */
  geography?: string;
  /** Typical or requested grant size (as text, e.g. "USD 2,000–10,000"). */
  amount?: string;
  /** Application deadline. */
  deadline?: string;
  /** Rough per-answer word guidance, if the funder sets one. */
  wordLimit?: number;
  /** The specific project/use we're seeking support for. */
  project?: string;
  /** Any extra context for the draft. */
  notes?: string;
  /** The application questions to answer, in order. */
  questions: string[];
  /** Marks this as an illustrative sample, not a real funder. */
  sample?: boolean;
};

export type GrantAnswer = { question: string; answer: string };

/** The tailored application draft. */
export type GrantDraft = {
  /** ~80–120 word org + ask summary, framed for this funder. */
  summary: string;
  /** One grounded answer per funder question, in order. */
  answers: GrantAnswer[];
  /** Honest paragraph on PRASM's legal status and what it means for a funder. */
  statusDisclosure: string;
  /** Internal note (for the founder, NOT for submission): does this funder fit? */
  fitNote: string;
};
