# /team

The roster of people who act for PRASM, and their roles.

- `roster.jsonl` — the **real** roster. **Git-ignored** (it holds contact and
  personal details). Keep it private; change it and sign off via pull request
  (see [`scripts/team/README.md`](../scripts/team/README.md)).
- `roster.sample.jsonl` — a fake example showing the exact format. Committed.

Validate with `npm run team:check` and view with `npm run team:roster`. The
format is shaped to import into Supabase (people + role-based access) later.
