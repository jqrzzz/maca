# Payments & donations: setup playbook

_Operational guide for the founder, June 2026. This is practical guidance, not
legal, tax, or financial advice. Pair it with `entity-options.md` (the legal
home for funds), `fiscal-sponsor-outreach.md` (a ready outreach pack), and
`sponsor-flip-runbook.md` (the copy to change once a sponsor is live). Fee
figures change often: treat every percentage here as "verify current rate."_

## TL;DR

- The website side is built. The `/give` hub already supports card (Stripe),
  PayPal, Patreon, BTC/ETH/USDT, in-kind, and Western Union. Each method turns
  on when you set one environment variable (see the reference table). Nothing
  shows until you do, and unset methods are hidden in production.
- The work that remains is real-world, not code: (1) a legitimate home for the
  money, and (2) the provider accounts themselves.
- Recommended first move is a US fiscal sponsor (weeks, ~5 to 10% of funds). It
  becomes the account that receives funds, makes US gifts tax-deductible, lends
  an audited charity's credibility, and often provides the Stripe/PayPal/crypto
  rails for you, so you may not need your own merchant accounts at all.

## The governing principle: link out now, integrate later

For an organization at this stage the industry-standard, lowest-risk design is
exactly what is built: send donors to provider-hosted pages (Stripe Payment
Links, PayPal, Patreon) or show a wallet address. No card data ever touches our
servers, so we carry no PCI scope, no stored secrets, and no payment liability.
A custom card-processing backend is a Phase 2 upgrade, not a starting point: it
adds PCI obligations, a database of donor financial data, and maintenance, for
benefits (receipts, CRM, recurring management) that the hosted tools already
cover early on. See "Phase 2" below for when that calculus changes.

## Step 0 (the real prerequisite): where the money lands

Do not point Stripe or PayPal at a personal account. For a foundation that
breaks donor trust, undercuts the promises on `/funds-protection`, blocks
tax-deductibility, and commingles funds. Decide the home first.

Per `entity-options.md`, the disciplined, staged path is:

1. **Now (~0 to 3 months): US fiscal sponsor (comprehensive / Model A).**
   Instant US 501(c)(3) deductibility and a home for funds with no entity
   formation. Use `fiscal-sponsor-outreach.md` to contact candidates. Confirm
   they will take a Thailand-based, foreign-led project, how they disburse
   cross-border, and whether they accept and liquidate crypto (not all do).
2. **In parallel (~3 to 12 months): a Thai presence to operate** (FPO permission
   or a Thai foundation). This is the "operate legally in-country" track, not a
   deductibility track.
3. **Later: listings (Give2Asia, GlobalGiving) and/or your own 501(c)(3)** once
   you have a track record and financials.

Open question that changes the order: is the founder Thai or foreign, and where
do most donors sit? (See the decision log at the end.)

## Method-by-method setup

Each method below lists what to create, the single env var that switches it on,
the rough cost, and the gotchas. Set env vars in Vercel for both Production and
Preview; mirror them in `.env.local` for local dev.

### 1. Card payments: Stripe (recommended primary)

- **Create:** a Stripe account (business/identity verification + a bank account
  to settle to). In the Dashboard, create a **Payment Link** (it can be one-time
  or recurring, with suggested amounts). If you have 501(c)(3) status or a
  sponsor's account, apply for Stripe's nonprofit pricing.
- **Set:** `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` to the Payment Link URL.
- **Cost:** roughly 2.9% + $0.30 per card charge (US); nonprofit rate lower;
  varies by country. Verify.
- **Gotchas:** Stripe needs a real legal entity or individual and a bank
  account, so in practice this rides on the fiscal sponsor (their Stripe, their
  bank) unless/until you have your own entity. Recurring and receipts are
  handled by Stripe's hosted pages.

### 2. PayPal

- **Create:** a PayPal account; if you are an enrolled charity, use **PayPal
  Giving Fund** (0% fees) or a charity Donate button. Otherwise a `paypal.me`
  link works immediately.
- **Set:** `NEXT_PUBLIC_PAYPAL_ME` to your `https://paypal.me/...` link.
- **Cost:** ~2.9% + fixed; 0% via Giving Fund for enrolled charities. Verify.
- **Gotchas:** familiar to many donors and fast to launch; charity status
  unlocks the better rate and proper receipts.

### 3. Patreon (recurring membership)

- **Create:** a Patreon creator page with tiers; this pairs naturally with the
  field-notes engine (supporters follow the work as it unfolds).
- **Set:** `NEXT_PUBLIC_PATREON_URL` to the page URL.
- **Cost:** roughly 8% platform plus payment processing and payout fees, so
  plan for ~10 to 13% all-in. Verify current plan pricing.
- **Gotchas:** Patreon is membership/perks, not charitable receipts; treat it as
  recurring community support, not tax-deductible giving.

### 4. Crypto

Two ways, depending on stage:

- **Self-custody (what the code does today):** set the wallet addresses and the
  QR codes are generated automatically from them at build time (`lib/qr.ts`), so
  the QR can never drift from the address. You then track, value, and convert to
  fiat yourself.
  - **Set:** `NEXT_PUBLIC_CRYPTO_BTC_ADDRESS`, `NEXT_PUBLIC_CRYPTO_ETH_ADDRESS`,
    `NEXT_PUBLIC_CRYPTO_USDT_ADDRESS`, and `NEXT_PUBLIC_CRYPTO_USDT_NETWORK`
    (e.g. `TRC20` vs `ERC20`; the address must match the network).
  - **Cost:** network fees only; conversion via an exchange adds a spread/fee.
  - **Gotchas:** irreversible; addresses are public but the **private keys/seed
    are the crown jewels** (hardware wallet, offline backup, dual control).
    Bookkeeping and valuation-at-receipt are on you.
- **Charity crypto processor (recommended as you scale):** The Giving Block,
  Engiven, or Coinbase Commerce give a hosted checkout, auto-convert to fiat,
  and issue receipts; usually require entity/nonprofit status and charge ~1 to
  4%. If you adopt one, it can replace the self-custody cards.

### 5. Bank transfer / wire and Western Union (contact-first)

- Large or international gifts often prefer a bank wire. Like Western Union, this
  is best handled as "contact us first" so you can share current recipient
  details privately rather than publishing account numbers.
- **Western Union is already wired:** set `NEXT_PUBLIC_WU_RECIPIENT_NAME` and
  `NEXT_PUBLIC_WU_RECIPIENT_LOCATION` (both required; sensitive, keep in Vercel,
  do not commit). A bank-wire equivalent can be added the same way on request.

### 6. In-kind

Already live on `/give`: a list of needed supplies plus "message us first to
coordinate," which suits a remote, off-grid destination. No processor needed.

## Environment variables reference

Set in Vercel (Production + Preview); mirror in `.env.local`. All are
`NEXT_PUBLIC_*` because the values are shown to visitors by nature. Leaving one
blank hides that method in production.

| Env var                            | Method        | Example value                          |
| ---------------------------------- | ------------- | -------------------------------------- |
| `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`  | Card (Stripe) | `https://buy.stripe.com/xxxxxxxx`      |
| `NEXT_PUBLIC_PAYPAL_ME`            | PayPal        | `https://paypal.me/yourhandle`         |
| `NEXT_PUBLIC_PATREON_URL`          | Patreon       | `https://patreon.com/prasm`            |
| `NEXT_PUBLIC_CRYPTO_BTC_ADDRESS`   | Bitcoin       | `bc1q...`                              |
| `NEXT_PUBLIC_CRYPTO_ETH_ADDRESS`   | Ethereum      | `0x...`                                |
| `NEXT_PUBLIC_CRYPTO_USDT_ADDRESS`  | Tether        | (must match the network below)         |
| `NEXT_PUBLIC_CRYPTO_USDT_NETWORK`  | Tether        | `TRC20` (or `ERC20`)                   |
| `NEXT_PUBLIC_WU_RECIPIENT_NAME`    | Western Union | recipient full name                    |
| `NEXT_PUBLIC_WU_RECIPIENT_LOCATION`| Western Union | recipient city, country                |

## Go-live checklist

1. Fiscal sponsor (or entity) confirmed as the home for funds.
2. Each provider account created and identity/bank verified.
3. For every address/link: **send a small test transaction** end to end and
   confirm it arrives, then verify it on the live `/give` page.
4. Crypto: confirm each address and network in a wallet you control; verify the
   on-screen QR scans to the exact address.
5. Env vars set in Vercel (Production + Preview); redeploy; confirm only the
   intended methods appear.
6. Confirm receipts: who issues them (sponsor / PayPal Giving Fund / processor)
   and what the donor receives.
7. Run the `sponsor-flip-runbook.md` edits so any "not tax-deductible yet" copy
   matches reality.

## Controls & compliance (be ready to evidence)

- **Segregation:** donations land in the sponsor/foundation account, never a
  personal one.
- **Reconciliation:** monthly, match provider payouts to bank deposits to the
  ledger; keep records for audits and the impact report.
- **AML / sanctions / no-diversion:** funds to a conflict-affected border draw
  scrutiny from banks and sponsors. The stance on `/funds-protection` is the
  policy; keep evidence of how funds are used.
- **Beneficiary privacy:** keep undocumented-beneficiary data out of anything a
  processor, sponsor, or registry could publish (the Tier-2 data rule).
- **Crypto custody:** hardware wallet, offline seed backup, and dual control on
  any conversion or withdrawal.
- **Secrets:** never commit real wallet addresses or recipient details intended
  to stay private; set them in Vercel.

## Phase 2: integrated donations (when it earns its keep)

Adopt when you have an entity/sponsor and enough volume that hosted tools feel
limiting. It adds: embedded Stripe Checkout, a backend webhook that records each
donation, automatic receipts and thank-yous, a donor CRM, recurring management,
and an impact dashboard.

It requires: a serverless API route, a database, a verified Stripe webhook
secret with idempotent handling, and a privacy review of stored donor data. It
pairs with the existing `npm run thanks` tool, which could draft donor
thank-yous from the recorded gifts. Until then, the hosted/link-out model is the
correct, lower-risk choice.

## Decision log / open questions

- **Founder Thai or foreign?** Drives Thai-entity feasibility and board needs.
- **Donor mix (US vs international vs Thai)?** Drives whether to prioritize a US
  sponsor now vs a Thai foundation + Section 47(7) status.
- **Crypto: self-custody or processor?** Processor is cleaner once an entity
  exists; confirm a chosen sponsor will accept and liquidate crypto.
- **Primary recurring rail: Patreon or Stripe recurring?** Patreon adds
  community/updates; Stripe recurring is cleaner for pure giving and receipts.
