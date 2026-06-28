/**
 * Tiny i18n layer for the /preview demo. English-first: the `en` dictionary is
 * the source of truth and is always complete; the other locales start empty and
 * fall back to English until a native speaker fills them in (see
 * docs/governance/translation-worksheet.md). This keeps the demo honest, it
 * never shows a wrong or half-translated string, and real translations slot in
 * without touching components.
 *
 * Kayan especially must come from a person: it is a low-resource language that
 * current AI models do not translate reliably, so we do not guess it here.
 */

export type Locale = "en" | "th" | "my" | "kayan";

export const locales: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "th", label: "Thai" },
  { code: "my", label: "Burmese" },
  { code: "kayan", label: "Kayan" },
];

export const localeLabel = (code: Locale): string =>
  locales.find((l) => l.code === code)?.label ?? code;

/** English source strings for the learner (kid mode) surface. */
export const en = {
  "common.backToSite": "Back to site",

  "learner.title": "Curiosity",
  "learner.subtitle": "Kid mode",
  "learner.tipTitle": "You are the learner (kid mode)",
  "learner.tipBody":
    "Ask a question, try a plant or the sky, to earn a sticker and show what you love. When a spark appears, switch to the Steward to watch it travel to the people who can help.",

  "learner.explorer": "Explorer",
  "learner.cueKidMode": "Kid mode",
  "learner.cueGrownup": "A grown-up is with you",
  "learner.cueOffline": "Works offline",
  "learner.readAloud": "Read aloud",

  "learner.languageLabel": "Your guide can answer in your language:",
  "learner.languageNote":
    "When {language} is added, the app and your guide will speak it. For now it shows English.",
  "learner.helpTranslate": "Help us say it in {language}",

  "learner.earned": "New sticker earned: {sticker}!",
  "learner.noticed":
    "We noticed you love {spark}. We will tell the grown-up who helps you, so we can bring you something fun to explore it more.",

  "learner.welcome":
    "Hi {name}! I am your curiosity guide. Ask me anything you wonder about.",
  "learner.keepExploring": "Keep exploring",
  "learner.tryAsking": "Try asking",
  "learner.simpler": "Say it simpler",
  "learner.placeholder": "Ask me anything you wonder about…",
  "learner.previewNote":
    "Preview: this is a friendly demo with safe, ready-made answers. It is not connected to a live model, and nothing here is saved or sent.",
} satisfies Record<string, string>;

export type StringKey = keyof typeof en;

/**
 * Human-verified translations slot in here. Empty objects mean "not translated
 * yet"; `translate` falls back to English so nothing ever shows blank or wrong.
 */
export const translations: Record<
  Locale,
  Partial<Record<StringKey, string>>
> = {
  en,
  th: {},
  my: {},
  kayan: {},
};

export function translate(locale: Locale, key: StringKey): string {
  return translations[locale][key] ?? en[key];
}

/** Replace {name}-style placeholders in a translated string. */
export function fill(template: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce(
    (out, [k, v]) => out.split(`{${k}}`).join(v),
    template,
  );
}
