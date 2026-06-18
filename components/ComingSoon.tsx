"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "onDark"
  | "onDarkOutline";

/**
 * A button that opens an honest "coming soon" dialog instead of performing an
 * action. Used for the pre-launch donation preview: the UI looks complete, but
 * the final step clearly says giving isn't live yet. No real payment is ever
 * initiated and no wallet address is shown.
 */
export function ComingSoonButton({
  children,
  variant = "primary",
  className,
  title = "Coming soon",
  message = "We're putting the final touches on secure giving, so this isn't live just yet. Reach out and we'll tell you the moment it opens, or to arrange a gift now.",
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  title?: string;
  message?: string;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <Button
        type="button"
        variant={variant}
        className={className}
        onClick={() => setOpen(true)}
      >
        {children}
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-forest-700/50 backdrop-blur-sm"
          />
          <div
            ref={panelRef}
            className="relative w-full max-w-md rounded-[20px] border border-line bg-cream p-8 text-center shadow-lift"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-md text-stone hover:bg-sand"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
            <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-clay-50 text-clay-600">
              <Clock className="h-6 w-6" strokeWidth={1.75} aria-hidden />
            </span>
            <h2 className="mt-4 text-h3">{title}</h2>
            <p className="mt-3 text-stone">{message}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href="/contact" variant="primary">
                Get notified
              </Button>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
