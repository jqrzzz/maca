# Team roster & roles (v0)

The people who act for PRASM, and what each role may do. It is the access/RBAC
backbone the rest of the internal system runs on (see
[`docs/governance/internal-system-design.md`](../../docs/governance/internal-system-design.md)).

## Pieces

- `schema.ts` — roles, statuses, the role-to-capability matrix, the `Person`
  shape, and pure `parseRoster` / `validateRoster`.
- `check.ts` — validates the roster (`npm run team:check`).
- `roster.ts` — "who's who and who can do what" report (`npm run team:roster`).
- `/team/roster.jsonl` — the **real** roster (git-ignored, private).
- `/team/roster.sample.jsonl` — a fake example (committed).

## Roles and capabilities

| Role | Can do |
| --- | --- |
| `admin` | manage team, approve finance, approve content, see all data tiers |
| `treasurer` | approve finance, see operational (Tier 1) data |
| `board` | approve finance, see operational data |
| `content-approver` | approve public content, see operational data |
| `volunteer` | (task-scoped; read-only by default) |
| `viewer` | read-only |

Sensitive (Tier 2) beneficiary data is **admin-only by default** (least
privilege), per the Responsible AI Policy.

## Onboarding / compliance (ties to the policy suite)

Each person records dated sign-offs: **Code of Conduct** (required for active
members), a **data/confidentiality agreement**, a **conflict-of-interest**
declaration (expected for finance approvers), and **safeguarding** clearance
(required for anyone working near children or vulnerable people). `team:check`
enforces the safety-critical ones and flags the rest.

## Workflow (no backend)

Add or change a person in `team/roster.jsonl` via a pull request; an admin
reviews and merges (the merge is the sign-off, git history the audit trail).
`npm run team:check` must be clean before merge.

## How it becomes Supabase

`people` becomes a table, `role` drives **row-level-security** policies (the
capability matrix above), and `onboarding` dates become compliance records.
Login is Supabase Auth. The same `validateRoster` rules become DB constraints.
A human still approves every change: AI proposes, a person disposes.
