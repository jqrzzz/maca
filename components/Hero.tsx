"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button, type ButtonProps } from "@/components/ui/Button";
import { Figure } from "@/components/Figure";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { PrasmIntro } from "@/components/intro/PrasmIntro";
import { cn } from "@/lib/cn";
import type { MediaRef } from "@/lib/images";

type HeroAction = {
  label: string;
  href: string;
  variant?: ButtonProps["variant"];
  external?: boolean;
};

/**
 * Home hero — animated ambient backdrop with overlaid copy. A big centered
 * play button (and a small one by the CTAs) opens the intro film *in place*,
 * contained within the hero box; closing returns to the hero.
 */
export function Hero({
  eyebrow,
  title,
  lede,
  image,
  actions,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  image?: MediaRef;
  actions: HeroAction[];
}) {
  const [playing, setPlaying] = useState(false);
  const play = () => setPlaying(true);

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

      {/* Big play button — top-right over the dots, with a slow orange glow */}
      {!playing && (
        <button
          type="button"
          onClick={play}
          aria-label="Play the film"
          className="prasm-hero-play group absolute top-24 right-6 z-20 md:top-28 md:right-14"
        >
          <span aria-hidden className="prasm-hero-play__glow" />
          <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-cream/60 bg-cream/15 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-cream group-hover:bg-cream/25 md:h-24 md:w-24">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="#fffdf8"
              aria-hidden
              className="ml-1"
            >
              <path d="M6 4.5 19 12 6 19.5z" />
            </svg>
          </span>
        </button>
      )}

      <Container className="flex min-h-[88vh] flex-col justify-end pt-32 pb-20 md:min-h-[90vh] md:pb-28">
        <div
          className={cn(
            "max-w-2xl transition-opacity duration-500",
            playing && "pointer-events-none opacity-0",
          )}
        >
          <p className="mb-4 text-sm font-semibold tracking-[0.12em] text-gold-400 uppercase">
            {eyebrow}
          </p>
          <h1 className="text-display text-cream">{title}</h1>
          <p className="text-lede mt-6 max-w-xl text-cream/90">{lede}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
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
            <button
              type="button"
              onClick={play}
              aria-label="Play the film"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-cream/45 bg-cream/5 text-cream transition-colors hover:border-cream hover:bg-cream/15"
            >
              <svg width="13" height="13" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                <path d="M3 2.2 10 6 3 9.8z" />
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* The film, contained within the hero box */}
      {playing && (
        <div
          className="prasm-film-boxed"
          role="dialog"
          aria-modal="true"
          aria-label="PRASM — a warm introduction"
        >
          <PrasmIntro onClose={() => setPlaying(false)} />
        </div>
      )}
    </section>
  );
}
