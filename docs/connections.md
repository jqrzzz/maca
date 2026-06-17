# What to connect: integrations checklist

Single source of truth for every external account or service the site connects
to, the environment variable it maps to, and where to get it. This is the
"wiring" view; for the money-side detail (accounts, fees, compliance, go-live
testing) see [`governance/payments-setup.md`](governance/payments-setup.md).

How to apply any value below:

1. **Vercel → Project → Settings → Environment Variables** — add it to both
   **Production** and **Preview**.
2. Mirror it in **`.env.local`** for local development (see `.env.local.example`).
3. **Redeploy.** Each feature/method appears automatically once its variable is
   set, and stays hidden in production until then. Nothing here changes code.

All site variables are `NEXT_PUBLIC_*` because their values are shown to visitors
by nature (a donation link is public). The one server-side secret is called out
at the end.

## 0. Prerequisite (not a website setting)

- [ ] **Legal home for funds** — a US fiscal sponsor (fastest) or your own
      entity. Everything money-related depends on this; do it first. See
      [`governance/entity-options.md`](governance/entity-options.md) and the
      ready-to-send [`governance/fiscal-sponsor-outreach.md`](governance/fiscal-sponsor-outreach.md).

## 1. Core site

| What | Variable | Where to get it | Status |
| --- | --- | --- | --- |
| Canonical site URL | `NEXT_PUBLIC_SITE_URL` | Your domain once connected in Vercel (e.g. `https://prasm.life`) | [ ] |

## 2. Donations (money in)

Each method is independent and hides until its variable(s) are set. Crypto QR
codes are generated automatically from the addresses, so there is nothing to
draw or upload.

| Method | Variable(s) | Where to get it | Status |
| --- | --- | --- | --- |
| Card (Stripe) | `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` | Stripe Dashboard → Payment Links | [ ] |
| PayPal | `NEXT_PUBLIC_PAYPAL_ME` | `paypal.me` handle, or PayPal Giving Fund if enrolled | [ ] |
| Patreon | `NEXT_PUBLIC_PATREON_URL` | Your Patreon creator page | [ ] |
| Bitcoin | `NEXT_PUBLIC_CRYPTO_BTC_ADDRESS` | A wallet you control | [ ] |
| Ethereum | `NEXT_PUBLIC_CRYPTO_ETH_ADDRESS` | A wallet you control | [ ] |
| Tether (USDT) | `NEXT_PUBLIC_CRYPTO_USDT_ADDRESS` + `NEXT_PUBLIC_CRYPTO_USDT_NETWORK` | Wallet; address must match the network (e.g. `TRC20`) | [ ] |
| Crypto checkout (recommended) | `NEXT_PUBLIC_CRYPTO_PROCESSOR_URL` (+ `NEXT_PUBLIC_CRYPTO_PROCESSOR_NAME`) | The Giving Block / Engiven / Coinbase Commerce hosted page | [ ] |
| Bank transfer / wire | `NEXT_PUBLIC_BANK_TRANSFER=true` | Flag only; details shared privately via `/contact` | [ ] |
| Western Union | `NEXT_PUBLIC_WU_RECIPIENT_NAME` + `NEXT_PUBLIC_WU_RECIPIENT_LOCATION` | Your recipient details (sensitive, Vercel only) | [ ] |
| In-kind supplies | none | Always on (coordinated via `/contact`) | done |

## 3. Communications

All three have graceful `mailto:` fallbacks, so the site works before they are
connected.

| What | Variable | Where to get it | Status |
| --- | --- | --- | --- |
| Contact inbox | `NEXT_PUBLIC_CONTACT_EMAIL` | Your address (defaults to `mahkha420@gmail.com` until changed) | [ ] |
| Contact form delivery | `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | A free [Formspree](https://formspree.io) form endpoint | [ ] |
| Newsletter signup | `NEXT_PUBLIC_NEWSLETTER_ACTION` | Buttondown / Mailchimp embedded form action URL | [ ] |

## 4. Analytics (optional)

| What | Variable | Where to get it | Status |
| --- | --- | --- | --- |
| Vercel Web Analytics + Speed Insights (cookieless) | `NEXT_PUBLIC_ANALYTICS_ENABLED=true` | Enable Analytics in the Vercel project | [ ] |

## 5. AI back-office (separate, server-side, optional)

The dev-only drafting tools (`npm run draft`, `thanks`, `grant`, etc.) are never
bundled into the website. To run them with live drafting:

- [ ] `ANTHROPIC_API_KEY` in `.env.local` **only**. This is a real secret: do
      not prefix it with `NEXT_PUBLIC_`, do not set it in the deployed site, and
      do not commit it.

## Suggested order

1. Fiscal sponsor / entity (Section 0) — unblocks legitimate receiving.
2. Stripe + PayPal + Patreon (Section 2) — the easy rails.
3. Crypto: a processor, or wallet addresses, or both.
4. Contact form + newsletter (Section 3) so inquiries and supporters are captured.
5. Site URL + analytics.
6. Send a small **test transaction** through every live money method before
   announcing, then run the go-live checklist in `governance/payments-setup.md`.
