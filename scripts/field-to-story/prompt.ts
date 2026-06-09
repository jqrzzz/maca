/**
 * Field-to-Story (v0) — prompt assembly. Builds the grounding prompt entirely
 * from the Story Bank, so the model drafts in PRASM's voice, stays factual, and
 * respects consent and safety. Nothing here is invented; it all traces to
 * content/storyBank.
 */
import {
  voice,
  boilerplate,
  people,
  storyBeats,
  verifiedFacts,
  unverifiedFacts,
  beatsByTheme,
  type StoryBeat,
} from "@/content/storyBank";
import type { FieldInput } from "./types";

/** JSON schema for structured output — maps 1:1 to DraftBundle. */
export const draftSchema: Record<string, unknown> = {
  type: "object",
  additionalProperties: false,
  properties: {
    fieldNote: {
      type: "object",
      additionalProperties: false,
      properties: {
        title: { type: "string" },
        excerpt: { type: "string" },
        tag: { type: "string" },
        body: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              type: { type: "string", enum: ["p", "h", "quote"] },
              text: { type: "string" },
            },
            required: ["type", "text"],
          },
        },
      },
      required: ["title", "excerpt", "tag", "body"],
    },
    donorUpdate: {
      type: "object",
      additionalProperties: false,
      properties: {
        subject: { type: "string" },
        body: { type: "string" },
      },
      required: ["subject", "body"],
    },
    social: {
      type: "object",
      additionalProperties: false,
      properties: {
        caption: { type: "string" },
        altTextNote: { type: "string" },
      },
      required: ["caption", "altTextNote"],
    },
  },
  required: ["fieldNote", "donorUpdate", "social"],
};

const bullets = (items: string[]) => items.map((i) => `- ${i}`).join("\n");

export function buildSystemPrompt(): string {
  const verified = verifiedFacts().map((f) => f.claim);
  const doNotState = unverifiedFacts().map(
    (f) => `${f.claim}${f.note ? ` (${f.note})` : ""}`,
  );
  const peopleLines = people.map(
    (p) =>
      `${p.publicReference} — ${p.role} — consent: ${p.consent}; image allowed: ${p.imageOK}.${p.notes ? ` ${p.notes}` : ""}`,
  );

  return [
    "You are the drafting engine for PRASM — a small, founder-led initiative supporting Kayan refugees from Myanmar who live, largely undocumented and off-grid, in the hills of Mae Hong Son, Thailand. You turn rough field input into publish-ready DRAFTS in PRASM's own voice. You never publish — a human reviews and approves everything you write.",
    "",
    "PRIME DIRECTIVES — never violate:",
    bullets([
      "Ground everything. Use only the VERIFIED FACTS, APPROVED DESCRIPTIONS, and STORY THREADS provided (here and in the field input). Never invent facts, numbers, names, quotes, statistics, or outcomes. If a detail isn't grounded, leave it out.",
      "Protect people and place. Never reveal or hint at the village's exact location. Never name or depict a person beyond the consent level listed in PEOPLE, and never use a real person's name unless it is listed there as cleared.",
      "Dignity over drama. No pity, no saviorism, no trauma as spectacle — especially involving children.",
      "Honesty. Never imply charity registration, tax-deductibility, audited financials, or impact PRASM cannot show.",
    ]),
    "",
    "VOICE",
    voice.summary,
    "Tone:",
    bullets(voice.tone),
    "Do:",
    bullets(voice.doList),
    "Don't:",
    bullets(voice.dontList),
    `Prefer: ${voice.prefer.join("; ")}`,
    `Avoid (never use): ${voice.avoid.join("; ")}`,
    "Hard rules:",
    bullets(voice.rules),
    "",
    "VERIFIED FACTS (safe to draw on):",
    bullets(verified),
    "",
    "DO NOT STATE AS FACT (unverified or placeholder — you may not present these as established; omit any figure you cannot ground):",
    bullets(doNotState),
    "",
    "APPROVED DESCRIPTIONS (reuse where natural):",
    bullets([
      `One-liner: ${boilerplate.oneLiner}`,
      `Short: ${boilerplate.short}`,
      `Standard: ${boilerplate.standard}`,
      `Mission: ${boilerplate.mission}`,
      `Safe way to describe where we work: ${boilerplate.place}`,
    ]),
    "",
    "PEOPLE (refer to people ONLY as listed; never exceed their consent):",
    peopleLines.length
      ? bullets(peopleLines)
      : "- (none recorded — do not name or depict any individual)",
    "",
    "OUTPUT",
    "Return ONLY JSON matching the provided schema — three drafts built from the field input:",
    bullets([
      'fieldNote — for the website. A short in-voice "title"; a 1–2 sentence "excerpt"; a one- or two-word "tag" (e.g. "Identity", "Medical", "Village"); and "body", an array of blocks: {"type":"p"} for a paragraph, {"type":"h"} for a short subheading, {"type":"quote"} for a brief pull-quote. Aim for 3–6 short paragraphs that turn from hardship toward agency.',
      'donorUpdate — a short email: a "subject" and a roughly 120–180 word "body" — warm, concrete, ending on a light, non-pushy line about what support makes possible. No hard numbers unless grounded.',
      'social — a "caption" of 1–3 sentences (at most a couple of hashtags), and "altTextNote": a one-line reminder of what the image\'s alt text should convey (never describe a real, identifiable face).',
    ]),
    "If the field input is too thin to ground a piece honestly, write less rather than inventing. A short, true draft beats a rich, fabricated one.",
  ].join("\n");
}

export function buildUserPrompt(input: FieldInput): string {
  const date = input.date ?? new Date().toISOString().slice(0, 10);
  const themes = input.themes ?? [];
  const beats: StoryBeat[] = themes.length
    ? Array.from(
        new Map(
          themes.flatMap((t) => beatsByTheme(t)).map((b) => [b.id, b]),
        ).values(),
      )
    : storyBeats;

  const lines: string[] = [`FIELD INPUT (date: ${date})`];
  if (input.sample) {
    lines.push("[SAMPLE INPUT — illustrative, not real field data]");
  }
  lines.push("", input.raw.trim(), "");

  if (input.people?.length) {
    lines.push("People present (founder-confirmed consent — do not exceed):");
    for (const p of input.people) {
      lines.push(`- ${p.reference} — consent: ${p.consent}`);
    }
    lines.push("");
  }

  if (beats.length) {
    lines.push(
      "RELEVANT STORY THREADS (stay consistent with these; do not copy verbatim):",
    );
    for (const b of beats) lines.push(`- ${b.title}: ${b.summary}`);
    lines.push("");
  }

  lines.push(
    "Draft the three pieces now, grounded only in the above and the verified facts in your instructions.",
  );
  return lines.join("\n");
}
