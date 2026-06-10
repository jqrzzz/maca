/**
 * Supporter-update (v0) — prompt assembly. The shared grounding block supplies
 * PRASM's voice, verified facts, and consent rules; this file adds the
 * update-writer intro, the output contract, and the per-run source material —
 * which is REAL published field notes plus the founder's own highlights, so the
 * update reports what actually happened rather than inventing news.
 */
import { getAllFieldNotes, type FieldNote } from "@/content/fieldNotes";
import { buildGroundingBlock } from "../lib/grounding";
import type { UpdateInput } from "./types";

/** JSON schema for structured output — maps 1:1 to SupporterUpdate. */
export const updateSchema: Record<string, unknown> = {
  type: "object",
  additionalProperties: false,
  properties: {
    subject: { type: "string" },
    body: { type: "string" },
    social: { type: "string" },
  },
  required: ["subject", "body", "social"],
};

const bullets = (items: string[]) => items.map((i) => `- ${i}`).join("\n");

const INTRO =
  "You are the supporter-update writer for PRASM — a small, founder-led initiative supporting Kayan refugees from Myanmar who live, largely undocumented and off-grid, in the hills of Mae Hong Son, Thailand. You write the periodic update that goes to supporters and monthly donors: warm, honest, and built only from what actually happened. You draft; a human reviews and sends — you never send anything.";

const OUTPUT_CONTRACT = [
  "OUTPUT",
  "Build the update ONLY from the FIELD NOTES and FOUNDER HIGHLIGHTS supplied. Summarize and connect them in PRASM's voice — do not invent events, outcomes, numbers, or quotes that aren't in the material. If the material is thin, write a shorter, true update.",
  "",
  "Return ONLY JSON matching the provided schema:",
  bullets([
    "subject — a short, warm subject line for the period.",
    "body — the update email, about 150–250 words: open warmly, share what happened (drawing on the notes and highlights), and close with a light pointer to the field notes on the site. No hard ask; gratitude over solicitation. No invented figures.",
    "social — 1–2 sentences for social media pointing people to the latest field notes (at most one hashtag).",
  ]),
].join("\n");

export function buildSystemPrompt(): string {
  return `${INTRO}\n\n${buildGroundingBlock()}\n\n${OUTPUT_CONTRACT}`;
}

/** Select the notes the update may draw on. */
export function selectNotes(
  input: UpdateInput,
  today = new Date(),
): FieldNote[] {
  const all = getAllFieldNotes();
  if (input.includeSlugs?.length) {
    const wanted = new Set(input.includeSlugs);
    return all.filter((n) => wanted.has(n.slug));
  }
  const sinceDays = input.sinceDays ?? 60;
  const cutoff = new Date(today.getTime() - sinceDays * 86_400_000);
  const recent = all.filter((n) => new Date(n.date) >= cutoff);
  // Always give the model something true to work with: fall back to the
  // latest three notes when the window is empty.
  return recent.length ? recent : all.slice(0, 3);
}

export function buildUserPrompt(
  input: UpdateInput,
  notes: FieldNote[],
): string {
  const period =
    input.period ??
    new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const audience = input.audience ?? "supporters";

  const lines: string[] = [
    `SUPPORTER UPDATE — period: ${period}`,
    `Audience: ${
      audience === "monthly-donors"
        ? "monthly donors (people already giving regularly — thank them for carrying the work)"
        : "general supporters and newsletter subscribers"
    }`,
  ];
  if (input.sample) lines.push("[SAMPLE INPUT — illustrative]");
  lines.push("");

  lines.push("FIELD NOTES PUBLISHED (the real source material):");
  for (const n of notes) {
    lines.push(
      `- "${n.title}" (${n.displayDate}${n.tag ? `, ${n.tag}` : ""}) — ${n.excerpt}`,
    );
  }
  lines.push("");

  if (input.highlights?.trim()) {
    lines.push("FOUNDER HIGHLIGHTS (in the founder's own words):");
    lines.push(input.highlights.trim());
    lines.push("");
  }

  lines.push(
    "Draft the update now, grounded only in the above and the verified facts in your instructions.",
  );
  return lines.join("\n");
}
