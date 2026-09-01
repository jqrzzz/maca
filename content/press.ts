/**
 * Press & media kit content. Boilerplate is imported from the Story Bank so the
 * approved descriptions can never drift from what the org actually says about
 * itself. Fast facts are verified-only — no placeholders, no unconfirmed dates.
 */
import { site } from "@/content/site";
import { boilerplate } from "@/content/storyBank";

export const pressIntro = {
  eyebrow: "Press & media",
  title: "Telling this story, safely",
  lede: "Everything a journalist, blogger, or partner needs to write about PRASM accurately, and the few rules that keep a vulnerable community safe.",
};

/** Verified-only facts, phrased for direct quotation. */
export const fastFacts: { label: string; value: string }[] = [
  { label: "Name", value: `${site.name} ("${site.shortName}")` },
  {
    label: "What we do",
    value:
      "Medical care & transport, education access, off-grid solar/water/food support, and hand-written medical records that double as proof of identity",
  },
  {
    label: "Who we serve",
    value:
      "Kayan refugee families from Myanmar living off-grid, largely undocumented, in Mae Hong Son province, Thailand",
  },
  /*
   * Named, replacing "A medical doctor (named by role, by choice, for now)".
   *
   * This list's own rule is verified-only — no placeholders, no unconfirmed dates —
   * so what is here is only what his own curricula vitae and independent press
   * actually record. The chairmanship in particular is corroborated outside his own
   * documents: MJBizDaily reported it in July 2019.
   *
   * What is deliberately absent is a medical registration number. Four CVs asserting
   * MD are the doctor's account of himself, which is a different object from a
   * registry a journalist can search, and this is the one page on this site that
   * exists to be quoted. When the number arrives it belongs here, not before.
   */
  {
    label: "Founded by",
    value:
      "Dr. Kwon Yonghyun (권용현), MD — a Korean physician practising in Thailand, and chairperson of the Korea Cannabinoid Association since 2018",
  },
  {
    label: "Status",
    value:
      "Emerging, founder-led initiative: not yet a registered charity, and we say so plainly",
  },
  { label: "Languages on site", value: "English (Thai and Burmese planned)" },
];

/** Approved descriptions at three lengths — copy-paste safe. */
export const approvedDescriptions: { label: string; text: string }[] = [
  { label: "One line", text: boilerplate.oneLiner },
  { label: "Short", text: boilerplate.short },
  { label: "Standard (~80 words)", text: boilerplate.standard },
];

export const mediaGuidelines = {
  title: "Ground rules for covering PRASM",
  intro:
    "We'll help any honest story, and we ask every writer and photographer to hold the same lines we hold ourselves:",
  rules: [
    "Never publish or hint at the village's exact location. Many residents are undocumented, and a place name or recognizable landmark can endanger them.",
    "No names or identifiable images of community members, especially children, without their informed consent, confirmed through us.",
    "Describe where we work as: " + boilerplate.place + ".",
    "Dignity over drama: the community is self-reliant and capable. Please don't frame people as helpless victims.",
    "Don't state that PRASM is a registered charity or that donations are tax-deductible. Neither is true yet, and we'd rather be quoted accurately.",
  ],
};

/**
 * A short founder biography, for a journalist who needs more than the fast fact.
 *
 * Every line is drawn from documents he supplied or from independent press, and the
 * page it links to carries his full record — including a standing note that the
 * credentials there are his own account until a registry reference is published.
 * Pointing at that rather than restating it here means this kit cannot drift out of
 * step with it, and a writer who wants to check gets the caveat too.
 */
export const founderBio = {
  title: "About the founder",
  body: [
    "PRASM was founded by Dr. Kwon Yonghyun (권용현), a Korean physician who graduated from Korea University Medical College and has practised integrative and holistic medicine since. He directed Bloom Clinic in Seoul from 2008 to 2017, and in 2019 an integrative clinic of his own.",
    "He chairs the Korea Cannabinoid Association, which connects patients with doctors and advises on cannabis in Korea, and has chaired the Korea Aromatherapy Association since 2014. MJBizDaily described him in 2019 as the first doctor in Korea specializing in cannabinoids. He is a credited subject in Pull (2025), a documentary on the Korean hemp movement.",
    "He now lives and practises in Thailand, where his own practice, MahKha, funds part of this work. His full record, and an honest note on what of it can and cannot yet be verified, is published there.",
  ],
  link: {
    label: "His practice and full record — mahkha.com",
    href: "https://mahkha.com/about",
  },
};

export const whatWeOffer: { title: string; body: string }[] = [
  {
    title: "Interviews",
    body: "Dr. Kwon is available for interviews by arrangement. Contact us and we'll find a time across time zones.",
  },
  {
    title: "First-hand material",
    body: "Our field notes are first-person accounts from the village, free to quote with attribution to PRASM and a link.",
  },
  {
    title: "Fact-checking",
    body: "Ask us before you print a number. We'll tell you plainly what we can verify and what we can't yet.",
  },
];

export const assets = {
  title: "Logo & images",
  body: "Our logo and social card are below. Photography of the community is shared case-by-case under our consent rules. Just ask us.",
  files: [
    { label: "PRASM logo (PNG)", href: "/logo.png" },
    { label: "Social / Open Graph card (PNG)", href: "/og.png" },
  ],
};
