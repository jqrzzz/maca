/**
 * Central site identity. Every page + metadata reads from here.
 * Edit copy here — components render it, they don't contain it.
 */

/**
 * Resolve the canonical site origin (no trailing slash). Drives metadata,
 * canonical tags, sitemap, robots, and absolute OG image URLs — so link
 * previews (WhatsApp, iMessage, Slack, X…) and search engines resolve to a
 * real, reachable address.
 *
 * Priority:
 *  1. NEXT_PUBLIC_SITE_URL — set to the custom domain once it exists.
 *  2. On Vercel, the deployment URL, so previews + production work before a
 *     domain is connected (production prefers the stable project URL).
 *  3. localhost for local dev.
 *
 * Note: VERCEL_* are server-only env vars; `site.url` is read only on the
 * server (metadata, sitemap, robots, JSON-LD), never in client components.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const deploymentUrl = process.env.VERCEL_URL?.trim();
  if (process.env.VERCEL_ENV === "production" && productionUrl)
    return `https://${productionUrl}`;
  if (deploymentUrl) return `https://${deploymentUrl}`;

  return "http://localhost:3000";
}

export const site = {
  name: "PRASM Foundation",
  shortName: "PRASM",
  // TODO[user]: confirm what "PRASM" stands for + final tagline.
  tagline: "Dignity, identity, and care for the stateless.",
  // One-sentence description used for hero lede fallbacks + meta description.
  description:
    "PRASM supports Kayan refugees from Myanmar living off-grid in Mae Hong Son, Thailand. We build medical records, restore identity, and stand with a community the world overlooked.",
  // Canonical origin — see resolveSiteUrl(). Auto-uses the Vercel URL until
  // NEXT_PUBLIC_SITE_URL is set to the custom domain.
  url: resolveSiteUrl(),
  location: {
    region: "Mae Hong Son",
    country: "Thailand",
  },
  // TODO[user]: confirm founding year.
  foundedYear: 2024,
} as const;

export type Site = typeof site;
