"use client";

import { useState } from "react";
import { Lightbulb, X } from "lucide-react";

/**
 * A small, dismissable orientation tip shown at the top of a Curiosity Program
 * view, so a first-time viewer understands what they are looking at and what to
 * try. Session-only (not persisted): a fresh load shows the tips again, which is
 * what you want for a walkthrough you run more than once.
 */
export function GuideTip({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="mb-5 flex items-start gap-3 rounded-[16px] border border-gold-400/40 bg-gold-400/10 p-4">
      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream text-clay-600">
        <Lightbulb className="h-4 w-4" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-forest-700">{title}</p>
        <p className="mt-0.5 text-sm leading-relaxed text-stone">{children}</p>
      </div>
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Dismiss tip"
        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-stone transition-colors hover:bg-cream hover:text-clay-700"
      >
        <X className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
