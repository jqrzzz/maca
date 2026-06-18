# Expense ledger & controls (v0)

A no-backend expense system that records money out, enforces sign-off, and
reports use of funds. It implements the
[Financial Controls & Expense Policy](../../docs/governance/financial-controls-policy.md).

## Pieces

- `schema.ts` — the chart of accounts, control thresholds, the `Expense` shape,
  and pure `parseLedger` / `validateLedger` / `summarize` functions.
- `check.ts` — validates the ledger (`npm run finance:check`).
- `report.ts` — prints a use-of-funds summary (`npm run finance:report`).
- `/finance/ledger.jsonl` — the **real** ledger (git-ignored, private).
- `/finance/ledger.sample.jsonl` — a fake example showing the format (committed).
- `/finance/receipts/` — receipt files (git-ignored, private).

## The workflow (sign-off without a backend)

1. **Record.** Add one JSON line to `finance/ledger.jsonl` with
   `approval.status: "pending"`. Keep the receipt file in `finance/receipts/`
   named to match the entry's `receipt` reference.
2. **Propose.** Open a PR with the new line. The diff is one readable record.
3. **Approve.** A second person reviews. Above the dual-approval threshold the
   approver must not be the person who incurred the cost. They set
   `approval` to `approved` with their name and the date.
4. **Sign off.** Merging the PR is the sign-off; git history is the audit trail
   of who approved what, and when.
5. **Check & report.** `npm run finance:check` must be clean before merge;
   `npm run finance:report` rolls up where funds went.

Run against the sample any time:

```bash
npm run finance:check   -- finance/ledger.sample.jsonl
npm run finance:report  -- finance/ledger.sample.jsonl
```

## Why JSONL (and how it becomes Supabase)

The ledger is one JSON object per line so it reviews cleanly in a PR, parses
trivially, and imports straight into a database. Each `Expense` field is already
a future **column**; `approval` and `receipt` become related rows. When the org
crosses into Stage B (per `docs/concept.md`), this lifts into Supabase with:

- tables: `expenses`, `accounts` (the chart of accounts), `approvals`,
  `receipts`;
- **row-level security** so an internal login exposes the right data per role
  (founder / approver / viewer);
- the same `validateLedger` rules enforced as DB constraints + checks;
- **AI assistance** that drafts an entry from a photographed receipt and runs the
  checks, with a human still approving every record. AI proposes; a person
  disposes (see the Responsible AI Policy).

Nothing about the JSONL format has to change to get there; only where it lives.
