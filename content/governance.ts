/**
 * Governance & policies hub content. Honest account of how PRASM is run today
 * (founder-led, building toward a board) plus the index of our policy suite.
 * REVIEW with the founder; update `howGoverned` as the board forms.
 */

export const governanceIntro = {
  eyebrow: "Governance & policies",
  title: "How we're run, and the rules we hold ourselves to",
  lede: "PRASM is an emerging, founder-led initiative. We're putting clear governance and policies in place from the start, not after, and we'd rather state plainly where we are than imply more.",
};

export const howGoverned: { title: string; body: string }[] = [
  {
    title: "Founder-led today",
    body: "Decisions currently rest with our founder, a medical doctor, working closely with the community and a small circle of volunteers.",
  },
  {
    title: "Building toward a board",
    body: "We're working to form an independent governing board to oversee strategy, finances, and safeguarding. This page will name it as it forms.",
  },
  {
    title: "Accountable by openness",
    body: "Until we have formal audits, we offer openness instead: a plain account of where support goes, field notes from the village, and a direct answer whenever you ask.",
  },
];

export const policySuite: { title: string; href: string; blurb: string }[] = [
  {
    title: "Safeguarding & child protection",
    href: "/safeguarding",
    blurb: "How we protect the children and vulnerable people we work with.",
  },
  {
    title: "Code of conduct",
    href: "/code-of-conduct",
    blurb: "How everyone acting for PRASM is expected to behave.",
  },
  {
    title: "Complaints & feedback",
    href: "/complaints",
    blurb: "How the community, supporters, and partners can raise a concern.",
  },
  {
    title: "Protecting your gift",
    href: "/funds-protection",
    blurb: "How we safeguard funds and guard against fraud or diversion.",
  },
  {
    title: "Conflict of interest",
    href: "/conflict-of-interest",
    blurb: "How we keep decisions clean and free of personal gain.",
  },
  {
    title: "Privacy & data (PDPA)",
    href: "/privacy",
    blurb: "What little data we hold, and your rights under Thailand's PDPA.",
  },
  {
    title: "Donation & refund policy",
    href: "/donation-policy",
    blurb: "How giving works, and how to reach us about a gift.",
  },
  {
    title: "Terms of use",
    href: "/terms",
    blurb: "The basics of using this website.",
  },
  {
    title: "Accessibility",
    href: "/accessibility",
    blurb: "Our commitment to an accessible site, and how to flag barriers.",
  },
];
