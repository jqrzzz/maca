"use client";

import { CircleCheck, Info, X } from "lucide-react";
import { useToasts, dismissToast } from "./toast";

/**
 * Renders the toast stack for the demo: small, friendly confirmations at the
 * top, each auto-dismissing. Mounted once by PreviewConsole.
 */
export function Toaster() {
  const toasts = useToasts();
  if (toasts.length === 0) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[60] flex flex-col items-center gap-2 px-4">
      {toasts.map((t) => {
        const Icon = t.tone === "info" ? Info : CircleCheck;
        return (
          <div
            key={t.id}
            role="status"
            className="pointer-events-auto flex animate-reveal items-center gap-2.5 rounded-full border border-line bg-cream/95 py-2.5 pr-2 pl-4 shadow-lift backdrop-blur supports-[backdrop-filter]:bg-cream/85"
          >
            <Icon
              className={`h-4 w-4 shrink-0 ${
                t.tone === "info" ? "text-clay-600" : "text-forest-600"
              }`}
              aria-hidden
            />
            <span className="text-sm font-medium text-forest-700">
              {t.message}
            </span>
            <button
              type="button"
              onClick={() => dismissToast(t.id)}
              aria-label="Dismiss"
              className="inline-flex h-6 w-6 items-center justify-center rounded-full text-stone transition-colors hover:bg-sand hover:text-clay-700"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
        );
      })}
    </div>
  );
}
