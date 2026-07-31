/**
 * Transparency & governance copy. Deliberately written to be HONEST about
 * current status — do NOT claim charity registration, tax-deductibility, or
 * audited financials unless verified. The status statement is a placeholder
 * for the founder to confirm/replace before launch.
 */

export const transparencyIntro = {
  eyebrow: "Transparency",
  title: "How we operate",
  lede: "Trust is everything when you're asking people to give. Here's how PRASM works today: plainly, without overstating what we are.",
};

export const howWeOperate: { title: string; body: string }[] = [
  {
    title: "Founder-led and direct",
    body: "PRASM is a small, founder-led effort. Support reaches the community directly rather than passing through layers of overhead.",
  },
  {
    title: "On the ground",
    body: "Decisions are made with the village, not for it. The founder visits in person and coordinates needs directly with families.",
  },
  {
    title: "In-kind first where it helps",
    body: "Sometimes the best help is medicine, solar gear, or tools rather than cash. We coordinate what's genuinely useful and handle logistics.",
  },
];

export const whereSupportGoes: { label: string; body: string }[] = [
  {
    label: "Medical care & transport",
    body: "Hospital bills and the journeys to reach care.",
  },
  {
    label: "Food & essentials",
    body: "Staples and supplies during lean, dry seasons.",
  },
  {
    label: "Education",
    body: "Learning materials and support for children.",
  },
  {
    label: "Infrastructure",
    body: "Solar, water, and tools that build self-reliance.",
  },
];

export const leadership = {
  title: "Leadership & governance",
  body: [
    "PRASM is led by its founder, Dr. Kwon Yonghyun (권용현), MD — a Korean physician whose visits to the village began this work, and who now lives and practises in Thailand. He is supported by a small circle of volunteers and the families themselves.",
    "He chairs the Korea Cannabinoid Association and has chaired the Korea Aromatherapy Association since 2014; his own practice, MahKha, funds part of what happens here. His full record, including a plain note on which parts of it are not yet independently verifiable, is published at mahkha.com.",
    "There is no board yet, and no advisors — one person and volunteers is the whole of it. As we formalize we intend to add named leadership, advisors, and basic governance, and to publish them here. We'd rather introduce real, accountable people than hide behind a logo. If you'd like to know who you're talking to, just ask.",
  ],
};
/*
 * The founder is now named, which closes the older note here.
 *
 * Three things were deliberate. He is named because this section's own promise is to
 * introduce real, accountable people rather than hide behind a logo, and an anonymous
 * "a doctor" on a page headed Leadership & governance does not keep that promise.
 *
 * The absence of a board is now stated outright rather than implied by its omission —
 * a donor reading a governance page should not have to infer that there is nobody else.
 *
 * And no medical registration number appears, because there is not one to publish
 * yet. His own site says the same thing about the same credential; overstating it here,
 * on the page whose subject is accountability, would be the worst possible place.
 *
 * TODO[user]: add advisors/board when they exist, and the registration number when it
 * is available.
 */

export const howWeReport = {
  title: "How we report",
  body: [
    "We don't yet publish audited financials, and we won't pretend otherwise. What we can offer now is openness: ongoing field notes from the village, a plain account of where support goes, and a direct answer whenever you ask how a specific gift was used.",
    "As the work grows, we plan to share regular updates and a simple yearly summary of what your support made possible.",
  ],
};

// TODO[user]: confirm and replace with PRASM's true legal status.
export const statusStatement = {
  title: "An honest note on our status",
  body: [
    "PRASM is an emerging, community-focused initiative. We are still formalizing our legal and organizational structure.",
    "That means we cannot currently promise tax-deductible receipts, and we don't publish audited financials yet. We'd rather tell you that plainly than imply otherwise. As our structure formalizes, this page will be updated.",
    "If you'd like documentation of how a specific gift was used, just ask. We're happy to account for it.",
  ],
};

/**
 * Registration & status facts, shown as a plain table on the Transparency page.
 * Honest placeholders today — fill these in as the Thai foundation registration
 * completes. TODO[user]: replace "value" fields below with real details.
 */
export const registrationDetails: { label: string; value: string }[] = [
  {
    label: "Legal status",
    value: "Emerging initiative (registration in progress)",
  },
  { label: "Operating in", value: "Mae Hong Son, Thailand" },
  { label: "Registered name", value: "To be confirmed" },
  { label: "Registration number", value: "Pending" },
  { label: "Registered office", value: "To be confirmed" },
  { label: "Tax-deductible receipts", value: "Not available yet" },
  { label: "Governing board", value: "Founder-led; advisors to be named" },
];
