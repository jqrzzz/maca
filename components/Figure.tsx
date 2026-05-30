import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import type { MediaRef } from "@/lib/images";

type FigureProps = {
  media: MediaRef;
  className?: string;
  /** Pass true on the LCP hero image only. */
  priority?: boolean;
  /** Responsive sizes hint for next/image. */
  sizes?: string;
  /** Rounded corners (default lg). */
  rounded?: "md" | "lg" | "xl" | "none";
  caption?: string;
};

const roundedMap = {
  none: "",
  md: "rounded-[14px]",
  lg: "rounded-[20px]",
  xl: "rounded-[28px]",
};

/**
 * The core image swap point. Renders an optimized next/image once a real
 * file is in place; until then (media.placeholder === true) it shows a
 * branded gradient slot with the intended-photo description visible.
 */
export function Figure({
  media,
  className,
  priority,
  sizes = "100vw",
  rounded = "lg",
  caption,
}: FigureProps) {
  const ratio = media.ratio ?? "16/10";

  const frame = cn(
    "relative w-full overflow-hidden bg-sand",
    roundedMap[rounded],
    className,
  );

  if (media.placeholder) {
    return (
      <figure className={frame} style={{ aspectRatio: ratio }}>
        {/* Decorative warm gradient stands in for the photo */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-clay-100 via-sand to-forest-500/15"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
          <ImageIcon
            aria-hidden
            className="h-6 w-6 text-clay-300"
            strokeWidth={1.5}
          />
          <p className="max-w-xs text-sm leading-snug text-stone">
            {media.alt}
          </p>
          <span className="text-[0.6875rem] font-semibold tracking-[0.1em] text-clay-300 uppercase">
            Photo placeholder
          </span>
        </div>
      </figure>
    );
  }

  return (
    <figure className={frame} style={{ aspectRatio: ratio }}>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      {caption && (
        <figcaption className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-forest-700/70 to-transparent p-4 text-sm text-cream">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
