import { site } from "@/content/site";
import { getAllFieldNotes } from "@/content/fieldNotes";

/**
 * RSS 2.0 feed of field notes, served at /feed.xml. Prerendered at build
 * (force-static) since it reads only in-memory content — no runtime data. Lets
 * supporters follow the journey in any reader. Route Handler per Next's App
 * Router conventions (node_modules/next/dist/docs → Route Handlers).
 */
export const dynamic = "force-static";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET(): Response {
  const base = site.url.replace(/\/$/, "");
  const notes = getAllFieldNotes();
  const lastBuild = (
    notes.length ? new Date(notes[0].date) : new Date()
  ).toUTCString();

  const items = notes
    .map((n) => {
      const url = `${base}/field-notes/${n.slug}`;
      return `    <item>
      <title>${esc(n.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(n.date).toUTCString()}</pubDate>
      <description>${esc(n.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} — Field notes</title>
    <link>${base}/field-notes</link>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${esc(site.description)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
