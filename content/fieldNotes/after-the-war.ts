import type { FieldNote } from "./types";

// NOTE: This post touches on wounded individuals. Keep it dignified and
// non-identifying. Confirm consent before adding any real names or photos.
export const note: FieldNote = {
  slug: "after-the-war",
  title: "After the war",
  date: "2025-03-04",
  displayDate: "March 4, 2025",
  tag: "The village",
  excerpt:
    "On the way to the village we stopped at a ward of wounded patients. The cost of the conflict is written on the people who survived it, and on the children left behind.",
  heroImage: "villageLife",
  body: [
    {
      type: "p",
      text: "On the road to the village we stopped at a ward for seriously wounded patients. I met my friend's best friend, who had lost both his eyes and several fingers. There were others without limbs. My friend himself was retired after a gunshot to the belly. Lucky, in his words, to still be able to work.",
    },
    {
      type: "p",
      text: "When a parent doesn't survive the battlefield, a child is left behind. When neither parent survives, that child carries the hardest weight of all. It's difficult to imagine.",
    },
    {
      type: "h",
      text: "Why the community holds",
    },
    {
      type: "p",
      text: "And yet the village endures, held together by tribal solidarity. Each person walks their own path, but they are connected and supported by one another. For someone from a modern, individualist city, it is a striking thing to witness.",
    },
    {
      type: "p",
      text: "This is the community PRASM stands with: not a place of helplessness, but a place of resilience that simply deserves a few things the rest of us take for granted.",
    },
  ],
};
