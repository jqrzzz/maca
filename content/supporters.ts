/**
 * "Our supporters" — public donor recognition.
 *
 * REVIEW BEFORE LAUNCH: the profiles below are illustrative samples so the page
 * is ready to fill. Replace them with real, consented supporters. Publishing a
 * person's name needs their permission; use initials or "Anonymous" when they
 * prefer privacy, and never list an amount someone hasn't agreed to share.
 * Recognition is by tier, not by dollar figure.
 */

export const supportersIntro = {
  eyebrow: "Our supporters",
  title: "The people making this possible",
  lede: "PRASM runs on the generosity of a small circle of supporters. With gratitude, we honor the ones whose giving makes the biggest difference for the community.",
};

export type Supporter = {
  name: string;
  blurb: string;
  since?: string;
  location?: string;
};

export type SupporterTier = {
  key: string;
  title: string;
  subtitle: string;
  supporters: Supporter[];
};

export const supporterTiers: SupporterTier[] = [
  {
    key: "founding",
    title: "Founding Circle",
    subtitle: "Lead supporters whose early belief built the foundation.",
    supporters: [
      {
        name: "The Park Family",
        blurb: "Backed the first year of medical care and the solar that powers the village pump.",
        since: "2024",
        location: "Seoul",
      },
      {
        name: "Anonymous",
        blurb: "A founding patron who prefers to stay unnamed, funding urgent treatment when it is needed most.",
        since: "2024",
      },
    ],
  },
  {
    key: "patrons",
    title: "Patrons",
    subtitle: "Major gifts that fund care, education, and the systems that keep the village self-reliant.",
    supporters: [
      { name: "M. Tanaka", blurb: "Sponsors learning materials and a volunteer teacher.", since: "2025", location: "Tokyo" },
      { name: "Hana Community Fund", blurb: "Annual gift toward water and food resilience.", since: "2025" },
      { name: "J. & R. Mendoza", blurb: "Cover transport for patients reaching the hospital.", since: "2026", location: "California" },
    ],
  },
  {
    key: "sustainers",
    title: "Monthly sustainers",
    subtitle: "Our Patreon community, keeping support steady month after month.",
    supporters: [
      { name: "A. Lee", blurb: "Monthly supporter since the start." },
      { name: "S. Wright", blurb: "Monthly supporter." },
      { name: "K. Nilsson", blurb: "Monthly supporter." },
      { name: "Anonymous", blurb: "Monthly supporter." },
      { name: "D. Okafor", blurb: "Monthly supporter." },
    ],
  },
];

export const supportersOutro = {
  title: "Join them",
  body: "Every gift, one-time or monthly, keeps a family well, a child in school, and the village standing on its own. Prefer to stay anonymous, or want your name listed? Just let us know.",
};
