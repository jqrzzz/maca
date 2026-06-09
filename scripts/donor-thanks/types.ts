/**
 * Donor-thanks (v0) — types. Drafts a warm, honest thank-you for a donation,
 * grounded in the Story Bank. The donor-stewardship thread of the AI-native
 * plan (docs/concept.md → Donor Stewardship). See ./README.md.
 */

/** A donation to acknowledge. */
export type DonationEvent = {
  /** The donor's name or how to address them; defaults to a warm generic. */
  donor?: string;
  /** Gift size as text (e.g. "USD 50") — optional. */
  amount?: string;
  /** How they gave (Stripe, PayPal, Patreon, crypto, bank) — optional. */
  method?: string;
  /** A monthly/recurring supporter? */
  recurring?: boolean;
  /** Their first gift? */
  firstTime?: boolean;
  /** What they directed the gift to, if anything (e.g. "medical care"). */
  earmark?: string;
  /** A message the donor left. */
  note?: string;
  /** A personal touch the founder wants included. */
  personal?: string;
  /** Output flavor; "email" (default) or "short" for a text/DM. */
  channel?: "email" | "short";
  /** Marks this as an illustrative sample, not a real donation. */
  sample?: boolean;
};

/** The thank-you draft. */
export type ThankYou = {
  /** A short, warm email subject. */
  subject: string;
  /** The thank-you message (~80–150 words). */
  body: string;
  /** A 1–2 sentence version for a text, DM, or receipt note. */
  shortVersion: string;
};
