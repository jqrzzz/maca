/**
 * The one-page program overview, kept as structured content so it can be shown,
 * printed, and translated. Written for foundation and donor conversations:
 * dignity-first, safety as a precondition rather than a feature, and honest
 * about stage. It deliberately does not claim a running service. Figures are
 * illustrative. This mirrors docs/curiosity-program.md, distilled to one page.
 */

export type OverviewItem = { label: string; detail: string };

export const programOverview = {
  title: "Curiosity Program",
  tagline:
    "A dignity-first way for children with no school nearby to learn with a safe AI guide, on a careful path toward recognition for families the system has overlooked.",
  status:
    "Stage: preparing a small, consented pilot. Not yet running. Everything here is illustrative.",

  need: {
    heading: "The need",
    body: "In the hills near the border live Kayan families who are largely undocumented and off the grid. There is no school within reach, and often no record that a child was ever born. The children are bright and full of questions, with no one to answer them.",
  },

  what: {
    heading: "What it is",
    body: "A small learning club. A child asks a safe, kind AI guide anything they wonder about, in their own language, while a trusted local steward keeps each visit safe and welcoming. When a child keeps lighting up about something, we bring a small, real thing to help them grow it.",
  },

  how: {
    heading: "How it works",
    steps: [
      "Consent first. A family freely agrees, in their language, and can stop any time.",
      "Curiosity sessions. Children explore with the guide while a grown-up is present.",
      "Notice sparks. A lasting interest is noticed openly and shared with the family.",
      "A person decides. The steward suggests a small follow-up; the founder approves before anything is bought.",
    ],
  },

  safety: {
    heading: "Dignity and safety come first",
    points: [
      "Consent belongs to the family, and a grown-up is always present.",
      "Private details are kept separate, encrypted, and never sent to a general-purpose AI model.",
      "The steward is supported as a role, never paid per child, per signup, or per photo.",
      "We measure children coming back and exploring deeply, never a sign-up count.",
      "The identity registry waits until there is a secure system worthy of it.",
    ],
  },

  whyNow: {
    heading: "Why now, and why AI",
    body: "There is no teacher out here, and there will not be one soon. A patient guide that answers in a child's language, never tires, and costs little is the difference between a question that withers and one that grows. This is AI for people who have no other alternative.",
  },

  support: {
    heading: "What support makes possible",
    items: [
      {
        label: "A device and power",
        detail: "A rugged tablet, charging, and data where there is no grid.",
      },
      {
        label: "A supported steward",
        detail:
          "A fair stipend for the local person who keeps it safe and welcoming.",
      },
      {
        label: "The spark fund",
        detail:
          "Small learning materials for a child who keeps lighting up: seeds, a sketchbook, a field guide.",
      },
      {
        label: "A secure foundation",
        detail:
          "The careful build of a private, consented path toward recognized identity.",
      },
    ] as OverviewItem[],
  },

  success: {
    heading: "What success looks like, honestly",
    points: [
      "Children who come back week after week, and parents who trust it.",
      "Sparks that turn into real learning a child carries forward.",
      "A handful of families through a safe pilot before we grow at all.",
      "In time, a consented, secure path to an identity the world will recognize.",
    ],
  },

  footer:
    "This page describes a program in preparation, shared for conversation. It collects no data and makes no claim of a running service.",
};
