# Grants tracker (v0)

A tiny, local report of the grants pipeline — what's due, what's open, what's
closed — so funder deadlines don't slip. It's the companion to the
[Grants copilot](../grants): the copilot drafts an application; the tracker
remembers who you're applying to and when.

> **Your pipeline stays private.** The real `pipeline.json` is **git-ignored**
> (it's your funding strategy). Only the committed `pipeline.example.json` shows
> the shape. Copy it to start:
>
> ```bash
> cp scripts/grants-tracker/pipeline.example.json scripts/grants-tracker/pipeline.json
> ```

## Use it

```bash
# Full report (uses pipeline.json if present, else the example)
npm run grants:status

# Only what's open and due within 30 days (plus anything overdue)
npm run grants:status -- --due 30
```

Update the pipeline by editing `pipeline.json` by hand. Each entry:

```jsonc
{
  "funder": "Borderlands Small Grants Fund",
  "status": "researching", // researching | drafting | applied | won | declined
  "amount": "USD 2,000–10,000",
  "deadline": "2026-09-30", // ISO date
  "url": "https://…",
  "notes": "Anything useful",
}
```

The report flags **open** items (researching / drafting) by deadline — marking
anything **overdue** — and lists everything submitted or closed below.

## Files

| File                    | Role                                         |
| ----------------------- | -------------------------------------------- |
| `run.ts`                | Reads the pipeline and prints the report.    |
| `types.ts`              | Pipeline entry + status types.               |
| `pipeline.example.json` | Sample pipeline (committed).                 |
| `pipeline.json`         | Your real pipeline (git-ignored; create it). |
