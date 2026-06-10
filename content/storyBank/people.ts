import type { Person } from "./types";

/**
 * Consent-cleared PUBLIC personas only.
 *
 * This is NOT the sensitive identity registry. Real beneficiary identities are
 * Tier-2 data and never live in this repo (docs/concept.md → "Data and privacy
 * model"). Add a person here only once their consent level is confirmed, and
 * never refer to them beyond that level. When in doubt, leave them out.
 */
export const people: Person[] = [
  {
    id: "founder",
    publicReference: "PRASM's founding doctor",
    role: "Founder; the medical doctor who began the work and builds patients' written records.",
    consent: "role-only",
    imageOK: false,
    notes:
      "Refer to by role, not name, until the founder confirms public attribution (see content/home.ts founderNote and content/about.ts, both flagged TODO). The substance is real. Do not embellish it.",
  },
];
