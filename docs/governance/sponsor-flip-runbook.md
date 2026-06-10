# Sponsor-flip runbook — updating the site when fiscal sponsorship is confirmed

_The day a US fiscal sponsor confirms PRASM, the site's honest "not
tax-deductible yet" language must flip to the new truth — everywhere, the same
day, with no spot missed. This runbook lists **every file and line**, with
pre-written replacement copy. Replace `[Sponsor]` with the sponsor's legal name
and `[link]` with their page for PRASM (or their site)._

> **The rule that still applies:** deductibility will be true **only for US
> donors**, and **only for gifts routed through the sponsor's channel**. Direct
> crypto/Western Union gifts to PRASM are still NOT deductible. The replacement
> copy below is written to keep that distinction honest. Keep the overclaim scan
> in `scripts/lib/checks.ts` in mind — after the flip, "tax-deductible" mentions
> on the site are _correct_, but drafts must still say it precisely (US-only,
> via the sponsor).

## 1. `content/faqs.ts` — two entries

**Give-page FAQ (~line 13):** replace the answer with:

> US donors can give tax-deductibly through our fiscal sponsor, [Sponsor], a US
> 501(c)(3) — use the [Sponsor] option on this page and you'll receive a US tax
> receipt from them. Gifts made directly to PRASM (for example by crypto) aren't
> tax-deductible, because PRASM itself is still formalizing its structure.

**General FAQ (~line 45):** replace the answer with:

> For US taxpayers, yes — when given through our fiscal sponsor, [Sponsor], a US
> 501(c)(3); they issue the receipt. Direct gifts to PRASM aren't deductible
> yet. See our Donation & Refund Policy for details.

## 2. `content/transparency.ts` — two spots

**`statusStatement.body` (~line 70):** replace the sentence
"That means we cannot currently promise tax-deductible receipts…" with:

> We are fiscally sponsored by [Sponsor], a US 501(c)(3) — so US donors who give
> through [Sponsor] receive a tax-deductible receipt from them. PRASM itself is
> still formalizing its own structure, doesn't yet publish audited financials,
> and we'd rather tell you that plainly than imply otherwise.

**`registrationDetails` (~line 86):** change

> `{ label: "Tax-deductible receipts", value: "Not available yet" }`

to

> `{ label: "Tax-deductible receipts", value: "US donors — via our fiscal sponsor, [Sponsor]" }`

Also add a row:

> `{ label: "Fiscal sponsor (US)", value: "[Sponsor] — 501(c)(3), EIN [number]" }`

## 3. `content/legal/donationPolicy.ts` (~line 27)

Replace the "cannot currently issue tax-deductible receipts" paragraph with:

> US donors: gifts made through our fiscal sponsor, [Sponsor] (a US 501(c)(3)),
> are tax-deductible in the United States — [Sponsor] issues the receipt. Gifts
> made directly to PRASM (including crypto and transfers) are not tax-deductible
> at this time, because PRASM is still formalizing its own legal structure.
> Please don't claim a deduction for a direct gift unless we've confirmed
> eligibility.

## 4. `content/legal/fundsProtection.ts`

Add one sentence to the "Accounting for your gift" section:

> Gifts routed through our US fiscal sponsor, [Sponsor], are additionally
> governed by their financial controls and reporting.

## 5. `content/donations.ts` + `/give` page

Add the sponsor's giving channel as a method (or repoint the Stripe/card method
if the sponsor processes cards). Copy to use:

> **Give via [Sponsor] (US tax-deductible)** — US donors can give through our
> fiscal sponsor, [Sponsor], a 501(c)(3); you'll receive a US tax receipt from
> them.

The actual link goes in `.env.local` / Vercel env per `lib/config.ts`
conventions.

## 6. Story Bank (so drafting tools tell the new truth)

- `content/storyBank/facts.ts` — update the `legal-status` claim to:

  > PRASM is an emerging, founder-led initiative, fiscally sponsored in the US
  > by [Sponsor] (a 501(c)(3)) so that US donors can give tax-deductibly; PRASM
  > itself is still formalizing its own structure and does not yet publish
  > audited financials.

- `content/storyBank/storyBeats.ts` — update the `honest-status` beat summary
  the same way.

## 7. Other org surfaces

- `/governance` how-governed cards — no change needed unless you want to name
  the sponsor under "Accountable by openness."
- `docs/governance/board-recruitment.md` — mention sponsorship is in place
  (helps recruiting).
- Grant drafts (`scripts/grants`) — the prompt reads the Story Bank, so step 6
  updates it automatically. Same for donor thank-yous.

## 8. Verify (same day)

```bash
npm run typecheck && npm run lint && npm run build
npm run storybank:lint   # if present
grep -rn "cannot currently promise tax-deductible\|can't promise tax-deductible\|cannot currently issue tax-deductible" content/
# ^ should return nothing after the flip
```

Then deploy, and spot-check `/give`, `/faq`, `/transparency`,
`/donation-policy` in the browser.

## Don't forget

- [ ] Sponsor's **EIN** and exact legal name on the transparency table.
- [ ] Update `scripts/donor-thanks` manual checklist item (it currently says
      "PRASM can't issue one yet") to reflect the sponsor route.
- [ ] Tell existing donors the news — it's a genuine donor-update story
      (the supporter-update tool can draft it).
