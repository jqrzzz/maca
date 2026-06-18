# /finance

The expense ledger and receipts.

- `ledger.jsonl` — the **real** ledger. **Git-ignored** (it names payees and
  amounts). Keep it in a private repo or private backup; record entries and sign
  off via pull request (see the workflow in
  [`scripts/finance/README.md`](../scripts/finance/README.md)).
- `ledger.sample.jsonl` — a fake example showing the exact format. Committed.
- `receipts/` — receipt files, named to match each entry's `receipt` reference.
  **Git-ignored** (private).

Validate and report with `npm run finance:check` and `npm run finance:report`.
The format is shaped to import into Supabase later without changes.
