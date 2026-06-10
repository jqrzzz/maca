# Supporter-update (v0)

Drafts the **periodic update** that goes to supporters — the newsletter and the
recurring-donor note are deliberately one tool, because for an org this size
they're the same artifact. It is grounded in **real published field notes**
(pulled from `content/fieldNotes`) plus the founder's own highlights, so the
update reports what actually happened.

> **It drafts; it never sends.** Output lands in `drafts/update-<period>/` for a
> human to review and send.

## Use it

```bash
# Zero-input: drafts from the field notes of the last 60 days
npm run newsletter

# With options
npm run newsletter -- --input my-update.json

# Live — generate the draft (needs ANTHROPIC_API_KEY)
npm run newsletter -- --live
```

### Input format (all optional)

```jsonc
{
  "period": "June 2026", // defaults to the current month
  "includeSlugs": ["a-clinic-run-up-the-hill"], // or pick notes explicitly
  "sinceDays": 60, // window when includeSlugs isn't set
  "highlights": "The solar pump repair is done; two new volunteers joined.",
  "audience": "monthly-donors", // or "supporters" (default)
}
```

If the window is empty, the latest three notes are used so the model always has
something true to work with.

## What you get

`review.md` (checklist + the draft + the exact source notes used), `message.md`
(the clean, sendable email + social blurb), the exact prompts sent, and
`response.json` on live runs. `drafts/` is git-ignored.

## The safety model

Same spine as the other tools ([`scripts/lib/`](../lib)): grounded-only
drafting, the deterministic overclaim/location/consent/figure scans, and a
human gate before anything is sent. The source field notes are listed in the
review so you can verify every claim traces to one.
