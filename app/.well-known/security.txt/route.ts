import { site } from "@/content/site";

/**
 * RFC 9116 security.txt at /.well-known/security.txt. Prerendered (force-static)
 * and built from the canonical site URL, so the contact resolves to wherever
 * PRASM is deployed. Bump `Expires` on review (it must be a future date).
 */
export const dynamic = "force-static";

export function GET(): Response {
  const base = site.url.replace(/\/$/, "");
  const body = [
    `Contact: ${base}/contact`,
    "Expires: 2027-06-09T00:00:00.000Z",
    "Preferred-Languages: en",
    `Canonical: ${base}/.well-known/security.txt`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
