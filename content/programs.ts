import type { ImageKey } from "@/lib/images";

export type Program = {
  slug: string;
  icon: ProgramIcon;
  title: string;
  summary: string;
  body: string[];
  status: "active" | "planned";
  image?: ImageKey;
};

/** Icon keys mapped to lucide components in the ProgramCard. */
export type ProgramIcon =
  | "stethoscope"
  | "graduation"
  | "leaf"
  | "package"
  | "fingerprint"
  | "fileText"
  | "sparkles";

export const programsIntro = {
  eyebrow: "What we do",
  title: "Care today, dignity for tomorrow",
  lede: "PRASM's work begins with the most urgent needs — health and survival — and builds toward something lasting: a community that can prove who it is and stand on its own.",
};

export const activePrograms: Program[] = [
  {
    slug: "medical-care",
    icon: "stethoscope",
    title: "Medical care & records",
    summary:
      "Covering urgent treatment and transport, and building a written medical history for each person.",
    body: [
      "When someone falls ill, the nearest hospital charges refugees full foreigner rates with no insurance — often impossible to afford. PRASM helps cover urgent care and the journey to reach it.",
      "Our founder, a doctor, also builds a proper medical record for each patient. These histories guide future care — and, over time, become quiet proof that a person exists and has been here.",
    ],
    status: "active",
    image: "programsMedical",
  },
  {
    slug: "education",
    icon: "graduation",
    title: "Education access",
    summary:
      "Helping children learn despite the paperwork and distance that keep them out of school.",
    body: [
      "Without Thai ID, children are turned away from public schools. The nearest camp school demands paperwork and travel many families can't manage.",
      "We support learning in the village — materials, volunteer teachers, and the documentation that can one day open a classroom door.",
    ],
    status: "active",
  },
  {
    slug: "sustainable-living",
    icon: "leaf",
    title: "Sustainable off-grid life",
    summary:
      "Backing the solar, water, and food systems that keep the village self-reliant.",
    body: [
      "The village already lives lightly: solar panels drive the water pump, gardens and animals feed families, and fabric is woven by hand.",
      "PRASM helps maintain and extend this infrastructure — more solar, better water access, tools — so self-reliance grows rather than dependence.",
    ],
    status: "active",
  },
  {
    slug: "in-kind",
    icon: "package",
    title: "In-kind support & logistics",
    summary:
      "Getting medicine, clothing, tools, and supplies to a remote community.",
    body: [
      "Cash isn't the only way to help. Medicine, blankets, tools, solar gear, and vehicles all matter here.",
      "We coordinate what's genuinely needed and handle the hard part: getting it up into the hills.",
    ],
    status: "active",
  },
];

export const roadmap = {
  eyebrow: "On the roadmap",
  title: "What we're building next",
  lede: "These programs are in development. They're the reason PRASM exists as a foundation — and why your support today matters.",
  items: [
    {
      slug: "identity",
      icon: "fingerprint" as ProgramIcon,
      title: "Identity & documentation",
      summary:
        "A simple, dignified ID for people the system treats as invisible — so a name, a face, and a history can be recognized at a hospital or a school.",
      status: "planned" as const,
    },
    {
      slug: "digital-records",
      icon: "fileText" as ProgramIcon,
      title: "Digital medical records",
      summary:
        "Moving hand-written histories into a secure, portable record that travels with each patient between clinics and across time.",
      status: "planned" as const,
    },
    {
      slug: "ai-support",
      icon: "sparkles" as ProgramIcon,
      title: "AI-assisted care",
      summary:
        "Tools to help a small team translate, triage, and document care for many people in many languages — thoughtfully, and privately.",
      status: "planned" as const,
    },
  ],
};
