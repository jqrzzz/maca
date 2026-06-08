import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button, type ButtonProps } from "@/components/ui/Button";
import { Figure } from "@/components/Figure";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { cn } from "@/lib/cn";
import type { MediaRef } from "@/lib/images";

type HeroAction = {
  label: string;
  href: string;
  variant?: ButtonProps["variant"];
  external?: boolean;
};

/**
 * Home hero — full-bleed image with a warm scrim and overlaid copy.
 */
export function Hero({
  eyebrow,
  title,
  lede,
  image,
  actions,
  watchHref,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  image?: MediaRef;
  actions: HeroAction[];
  watchHref?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background — animated ambient backdrop (or a photo, if provided) */}
      <div className="absolute inset-0 -z-10">
        {image ? (
          <Figure media={image} rounded="none" priority sizes="100vw" className="h-full" />
        ) : (
          <HeroBackdrop />
        )}
        {/* Warm scrim for legibility */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-forest-700/85 via-forest-700/45 to-forest-700/30"
        />
      </div>

      <Container className="flex min-h-[88vh] flex-col justify-end pt-32 pb-20 md:min-h-[90vh] md:pb-28">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold tracking-[0.12em] text-gold-400 uppercase">
            {eyebrow}
          </p>
          <h1 className="text-display text-cream">{title}</h1>
          <p className="text-lede mt-6 max-w-xl text-cream/90">{lede}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            {actions.map((action, i) => (
              <Button
                key={action.href}
                href={action.href}
                external={action.external}
                variant={action.variant ?? (i === 0 ? "primary" : "onDarkOutline")}
                size="lg"
              >
                {action.label}
              </Button>
            ))}
          </div>
          {watchHref && (
            <Link
              href={watchHref}
              className="group mt-7 inline-flex items-center gap-3 text-sm font-semibold tracking-[0.03em] text-cream/85 transition-colors hover:text-cream"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream/40 transition-colors group-hover:border-cream group-hover:bg-cream/10">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                  <path d="M3 2.2 10 6 3 9.8z" />
                </svg>
              </span>
              Watch our story
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}

/**
 * Interior page hero — compact, on cream, no background image.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  className?: string;
}) {
  return (
    <section className={cn("border-b border-line bg-sand", className)}>
      <Container className="py-16 md:py-24">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-3 text-[0.8125rem] font-semibold tracking-[0.12em] text-clay-600 uppercase">
              {eyebrow}
            </p>
          )}
          <h1 className="text-h1">{title}</h1>
          {lede && <p className="text-lede mt-5 text-stone">{lede}</p>}
        </div>
      </Container>
    </section>
  );
}
