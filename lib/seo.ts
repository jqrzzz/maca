import { site } from "@/content/site";
import { socialList } from "@/content/social";
import type { Faq } from "@/content/faqs";

/**
 * Structured data (schema.org JSON-LD) describing PRASM. Rendered once in the
 * root layout. A linked @graph (Organization + WebSite) is what search engines
 * and rich-result tools read to surface the name, logo, and social profiles.
 *
 * NOTE: keep claims honest — do not add registration/charity identifiers
 * (taxID, nonprofitStatus) unless they are verified.
 */
const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

export function organizationJsonLd() {
  return {
    "@type": "NGO",
    "@id": ORG_ID,
    name: site.name,
    alternateName: site.shortName,
    description: site.description,
    url: site.url,
    logo: `${site.url}/logo.png`,
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

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

/** Combined, linked graph for the root layout. */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd(), websiteJsonLd()],
  };
}

/** FAQPage schema so questions can surface as Google rich results. */
export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
