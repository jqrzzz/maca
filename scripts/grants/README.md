# Grants copilot (v0)

Stage A item 5 of the AI-native plan ([`docs/concept.md`](../../docs/concept.md) →
Grants & Fundraising Copilot). Give it a **funder profile** (who they are + their
application questions) and it drafts a **tailored application** — an org summary,
a grounded answer to each question, and an honest status disclosure — reusing the
same [Story Bank](../../content/storyBank) and approval checklist as Field-to-Story.

> **It drafts; it never submits.** Output lands in `drafts/grant-<funder>/` for a
> human to review, refine, and submit. Grants are exactly where the temptation to
> overclaim legitimacy is strongest — so the checklist actively flags any language
> implying registration, tax-deductibility, or audited financials PRASM can't claim.

## Use it

```bash
# Dry run — assemble the grounded prompt + scan the input. No API call, no key needed.
npm run grant

# Use a real funder profile
npm run grant -- --input path/to/funder.json

# Live — actually generate the application (needs an API key)
npm run grant -- --live
```

Set the key by exporting `ANTHROPIC_API_KEY` or adding it to `.env.local` (the
tool loads that file). Override the model with `GRANTS_MODEL` if needed.

### Input format

A JSON funder profile (see [`sample-funder.json`](./sample-funder.json)):

```jsonc
{
  "funder": "Borderlands Small Grants Fund",
  "focus": "Health and education for displaced communities in Southeast Asia",
  "geography": "Thailand–Myanmar border region",
  "amount": "USD 2,000–10,000", // the funder's figures, not ours
  "wordLimit": 150, // optional per-answer guidance
  "project": "What we're seeking support for",
  "questions": [
    // the application questions, in order
    "Who do you serve, and what problem are you addressing?",
    "What will this grant specifically fund?",
  ],
}
```

Only `funder` and `questions` are required.

## What you get

In `drafts/grant-<funder>/`:

| File                | What it is                                                         |
| ------------------- | ------------------------------------------------------------------ |
| `review.md`         | The human-review page: checklist + draft + internal fit note.      |
| `application.md`    | The clean, submittable draft (no internal notes). Edit, then send. |
| `prompt.system.txt` | The exact grounding prompt that was sent.                          |
| `prompt.user.txt`   | The funder profile + story threads that were sent.                 |
| `response.json`     | The raw draft (live runs only).                                    |

`drafts/` is git-ignored — working artifacts, not source.

## The safety model

- **Grounded only.** Built entirely from the Story Bank; the model is told to
  ground every claim and mark any missing figure `[to be provided]` rather than
  invent one.
- **Honesty enforced.** [`scripts/lib/checks.ts`](../lib/checks.ts) flags
  overclaim language (tax-deductible, registered charity, 501(c)(3), audited
  financials…) so an emerging org never implies a legitimacy it doesn't have yet —
  plus the usual location, consent, voice, and figure scans, and a structural
  check that every question was answered within its word limit.
- **Human submits.** Every draft is marked _not for submission_, and the internal
  `fitNote` must be removed before sending.

## Files

| File                 | Role                                                       |
| -------------------- | ---------------------------------------------------------- |
| `run.ts`             | CLI entry — parse args, load profile, dry-run/live, write. |
| `prompt.ts`          | Builds the grants prompt + the schema.                     |
| `types.ts`           | Funder-profile + grant-draft types.                        |
| `sample-funder.json` | A clearly-marked sample funder for the dry run.            |

The grounding block, the deterministic checklist, and the Claude call are shared
with Field-to-Story and live in [`scripts/lib/`](../lib).
