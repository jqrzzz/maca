/**
 * "AI in the engine room": PRASM's public, partner-facing statement of how it
 * uses AI. Surfaces the responsible-AI posture from the internal blueprint
 * (docs/concept.md) for a public audience, including mission-aligned technology
 * partners.
 *
 * Honest by default (the site's rule): the back-office tools described as
 * "running" are really built and in use by the team; the health, education, and
 * identity applications are stated as where we are going, not where we are. The
 * people are always the face; AI is never the story.
 */

export const aiIntro = {
  eyebrow: "How we work",
  title: "AI in the engine room",
  lede: "PRASM is a tiny team doing the work of many. AI is how we do it: quietly, in the back office, so almost everything we have reaches the families. The people are always the face. AI is never the story.",
};

export const aiThesis = {
  quote:
    "Donors meet the doctor and the families, never a bot. AI is simply how two people do the work of ten, out of sight. And AI proposes; a human always decides.",
  attribution: "From our operating principles",
};

export type AiAreaIcon = "comms" | "health" | "education" | "identity";

export type AiArea = {
  icon: AiAreaIcon;
  title: string;
  body: string;
  /** "running" = built and in use in our back office; "building" = on the roadmap. */
  status: "running" | "building";
};

export const aiAreasIntro = {
  eyebrow: "Where AI helps",
  title: "Leverage, where it counts",
  lede: "We rank uses by how much they help this community and how responsibly we can run them today. Some already save us hours every week. Others are deliberately further out, because they touch people's safety.",
};

export const aiAreas: AiArea[] = [
  {
    icon: "comms",
    title: "Communications & fundraising",
    body: "A voice note and a few photos from a field visit become honest, on-voice updates, donor notes, and grant drafts. A two-person team keeps the world informed without leaving the village.",
    status: "running",
  },
  {
    icon: "health",
    title: "Health & clinical back-office",
    body: "Reference and documentation that keep our founding doctor doing medical work, not paperwork: coding, drug and reference lookups, and clean patient histories. A reference, never a clinician.",
    status: "building",
  },
  {
    icon: "education",
    title: "Education & language",
    body: "Translation and learning support across Thai, Burmese, Kayan, and English, so distance and paperwork are smaller barriers to a child reaching a classroom.",
    status: "building",
  },
  {
    icon: "identity",
    title: "Identity & records",
    body: "For people with no papers, a written history is the first proof they exist. AI helps organize case files and draft documents; people always decide. This is our most careful, most private work.",
    status: "building",
  },
];

export const aiBuiltIntro = {
  eyebrow: "Already running, today",
  title: "AI-native in the back office, at near-zero cost",
  lede: "This is not a someday promise. These tools are built and in use now, run by the founder, with a person approving every output before it leaves the building.",
};

export const aiBuilt: { title: string; body: string }[] = [
  {
    title: "Field-to-Story engine",
    body: "Raw field input becomes a publish-ready field note, donor update, and caption, grounded in our own story bank so nothing is invented.",
  },
  {
    title: "Grants copilot",
    body: "Funder-tailored application drafts that reuse the same grounded facts, so we are not writing each one from scratch.",
  },
  {
    title: "Donor stewardship",
    body: "Personal thank-you and supporter-update drafts, so recurring givers get rhythm and care, never spam.",
  },
  {
    title: "Clinical reference groundwork",
    body: "Validated ICD-10 coding reference for the doctor's records. Informational only; the clinician decides.",
  },
];

export const aiCommitmentsIntro = {
  eyebrow: "Built responsibly",
  title: "Conscious by design, not by accident",
  lede: "These are the rules every AI decision here follows. They are why this is a foundation that happens to use AI well, not an experiment run on vulnerable people.",
};

export const aiCommitments: { title: string; body: string }[] = [
  {
    title: "AI proposes, a human decides",
    body: "Every public, clinical, or personal output is reviewed and approved by a person before it goes anywhere. AI removes the typing, never the judgment.",
  },
  {
    title: "The people are the face",
    body: "We will never make AI the mascot or the fundraising hook of a cause about vulnerable people. No bot speaks for the families.",
  },
  {
    title: "Sensitive data is sacred",
    body: "Beneficiary identities, medical details, and photos of identifiable people are never fed to a general-purpose model. They stay in a controlled, consented, access-logged setting.",
  },
  {
    title: "Honest by default",
    body: "AI never invents facts, numbers, names, quotes, or impact. If a claim is not grounded in something real, it does not ship.",
  },
  {
    title: "Consent and dignity first",
    body: "Ahead of storytelling and ahead of fundraising. Consent for any story or photo is explicit and revocable, and when we are unsure, we hold.",
  },
  {
    title: "Built for the real world",
    body: "Low-connectivity first and low-cost first. We capture offline and process later, and we never build infrastructure ahead of need.",
  },
];

export const aiPartners = {
  eyebrow: "For technology partners",
  title: "Build dignified AI with us",
  lede: "We are looking for mission-aligned technology partners who want to see responsible AI make a measurable difference in education, health, and identity for people the system overlooks.",
  offer: {
    title: "What we offer",
    items: [
      "A real, high-integrity deployment in a hard setting: refugees, off-grid, multilingual, with health, education, and identity needs.",
      "A responsible-AI framework already in practice: human-in-the-loop, tiered data handling, and clear, published red lines.",
      "A people-first cause with the dignity and discretion serious partners expect, never a stunt.",
      "An openness to share what works, so the model can be followed by others.",
    ],
  },
  seek: {
    title: "What we are looking for",
    items: [
      "Model access and compute to run the engine room as we grow.",
      "Privacy-preserving or on-device options for the most sensitive work.",
      "Technical collaboration and mentorship for a very small team.",
      "Funding to move from authoring tools to a secure records platform.",
    ],
  },
  cta: { label: "Start a conversation", href: "/contact" },
};
