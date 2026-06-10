import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
  /** Render without a link wrapper (e.g. inside the footer heading). */
  asLink?: boolean;
};

/**
 * PRASM wordmark — an original tetrahedron mark (a four-faced prism, evoking
 * structure, clarity, and refracted light) paired with the name in Fraunces.
 * The mark is a fixed three-tone Thai-tea-orange brandmark so it reads
 * consistently on any background; only the wordmark flips.
 * variant="light" = for dark backgrounds; "dark" = for light backgrounds.
 */
export function Logo({
  variant = "dark",
  className,
  asLink = true,
}: LogoProps) {
  const textColor = variant === "light" ? "text-cream" : "text-forest-700";

  // Tetrahedron facets — a warm Thai-tea-orange gradient that gives the mark
  // its 3D read. Fixed colors keep the brandmark constant across light + dark.
  const lit = "#f2a85a"; // upper-left face, catching the light
  const mid = "#e78b2e"; // right face — signature Thai tea orange
  const shade = "#c46a1c"; // lower face, in shadow

  const inner = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9"
        role="img"
        aria-label={`${site.shortName} logo`}
      >
        {/* full silhouette (also reads as the right face) */}
        <polygon points="20,6 6,34 34,34" fill={mid} />
        {/* upper-left face */}
        <polygon points="20,6 6,34 20,24.67" fill={lit} />
        {/* lower face */}
        <polygon points="6,34 34,34 20,24.67" fill={shade} />
        {/* interior edges to the back vertex, for a crisp faceted read */}
        <g
          stroke={shade}
          strokeWidth="0.6"
          strokeLinejoin="round"
          opacity="0.5"
        >
          <line x1="20" y1="6" x2="20" y2="24.67" />
          <line x1="6" y1="34" x2="20" y2="24.67" />
          <line x1="34" y1="34" x2="20" y2="24.67" />
        </g>
      </svg>
      <span
        className={cn(
          "font-logo text-xl leading-none font-semibold tracking-[0.02em]",
          textColor,
        )}
      >
        {site.shortName}
      </span>
    </span>
  );

  if (!asLink) return inner;

  return (
    <Link href="/" aria-label={`${site.name} home`} className="inline-flex">
      {inner}
    </Link>
  );
}
