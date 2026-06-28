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
