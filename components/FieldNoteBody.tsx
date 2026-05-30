import { Quote } from "@/components/Quote";
import type { FieldNoteBlock } from "@/content/fieldNotes";

/** Renders the dependency-free typed content blocks of a field note. */
export function FieldNoteBody({ blocks }: { blocks: FieldNoteBlock[] }) {
  return (
    <div className="max-w-[65ch] text-[1.0625rem] leading-[1.75] text-ink">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="mb-6">
                {block.text}
              </p>
            );
          case "h":
            return (
              <h2 key={i} className="text-h3 mt-10 mb-3 text-forest-700">
                {block.text}
              </h2>
            );
          case "quote":
            return (
              <div key={i} className="my-9">
                <Quote attribution={block.cite}>{block.text}</Quote>
              </div>
            );
          case "list":
            return (
              <ul key={i} className="mb-6 list-disc space-y-2 pl-6 marker:text-clay-300">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
