"use client";

import { useEffect, useState } from "react";
import {
  UserCog,
  HardHat,
  Compass,
  Sparkles,
  User,
  HandCoins,
  ChevronUp,
  Check,
  LogOut,
} from "lucide-react";

type Item = { id: string; label: string; icon: React.ElementType };

const items: Item[] = [
  { id: "admin", label: "Admin", icon: UserCog },
  { id: "member", label: "Field member", icon: HardHat },
  { id: "steward", label: "Village steward", icon: Compass },
  { id: "learner", label: "Young learner", icon: Sparkles },
  { id: "student", label: "Student or family", icon: User },
  { id: "donor", label: "Donor", icon: HandCoins },
];

/**
 * The demo cockpit: a persistent bar that marks this as a demo and lets anyone
 * glide between every role without signing in and out. The single biggest thing
 * that makes the preview feel like a real, explorable product.
 */
export function DemoBar({
  current,
  onSwitch,
  onReset,
}: {
  current: string;
  onSwitch: (target: string) => void;
  onReset: () => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const here = items.find((i) => i.id === current) ?? items[0];
  const HereIcon = here.icon;

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 cursor-default"
        />
      )}

      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 animate-bar">
        {open && (
          <div className="absolute bottom-full left-1/2 mb-2 w-64 -translate-x-1/2 overflow-hidden rounded-[18px] border border-line bg-cream shadow-lift">
            <p className="px-4 pt-3 pb-1 text-[0.6875rem] font-semibold tracking-[0.1em] text-stone uppercase">
              Switch role
            </p>
            <div className="px-1.5 pb-1.5">
              {items.map((i) => {
                const Icon = i.icon;
                const isHere = i.id === current;
                return (
                  <button
                    key={i.id}
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      if (!isHere) onSwitch(i.id);
                    }}
                    className={`flex w-full items-center gap-3 rounded-[12px] px-2.5 py-2 text-left text-sm transition-colors ${
                      isHere
                        ? "bg-sand text-forest-700"
                        : "text-forest-700 hover:bg-sand/70"
                    }`}
                  >
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-clay-50 text-clay-600">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="flex-1 font-medium">{i.label}</span>
                    {isHere && (
                      <Check className="h-4 w-4 text-clay-600" aria-hidden />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="border-t border-line p-1.5">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onReset();
                }}
                className="flex w-full items-center gap-3 rounded-[12px] px-2.5 py-2 text-left text-sm text-stone transition-colors hover:bg-sand/70 hover:text-clay-700"
              >
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-sand">
                  <LogOut className="h-4 w-4" aria-hidden />
                </span>
                <span className="flex-1 font-medium">Sign out and reset</span>
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center gap-1 rounded-full border border-line bg-cream/95 p-1 shadow-lift backdrop-blur supports-[backdrop-filter]:bg-cream/80">
          <span className="flex items-center gap-2 pr-1 pl-3">
            <span className="relative flex h-2.5 w-2.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay-500 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-clay-500" />
            </span>
            <span className="hidden text-xs font-semibold tracking-wide text-stone uppercase sm:inline">
              Demo
            </span>
          </span>

          <span className="h-6 w-px bg-line" aria-hidden />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-haspopup="menu"
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-forest-700 transition-colors hover:bg-sand"
          >
            <HereIcon className="h-4 w-4 text-clay-600" aria-hidden />
            <span className="max-w-[10rem] truncate">{here.label}</span>
            <ChevronUp
              className={`h-4 w-4 text-stone transition-transform ${
                open ? "" : "rotate-180"
              }`}
              aria-hidden
            />
          </button>
        </div>
      </div>
    </>
  );
}
