import type { Metadata } from "next";
import { site } from "@/content/site";

const baseUrl = site.url;

/**
 * Build per-page metadata with sensible MACA defaults + OpenGraph/Twitter.
 * The root layout sets the title template ("%s · MACA Foundation").
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

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: title ? `${title} · ${site.name}` : site.name,
      description: desc,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} · ${site.name}` : site.name,
      description: desc,
    },
  };
}
