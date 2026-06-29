/**
 * Demo content for the Language Center: a small, safe set of useful beginner
 * English phrases to practice. The real experience is an AI teacher that greets
 * and explains in the learner's own language and teaches English at their pace.
 * Here the lessons are fixed and English-first, read aloud by the browser.
 * Nothing is a live model and nothing is saved.
 *
 * We do not fabricate Kayan or Thai lesson text. The app shows English and reads
 * it aloud; in the real system the teacher speaks the learner's language.
 */

export type Phrase = {
  english: string;
  /** When or how to use it, in plain words. */
  meaning: string;
};

export type PhraseSet = {
  id: string;
  title: string;
  /** Maps to an icon in the component. */
  icon: string;
  phrases: Phrase[];
};

export const phraseSets: PhraseSet[] = [
  {
    id: "greetings",
    title: "Greetings and thanks",
    icon: "greet",
    phrases: [
      { english: "Hello.", meaning: "A friendly greeting for anyone." },
      { english: "Thank you.", meaning: "To show that you are grateful." },
      { english: "My name is ...", meaning: "To tell someone who you are." },
      { english: "Nice to meet you.", meaning: "When you meet someone new." },
    ],
  },
  {
    id: "help",
    title: "Asking for help",
    icon: "help",
    phrases: [
      {
        english: "I need help.",
        meaning: "When you need someone to help you.",
      },
      {
        english: "I do not understand.",
        meaning: "When something is not clear to you.",
      },
      {
        english: "Please speak slowly.",
        meaning: "To ask someone to slow down.",
      },
      {
        english: "Can you help me, please?",
        meaning: "A polite way to ask for help.",
      },
    ],
  },
  {
    id: "clinic",
    title: "At the clinic",
    icon: "clinic",
    phrases: [
      { english: "I feel sick.", meaning: "To tell the nurse you are unwell." },
      {
        english: "It hurts here.",
        meaning: "Say it while you point to the pain.",
      },
      { english: "I need a doctor.", meaning: "To ask to see a doctor." },
      {
        english: "Where is the water?",
        meaning: "To ask where to find water.",
      },
    ],
  },
];
