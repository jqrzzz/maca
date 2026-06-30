/**
 * Demo data for a student/member account: the individual login at the heart of
 * the platform. It gathers the four data domains from the notes, each with a
 * privacy posture: Identity (private), Health (most protected, never sent to a
 * general-purpose model), Curiosity (celebratory), and Language (celebratory).
 *
 * Entirely fake and presentational. No real person, full name, or record
 * appears. In the demo nothing is saved beyond the browser session. The real
 * system keeps Identity and Health as encrypted, consent-bound, access-logged
 * data the family controls.
 */

import { type AgeBand, type ConsentStatus } from "./curiosityDemo";

export type MedicalKind =
  | "allergy"
  | "condition"
  | "medication"
  | "visit"
  | "note";

export const medicalKindLabel: Record<MedicalKind, string> = {
  allergy: "Allergy",
  condition: "Condition",
  medication: "Medication",
  visit: "Clinic visit",
  note: "Note",
};

export type MedicalEntry = {
  id: string;
  kind: MedicalKind;
  title: string;
  detail: string;
  /** Display date, for example "Jun 12". Demo only. */
  date: string;
};

export type StudentProfile = {
  id: string;
  /** A chosen nickname, the celebratory (Tier 0) name. */
  explorerName: string;
  /** Private (Tier 2); shown masked in the demo. */
  fullNameMasked: string;
  ageBand: AgeBand;
  /** A chosen character avatar, never a real photo, so identity stays private. */
  avatar: string;
  languages: string[];
  learningEnglish: boolean;
  /** Private (Tier 2). */
  household: string;
  /** Private (Tier 2). */
  statusNote: string;
  consent: ConsentStatus;
  joined: string;
  /** What lights them up, shared openly (Tier 0). */
  interest?: string;
  /** Most protected (Tier 2+). Never sent to a general-purpose model. */
  medical: MedicalEntry[];
};

/** A small set of warm, recognizable avatars to choose from. */
export const avatarChoices = [
  "🌱",
  "🐘",
  "🦋",
  "🐦",
  "🌟",
  "🐟",
  "🌸",
  "🏔️",
  "🌙",
  "🐅",
];

export const demoStudent: StudentProfile = {
  id: "S-you",
  explorerName: "Sky",
  fullNameMasked: "S•• ••••••",
  ageBand: "adult",
  avatar: "🌱",
  languages: ["Kayan", "Thai (a little)"],
  learningEnglish: true,
  household: "Parent of two young learners",
  statusNote: "Undocumented, no birth record",
  consent: "given",
  joined: "Jun 8",
  interest: "Phones and how things work",
  medical: [
    {
      id: "M-01",
      kind: "allergy",
      title: "Penicillin",
      detail: "A rash when given penicillin as a child.",
      date: "Jun 8",
    },
    {
      id: "M-02",
      kind: "condition",
      title: "Mild asthma",
      detail: "Worse in the cool season. Uses an inhaler when needed.",
      date: "Jun 8",
    },
    {
      id: "M-03",
      kind: "visit",
      title: "Mobile clinic checkup",
      detail: "Seen at the June mobile clinic. Blood pressure normal.",
      date: "Jun 12",
    },
  ],
};
