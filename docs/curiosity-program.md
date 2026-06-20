# The Curiosity Program

> **What this is.** A proposal for the first program PRASM runs _with_ the
> village rather than _for_ it: helping children, teens, and adults get curious
> about AI and use it to learn, with an honest incentive model that rewards
> genuine engagement instead of paying for data. It also sets out, carefully, how
> that program earns the path to the Identity and Case Registry that
> [`concept.md`](concept.md) names as a future phase (§3.4). Companion to
> [`concept.md`](concept.md) (the AI blueprint) and
> [`governance/internal-system-design.md`](governance/internal-system-design.md)
> (how the operation is structured and secured). A _living_ document; expect it
> to change.

**Status:** Draft v0.1 · June 2026 · Owner: founder
**Voice:** the same sober, dignity-first register as the rest of the project.
Partners, never projects. If a line here overclaims, that is a bug; fix it.

## How to read this

- It is a **proposal, not a decision.** It follows the project's own rule: AI
  proposes, a human disposes. Nothing here ships, and no child is enrolled, until
  the founder approves it and the safeguards below are real.
- It is **deliberately sequenced.** The most valuable idea (a structured registry
  of the village) is also the most dangerous data PRASM could hold. So this
  document is as much about _what we do not do yet, and why_ as about what we do.
- It **inherits every rule** in [`concept.md`](concept.md) and the
  [Responsible AI](../content/legal/responsibleAi.ts),
  [Safeguarding](../content/legal/safeguarding.ts), and
  [Privacy](../content/legal/privacy.ts) policies. Where this program adds risk,
  it adds the matching guardrail.

## The one idea that drives everything

The instinct is to pay for the profile: a name, a photo, a row in a database, one
payment per child Ong signs up. Resist it. With families who have few options,
paying per profile quietly pressures Ong to enroll fast, nudges parents to
consent for the money, and builds a database of refugee children for the reward
instead of for the child. That is both an ethics problem and a data problem: you
get the rows you paid for, not the truth.

**So we incentivize the outcome we actually want, a child who keeps coming back
to learn, and we treat the profile and the photo as byproducts of real
engagement, captured gently along the way.** Get that ordering right and most of
the risk dissolves before it starts.

## Principles (extending the blueprint)

These sit on top of the nine principles in [`concept.md`](concept.md); they are
the ones this program leans on hardest.

1. **Curiosity is the product; data is exhaust.** We measure and reward learning,
   not enrollment. We never collect a field because it would be "nice to have."
2. **The reward is mostly the help itself.** The strongest, least coercive
   incentive is that using AI visibly improves a child's life. We design for that
   follow-through on purpose.
3. **Consent belongs to the family, every time.** Ong facilitates; parents and
   guardians decide, in their own language, and can withdraw without losing
   anything.
4. **Children first, storytelling second, fundraising last.** Straight from
   Safeguarding: dignity before a compelling image, every time.
5. **Earn the next stage.** Run the low-risk literacy work first; only build the
   sensitive registry once a secure home for it exists and the loop has proven
   itself.

## Two tracks, deliberately sequenced

The single most important design choice: split the vision into two tracks and do
them in order, because they carry completely different risk.

**Track 1, the Curiosity Program (start small, soon).** Children and adults meet
AI, ask it questions, and learn. This needs almost no sensitive data: a first
name (or a nickname), an age band, and a guardian's consent are enough to begin.
The value to the family is immediate.

**Track 2, the Registry (later, and only when its home is ready).** A structured
record of who lives in the village: identities, family links, histories, the
documentation that helps stateless people prove they exist. This is exactly
[`concept.md`](concept.md) §3.4, and it is **Tier 2** data: "beneficiary
identities, family links, undocumented status, medical information, and photos of
identifiable people" ([Responsible AI policy](../content/legal/responsibleAi.ts)).
The risk register already rates a leak of this kind **Severe** (Risk #1,
"endangering undocumented people"). It belongs in **Stage C**, behind encryption,
access control, and least privilege, never on an unprotected system, and never
pasted into a general-purpose model.

Why this order is not just caution but strategy: Track 1 builds the trust, the
consent relationships, and the proof that the loop works. Track 2 then inherits
all of that and lands on a backend that actually deserves the data. Building the
registry first would invert the project's own "each stage earns the next" rule
and put the most vulnerable data on the least proven system.

> **Plainly:** we can start making children curious next month. We should not
> start a database of refugee children next month.

## The actors and their incentives

Three different people, three different incentives. Only one of them is paid in
money, and on purpose.

### Ong, the village steward

Ong is not a recruiter on commission; he is a part-time community learning
worker, the village's first AI-literacy guide. Compensate him like one.

- **A predictable monthly stipend** for the role, benchmarked to local
  community-health-worker norms _(amount to set with Ong and sanity-checked
  against local rates; not invented here)_. This is the bulk of what he receives,
  and it does not move with headcount.
- **Reimbursed running costs:** device charging, power, any data, and travel
  within the area (these map to the finance ledger's `inkind-logistics` and
  `education` categories in [`scripts/finance/schema.ts`](../scripts/finance/schema.ts)).
- **A modest quality recognition**, tied to _sustained_ engagement rather than
  signups: for example, the number of learners who had a real session in several
  different weeks of the month. We reward depth and return, never volume.
- **Explicitly not:** a per-profile bounty. We will tell Ong this in plain words,
  because the absence of that bounty is a feature he should understand and trust.

Ong also needs the project's standard onboarding gates before he works with
children: Code of Conduct, data and confidentiality agreement, and safeguarding
clearance, the same `worksWithVulnerable` gate the roster already tracks
([`scripts/team/schema.ts`](../scripts/team/schema.ts)).

### Families and children, the learners

For the people the program serves, money is the wrong currency. It invites
coercion, breeds dependency, and (see the next section) cuts against a promise
PRASM has already published. Use value, recognition, and delight instead.

- **A welcome gift with real meaning: a printed, framed photo** of the child or
  family. Many have none. The very photo that could one day seed a registry
  record arrives first as a gift the family keeps, which turns "taking a picture"
  into giving something rather than extracting it. A digital copy is kept later,
  and only with consent, under Track 2's rules.
- **A learning club, not a transaction.** One or two shared, durable devices and
  a way to charge them (solar) at a common spot, so coming to use AI is social
  and ordinary. Snacks and books for the club fit the `education` budget line.
- **Light, non-cash recognition:** a printed "explorer card" that earns a sticker
  each visit; small, human milestones ("asked ten questions," "taught the AI a
  Kayan word"); a notebook or a book on a child's interest. Recognition and
  supplies, never cash to a child.
- **The headline incentive: targeted follow-through, the "spark fund."** When a
  child's genuine interest surfaces (the example we keep coming back to: a
  seven-year-old who lights up about plants), PRASM shows up with something real,
  a simple botany kit, a book, some seeds. This is the most aligned incentive we
  have, because it rewards real curiosity, it materially helps the child, and it
  is the clearest proof the program changes lives. Budget a small per-child
  materials amount _(to set)_, drawn from the `education` and `sustainable`
  lines, spent on demonstrated interest, never promised in advance as a quid pro
  quo.

The shape of it: small nudges to start the habit, then let curiosity and visible
follow-through carry it, so we are neither "giving money with no expectation" nor
paying people to participate forever.

### A note on who is rewarded for what

Ong is paid for _labor_ (a role, transparently, like any worker). Families are
offered _value and recognition_ (never cash for a child's behavior). PRASM the
organization provides _help_ (the spark fund) as a program, openly and
consistently, not as any individual's private gift. Keeping those three straight
is what makes the next section hold.

## Reconciling incentives with safeguarding

PRASM has already published this commitment, and we do not get to quietly walk it
back: anyone representing PRASM "never offers money, gifts, or help in exchange
for anything" ([Safeguarding policy](../content/legal/safeguarding.ts)). That
line exists to prevent the oldest forms of exploitation: aid used as leverage
over vulnerable people, gifts used to groom. An incentive program has to be built
so that line stays completely true.

How we keep both:

- **Organizational, not personal.** Incentives are set, documented, and governed
  by PRASM, applied consistently, and visible to families. No individual (not
  Ong, not a volunteer, not a visitor) ever offers a child money, gifts, or help
  in exchange for anything. The program is the opposite of a private transaction.
- **Not contingent in a coercive way.** A family that takes part keeps the
  welcome photo and any help regardless. Recognition celebrates a child; it is
  never a withheld reward used as pressure. Nothing a child receives depends on
  disclosing anything sensitive.
- **The help is needs-based, not behavior-priced.** The spark fund follows
  genuine interest and need; it is not a payout schedule a child could be pushed
  to maximize.
- **More than one trusted adult.** Safeguarding already asks for this during
  activities; the learning club is built to be supervised and social, not a child
  alone with a device and one adult.
- **Update the policy if the program proceeds.** If PRASM adopts this, the
  Safeguarding and Responsible AI policies should gain a short, honest paragraph
  describing the program's incentives and these limits, so the public record
  stays accurate. AI proposes; the founder approves the wording.

If we cannot run an incentive without straining that promise, that is a signal to
change the incentive, not the promise.

## The data model: two layers per person

When a record does get created (Track 1 needs only the thinnest version; Track 2
is the full one), keep it in two strictly separated layers, mirroring the tiers
in [`internal-system-design.md`](governance/internal-system-design.md).

| Layer            | What it holds                                                                                                | Tier                              | Who can see it                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------- | ---------------------------------------------------------- |
| **Celebratory**  | First name or nickname, age band, the consented framed photo, milestones, a story the family is glad to tell | Tier 0 once consent recorded      | Ong and program staff; public only at the recorded consent level |
| **Private**      | Full identity, family links, undocumented status, the interest profile drawn from sessions, anything medical | **Tier 2**                        | Admin-only by default, least privilege, encrypted, access logged |

Rules that follow (all already in the project, applied here):

- **Collect the minimum.** Track 1 starts with first name or nickname, age band,
  and guardian consent. Nothing more until there is a reason and a secure place
  to keep it.
- **The two layers never merge** in a general-purpose model. Tier 2 stays out of
  any third-party model without de-identification or a private/local one
  ([Responsible AI red lines](../content/legal/responsibleAi.ts)).
- **Consent is explicit and revocable**, recorded the way the Story Bank already
  records consent levels for people
  ([`content/storyBank/types.ts`](../content/storyBank/types.ts)), and
  withdrawing it pulls the record.
- **The registry is local-first and offline-tolerant.** The village is off-grid
  (blueprint principle 5): capture on a device, sync to the secure store later,
  never assume a signal.

## Designing AI that is safe for children

Putting a general-purpose model in front of a seven-year-old is not a small
thing. The minimum bar before any child uses it:

- **A constrained "kid mode":** age-appropriate content, safety filtering, a scope
  narrowed toward learning and wonder, in the child's language where possible (the
  translation thread, [`concept.md`](concept.md) §3.7, and the multilingual
  commitment in the [Responsible AI policy](../content/legal/responsibleAi.ts)).
- **Supervised and shared**, per Safeguarding (more than one trusted adult; not a
  child alone with a device).
- **Offline-tolerant**, so a dropped signal degrades gracefully instead of
  failing a curious child.
- **A child's words are the child's.** Sessions are used to help that child learn
  and (with the family's knowledge) to understand what sparks them. They are
  Tier 2: never training fodder for a third-party model, never a public quote
  without consent.
- **A named accountable adult** for the tool, exactly as the Responsible AI
  policy requires ("a named person is accountable for each AI tool we run").

## "Understanding from a distance," reframed

The vision included understanding each child "from a distance without intruding,"
so PRASM can show up later with the right help. The intent is good. One word needs
to change: _distance_ becomes _openness_.

Quietly analyzing children's conversations to build interest profiles, however
kind the motive, is surveillance of minors. Done openly it becomes a gift: "we
pay attention to what excites your child, so we can bring something that helps."
Tell the family plainly, keep it minimal, let them opt out, and the same
mechanism that felt like watching becomes part of why they trust the program.
Openness is not the ethical tax on the idea; it is what makes the idea work,
because trust is the thing that keeps a child coming back.

## The loop

```
  guardian consent ──▶ welcome (framed photo) ──▶ AI session  (kid mode, supervised, offline ok)
   (revocable)                                          │
                                                        ▼
                              what sparks the child  (Tier 2, openly, minimal)
                                                        │
                                                        ▼
                               targeted help  (spark fund: a botany kit)
                                                        │
                                                        ▼
                    a child who keeps coming back ──▶ (only later, securely) a registry record
```

Same spirit as the flagship loop in [`concept.md`](concept.md): capture is
gentle, a human decides, and the system earns the next step rather than grabbing
it.

## Stages and build order

Following the project's "each stage earns the next" rule:

1. **Design and consent first (now).** Finalize the incentive model with Ong,
   write the guardian consent (in language), define kid mode, and add the
   program's paragraph to the Safeguarding and Responsible AI policies. No child
   enrolled yet.
2. **A tiny pilot (Track 1).** A handful of consenting families, one or two
   shared devices, the learning club. The thinnest possible data. Prove children
   come back and light up. Start small enough to supervise well and learn
   honestly _(exact size the founder's call)_.
3. **Learn and adjust.** Watch the honest metrics below. Refine kid mode, the
   rewards, and Ong's role. Decide whether the spark-fund follow-through is
   landing.
4. **Earn Track 2.** Only once the pilot has proven itself and a secure backend
   exists (Stage B/C in the blueprint) do we build the registry, lifting the
   celebratory layer in first and the Tier 2 layer in last, behind the role and
   row-level-security model already designed in
   [`internal-system-design.md`](governance/internal-system-design.md).

## What success looks like (measured honestly)

We resist vanity metrics (headcount, "profiles created"). What we actually watch:

- **Return rate:** how many learners come back across several different weeks. The
  core signal.
- **Depth:** real questions asked, topics explored, a child teaching the AI
  something.
- **Follow-through that helped:** spark-fund items that actually got used and
  mattered.
- **Consent health:** consent freely given, and families feeling genuinely free
  to withdraw (a low fear-to-withdraw is a good sign, not a bad one).
- **Zero safeguarding incidents**, and a live, used channel for raising concerns.

The honesty rule from the house voice applies to our own reporting too: no
invented numbers, no impact we cannot show
([voice guide](../content/storyBank/voice.ts)).

## Red lines (this program)

Inheriting [`concept.md`](concept.md)'s red lines, and adding:

- **Never pay per profile, per signup, or per photo.** Compensate Ong's role and
  reward sustained learning only.
- **Never enroll a child without a guardian's free, informed, revocable consent.**
- **Never make any reward or help contingent on disclosing sensitive
  information**, or use it as pressure.
- **Never let an individual offer a child money, gifts, or help in exchange for
  anything** (Safeguarding holds, in full).
- **Never put the registry (Tier 2) on an unprotected system, or into a
  general-purpose model.**
- **Never let a child use AI unsupervised, or outside kid mode.**
- **Never reveal the village's location** through a photo, a story, or a record
  (Risk #1).

## Risks (mapping to the register)

This program touches the project's most serious existing risks and sharpens them.
Suggested additions to [`risk-register.md`](governance/risk-register.md):

| Risk                                                                | Likelihood        | Impact     | Mitigation                                                                                              |
| ------------------------------------------------------------------- | ----------------- | ---------- | ------------------------------------------------------------------------------------------------------ |
| **Coercive incentives** pressure families or push Ong to over-enroll | Medium            | High       | Stipend not bounty; non-cash family rewards; consent freely revocable; this document's red lines       |
| **Registry leak** exposes undocumented children (sharpens Risk #1)   | Low if sequenced  | **Severe** | Track 2 waits for a secure backend; Tier 2 encryption, least privilege, access logs; local-first       |
| **Child-safety failure** with an AI tool (sharpens Risk #9)          | Low               | **Severe** | Kid mode; supervision; named accountable adult; offline-safe                                           |
| **Profile-data quality** corrupted by pay-for-data                   | Medium            | Medium     | Incentivize engagement not enrollment; minimum-data collection                                         |

## Decisions

Settled with the founder (June 2026):

1. **Curiosity now, registry later.** Adopted. The safest path to the same
   destination.
2. **Open and consented**, not "from a distance." Adopted. Openness is what earns
   the trust the program needs.
3. **A role, not a bounty.** The steward is paid a stipend plus costs, with no
   per-profile element. Adopted.

Still to set:

4. **The steward's stipend figure**, benchmarked to local norms (not invented
   here).
5. **Pilot size and logistics** (delegated to the build): see the recommended
   first pilot in
   [`governance/curiosity-program-rollout.md`](governance/curiosity-program-rollout.md).

Companion artifacts, now drafted: the §3.8 thread in [`concept.md`](concept.md),
the [rollout pack](governance/curiosity-program-rollout.md) (a guardian-consent
script, the kid-mode safety bar, and draft policy language to publish on launch),
and a clickable demo in `/preview` (walk it with
[`preview-demo.md`](preview-demo.md)).

## Changelog

- **v0.2** · June 2026 · recorded the settled decisions (curiosity now / registry
  later, open and consented, a role not a bounty); linked the rollout pack, the
  `concept.md` §3.8 thread, and the `/preview` demo.
- **v0.1** · June 2026 · first draft: the Curiosity Program, its incentive model,
  the two-track sequencing, the data model, child-safety design, and the path to
  the registry.
