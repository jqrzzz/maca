# UI quality audit — June 2026

_Follow-up to `seo-a11y-2026-06.md`, which verified the static-HTML fundamentals
but explicitly punted on browser-only checks (contrast, focus, reduced-motion).
This pass closes those where it can without a browser and records one fix._

_Environment note: live screenshots / Lighthouse / axe were not possible here
(the network policy blocks the headless-browser download). Contrast was computed
directly from the design tokens instead; a real-browser Lighthouse + axe pass
stays on the launch checklist for focus-order and live rendering._

## Verdict

The UI is high quality and built to standard: a tokenized design system, a fluid
type scale, a global `:focus-visible` ring, reduced-motion gating on every
animation, an accessible mobile nav (focus management, Escape, scroll-lock,
`aria-modal`), correct heading order, and labeled forms. One real contrast bug
was found and fixed (header over the hero).

## Contrast (computed from tokens, WCAG 2.1)

Every text/background pair passes **AA or better**; most hit **AAA**. Lowest is
5.16:1 (secondary text on sand), comfortably above the 4.5:1 AA threshold.

| Pair (light mode) | Ratio | Grade |
| --- | --- | --- |
| Body `ink` on `cream` | 16.1:1 | AAA |
| Secondary `stone` on `cream` / `sand` | 5.8:1 / 5.2:1 | AA |
| Heading `forest-700` on `cream` | 16.0:1 | AAA |
| Link `clay-700` on `cream` / `sand` | 8.2:1 / 7.3:1 | AAA |
| Primary button (`cream` on `clay-600`) | 5.7:1 | AA |
| Secondary button (`cream` on `forest-500`) | 11.7:1 | AAA |

Dark mode passes too (body 15.5:1, secondary 6.9:1, links 9.5:1, buttons 7.8:1+).

## Checked

- **Focus visibility:** global `:focus-visible` outline (gold, 2px, offset) in
  `globals.css`, plus per-component focus rings on buttons/links. Pass.
- **Reduced motion:** every custom animation (splash, hero glows, reveal, film,
  smooth scroll) is gated behind `prefers-reduced-motion: reduce`. Pass.
- **Mobile nav:** `aria-expanded` / `aria-controls`, Escape to close, focus moves
  into the panel and returns to the trigger, body scroll lock, `role="dialog"` +
  `aria-modal`, `aria-current` on the active link, 44px targets. Pass.
- **Heading order:** spot-checked `/the-need` — h1 then h2/h3 with no skipped
  levels. Pass.
- **Forms:** contact inputs have matching `label for` / `id`; newsletter uses an
  `sr-only` label. Pass.
- **Images:** `next/image` with `alt` on every image and fixed aspect ratios
  (no layout shift); hero marked `priority`. Pass.
- **Dark mode:** full class-based token overrides; contrast re-verified above.

## Fixed in this pass

- **Header contrast over the home hero.** The header is transparent over the
  dark hero (top ≈ `#1b3927`) until you scroll, but always rendered the dark
  logo + `text-forest-600` nav (built for light backgrounds), so they were
  near-invisible at the top of the home page. The header is now adaptive: light
  treatment (cream logo, nav, toggle, menu trigger) while over the hero, dark
  once scrolled or on interior pages. Verified in the static HTML: home renders
  light, interior pages render dark, no hydration flash.

## Still recommended before launch

- A real-browser **Lighthouse + axe** pass for focus-order, live contrast on
  imagery, and performance (LCP/CLS) once a staging URL exists.
