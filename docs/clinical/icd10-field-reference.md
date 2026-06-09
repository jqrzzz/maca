# ICD-10 field reference (starter)

A starter set of ICD-10-CM codes for the conditions most likely to come up in
PRASM's medical records — the hand-written histories that also help establish a
person's identity ([`docs/concept.md`](../concept.md) → Clinical & Operations
Back-Office). Every code here was validated against the official **2026
ICD-10-CM** set; none are guessed.

> **What this is — and isn't.** This is a _documentation / coding_ reference and
> a starting scaffold for the founding doctor to curate. It is **not** clinical
> guidance — it doesn't tell anyone what to diagnose or treat. The doctor decides
> the diagnosis; this just helps record it consistently.

## Before you rely on it

- **ICD-10-CM vs Thailand.** These are ICD-10-CM (United States) codes. The
  3-character category (e.g. `J18`, `B54`) matches WHO ICD-10 and is the portable
  core; some subcodes differ from Thailand's ICD-10-TM. Use the 3-character
  category as the durable anchor, and confirm the full subcode against whatever
  system the receiving clinic or hospital uses.
- **"Unspecified" is a starting point.** Many of these are the "unspecified"
  member of their family. Where more is known — site, laterality, severity,
  trimester, the specific organism — use the more specific code. Injuries in
  particular are coded by site and by encounter (initial / subsequent / sequela)
  and aren't listed here; code them from the specific S/T chapter when needed.
- **Validated, not exhaustive.** Every code below is a valid, billable 2026
  ICD-10-CM code. It's a deliberately short starting set — add and prune as the
  village's real caseload becomes clear. The code set updates each October;
  re-check annually.

## Common presentations

### Respiratory

| Condition                                      | ICD-10-CM |
| ---------------------------------------------- | --------- |
| Acute upper respiratory infection, unspecified | J06.9     |
| Acute bronchitis, unspecified                  | J20.9     |
| Pneumonia, unspecified organism                | J18.9     |
| Unspecified asthma, uncomplicated              | J45.909   |

### Fever & vector-borne

| Condition                | ICD-10-CM |
| ------------------------ | --------- |
| Unspecified malaria      | B54       |
| Dengue fever [classical] | A90       |

### Gastrointestinal & hydration

| Condition                                       | ICD-10-CM |
| ----------------------------------------------- | --------- |
| Infectious gastroenteritis and colitis, unspec. | A09       |
| Dehydration                                     | E86.0     |
| Intestinal parasitism, unspecified              | B82.9     |

### Skin & soft tissue

| Condition                      | ICD-10-CM |
| ------------------------------ | --------- |
| Scabies                        | B86       |
| Cellulitis, unspecified        | L03.90    |
| Cutaneous abscess, unspecified | L02.91    |

### Nutrition & blood

| Condition                                       | ICD-10-CM |
| ----------------------------------------------- | --------- |
| Unspecified protein-calorie malnutrition        | E46       |
| Unspecified severe protein-calorie malnutrition | E43       |
| Anemia, unspecified                             | D64.9     |

### Noncommunicable (chronic)

| Condition                                      | ICD-10-CM |
| ---------------------------------------------- | --------- |
| Essential (primary) hypertension               | I10       |
| Type 2 diabetes mellitus without complications | E11.9     |

### Mental health (a conflict-affected community)

| Condition                                          | ICD-10-CM |
| -------------------------------------------------- | --------- |
| Post-traumatic stress disorder, unspecified        | F43.10    |
| Major depressive disorder, single episode, unspec. | F32.9     |
| Anxiety disorder, unspecified                      | F41.9     |

### Common symptoms (pending a firm diagnosis)

| Condition             | ICD-10-CM |
| --------------------- | --------- |
| Fever, unspecified    | R50.9     |
| Headache, unspecified | R51.9     |

### Documenting existing conditions

| Condition                             | ICD-10-CM |
| ------------------------------------- | --------- |
| Acquired absence of limb, unspecified | Z89.9     |

### Encounters & prevention

| Condition                                                    | ICD-10-CM |
| ------------------------------------------------------------ | --------- |
| General adult medical examination without abnormal findings  | Z00.00    |
| Routine child health examination without abnormal findings   | Z00.129   |
| Encounter for immunization                                   | Z23       |
| Supervision of normal first pregnancy, unspecified trimester | Z34.00    |

---

_Validated June 2026 against the 2026 ICD-10-CM code set. Descriptions are the
official ones. This is documentation reference, not clinical guidance._
