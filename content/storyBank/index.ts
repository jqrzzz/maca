import type {
  Boilerplate,
  ConsentLevel,
  Fact,
  FactStatus,
  Person,
  StoryBeat,
  VoiceGuide,
} from "./types";
import { voice } from "./voice";
import { facts } from "./facts";
import { boilerplate } from "./boilerplate";
import { people } from "./people";
import { storyBeats } from "./storyBeats";

export type {
  Boilerplate,
  ConsentLevel,
  Fact,
  FactStatus,
  Person,
  StoryBeat,
  VoiceGuide,
};
export { voice, facts, boilerplate, people, storyBeats };

/**
 * The Story Bank: the single grounding surface for AI-assisted drafting (field
 * notes, donor updates, grant copy). See ./README.md and docs/concept.md →
 * "Institutional Memory — the Story Bank".
 */
export const storyBank = {
  voice,
  facts,
  boilerplate,
  people,
  storyBeats,
} as const;

/** Facts safe to state as established (excludes placeholders + unverified). */
export function verifiedFacts(): Fact[] {
  return facts.filter((f) => f.status === "verified");
}

/** Facts that still need confirmation before they can be stated as fact. */
export function unverifiedFacts(): Fact[] {
  return facts.filter((f) => f.status !== "verified");
}

/** People cleared to appear in public content (everyone here is, by rule). */
export function publicPeople(): Person[] {
  return people;
}

/** Story beats matching a theme, for grounding a draft on a given topic. */
export function beatsByTheme(theme: string): StoryBeat[] {
  return storyBeats.filter((b) => b.themes.includes(theme));
}
