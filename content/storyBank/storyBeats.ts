import type { StoryBeat } from "./types";

/**
 * Cleared narrative beats — the recurring threads of PRASM's story, summarized
 * for grounding (not as final prose). Each points to where it's told in full,
 * so a draft can stay faithful and pull real detail rather than invent it.
 */
export const storyBeats: StoryBeat[] = [
  {
    id: "origin",
    title: "It started with one sick child",
    summary:
      "On a visit, the founding doctor met a family that had crossed from Myanmar the day before; their boy was sick, and a hospital was unaffordable at foreigner rates. He covered the care and built a medical record — which, for a child with no papers, became a first proof of existence. PRASM is the idea of doing that again, properly, for many.",
    sources: ["content/about.ts", "content/home.ts"],
    themes: ["origin", "identity", "medical", "founder"],
  },
  {
    id: "ghosts",
    title: "The people the world calls ghosts",
    summary:
      "Refugees here carry no Thai ID, and many children have no document at all. On paper they barely exist — and in a world that runs on paper, that locks every door: school, healthcare, protection. Identity is the first problem to solve.",
    sources: [
      "content/fieldNotes/the-people-the-world-calls-ghosts.ts",
      "content/need.ts",
    ],
    themes: ["identity", "statelessness", "children", "education"],
  },
  {
    id: "self-reliance",
    title: "A community living lightly",
    summary:
      "The village is off-grid by necessity and by craft: solar pumps the water, gardens and animals feed families, fabric is woven by hand, and tribal solidarity holds everyone together. What's missing isn't will or dignity — it's a few things outsiders can provide: a way to be seen, to be treated when sick, and for children to learn.",
    sources: ["content/about.ts", "content/need.ts"],
    themes: ["self-reliance", "village", "dignity", "solar"],
  },
  {
    id: "records-as-proof",
    title: "Building records by hand",
    summary:
      "The founder builds a proper written medical history for each patient. These histories guide future care and, over time, become quiet proof that a person exists and has been here — the seed of the planned identity and digital-records work.",
    sources: [
      "content/fieldNotes/building-medical-records-by-hand.ts",
      "content/programs.ts",
    ],
    themes: ["medical", "identity", "records", "roadmap"],
  },
  {
    id: "honest-status",
    title: "An honest note on what we are",
    summary:
      "PRASM is an emerging, founder-led initiative still formalizing its structure. It doesn't yet offer tax-deductible receipts or audited financials, and it says so plainly. Support reaches the community directly, and PRASM will account for how any gift was used on request.",
    sources: ["content/transparency.ts", "content/legal/donationPolicy.ts"],
    themes: ["transparency", "honesty", "giving"],
  },
];
