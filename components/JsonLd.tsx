/**
 * Emits a JSON-LD <script> for structured data. Server component.
 * Pass any serializable object (see lib/seo.ts builders).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe; this is our own controlled data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
