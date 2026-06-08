/**
 * FAQs for the giving page. Honest about status (no tax-deductibility claims).
 */

export type Faq = { q: string; a: string };

export const giveFaqs: Faq[] = [
  {
    q: "Where does my donation go?",
    a: "Directly to the community — medical care and transport, food and essentials, education, and the solar/water infrastructure that keeps the village self-reliant. See our Transparency page for more.",
  },
  {
    q: "Are donations tax-deductible?",
    a: "Not at this time. PRASM is still formalizing its legal structure, so we can't promise tax-deductible receipts yet. We'd rather be upfront than imply otherwise.",
  },
  {
    q: "Is giving by card secure?",
    a: "Yes. Card and PayPal gifts are processed by those providers on their own secure systems — we never see or store your card details.",
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
