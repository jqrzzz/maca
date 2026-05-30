import { Figure } from "@/components/Figure";
import { images, type ImageKey } from "@/lib/images";

/**
 * Responsive grid of photo slots. Each entry renders a <Figure> (placeholder
 * or real). Descriptive alts double as the visible placeholder labels.
 */
export function PhotoStrip({ keys }: { keys: ImageKey[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5">
      {keys.map((key) => (
        <Figure
          key={key}
          media={{ ...images[key], ratio: "1/1" }}
          rounded="lg"
          sizes="(min-width: 768px) 33vw, 50vw"
        />
      ))}
    </div>
  );
}
