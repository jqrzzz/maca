/**
 * FAQs for the giving page. Honest about status (no tax-deductibility claims).
 */

export type Faq = { q: string; a: string };

export const giveFaqs: Faq[] = [
  {
    q: "Where does my donation go?",
    a: "Directly to the community: medical care and transport, food and essentials, education, and the solar/water infrastructure that keeps the village self-reliant. See our Transparency page for more.",
  },
  {
    q: "Are donations tax-deductible?",
    a: "Not at this time. PRASM is still formalizing its legal structure, so we can't promise tax-deductible receipts yet. We'd rather be upfront than imply otherwise.",
  },
  {
    q: "Is giving by card secure?",
    a: "Yes. Card and PayPal gifts are processed by those providers on their own secure systems. We never see or store your card details.",
  },
  {
    q: "Can I donate things instead of money?",
    a: "Absolutely. Medicine, clothing, tools, solar gear, and more are all useful. Because the village is remote, please message us first so we can coordinate what's needed and how to get it there.",
  },
  {
    q: "Can I give anonymously?",
    a: "Yes. Crypto and several of our methods don't require you to share personal details with us. Give in whatever way feels right.",
  },
];

/** General FAQs about PRASM, the community, and how to help. */
export const generalFaqs: Faq[] = [
  {
    q: "What is PRASM?",
    a: "PRASM is a small, founder-led initiative supporting Kayan refugees who fled war in Myanmar and now live without papers in the hills of Mae Hong Son, Thailand. We help them stay well, prove who they are, and build a future on their own terms.",
  },
  {
    q: "Who are the Kayan?",
    a: "The Kayan are a people from Kayah State in Myanmar. “Karenni” is an English translation sometimes used for the same community. The name they use for themselves is Kayan. Many fled the conflict in Myanmar and now live as refugees along the Thai border.",
  },
  {
    q: "Is PRASM a registered charity?",
    a: "Not yet. PRASM is an emerging, community-focused initiative still formalizing its legal structure. We say so plainly on our Transparency page, and we don't claim charity registration, tax-deductibility, or audited financials until they're real.",
  },
  {
    q: "Are donations tax-deductible?",
    a: "Not at this time. See our Donation & Refund Policy. We'd rather be upfront than imply otherwise, and we'll update it if that changes.",
  },
  {
    q: "How do I know my gift is used well?",
    a: "We keep it open: support reaches the community directly, we publish field notes from the village, and we'll account for how any specific gift was used if you ask. See our Transparency page for more.",
  },
  {
    q: "How can I help besides giving money?",
    a: "Plenty of ways: teach or volunteer your skills, donate supplies in kind (medicine, solar gear, tools), or simply share PRASM with people who care. See Get Involved.",
  },
  {
    q: "Can I visit or volunteer in the village?",
    a: "Possibly, but the community is remote and off-grid, and we're careful about safety and dignity. Please contact us first so we can talk about what would genuinely help.",
  },
  {
    q: "Why don't you share the village's exact location?",
    a: "For the community's safety. Many residents are undocumented and vulnerable, so we never publish the precise location, and we ask supporters not to either.",
  },
];
