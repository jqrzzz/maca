import { Quote as QuoteIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Pull quote / founder quote. Fraunces, gold accent.
 */
export function Quote({
  children,
  attribution,
  role,
  onDark = false,
  className,
}: {
  children: React.ReactNode;
  attribution?: string;
  role?: string;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <figure className={cn("relative", className)}>
      <QuoteIcon
        aria-hidden
        className="mb-4 h-8 w-8 text-gold-400"
        strokeWidth={1.5}
      />
      <blockquote
        className={cn(
          "font-display text-2xl leading-snug md:text-3xl",
          onDark ? "text-cream" : "text-forest-700",
        )}
      >
        {children}
      </blockquote>
      {attribution && (
        <figcaption
          className={cn(
            "mt-5 text-sm",
            onDark ? "text-cream/75" : "text-stone",
          )}
        >
          <span className="font-semibold">{attribution}</span>
          {role && <span> · {role}</span>}
        </figcaption>
      )}
    </figure>
  );
}
