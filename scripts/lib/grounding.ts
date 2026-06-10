/**
 * The shared, Story-Bank-grounded system-prompt preamble used by every drafting
 * tool: PRASM's prime directives, voice, verified facts, approved descriptions,
 * and consent rules. Each tool prepends its own intro and appends its own output
 * contract. Nothing here is invented — it all traces to content/storyBank.
 */
import {
  voice,
  boilerplate,
  people,
  verifiedFacts,
  unverifiedFacts,
} from "@/content/storyBank";
import { bullets } from "./util";

export function buildGroundingBlock(): string {
  const verified = verifiedFacts().map((f) => f.claim);
  const doNotState = unverifiedFacts().map(
    (f) => `${f.claim}${f.note ? ` (${f.note})` : ""}`,
  );
  const peopleLines = people.map(
    (p) =>
      `${p.publicReference}. ${p.role} Consent: ${p.consent}; image allowed: ${p.imageOK}.${p.notes ? ` ${p.notes}` : ""}`,
  );

  return [
    "PRIME DIRECTIVES (never violate):",
    bullets([
      "Ground everything. Use only the VERIFIED FACTS, APPROVED DESCRIPTIONS, and STORY THREADS provided. Never invent facts, numbers, names, quotes, statistics, or outcomes. If a detail isn't grounded, leave it out.",
      "Protect people and place. Never reveal or hint at the village's exact location. Never name or depict a person beyond the consent level listed in PEOPLE, and never use a real person's name unless it is listed there as cleared.",
      "Dignity over drama. No pity, no saviorism, no trauma as spectacle, especially involving children.",
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
    "DO NOT STATE AS FACT (unverified or placeholder: you may not present these as established; omit any figure you cannot ground):",
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
      : "- (none recorded; do not name or depict any individual)",
  ].join("\n");
}
