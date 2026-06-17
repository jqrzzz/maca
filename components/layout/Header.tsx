"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { primaryNav, donateCta } from "@/content/nav";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

/**
 * Sticky header. Transparent over the hero, solidifies (cream + shadow) on
 * scroll. The Donate CTA is always visible and routes to the giving hub.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // The home hero is dark; the header sits transparently over it until you
  // scroll. Use light treatment there so the logo + nav stay legible (the hero
  // copy is light for the same reason). Interior pages open on a light surface.
  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-line bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 md:h-20">
        <Logo variant={overHero ? "light" : "dark"} />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-[0.9375rem] font-medium transition-colors",
                  overHero
                    ? cn("text-cream/85 hover:text-cream", active && "text-cream")
                    : cn(
                        "text-forest-600 hover:text-clay-700",
                        active && "text-clay-700",
                      ),
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle
            className={overHero ? "text-cream hover:bg-cream/10" : undefined}
          />
          <Button
            href={donateCta.href}
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            {donateCta.label}
          </Button>
          <MobileNav overHero={overHero} />
        </div>
      </Container>
    </header>
  );
}
