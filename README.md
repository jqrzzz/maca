# PRASM Foundation

The website for **PRASM**, a foundation supporting Karenni & Kayan refugees from
Myanmar living off-grid in Mae Hong Son, Thailand — telling their story with
dignity, making it easy to give, and laying the groundwork for future identity
and medical-records programs.

> **Phase 1 (this repo):** a world-class marketing + donation website.
> No backend. The identity registry, medical records, and AI features are
> future phases, teased on the site's roadmap.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript (strict)
- [Tailwind CSS v4](https://tailwindcss.com) (CSS-first `@theme` config)
- `next/font` (Fraunces + Inter), `lucide-react` icons
- Deployed on [Vercel](https://vercel.com)

## Getting started

```bash
nvm use            # Node 22 (see .nvmrc)
npm install
cp .env.local.example .env.local   # fill in donation links etc.
npm run dev        # http://localhost:3000
```

Useful scripts:

```bash
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run format     # prettier --write .
```

## How the site is organized

- **Content is data.** All copy lives in typed modules under [`content/`](content).
  Edit text there — components only render it. This keeps the site easy to
  update and ready for translation or a CMS later.
- **Donations are configurable.** Payment links/addresses come from env vars
  (see [`.env.local.example`](.env.local.example)), read through
  [`lib/config.ts`](lib/config.ts). Unconfigured methods are hidden in
  production. The site-wide **Donate** button always routes to `/give`.
- **Images are swap-ready.** Every image is a `MediaRef` in
  [`lib/images.ts`](lib/images.ts). Placeholders render as branded slots until
  you drop in a real photo — see
  [`public/images/placeholders/README.md`](public/images/placeholders/README.md).

## Before launch

See the checklist in the project plan. In short: set real donation links +
crypto addresses, add consented photography, finalize the tagline / what "PRASM"
stands for, confirm contact channels, replace placeholder impact stats, review
the Transparency & Privacy copy, set `NEXT_PUBLIC_SITE_URL`, and run a
Lighthouse/axe pass.

## Editorial guardrails

- **Consent + dignity** for every story and photo of a real person (especially
  children and the wounded). When unsure, keep the placeholder.
- **Safety:** never reveal the village's exact location.
- **Honesty:** don't claim charity registration, tax-deductibility, or audited
  financials unless they're true.
