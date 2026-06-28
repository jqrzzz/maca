# Financial Controls & Expense Policy

_Internal operating policy: how PRASM authorizes, pays, documents, records, and
reports money out. It is the operational counterpart to the donor-facing
[Protecting your gift](../../content/legal/fundsProtection.ts) policy. Review with
the founder (and the board as it forms); bump the date on changes._

**Status:** Draft v0.1, June 2026. **Owner:** founder.

## Purpose and scope

Every gift must reach what it was given for, and we must be able to show it. This
policy covers all spending of PRASM funds, in any currency or channel (bank, card,
cash, crypto, in-kind logistics). It is deliberately lightweight for a tiny team,
and designed so a fiscal sponsor or auditor can rely on it.

How it relates to a fiscal sponsor: per
[`entity-options.md`](entity-options.md), a US fiscal sponsor will hold funds,
issue tax receipts, and keep the formal books. This policy is what we maintain to
**feed** them: a clean, documented, approved expense record. It stands on its own
until then.

## Principles

1. **Stewardship.** Funds are held in trust, spent sparingly, and accounted for.
2. **Segregation of duties.** No one person should both authorize and pay a
   material expense unchecked. A second person reviews above a threshold.
3. **Documentation.** No material payment without a receipt or equivalent proof.
4. **Honesty.** We record what actually happened. We never invent or round away.
5. **Least privilege.** Sensitive financial data is seen only by those who need it.
6. **Separate funds.** PRASM money is never commingled with personal money.

## Chart of accounts and funds

Every expense is tagged with a **category** and a **fund**.

- **Categories** (the chart of accounts) match our programs plus operations:
  Medical care & transport, Education access, Sustainable off-grid living,
  In-kind supplies & logistics, Identity & records, Operations & admin, and
  Payment & transfer fees. The canonical list lives in
  [`scripts/finance/schema.ts`](../../scripts/finance/schema.ts).
- **Funds**: `restricted` (given for a specific purpose, and only spent on it) or
  `unrestricted` (general). Restricted gifts are tracked separately and honored.

## The expense lifecycle

1. **Request / incur** — a need arises; we verify it before spending, and prefer
   paying a provider directly (a hospital, a supplier) over cash where possible.
2. **Authorize** — see the sign-off rules below.
3. **Pay** — through the most traceable channel available.
4. **Document** — capture a receipt or proof, stored privately.
5. **Record** — one entry in the ledger with category, fund, amount + currency,
   USD-equivalent, payee, who incurred it, the approval, and the receipt
   reference.
6. **Reconcile** — monthly, against bank and processor statements.

## Authorization and sign-off

- Spending **at or above the dual-approval threshold** (currently **USD 200**
  equivalent) requires a **second person** to approve, and that approver must not
  be the person who incurred the cost.
- Below the threshold, the founder may approve, but it is still recorded.
- Approvals, amounts, and the threshold are enforced by `npm run finance:check`,
  and recorded in the ledger (approver + date).

**Honest current limit.** PRASM is founder-led, so true segregation is not yet
possible for every transaction. Until the board forms, we mitigate by: recording
everything, keeping receipts for all material spend, having a trusted volunteer or
prospective board member co-review larger items, and reconciling monthly. As the
independent board forms (see [`governance.ts`](../../content/governance.ts)), a
non-executive approver takes on sign-off above the threshold.

## Documentation and receipts

- A receipt or equivalent proof is required **at or above USD 25** equivalent.
- A valid receipt shows the payee, date, amount, and what was bought.
- Receipts are stored privately in `finance/receipts/` (git-ignored), named to
  match the ledger entry's `receipt` reference. They are never published, and
  never include information that could identify or endanger a beneficiary.

## Payments, currency, and cash

- **Prefer direct-to-provider** payments over cash; prefer traceable channels.
- **Cash advances** for fieldwork are reconciled with receipts on return; any
  unspent cash is returned and recorded.
- **Currency.** Record the original amount and currency (often THB) and the
  **USD-equivalent at the time of spend**, so controls and reports are consistent.
- **Crypto.** Liquidation and onward transfer follow the dual-control rule and
  the custody practices in the Responsible AI / funds-protection context; record
  the USD-equivalent at receipt and at conversion.

## Reconciliation

Monthly, match recorded inflows (processor payouts, bank deposits) and outflows
(the ledger) to statements. Investigate and note any difference. Reconciliation
is a precondition for any published use-of-funds figure.

## Use of funds and reporting

- `npm run finance:report` rolls up approved spend by category and fund and flags
  anything pending or missing a receipt.
- These figures feed the annual impact report (`npm run impact`) and the
  Transparency page. We publish only reconciled numbers, and we say plainly when
  a figure is provisional.

## Records, retention, and access

Financial records are operational (Tier 1) data; some receipts may touch
sensitive (Tier 2) information and are handled under the Responsible AI Policy and
Privacy/Safeguarding policies. Keep records as long as good accounting and any
sponsor or law require, restrict access to those who need it, and log access once
we have a backend.

## Fraud, diversion, and conflicts

We apply extra care to large or unusual payments and to any onward transfer, do
not knowingly let funds benefit armed groups or sanctioned parties, and follow the
[Conflict of interest](../../content/legal/codeOfConduct.ts) and funds-protection
policies. Concerns can be raised through the Complaints & feedback process.

## The system: today and tomorrow

- **Today (no backend).** The ledger is JSONL in `/finance`, validated by
  `finance:check`, with sign-off via pull request and git history as the audit
  trail. See [`scripts/finance/README.md`](../../scripts/finance/README.md).
- **Tomorrow (Stage B).** The same shape lifts into Supabase (tables for
  expenses, accounts, approvals, receipts) behind an internal login with
  role-based access, the same checks enforced as database constraints, and AI that
  drafts entries from photographed receipts. A human still approves every record:
  AI proposes, a person disposes.

## Review

Reviewed at least annually, and whenever our funding, scale, or controls change
materially (for example, on signing a fiscal sponsor or forming the board).
