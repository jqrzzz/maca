import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getAllFieldNotes } from "@/content/fieldNotes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");

  const staticRoutes = [
    "",
    "/about",
    "/the-need",
    "/programs",
    "/field-notes",
    "/give",
    "/get-involved",
    "/faq",
    "/transparency",
    "/contact",
    "/privacy",
    "/terms",
    "/donation-policy",
    "/accessibility",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path === "/give" ? 0.9 : 0.7,
  }));

  const noteRoutes = getAllFieldNotes().map((note) => ({
    url: `${base}/field-notes/${note.slug}`,
    lastModified: new Date(note.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...noteRoutes];
}
