/**
 * Story Bank types. The Story Bank is the single grounding surface for
 * AI-assisted drafting (field notes, donor updates, grant copy) — see
 * ./README.md and docs/concept.md → "Institutional Memory — the Story Bank".
 *
 * Everything here is Tier-0 (public) by rule. Sensitive beneficiary data never
 * lives in this repo (see docs/concept.md → "Data and privacy model").
 */

/** How much a person has consented to appear in public-facing content. */
export type ConsentLevel =
  | "full" // full name + image may be used
  | "first-name" // first name only; image per `imageOK`
  | "anonymous" // no name; described generically; image per `imageOK`
  | "role-only" // referred to by role (e.g. "our founder"); no personal name
  | "composite"; // an illustrative composite, not one real person

export type Person = {
  /** Stable internal id — not necessarily a real name. */
  id: string;
  /** Exactly how they may be referred to publicly, given `consent`. */
  publicReference: string;
  /** Their role in the story. */
  role: string;
  consent: ConsentLevel;
  /** Whether their image may be shown publicly. Default to false when unsure. */
  imageOK: boolean;
  /** Drafting guidance: what's safe to say, what to avoid. */
  notes?: string;
};

/** How confidently we can state a fact in public. */
export type FactStatus =
  | "verified" // confirmed; safe to state plainly
  | "unverified" // plausible but not confirmed; do not state as fact yet
  | "placeholder"; // a stand-in number/value; never present as real

export type Fact = {
  id: string;
  /** The claim, written plainly. */
  claim: string;
  status: FactStatus;
  /** Where this is canonical / where it came from, for traceability. */
  source: string;
  /** Optional extra context for drafting. */
  note?: string;
};

export type StoryBeat = {
  id: string;
  title: string;
  /** A grounding summary — not the final published prose. */
  summary: string;
  /** Where the beat is told in full (canonical sources). */
  sources: string[];
  /** Themes this beat can ground a draft about. */
  themes: string[];
};

/** Reusable, approved descriptions of PRASM at several lengths. */
export type Boilerplate = {
  /** ~1 line. */
  oneLiner: string;
  /** ~1 sentence. */
  short: string;
  /** ~60–90 words. */
  standard: string;
  /** The mission statement. */
  mission: string;
  /** A safe way to describe where we work (never the exact location). */
  place: string;
};

export type VoiceGuide = {
  summary: string;
  tone: string[];
  doList: string[];
  dontList: string[];
  /** Words/framings to prefer. */
  prefer: string[];
  /** Words/framings to avoid. */
  avoid: string[];
  /** Hard safety + honesty rules every draft must obey. */
  rules: string[];
};
