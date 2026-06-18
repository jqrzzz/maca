# Internal system design: the operations console

_How PRASM will "manage it all" with one simple internal system: people and
roles at the core, governing finance, donors, grants, content, and records. The
companion to [`concept.md`](../concept.md) (the AI blueprint): that says how AI
helps; this says how the operation is structured and secured. Review with the
founder; a living document._

**Status:** Draft v0.1, June 2026. **Owner:** founder.

## The idea in one line

A tiny team runs everything from one place, where **who you are (your role)
decides what you can see and do**, a human approves anything that matters, and AI
does the busywork. Built no-backend first, shaped to lift into Supabase.

## The backbone: people, roles, capabilities, data tiers

Everything hangs off the team roster ([`scripts/team`](../../scripts/team)). A
person has a **role**; a role grants **capabilities**; capabilities map onto the
three **data tiers** from the [Responsible AI Policy](../../content/legal/responsibleAi.ts).

| Role | Capabilities | Data it can see |
| --- | --- | --- |
| admin | manage team, approve finance + content | Tier 0, 1, 2 |
| treasurer | approve finance | Tier 0, 1 |
| board | approve finance | Tier 0, 1 |
| content-approver | approve public content | Tier 0, 1 |
| volunteer | task-scoped | Tier 0 (+ scoped) |
| viewer | read-only | Tier 0 |

Tier 2 (beneficiary identities, medical data) is **admin-only by default**: least
privilege. This single matrix is what becomes row-level security in Supabase.

## The modules it governs

Each module is already a structured, validated dataset today, and plugs into the
same people/roles backbone.

| Module | Today (Stage A, no backend) | Governed by |
| --- | --- | --- |
| **Finance** | JSONL ledger + `finance:check` / `finance:report` | `approveFinance` (dual control over threshold) |
| **Team** | JSONL roster + `team:check` / `team:roster` | `manageTeam` (admin) |
| **Donors (CRM)** | semi-manual; donor-thanks + supporter-update tools | `accessTier1` |
| **Grants** | grants pipeline + tracker (private) | `accessTier1` |
| **Story bank / consent** | structured content + storybank lint | `approveContent`; consent gates |
| **Content** | field notes as data; field-to-story drafts | `approveContent` |
| **Impact / reporting** | impact-report scaffold, fed by finance:report | reads Tier 0/1 |

The pattern repeats: structured data, a deterministic validator, sign-off by pull
request, git history as the audit trail.

## Today vs tomorrow

**Stage A (now, no backend).** Each dataset is JSONL/typed content in the repo;
real, sensitive data is git-ignored and private. Changes go through pull request;
the merge is the sign-off. Validators (`*:check`) run before merge. This proves
the model and the controls at near-zero cost.

**Stage B (Supabase, when there's a reason, ideally funding).** The same shapes
lift in without reshaping:

- **Auth** = the internal login (email/passkey), one account per roster person.
- **Tables** mirror the schemas: `people`, `accounts`, `expenses`, `approvals`,
  `receipts`, `donors`, `grants`, plus the existing content.
- **Row-level security** encodes the capability matrix above, so the login shows
  each person exactly what their role allows. Tier 2 stays locked down.
- **Storage** holds receipts and documents privately.
- **The validators become database constraints + checks**, so the rules that
  guard the JSONL files keep guarding the tables.
- A small **admin UI** so the founder is not in a terminal.

Nothing about the data format has to change to get there; only where it lives.

## Where AI fits (and its limits)

AI is the engine room, never the decision-maker. It drafts an expense from a
photographed receipt, suggests a donor thank-you, proposes a grant draft,
prepares a roster change. A human with the right role approves every one. Tier 2
data never goes to a general-purpose model (see the Responsible AI Policy). AI
proposes; a person disposes.

## Security and safeguarding

- **Least privilege** by role; Tier 2 admin-only by default.
- **Onboarding gates**: Code of Conduct, data/confidentiality agreement,
  conflict-of-interest, and safeguarding clearance, tracked on the roster and
  enforced by `team:check`.
- **Audit trail**: git history now; access + change logs in Supabase later.
- **PDPA-aligned**: minimize, consent, retain only as needed (Privacy policy).

## What we deliberately do not build yet

No premature backend, no infrastructure we cannot afford or maintain, no data
hoarding, no role sprawl. We add a module or a table when a real need (and ideally
funding) earns it, exactly as `concept.md` argues.

## Build order (suggested)

1. Roster + roles (done, this scaffold) and finance ledger (done) prove the
   pattern.
2. When Stage B is justified: stand up Supabase Auth + `people` + RLS, then move
   finance in first (it has the clearest controls), then donors and grants.
3. Add the admin UI and AI-assisted entry once the data and policies are solid.

## Review

Revisited whenever a module is added, a role changes, or we cross into Stage B.
