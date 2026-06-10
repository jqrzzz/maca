# Donor-thanks (v0)

The donor-stewardship thread of the AI-native plan
([`docs/concept.md`](../../docs/concept.md) → Donor Stewardship). Give it a
donation event and it drafts a warm, honest, personal **thank-you** — an email
and a short text/DM version — grounded in the same [Story Bank](../../content/storyBank)
and approval checklist as the other tools.

> **It drafts; it never sends.** Output lands in `drafts/thanks-<donor>/` for a
> human to review and send. The load-bearing rule: PRASM can't issue
> tax-deductible receipts yet, so the checklist flags any wording that implies a
> tax receipt, deductibility, or charitable-tax status.

## Use it

```bash
# Dry run — assemble the grounded prompt + scan the input. No API call, no key needed.
npm run thanks

# Use a real donation
npm run thanks -- --input path/to/donation.json

# Live — actually generate the thank-you (needs an API key)
npm run thanks -- --live
```

Set the key by exporting `ANTHROPIC_API_KEY` or adding it to `.env.local`.
Override the model with `DONOR_THANKS_MODEL` if needed.

### Input format

A small JSON file (see [`sample-donation.json`](./sample-donation.json)):

```jsonc
{
  "donor": "Maria", // optional — defaults to a warm greeting
  "amount": "USD 50", // optional
  "method": "Stripe", // optional
  "firstTime": true, // optional
  "recurring": false, // optional — a monthly supporter?
  "earmark": "medical care", // optional — what they directed it to
  "note": "I read the field notes and had to help.", // their message, if any
  "personal": "Mention the solar pump she asked about", // a touch to include
}
```

Everything is optional — with nothing but a name it still writes a gracious note.

## What you get

In `drafts/thanks-<donor>/`:

| File                | What it is                                                |
| ------------------- | --------------------------------------------------------- |
| `review.md`         | The human-review page: checklist + message. Start here.   |
| `message.md`        | The clean, sendable draft (subject, body, short version). |
| `prompt.system.txt` | The exact grounding prompt that was sent.                 |
| `prompt.user.txt`   | The donation details + story threads that were sent.      |
| `response.json`     | The raw draft (live runs only).                           |

`drafts/` is git-ignored — working artifacts, not source.

## The safety model

- **Honesty enforced.** [`scripts/lib/checks.ts`](../lib/checks.ts) flags any
  overclaim — tax-deductible, registered charity, 501(c)(3), audited financials —
  so a thank-you never promises a tax receipt PRASM can't give. Plus the usual
  location, consent, voice, and figure scans.
- **Grounded only.** Impact is connected to the real work; the model is told never
  to invent outcomes, numbers, or names.
- **Human sends.** Every draft is marked _not for sending_ until a person approves.

## Files

| File                   | Role                                                     |
| ---------------------- | -------------------------------------------------------- |
| `run.ts`               | CLI entry — parse args, load event, dry-run/live, write. |
| `prompt.ts`            | Builds the thank-you prompt + the schema.                |
| `types.ts`             | Donation-event + thank-you types.                        |
| `sample-donation.json` | A clearly-marked sample donation for the dry run.        |

The grounding block, the deterministic checklist, and the Claude call are shared
with the other tools and live in [`scripts/lib/`](../lib).
