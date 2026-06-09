import type { Metadata } from "next";
import { site } from "@/content/site";

const baseUrl = site.url;

/**
 * Build per-page metadata with sensible PRASM defaults + OpenGraph/Twitter.
 * The root layout sets the title template ("%s · PRASM Foundation").
 */
export function buildMetadata({
  title,
  description,
  path = "/",
}: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const desc = description ?? site.description;
  const url = new URL(path, baseUrl).toString();
  const ogImage = {
    url: "/og.png",
    width: 1200,
    height: 630,
    type: "image/png",
    alt: `${site.name} — ${site.tagline}`,
  };

  return {
    title,
    description: desc,
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": new URL("/feed.xml", baseUrl).toString(),
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: title ? `${title} · ${site.name}` : site.name,
      description: desc,
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} · ${site.name}` : site.name,
      description: desc,
      images: ["/og.png"],
    },
  };
}
