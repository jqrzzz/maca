# Translation worksheet (demo UI)

_The strings the /preview demo shows, English-first, for native speakers to
translate into Thai, Burmese, and Kayan. The demo always falls back to English,
so it never shows a blank or half-translated screen; filled-in translations slot
in cleanly. Companion to [`preview-demo.md`](../preview-demo.md) and the
i18n source in [`../../content/i18n.ts`](../../content/i18n.ts)._

**Status:** Draft v0.1 · June 2026 · Owner: founder

## How to use this

1. A native speaker fills the Thai, Burmese, and Kayan columns below. Keep the
   `{name}`, `{sticker}`, `{spark}`, and `{language}` placeholders exactly as
   they are; they get replaced with real words in the app.
2. Someone drops the translations into
   [`../../content/i18n.ts`](../../content/i18n.ts) under the matching locale
   (`th`, `my`, `kayan`) and key. Anything not filled stays English
   automatically.
3. A second native speaker checks it before it is shown to families.

Honest notes:

- **Kayan** should come from a person (ideally Ong). It is a low-resource
  language that current AI does not translate reliably, so it is left blank
  here on purpose rather than guessed. If Kayan is mostly spoken in the
  community, lean on the read-aloud and voice features rather than written
  Kayan.
- **Thai and Burmese** can be drafted by a translator and then checked. The AI
  itself handles Thai and Burmese reasonably; Kayan is the hard one for the AI
  too.
- This worksheet covers the **learner (kid mode)** UI first. The steward and
  founder screens, and the AI answers themselves (in
  [`../../content/curiosityDemo.ts`](../../content/curiosityDemo.ts)), are the
  next batches.

## Strings

| Key | English | Thai | Burmese | Kayan |
| --- | --- | --- | --- | --- |
| common.backToSite | Back to site | | | |
| learner.title | Curiosity | | | |
| learner.subtitle | Kid mode | | | |
| learner.tipTitle | You are the learner (kid mode) | | | |
| learner.tipBody | Ask a question, try a plant or the sky, to earn a sticker and show what you love. When a spark appears, switch to the Steward to watch it travel to the people who can help. | | | |
| learner.explorer | Explorer | | | |
| learner.cueKidMode | Kid mode | | | |
| learner.cueGrownup | A grown-up is with you | | | |
| learner.cueOffline | Works offline | | | |
| learner.readAloud | Read aloud | | | |
| learner.languageLabel | Your guide can answer in your language: | | | |
| learner.languageNote | When {language} is added, the app and your guide will speak it. For now it shows English. | | | |
| learner.earned | New sticker earned: {sticker}! | | | |
| learner.noticed | We noticed you love {spark}. We will tell the grown-up who helps you, so we can bring you something fun to explore it more. | | | |
| learner.welcome | Hi {name}! I am your curiosity guide. Ask me anything you wonder about. | | | |
| learner.keepExploring | Keep exploring | | | |
| learner.tryAsking | Try asking | | | |
| learner.simpler | Say it simpler | | | |
| learner.placeholder | Ask me anything you wonder about… | | | |
| learner.previewNote | Preview: this is a friendly demo with safe, ready-made answers. It is not connected to a live model, and nothing here is saved or sent. | | | |

## Next batches (not yet wired)

- **Learner extras:** the spoken-vs-written counts ("3 stickers", "2 questions
  today"), age labels (Child, Teen, Adult), and the icon-button labels (send,
  microphone, leave). Held back so plural and grammar choices are made by the
  translator, not guessed.
- **Steward and founder screens:** the same approach, once the learner set is
  verified.
- **AI answers:** the canned replies and "simpler" versions in
  [`../../content/curiosityDemo.ts`](../../content/curiosityDemo.ts). In the real
  app the model answers in-language; for the demo these would be translated the
  same way.

## Changelog

- **v0.1** · June 2026 · first worksheet for the learner (kid mode) UI strings.
