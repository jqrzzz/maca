/**
 * Navigation structure for header + footer. Single source so links stay in sync.
 */

export type NavLink = {
  label: string;
  href: string;
};

/** Primary header navigation (the Donate CTA is rendered separately). */
export const primaryNav: NavLink[] = [
  { label: "Our Story", href: "/about" },
  { label: "The Need", href: "/the-need" },
  { label: "What We Do", href: "/programs" },
  { label: "Field Notes", href: "/field-notes" },
  { label: "Get Involved", href: "/get-involved" },
];

/** Site-wide primary call to action — always routes to the giving hub. */
export const donateCta: NavLink = { label: "Donate", href: "/give" };

/** Footer link columns. */
export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "The Need", href: "/the-need" },
      { label: "Transparency", href: "/transparency" },
      { label: "Press Kit", href: "/press" },
    ],
  },
  {
    title: "Our Work",
    links: [
      { label: "What We Do", href: "/programs" },
      { label: "Field Notes", href: "/field-notes" },
      { label: "Get Involved", href: "/get-involved" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Ways to Give", href: "/give" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/** Legal / policy links — rendered in the footer's bottom bar. */
export const legalNav: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Safeguarding", href: "/safeguarding" },
  { label: "Governance", href: "/governance" },
  { label: "Terms", href: "/terms" },
  { label: "Donation Policy", href: "/donation-policy" },
  { label: "Accessibility", href: "/accessibility" },
];
