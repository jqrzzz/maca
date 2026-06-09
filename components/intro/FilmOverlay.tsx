"use client";

import { useEffect } from "react";
import { PrasmIntro } from "./PrasmIntro";

/**
 * Fixed, dismissible container for the intro film. Plays the film in place over
 * the current page (no navigation), locks page scroll while open, and fades in.
 * The close control + Esc-to-close live in the engine's Stage (via onClose).
 */
export function FilmOverlay({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className="prasm-film-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="PRASM — a warm introduction"
    >
      <PrasmIntro onClose={onClose} />
    </div>
  );
}
