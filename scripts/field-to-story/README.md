# Field-to-Story (v0)

The flagship of the AI-native plan ([`docs/concept.md`](../../docs/concept.md) →
Field-to-Story Engine, Stage A item 2). It turns a rough field note — a voice-note
transcript or a few bullet points — into three **grounded drafts**:

1. a **field note** for the website,
2. a short **donor update** email, and
3. a **social caption**,

all in PRASM's voice, grounded in the [Story Bank](../../content/storyBank), with
the approval checklist baked in.

> **It drafts; it never publishes.** Output lands in `drafts/<date>-<slug>/` for a
> human to review and approve. That gate is the design, not a formality.

## Use it

```bash
# Dry run — assemble the grounded prompt + scan the input. No API call, no key needed.
npm run draft

# Use your own field input
npm run draft -- --input path/to/input.json

# Live — actually generate the three drafts (needs an API key, see below)
npm run draft -- --live
```

### Input format

A small JSON file (see [`sample-input.json`](./sample-input.json)):

```jsonc
{
  "raw": "Voice note: drove up this morning with supplies… a mother brought her boy…",
  "themes": ["medical", "identity"], // pulls the relevant Story Bank threads
  "people": [
    // who appears + their confirmed consent
    { "reference": "the founding doctor", "consent": "role-only" },
  ],
  "date": "2026-06-05", // optional; defaults to today
  "slug": "a-clinic-run-up-the-hill", // optional; names the output folder
}
```

Only `raw` is required. Declare `people` honestly — the tool is told never to name
or depict anyone beyond the consent you record here.

### Going live

The live path uses the Claude API (`@anthropic-ai/sdk`, model `claude-opus-4-8`,
adaptive thinking, structured JSON output). Provide a key one of two ways:

```bash
# either export it
ANTHROPIC_API_KEY=sk-ant-… npm run draft -- --live

# or add it to .env.local (the tool loads that file)
echo 'ANTHROPIC_API_KEY=sk-ant-…' >> .env.local
npm run draft -- --live
```

Override the model with `FIELD_TO_STORY_MODEL` if you ever need to.

## What you get

In `drafts/<date>-<slug>/`:

| File                 | What it is                                                              |
| -------------------- | ----------------------------------------------------------------------- |
| `review.md`          | The human-review page: the three drafts + the checklist. Start here.    |
| `prompt.system.txt`  | The exact grounding prompt (voice, facts, consent rules) that was sent. |
| `prompt.user.txt`    | The field input + story threads that were sent.                         |
| `response.json`      | The raw drafts (live runs only).                                        |
| `fieldNote.draft.ts` | A ready-to-paste `FieldNote` scaffold for `content/fieldNotes/`.        |

`drafts/` is git-ignored — these are working artifacts, not source.

## The safety model

- **Grounded only.** The prompt is built entirely from the Story Bank; the model is
  told never to invent facts, numbers, names, quotes, or outcomes.
- **Checklist baked in.** [`checks.ts`](./checks.ts) runs deterministic scans (it
  does not trust the model) for location leaks, possible un-consented names, voice
  slips, and figures that resemble placeholder/unverified values — on your input in
  a dry run, and on the drafts in a live run. It flags; it never green-lights.
- **Human approves.** Every draft is marked _not for publication_ until a person
  signs off. See [`docs/concept.md`](../../docs/concept.md) → Red lines.

## Files

| File                | Role                                                            |
| ------------------- | --------------------------------------------------------------- |
| `run.ts`            | CLI entry — parse args, load input, dry-run/live, write output. |
| `prompt.ts`         | Builds the grounding prompt from the Story Bank + the schema.   |
| `checks.ts`         | The deterministic approval checklist.                           |
| `types.ts`          | Input + draft-bundle types.                                     |
| `sample-input.json` | A clearly-marked sample field note for the dry run.             |
