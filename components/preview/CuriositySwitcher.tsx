"use client";

import { Sparkles, Compass, LayoutDashboard } from "lucide-react";

/** The three perspectives on the Curiosity Program demo. */
export type Perspective = "learner" | "steward" | "founder";

const items: { id: Perspective; label: string; icon: React.ElementType }[] = [
  { id: "learner", label: "Learner", icon: Sparkles },
  { id: "steward", label: "Steward", icon: Compass },
  { id: "founder", label: "Founder", icon: LayoutDashboard },
];

/**
 * A compact perspective switcher so a walkthrough can hop between the learner,
 * steward, and founder views without signing out and back in.
 */
export function CuriositySwitcher({
  current,
  onSwitch,
}: {
  current: Perspective;
  onSwitch: (p: Perspective) => void;
}) {
  return (
    <div className="mb-5 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
      <span className="text-xs font-medium tracking-wide text-stone uppercase">
        Curiosity Program · previewing as
      </span>
      <div
        role="group"
        aria-label="Switch perspective"
        className="inline-flex rounded-full border border-line bg-cream p-1 shadow-soft"
      >
        {items.map((it) => {
          const Icon = it.icon;
          const active = it.id === current;
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => !active && onSwitch(it.id)}
              aria-current={active ? "true" : undefined}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-clay-600 text-cream"
                  : "text-forest-700 hover:bg-sand"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {it.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
