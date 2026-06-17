"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { primaryNav, donateCta, footerNav } from "@/content/nav";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "./SocialLinks";

/**
 * Accessible mobile navigation: disclosure button toggles a full panel.
 * - aria-expanded / aria-controls on the trigger
 * - Escape closes
 * - focus moves into the panel on open, returns to trigger on close
 * - body scroll locked while open
 */
export function MobileNav({ overHero = false }: { overHero?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the menu when the route changes (syncing UI to the router, an
  // external system). The synchronous setState here is intentional.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    // Move focus into the panel.
    const first = panelRef.current?.querySelector<HTMLElement>(
      "a, button",
    );
    first?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  // Extra links (those not already in primaryNav) for completeness.
  const extraLinks = footerNav
    .flatMap((c) => c.links)
    .filter(
      (l, i, arr) =>
        arr.findIndex((x) => x.href === l.href) === i &&
        !primaryNav.some((p) => p.href === l.href) &&
        l.href !== donateCta.href,
    );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-md lg:hidden",
          overHero ? "text-cream hover:bg-cream/10" : "text-forest-700 hover:bg-sand",
        )}
      >
        {open ? (
          <X className="h-6 w-6" aria-hidden />
        ) : (
          <Menu className="h-6 w-6" aria-hidden />
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          {/* Scrim */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="absolute inset-0 bg-forest-700/40 backdrop-blur-sm"
          />
          {/* Panel */}
          <div
            ref={panelRef}
            id="mobile-nav-panel"
            className="absolute top-0 right-0 flex h-full w-[min(22rem,88vw)] flex-col gap-1 overflow-y-auto bg-cream p-6 shadow-lift"
          >
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-forest-700 hover:bg-sand"
              >
                <X className="h-6 w-6" aria-hidden />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {[...primaryNav, ...extraLinks].map((link) => {
                const active =
                  pathname === link.href ||
                  pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-md px-3 py-3 text-lg font-medium",
                      active
                        ? "bg-sand text-clay-700"
                        : "text-forest-700 hover:bg-sand",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6">
              <Button href={donateCta.href} variant="primary" fullWidth>
                {donateCta.label}
              </Button>
            </div>

            <div className="mt-auto pt-8">
              <SocialLinks variant="dark" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
