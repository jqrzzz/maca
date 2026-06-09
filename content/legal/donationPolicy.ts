/**
 * Donation & Refund Policy copy. Honest about tax status and refunds. This is
 * also the policy that card/PayPal processors expect to see before onboarding.
 * REVIEW with the founder before launch; bump `lastUpdated` on changes.
 */

export const donationPolicy = {
  lastUpdated: "June 2026",
  intro:
    "This explains what your gift supports, our current tax status, and how refunds work — plainly. We'd rather be upfront than imply more than we are.",
  sections: [
    {
      title: "What your gift supports",
      body: [
        "Donations go directly to the Kayan community PRASM supports: medical care and transport, food and essentials, education, and the solar and water infrastructure that keeps the village self-reliant. See our Transparency page for a fuller picture of where support goes.",
      ],
    },
    {
      title: "Voluntary gifts, not purchases",
      body: [
        "Donations are voluntary contributions. You don't receive goods or services in return, and a gift doesn't entitle you to direct a specific outcome. If you'd like your gift pointed toward a particular need — say, medical care — let us know and we'll do our best to honor it.",
      ],
    },
    {
      title: "Tax status",
      body: [
        "PRASM is still formalizing its legal structure, so we cannot currently issue tax-deductible receipts. We will update this policy if and when that changes. Please don't claim a deduction for a gift to PRASM unless we've confirmed eligibility.",
      ],
    },
    {
      title: "Refunds",
      body: [
        "Because we're a small, founder-led effort, gifts are generally non-refundable once funds have reached the community. That said, mistakes happen. If you donated in error, were charged twice, or believe a transaction was unauthorized, contact us within 30 days and we'll work with you and the payment provider to make it right.",
      ],
    },
    {
      title: "Recurring gifts",
      body: [
        "If you set up a monthly or recurring gift, you can change or cancel it any time — through your Patreon, PayPal, or card-provider account, or by contacting us and we'll help. Cancelling stops future charges; it doesn't refund past gifts.",
      ],
    },
    {
      title: "Crypto & in-kind gifts",
      body: [
        "Cryptocurrency transfers are irreversible — always double-check the wallet address before sending. For in-kind donations (medicine, solar gear, tools, and the like), please message us first so we can coordinate what's genuinely needed and how to get it to a remote, off-grid village.",
      ],
    },
    {
      title: "Security",
      body: [
        "Card and PayPal gifts are processed on the providers' own secure systems. PRASM never sees or stores your card details.",
      ],
    },
    {
      title: "Accounting & questions",
      body: [
        "We don't yet publish audited financials, but we believe in accounting for what we receive. If you'd like to know how a specific gift was used, just ask — we're glad to tell you. Questions about this policy? Please contact us.",
      ],
    },
  ],
};
