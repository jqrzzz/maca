"use client";

import { useState } from "react";
import { FilmOverlay } from "@/components/intro/FilmOverlay";

/**
 * Hero "play" control — opens the intro film in place (a dismissible overlay),
 * rather than navigating away. Kept simple: a play disc + short label.
 */
export function HeroWatch() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group mt-7 inline-flex items-center gap-3 text-sm font-semibold tracking-[0.03em] text-cream/85 transition-colors hover:text-cream"
        aria-label="Play the film"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 bg-cream/5 transition-colors group-hover:border-cream group-hover:bg-cream/15">
          <svg width="13" height="13" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
            <path d="M3 2.2 10 6 3 9.8z" />
          </svg>
        </span>
        Watch the film
      </button>
      {open && <FilmOverlay onClose={() => setOpen(false)} />}
    </>
  );
}
