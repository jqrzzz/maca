import { site } from "@/content/site";
import { socialList } from "@/content/social";

/**
 * JSON-LD structured data describing PRASM as an NGO.
 * NOTE: keep claims honest — do not add registration/charity identifiers
 * (taxID, nonprofitStatus) unless they are verified. See plan §12.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: site.name,
    alternateName: site.shortName,
    description: site.description,
    url: site.url,
    foundingDate: String(site.foundedYear),
    areaServed: {
      "@type": "Place",
      name: `${site.location.region}, ${site.location.country}`,
    },
    sameAs: socialList
      .filter((c) => c.key !== "email" && c.href)
      .map((c) => c.href),
  };
}
