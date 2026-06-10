/**
 * Supporter-update (v0) — types. Drafts the periodic update for supporters —
 * the newsletter and the recurring-donor note are the same artifact for an org
 * this size. Grounded in real, published field notes; nothing invented.
 */

/** What to build the update from. Everything is optional — sensible defaults. */
export type UpdateInput = {
  /** Display period, e.g. "June 2026". Defaults to the current month + year. */
  period?: string;
  /** Specific field-note slugs to feature. Default: notes from `sinceDays`. */
  includeSlugs?: string[];
  /** How far back to look for notes when `includeSlugs` is not set. */
  sinceDays?: number;
  /** Founder's extra news in their own words (scanned by the checklist). */
  highlights?: string;
  /** Framing: general supporters (default) or monthly donors. */
  audience?: "supporters" | "monthly-donors";
  /** Marks this as illustrative sample input, not a real update. */
  sample?: boolean;
};

/** The update draft. */
export type SupporterUpdate = {
  /** Short, warm subject line. */
  subject: string;
  /** The update email, ~150–250 words, grounded in the supplied notes. */
  body: string;
  /** 1–2 sentence social blurb pointing at the field notes. */
  social: string;
};
