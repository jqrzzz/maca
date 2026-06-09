# PRASM as an AI-Native Foundation

> **What this is.** The working blueprint for how PRASM operates: a tiny human
> team amplified by AI, so that almost everything — money, time, attention —
> reaches the village. This is the vision behind the future phases the
> [README](../README.md) teases (identity registry, records, AI). It is a
> _living_ document; expect it to change.

**Status:** Draft v0.1 · June 2026 · Owner: founder
**Voice:** the same honest, dignity-first register as the rest of the project.
If a line here overclaims, that's a bug — fix it.

## How to read this

- It's a **north star, not a spec.** It says what we're trying to be, ranks
  where AI helps most, and sets the rules AI must follow. Build decisions should
  trace back here.
- It is **deliberately conservative.** We don't write down ambitions we can't
  run honestly.
- It **changes.** Bump the version and date at the bottom when it does.

## The thesis

PRASM is one doctor and a small circle of volunteers, supporting Kayan refugees
who are undocumented and off-grid in the hills of Mae Hong Son. A team this
small normally drowns in back-office work — writing updates, chasing grants,
thanking donors, keeping records, remembering what worked. That work is real,
and every hour of it is an hour not spent in the village.

An AI-native foundation inverts that ratio.

> **The story is human. The engine room is AI.**
> Donors meet the doctor and the families — never a bot. AI is simply how two
> people do the work of ten, out of sight. And **AI proposes; humans dispose** —
> anything public, clinical, or about a real person gets a human's approval
> before it leaves the building.

What we're optimizing is one number: the share of everything we have that
reaches the families — with the transparency to prove it. AI is the cheapest way
to push that number up without losing the human touch that _is_ the work.

## Principles

These govern every AI decision we make. They're values; the hard, checkable
"never" rules live in [Red lines](#red-lines).

1. **Human story, AI engine room.** AI never becomes the face or the fundraising
   hook. The people are.
2. **AI drafts, a human approves.** Especially for anything public, clinical, or
   about an identifiable person.
3. **Dignity and safety first** — ahead of storytelling and ahead of
   fundraising. When unsure, we hold.
4. **Sensitive data is sacred.** Minimize, consent, control access. Beneficiary
   identity and medical data never go into a general-purpose model casually.
   (→ [Data and privacy model](#data-and-privacy-model))
5. **Low-connectivity-first.** Capture offline, process later. Nothing assumes a
   good signal in the village.
6. **Honest by default.** Same no-overclaim voice as the site. AI never invents
   facts, numbers, names, quotes, or impact.
7. **Cost discipline.** No backers yet. The first stage runs on near-zero infra
   and the founder's own tools. Infrastructure scales with funding and need —
   never ahead of them.
8. **Own the data; stay portable.** Plain, exportable formats. The org's memory
   belongs to the org, not to a vendor.
9. **Boring where it counts.** For anything load-bearing, reliability beats
   novelty. If a shared doc and a human beat a pipeline this month, we use the
   doc.

## The opportunity map

Ranked by _(impact to this org)_ × _(feasibility now)_. The **flagship** is what
we build the concept around; the rest are supporting cast that reuse the same
plumbing — above all the Story Bank (§3.6).

Each entry: **what · why here · the loop · what it needs · risks · stage.**

### 3.1 Field-to-Story Engine — ⭐ Flagship

- **What.** Turn raw field input — a voice note, a few photos, three bullet
  points — into publish-ready drafts: a field note for the site, a donor update,
  and a social caption, all in the house voice.
- **Why here.** Your scarcest resource is the hour it takes to write well. This
  is the highest-leverage, lowest-risk, soonest win, and it feeds the donation
  engine everything else depends on. It builds directly on what we already
  have — the [`content/fieldNotes`](../content/fieldNotes) architecture and an
  established voice.
- **The loop.**
  1. **Capture** (offline OK): record a voice note / snap photos / jot bullets;
     tag whether anyone shown has consented to be public.
  2. **Ingest:** transcribe voice → text; carry the consent + safety tags.
  3. **Draft:** AI writes the field note, a short donor update, and a caption —
     grounded in the Story Bank so voice and facts stay consistent and nothing
     is invented.
  4. **Review:** a human edits and approves — dignity, consent, safety, no
     identifying details, no location leak.
  5. **Publish:** field note → site; update → donor list; caption → socials.
  6. **Learn:** approved pieces enrich the Story Bank, so the next drafts are
     better.
- **Needs.** _Stage A:_ a local authoring tool + templates + the Story Bank as
  structured content (the same "content is data" pattern the
  [README](../README.md) describes); drafts reviewed as files / pull requests;
  approved notes flow into the site we already have. No backend. _Stage B:_ a
  small admin screen so the founder isn't in a terminal.
- **Risks.** Never auto-publish. Never fabricate. Consent/safety tags are
  mandatory gates. Location never leaks.
- **Stage.** A → B.

### 3.2 Grants & Fundraising Copilot

- **What.** Find funders, draft applications tailored to each, and reuse a story
  bank so you're not writing every one from scratch.
- **Why here.** Grants are the path past one-by-one individual donors — the
  realistic route to a first paid year. Drafting is exactly what AI accelerates.
- **The loop.** Funder profile in → tailored draft (grounded in the Story Bank,
  honest about our [status](../content/transparency.ts)) → human refines and
  submits → track outcomes → feed wins back to the bank.
- **Needs.** A funder list + the Story Bank (shared with the flagship). Can start
  in Stage A as soon as the bank exists.
- **Risks.** Never invent outcomes or numbers; every claim traceable. Our honest
  status (no charity registration yet) is stated, not hidden.
- **Stage.** A → B.

### 3.3 Donor Stewardship

- **What.** Personalized thank-yous and updates; care for recurring donors.
- **Why here.** Retention is survival for a small org, and it's almost entirely
  drafting and timing — both things AI does well with a human's final touch.
- **The loop.** A gift (or milestone) → a drafted, personal note → human
  approves → send. Recurring donors get rhythm, not spam.
- **Needs.** Donor records — semi-manual in Stage A, a simple CRM in Stage B.
- **Risks.** Tier-1 PII (→ [Data and privacy model](#data-and-privacy-model)). A
  human always owns tone. Never spammy.
- **Stage.** A (manual) → B. ✅ _v0 thank-you drafter built — see
  [`scripts/donor-thanks/`](../scripts/donor-thanks)._

### 3.4 Identity & Case Registry

- **What.** The mission, made structured. Helping stateless people prove who
  they are is, underneath, a records problem: organized case files, family
  links, histories, and drafted documents (timelines, affidavits). AI organizes
  and drafts; people decide.
- **Why here.** This is literally _"help them prove who they are."_ A clean
  registry compounds — it's leverage for every future medical, legal, or
  advocacy step. It's also the most **visionary** thread, and the README already
  names it as a future phase.
- **Needs.** A secure store with strict access control and encryption (Stage
  B+). This is **Tier-2 sensitive data** and **must not** flow into a
  third-party model without de-identification or a private/local model.
- **Risks.** The highest stakes here. A leak endangers undocumented people.
  Safety and PDPA design are the _precondition_, not an afterthought — which is
  why this is deliberately not first.
- **Stage.** C (after the data model and a backend are solid).

### 3.5 Clinical & Operations Back-Office

- **What.** Offload the founder's admin so the doctor stays a doctor: drug and
  reference lookups, ICD-10 coding, medicine and supply inventory, logistics to
  a remote village, plain-language bookkeeping.
- **Why here.** Keeps the single most valuable person doing the most valuable
  work. (The ICD-10 coding capability is already on hand in our tooling — this
  part isn't hypothetical.)
- **Needs.** Mostly Stage A/B. Inventory and logistics fit a light backend well.
- **Risks.** **AI is reference, never a clinician** — no diagnosis, no treatment
  decisions. Patient data is Tier 2.
- **Stage.** A → B. ✅ _Starter ICD-10 reference built (validated codes) — see
  [`docs/clinical/icd10-field-reference.md`](clinical/icd10-field-reference.md)._

### 3.6 Institutional Memory — the Story Bank

- **What.** The connective tissue, and quietly the most important build. Two
  layers:
  - a **Story Bank** — the cleared stories, key facts and figures, the people
    (with consent status), and the house voice — that _grounds every draft_ the
    other threads produce; and
  - an **internal knowledge base** — contacts, protocols, decisions, what
    worked — so a two-person org stops forgetting.
- **Why here.** Forgetting is expensive at this size, and grounding is what makes
  everything else _true_ rather than hallucinated. The Story Bank is why the
  flagship can draft in your voice without inventing.
- **Needs.** Stage A as structured files in the repo; Stage C as retrieval (RAG)
  once volume justifies it.
- **Risks.** Keep public (Tier 0) and sensitive (Tier 2) strictly separated.
- **Stage.** A → C.

### 3.7 Cross-cutting, later

- **Translation layer** — Thai / Burmese / Kayan / English across comms and
  records. (Distinct from the public-site translation we agreed to leave for
  last.)
- **Donor-facing site assistant** — grounded Q&A about the cause and how to
  help, answering _only_ from approved public content. On-brand, but the easiest
  to get wrong, so: last.

## Architecture & stages

Design rule: **each stage is useful on its own and earns the next.** We never
build infrastructure ahead of need. (These stages sit _inside_ the org phases
the [README](../README.md) describes: Stage A runs entirely within today's
no-backend website; Stages B–C are the future phases it teases.)

**Stage A — Authoring. Now, near-zero infra.**
Lives in this repo. The Story Bank and templates are structured content (the
existing [`content/`](../content) pattern). A local tool turns field input into
drafts; drafts are reviewed as files / pull requests; approved field notes flow
into the site we already have. Runs on the founder's own AI subscription — no
servers, nothing to maintain. The point is to prove the loops and the voice
before spending a baht.

**Stage B — Backend. When there's a reason (ideally funding).**
Managed Postgres + auth + storage + serverless functions for: contact and
newsletter capture, a simple donor CRM, grant tracking, and a small admin UI so
the founder isn't living in a terminal. Worth noting: these rails are reachable
from our tooling today, so this is a _when_, not a _whether_.

**Stage C — Compounding.**
The secure Identity & Case Registry (Tier 2, privacy-preserving), retrieval over
the knowledge base, automated impact reporting (activity → "where your gift
went"), and the donor-facing assistant.

The flagship loop — the pattern the rest reuse:

```
   field input ──▶ ingest / transcribe ──▶ AI draft  (grounded in Story Bank)
   (offline ok)        + consent tags          │
                                               ▼
                                    human review & approve ──▶ publish / send
                                               │                     │
                                               └──────── Story Bank ◀─┘  (learns)
```

## Human-in-the-loop, concretely

Approval gates aren't a courtesy; they're the design. Who approves what:

- **Public content** (field notes, social, donor updates): the founder, or a
  trusted delegate, approves every piece.
- **Anything naming or showing a person:** requires a logged consent + safety
  check first.
- **Clinical reference output:** informational only; the doctor decides.
- **Sensitive records:** access limited to named people; every change logged.

The line to hold: **AI removes the typing, never the judgment.**

## Data and privacy model

Everything above stands or falls here. We sort all data into three tiers and
treat each differently. This is also our PDPA backbone — the
[privacy policy](../content/legal/privacy.ts) already makes the promise; this is
how we keep it.

| Tier                | Examples                                                                                                      | Where it lives                        | AI use                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------- |
| **0 · Public**      | Published field notes, programs, cleared Story Bank entries                                                   | The repo / public site                | Free to use as grounding                                                    |
| **1 · Operational** | Donor contacts, grant drafts, supply inventory, logistics                                                     | Access-controlled backend (Stage B)   | Use with care; minimize PII in prompts                                      |
| **2 · Sensitive**   | Beneficiary identities, family links, undocumented status, photos of identifiable people, medical information | Encrypted, strict access, local-first | **Never** to a third-party model without de-identification or a private one |

Rules that follow:

- **Collect the minimum.** If we don't need it, we don't store it.
- **Consent is explicit and revocable** — especially for photos and stories
  (ties to the [Safeguarding](../content/legal/safeguarding.ts) and
  [Privacy](../content/legal/privacy.ts) policies already published).
- **Tier 2 is the red line.** It does not leave a controlled environment and is
  never pasted into a general-purpose chatbot. When AI must touch it,
  de-identify first or use a private/local model.
- **Retention and access are logged.** Keep things only as long as useful; be
  able to say who saw what.
- **PDPA-aligned by construction**, not bolted on.

## Red lines

The enforceable subset — what AI must **never** do here, however convenient:

- Never publish or send anything externally without human approval.
- Never invent facts, numbers, names, quotes, or impact. Grounded, or it doesn't
  ship.
- Never reveal the village's location or anything that could identify or
  endanger an undocumented person.
- Never make a clinical decision. Reference only.
- Never feed Tier-2 data to a third-party model without de-identification or a
  private setup.
- Never let "AI" become the public face or the fundraising hook over the people.

## What we are deliberately NOT doing

Discipline is mostly a list of noes:

- No chatbot-as-mascot, no "powered by AI" badges on a vulnerable-people cause.
- No autonomous agents acting unsupervised on the org's behalf.
- No premature backend; no infra we can't afford or maintain.
- No data hoarding "because we might need it."
- No novelty for its own sake.
- No replacing the human relationships that _are_ the work.

## Roadmap — first concrete steps (Stage A)

In order:

1. **Stand up the Story Bank** as a structured content module — voice, key
   facts, cleared stories, people + consent status. The spine everything grounds
   on. ✅ _Done — see [`content/storyBank/`](../content/storyBank)._
2. **Field-to-Story tool (v0):** a local script — voice/notes in, three drafts
   out (field note, donor update, caption) — reusing the Story Bank. ✅ _Done —
   see [`scripts/field-to-story/`](../scripts/field-to-story)._
3. **Bake in the approval checklist:** consent tag, safety/location check, voice
   check. ✅ _Done — deterministic scans in
   [`scripts/lib/checks.ts`](../scripts/lib/checks.ts), shared by both tools._
4. **One real run:** take an actual field visit end to end; publish one field
   note, send one update; learn and refine the voice and templates. _(Needs a
   real voice note + an API key — over to the founder.)_
5. **Grants copilot (v0)** once the Story Bank exists — it reuses it directly.
   ✅ _Done — see [`scripts/grants/`](../scripts/grants)._

Then reassess: has Stage A earned a Stage B backend?

## Decisions I need from you

My lean is listed first where I have one.

- **Flagship.** I've set **Field-to-Story** as the flagship — highest leverage,
  lowest risk, no backend, builds on what we have. The **Identity & Case
  Registry** is the more visionary pick, but it's Tier-2 and Stage C, so it
  can't be first. Say the word if your heart's elsewhere.
- **Entity path** (from our last talk): own Thai foundation vs. fiscal
  sponsorship vs. a US 501(c)(3) sponsor. Gates tax receipts and the
  "registered" language on the site. → Researched and tailored to your donor
  base (Korea + targeting US/UK/EU/Canada) in
  [`docs/governance/entity-options.md`](governance/entity-options.md): **lead
  with a US fiscal sponsor now**, then list with Asia/global intermediaries
  (Give2Asia, GlobalGiving) as a track record builds; a Thai presence (FPO or
  foundation) is a separate track. **One fact still open: is the founder Thai or
  foreign?** — it gates the Thai-entity choice.
- **AI tooling for the engine room:** default to the strongest general model,
  with a private/local option reserved for Tier 2. (Recommendation, not urgent.)
- **When to cross into Stage B** (backend): my advice — not until Stage A has
  proven the loops with one real run.

## Changelog

- **v0.7** — June 2026 — researched the entity/legal-structure decision
  (`docs/governance/entity-options.md`) and added the governance & policy suite.
- **v0.6** — June 2026 — added the grants tracker (`scripts/grants-tracker/`),
  the field-notes RSS feed (`/feed.xml`), and a validated starter ICD-10
  reference (`docs/clinical/`).
- **v0.5** — June 2026 — added the donor-thanks drafter
  (`scripts/donor-thanks/`), the donor-stewardship thread (§3.3).
- **v0.4** — June 2026 — added the Grants copilot and extracted the shared
  drafting lib (`scripts/grants/`, `scripts/lib/`), Stage A item 5.
- **v0.3** — June 2026 — built the Field-to-Story tool + baked-in approval
  checklist (`scripts/field-to-story/`), Stage A items 2–3.
- **v0.2** — June 2026 — stood up the Story Bank (`content/storyBank/`), Stage A
  item 1.
- **v0.1** — June 2026 — first draft.
