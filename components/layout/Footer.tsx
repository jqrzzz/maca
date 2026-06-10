import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerNav, legalNav } from "@/content/nav";
import { site } from "@/content/site";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="grain relative bg-forest-700 text-cream/80">
      <span aria-hidden className="grain-overlay" />
      <Container className="relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand + mission */}
          <div className="max-w-sm">
            <Logo variant="light" />
            <p className="mt-5 text-sm leading-relaxed text-cream/70">
              {site.description}
            </p>
            <p className="mt-5 text-sm text-cream/60">
              {site.location.region}, {site.location.country}
            </p>
            <SocialLinks variant="light" className="mt-6" />
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNav.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="font-display text-base font-semibold text-cream">
                  {col.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-cream/70 transition-colors hover:text-cream"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-cream/15 pt-8 text-xs text-cream/55">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {site.name} · {site.location.region},{" "}
              {site.location.country}
            </p>
            <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
              {legalNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-cream"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="mt-5 text-cream/45">
            A community-led effort for Kayan refugees, built with care, off the
            grid.
          </p>
        </div>
      </Container>
    </footer>
  );
}
