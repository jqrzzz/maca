/**
 * "Get Involved" — non-monetary ways to help, drawn from the founder's
 * recurring call to action (teach / volunteer / donate goods / spread word).
 */

export const getInvolvedIntro = {
  eyebrow: "Get involved",
  title: "There are many ways to help",
  lede: "Money is only one kind of support. Your time, skills, and voice matter just as much to this community.",
};

export type InvolveWay = {
  icon: "teach" | "volunteer" | "goods" | "share";
  title: string;
  body: string;
  cta: { label: string; href: string };
};

export const ways: InvolveWay[] = [
  {
    icon: "teach",
    title: "Teach",
    body: "Languages, skills, fitness, or anything genuinely useful. Education is one of the biggest gaps here, and a willing teacher goes a long way.",
    cta: { label: "Get in touch", href: "/contact" },
  },
  {
    icon: "volunteer",
    title: "Volunteer",
    body: "Share whatever you're good at, in a good way: music, farming, building habitats, or helping with everyday work in the village.",
    cta: { label: "Offer your time", href: "/contact" },
  },
  {
    icon: "goods",
    title: "Donate goods",
    body: "Practical things a community needs: medicine, clothes, blankets, tools, solar panels, electrical devices, vehicles.",
    cta: { label: "See what's needed", href: "/give" },
  },
  {
    icon: "share",
    title: "Spread the word",
    body: "Share PRASM with people who care. Visibility is its own kind of help for a community the world tends to overlook.",
    cta: { label: "Follow & share", href: "/contact" },
  },
];

export const involveNote = {
  title: "A note on coordinating",
  body: "The village is remote and off-grid, and we're a small team. Please reach out before planning a visit or a shipment so we can make sure your help lands where it's needed most, safely and with the community's blessing.",
};
