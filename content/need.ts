/**
 * "The Need" — told soberly but with dignity. Grounded in the founder's
 * first-hand field notes. Ends by turning from hardship to agency.
 */

export const needIntro = {
  eyebrow: "The need",
  title: "Invisible, but not powerless",
  lede: "The families MACA supports fled a war that took their homes. In Thailand they are safe from the fighting — but without papers, they fall through every system built to help.",
};

export type NeedSection = {
  id: string;
  title: string;
  body: string[];
};

export const needSections: NeedSection[] = [
  {
    id: "fleeing-war",
    title: "Fleeing war",
    body: [
      "These families come from Myanmar, where their homes were taken over by the army. Some arrive the day they cross the border, carrying what they could hold.",
      "Among them are wounded ex-combatants — people who have lost eyes, fingers, limbs — and children who have lost parents. The cost of the conflict is written on the village itself.",
    ],
  },
  {
    id: "ghosts",
    title: "Living as “ghosts”",
    body: [
      "Born or arriving outside any registry, many here have no Thai ID — and often no identity document at all. Children, especially, are effectively invisible: no birth record, no proof they exist.",
      "Without identity, ordinary life becomes a locked door. You cannot easily enroll in school, prove who you are, or claim the protections that documentation quietly provides.",
    ],
  },
  {
    id: "consequences",
    title: "What that costs them",
    body: [],
  },
  {
    id: "not-helplessness",
    title: "This is not a story of helplessness",
    body: [
      "The village is off-grid and largely self-sufficient: solar pumps the water, gardens and animals provide food, and neighbors hold one another up through deep tribal solidarity.",
      "What's missing isn't will or dignity — it's a few things outsiders can provide: a way to be seen, a way to be treated when sick, and a way for children to learn. That's where MACA comes in.",
    ],
  },
];

/** The consequences grid (rendered under the "consequences" section). */
export const consequences: { title: string; body: string }[] = [
  {
    title: "No school",
    body: "Without Thai ID, children are barred from public school. The camp school needs paperwork and travel many families can't manage.",
  },
  {
    title: "Healthcare they can't afford",
    body: "Hospitals charge refugees the full foreigner rate — the same as a tourist — with no insurance to soften it. A single visit can be impossible.",
  },
  {
    title: "Identity they can't prove",
    body: "At a hospital or checkpoint, there's no document to show. Without a record of having existed, even basic help is hard to unlock.",
  },
];
