/**
 * Central site identity. Every page + metadata reads from here.
 * Edit copy here — components render it, they don't contain it.
 */

export const site = {
  name: "PRASM Foundation",
  shortName: "PRASM",
  // TODO[user]: confirm what "PRASM" stands for + final tagline.
  tagline: "Dignity, identity, and care for the stateless.",
  // One-sentence description used for hero lede fallbacks + meta description.
  description:
    "PRASM supports Karenni and Kayan refugees from Myanmar living off-grid in Mae Hong Son, Thailand — building medical records, restoring identity, and standing with a community the world overlooked.",
  // Canonical URL — set NEXT_PUBLIC_SITE_URL in the environment before launch.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://prasm.example.org",
  location: {
    region: "Mae Hong Son",
    country: "Thailand",
  },
  // TODO[user]: confirm founding year.
  foundedYear: 2024,
} as const;

export type Site = typeof site;
