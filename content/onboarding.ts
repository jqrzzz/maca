/**
 * Plain-language orientation content for the Curiosity Program: a guide for the
 * village steward (Ong) and a short explainer for the owner who introduces it to
 * him. Kept as data, English-first, structured so it can be translated (it joins
 * docs/governance/translation-worksheet.md as the next batch). Written to be read
 * aloud and shown, not studied: short sentences, no jargon, no "AI" required.
 */

export type GuideStep = { icon: string; text: string };

export const stewardGuide = {
  intro:
    "You are the village steward. Here is what this is, why it helps, and what you do. You do not need to be a teacher or know about computers.",
  whatItIs: {
    heading: "What it is",
    body: "A learning club. Children sit with a friendly, safe helper on a tablet and ask about anything they wonder about. A grown-up is always there.",
  },
  whyItHelps: {
    heading: "Why it helps",
    body: "There is no teacher out here, but children are full of questions. The helper answers them and never gets tired. When a child keeps loving something, we bring them something to grow it.",
  },
  routineHeading: "What you do, each visit",
  routine: [
    { icon: "users", text: "Gather a few children at the common spot." },
    {
      icon: "shield",
      text: "Make sure another trusted grown-up is there with you.",
    },
    {
      icon: "speak",
      text: "Hand them the tablet. Let them ask, by typing or by speaking.",
    },
    { icon: "listen", text: "Let them hear the answers and keep exploring." },
    {
      icon: "note",
      text: "Write one short note: who came, and what excited them.",
    },
  ] as GuideStep[],
  rulesHeading: "Three rules to keep",
  rules: [
    {
      icon: "consent",
      text: "Consent belongs to the family. Always ask first, and they can say no.",
    },
    { icon: "users", text: "A grown-up is always with the children." },
    { icon: "lock", text: "Private things about people stay private." },
  ] as GuideStep[],
  support: {
    heading: "You are supported",
    body: "This is a real role, with a stipend for the role, not a payment for each child. The helper does the answering. Your job is to make it safe, welcoming, and fun.",
  },
};

/**
 * A calm, step-by-step rehearsal of one visit, so the steward can practice
 * before the real thing. It mirrors the live demo flow: consent, welcome, the
 * child asks, a spark is noticed, a short note. Each step has what to do and,
 * where it helps, a short line to say (the lines worth translating first).
 */
export type SessionStep = {
  icon: string;
  title: string;
  /** What the steward does at this step. */
  you: string;
  /** A short line the steward can say, ideally in the family's language. */
  say?: string;
  /** A safety reminder that belongs with this step. */
  safety?: string;
};

export const firstSession = {
  intro:
    "A calm walk-through of one visit, so you know just what to do. Practice it as many times as you like. Nothing here is saved.",
  steps: [
    {
      icon: "consent",
      title: "Get consent first",
      you: "Gather a few children at the common spot, and make sure another trusted grown-up is with you. Ask each family first, in their language. They are free to say no, and nothing is lost if they do.",
      say: "This is a free learning club for curious children. Would you like yours to join today?",
      safety: "A parent agrees first, and a grown-up always stays.",
    },
    {
      icon: "welcome",
      title: "Welcome the explorer",
      you: "Add the child with a name or a nickname and an age group. If the family likes, take a welcome photo to print and frame as a gift.",
      say: "What name would you like to use here?",
    },
    {
      icon: "speak",
      title: "Hand over the tablet",
      you: "Let the child ask anything they wonder about, by typing or by speaking. Turn on read aloud so they can hear the answers. The helper is kind and never grows tired.",
      say: "Ask anything you are curious about.",
    },
    {
      icon: "sprout",
      title: "Notice a spark",
      you: "When a child keeps lighting up about one thing, the app notices it openly. It will appear later in your Sparks list to suggest a small follow-up.",
      say: "You really love this. Let us tell the grown-up who helps you, so we can bring you more.",
    },
    {
      icon: "note",
      title: "Write one short note",
      you: "Before you finish, write one line: who came, and what excited them. That is all the record we keep.",
    },
  ] as SessionStep[],
  done: {
    heading: "That is the whole visit",
    body: "You did it. A calm, happy visit is the whole job.",
    next: [
      "You suggest a spark for a child who keeps lighting up.",
      "The founder approves it before anything is bought.",
      "We bring something small to help them grow it.",
    ],
  },
};

export type OwnerStep = { title: string; body: string };

export const ownerSteps: OwnerStep[] = [
  {
    title: "Start with his hands, not a talk",
    body: "Let Ong use kid mode himself first, by voice. Once it answers him, the purpose is obvious.",
  },
  {
    title: "Explain it in his world",
    body: "No teacher out here; curious children get to learn; when we see what a child loves, we bring something to grow it; you are the one who makes it happen.",
  },
  {
    title: "Keep the job small",
    body: "Walk through the five-step weekly routine in the steward guide. That is the whole job.",
  },
  {
    title: "Three safety rules",
    body: "Consent belongs to the family; a grown-up is always present; private things about people stay private.",
  },
  {
    title: "Make him the language partner",
    body: "Open the translation worksheet and ask for the Kayan words. It gives him ownership, and gets you real Kayan.",
  },
  {
    title: "He does not need to understand the technology",
    body: "Aim for confidence, a clear role, and trust, not technical understanding. The tool is just a tool he is good at using.",
  },
];
