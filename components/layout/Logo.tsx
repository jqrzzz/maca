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
 * MACA wordmark — a simple, original SVG mark (a sheltering arc over a seed/dot,
 * evoking protection + new growth) paired with the name in Fraunces.
 * variant="light" = for dark backgrounds; "dark" = for light backgrounds.
 */
export function Logo({
  variant = "dark",
  className,
  asLink = true,
}: LogoProps) {
  const markColor = variant === "light" ? "var(--color-cream)" : "var(--color-clay-600)";
  const seedColor = variant === "light" ? "var(--color-gold-400)" : "var(--color-gold-400)";
  const textColor = variant === "light" ? "text-cream" : "text-forest-700";

  const inner = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9"
        role="img"
        aria-label={`${site.shortName} logo`}
      >
        {/* sheltering arc */}
        <path
          d="M6 26 A14 14 0 0 1 34 26"
          fill="none"
          stroke={markColor}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        {/* hands / base */}
        <path
          d="M9 30 Q20 36 31 30"
          fill="none"
          stroke={markColor}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        {/* seed of growth */}
        <circle cx="20" cy="24" r="3.4" fill={seedColor} />
      </svg>
      <span
        className={cn(
          "font-display text-xl leading-none font-semibold tracking-tight",
          textColor,
        )}
      >
        {site.shortName}
      </span>
    </span>
  );

  if (!asLink) return inner;

  return (
    <Link href="/" aria-label={`${site.name} — home`} className="inline-flex">
      {inner}
    </Link>
  );
}
