/**
 * Field-to-Story (v0) — types. The tool turns raw field input into three
 * grounded DRAFTS (field note, donor update, social caption), reusing the Story
 * Bank. See ./README.md and docs/concept.md → Field-to-Story Engine.
 */

/** What the founder provides from the field. */
export type FieldInput = {
  /** Raw material: a voice-note transcript, or a few bullet points. */
  raw: string;
  /** Themes to pull the relevant Story Bank beats (e.g. "medical", "identity"). */
  themes?: string[];
  /** People present, with the consent level the founder has confirmed. */
  people?: { reference: string; consent: string }[];
  /** ISO date of the visit (YYYY-MM-DD); defaults to today. */
  date?: string;
  /** Slug for the draft files; otherwise derived from the field-note title. */
  slug?: string;
  /** Marks this as illustrative sample data, not real field input. */
  sample?: boolean;
};

/** A single field-note body block (mirrors content/fieldNotes/types.ts). */
export type DraftBlock = { type: "p" | "h" | "quote"; text: string };

/** The three grounded drafts the tool produces. */
export type DraftBundle = {
  fieldNote: {
    title: string;
    excerpt: string;
    tag: string;
    body: DraftBlock[];
  };
  donorUpdate: { subject: string; body: string };
  social: { caption: string; altTextNote: string };
};
