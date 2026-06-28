# The /preview demo: a walkthrough guide

_How to run and read the clickable Curiosity Program demo that lives at
`/preview`. It is a companion to the proposal ([`curiosity-program.md`](curiosity-program.md)),
the blueprint thread ([`concept.md`](concept.md) §3.8), and the rollout pack
([`governance/curiosity-program-rollout.md`](governance/curiosity-program-rollout.md)).
A living document._

**Status:** Draft v0.2 · June 2026 · Owner: founder

## What this is

A visual, clickable preview of the future internal console and the Curiosity
Program, so we can see and talk through the idea before building anything real.
It has **no backend**: all data is sample data, nothing is saved to a server,
and nothing leaves the browser. The route is set to noindex; it is for us, not
the public.

## How to run it

```bash
npm install   # first time only
npm run dev   # then open http://localhost:3000/preview
```

## The entry points

The login screen offers four views, grouped into two:

- **Internal console**
  - **Admin (founder):** the operations console (people, finance, approvals,
    field captures, the Curiosity Program, boardroom).
  - **Field member:** the simple capture app (photo, note, voice, expense).
- **Curiosity Program**
  - **Village steward (Ong):** welcome learners, see who comes back, suggest
    follow-through, log a session, and read the consent script.
  - **Young learner (kid mode):** a safe, friendly AI to ask anything, by
    typing, tapping a suggestion, or speaking, and to hear answers read aloud.

Inside any Curiosity view there is a **perspective switcher** (Learner · Steward
· Founder), so you can hop between the three without signing out.

## A three-minute walkthrough

The point of the demo is one loop, seen from three sides:

1. **As the young learner**, ask "How do plants drink water?" (type it, tap the
   suggestion, or press the microphone and say it). You get a warm answer, earn
   a sticker, and a "spark" appears: we noticed you love plants. Try **Read
   aloud** and **Say it simpler**, and follow a "Keep exploring" suggestion.
2. **Switch to the steward.** That spark is waiting under Sparks, in the "Live
   this session" list. Tap **Suggest follow-through**.
3. **Switch to the founder.** The same spark is in the Spark fund. **Approve**
   it. Then **Reveal (Tier 2)** on a learner to see the private layer the
   steward cannot, and notice the access is logged.

That is the whole thesis in motion: a curious child, noticed openly, a human
deciding, and real help on the way, with the people at the centre and AI quietly
in the engine room.

## More to show in the meeting

Built for the sit-down with Ong and for funder conversations:

- **Capture a language live (kid mode).** Switch the language and tap **Help us
  say it in {language}**. Ong says a word, you type what he gives, and the app
  shows his language back at once. **Copy** or **Download** to add it to the
  translation worksheet. Nothing is guessed, especially Kayan; it falls back to
  English until a person fills it in.
- **A welcome photo (steward, Enroll).** When a family wants the framed-photo
  gift, snap it right there. It previews inside a frame, becomes the learner's
  picture in the roster, and stays on the device, never uploaded.
- **Practice a first session (steward, Guide).** A calm, step-by-step rehearsal
  of one visit (consent, welcome, the child asks, a spark, a note), readable
  aloud, that Ong can run as many times as he likes. Also at
  `/preview/run-through`.
- **A one-page overview (founder).** A printable, honest summary for foundation
  and donor conversations, at `/preview/overview`. It says plainly that this is a
  pilot in preparation, not a running service.

## What is real, and what is demo

- **Real browser features:** the microphone (speech recognition) and read-aloud
  (speech synthesis) use the browser's own capabilities; the camera takes a
  welcome photo that stays on the device; and the session-notes pad and any
  translations you capture save to this browser's local storage, so they survive
  a reload.
- **Demo only:** the AI answers are safe, ready-made responses, not a live
  model, and all learners, sparks, finances, and people are sample data. The
  interface is English-first and falls back to English; you can capture real
  translations live (see below) and they apply at once, but the ready-made AI
  answers stay in English in the preview.

## Capturing your feedback

Every view has a floating **Notes** button. Jot observations as you click; each
note is tagged with where you were. When you are done, open it and **Download**
(or **Copy all**) to get a Markdown file of your notes for the session.

## How it maps to the plan

- The **incentive model and ethics** are in [`curiosity-program.md`](curiosity-program.md).
- The **blueprint thread** is [`concept.md`](concept.md) §3.8.
- The **pilot rollout pack** (consent script, kid-mode safety bar, draft policy
  language) is in [`governance/curiosity-program-rollout.md`](governance/curiosity-program-rollout.md).
- The **translation worksheet** the live-capture panel feeds is in
  [`governance/translation-worksheet.md`](governance/translation-worksheet.md).
- The **printable pages** the demo links to: the consent card at
  `/preview/consent`, the steward guide at `/preview/steward-guide`, the
  first-session rehearsal at `/preview/run-through`, and the one-page overview at
  `/preview/overview`.

## What it deliberately is not

It is not connected to anything, it is not the real registry (the registry is
Tier 2 and waits for a secure backend, per the proposal), and it does not imply
the program is running. It is a faithful picture of where we are headed, honest
about being a picture.

## Changelog

- **v0.2** · June 2026 · added the meeting features (live translation capture,
  welcome photo, first-session rehearsal, one-page overview) and the printable
  routes; refreshed what is real vs demo.
- **v0.1** · June 2026 · first draft of the walkthrough guide.
