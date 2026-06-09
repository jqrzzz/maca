# The Story Bank

The single **grounding surface** for AI-assisted drafting at PRASM — field
notes, donor updates, grant copy, social posts. It exists so that everything we
draft sounds like PRASM, stays factual, and respects consent and safety. It is
the spine of the [Field-to-Story engine](../../docs/concept.md) (Stage A,
item 1).

> **Rule of thumb:** if a draft states a fact, names a person, or claims an
> outcome, it should be traceable to something in here. Grounded, or it doesn't
> ship.

## What's inside

| File             | What it holds                                                                      |
| ---------------- | ---------------------------------------------------------------------------------- |
| `voice.ts`       | The house voice — tone, do/don't, preferred and avoided framings, and hard rules.  |
| `facts.ts`       | Verified facts and figures, each with a `status` and a `source`.                   |
| `boilerplate.ts` | Approved descriptions of PRASM at several lengths (one-liner → standard blurb).    |
| `people.ts`      | Consent-cleared **public** personas only — _not_ the sensitive identity registry.  |
| `storyBeats.ts`  | The recurring narrative threads, summarized for grounding, with canonical sources. |
| `index.ts`       | Aggregates everything into `storyBank` and exposes small accessor helpers.         |

## How a drafting tool should use it

1. Pull `voice` and obey its `rules` — they are non-negotiable.
2. Ground claims in `verifiedFacts()`. Never state a `placeholder` or
   `unverified` fact as established.
3. Reuse `boilerplate` for "who we are" passages instead of paraphrasing.
4. When a draft involves a person, check `people` and never exceed their
   `consent` level or `imageOK`.
5. Use `beatsByTheme()` to pull the relevant story threads for the topic.
6. **A human reviews and approves every public draft.** The tool drafts; it
   never publishes.

## Honesty flags

Facts carry a `status`:

- **`verified`** — confirmed; safe to state plainly.
- **`unverified`** — plausible but not confirmed; don't state as fact yet.
- **`placeholder`** — a stand-in value (e.g. the impact numbers in
  `content/stats.ts`); never present as real.

Stats are imported from `content/stats.ts` and inherit its placeholder flag, so
fixing a number in one place updates its honesty everywhere.

## What never goes here

This module is **Tier-0 (public)** by rule. Real beneficiary identities, family
links, undocumented status, medical details, and any photo of an identifiable
person who hasn't consented are **Tier-2 sensitive data** — they live in a
controlled, access-limited store, never in this repo. See
[`docs/concept.md` → Data and privacy model](../../docs/concept.md).

When in doubt, leave it out.
