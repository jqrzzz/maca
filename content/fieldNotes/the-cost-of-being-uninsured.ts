import type { FieldNote } from "./types";

export const note: FieldNote = {
  slug: "the-cost-of-being-uninsured",
  title: "The cost of being uninsured",
  date: "2025-01-18",
  displayDate: "January 18, 2025",
  tag: "Medical",
  excerpt:
    "For a refugee, a hospital charges the same as it would a tourist, and there's no insurance to soften it. A single visit can be the difference between getting care and going without.",
  heroImage: "needWar",
  body: [
    {
      type: "p",
      text: "Medical care in Thailand is much more expensive for foreigners than for citizens. A refugee is billed at that same foreigner rate, as if they were a tourist on holiday. And there is no insurance for refugees to fall back on.",
    },
    {
      type: "p",
      text: "So a fever, an injury, a worrying symptom in a child. Things that should mean a quick trip to a clinic instead become a calculation about money the family doesn't have.",
    },
    {
      type: "h",
      text: "What support changes",
    },
    {
      type: "list",
      items: [
        "It covers the bill that would otherwise be impossible.",
        "It pays for the transport to reach the hospital in the first place.",
        "It leaves a little behind for the urgent days that follow.",
      ],
    },
    {
      type: "p",
      text: "None of this is complicated. It's simply the difference between a person getting care and going without, and it's exactly what your giving makes possible.",
    },
  ],
};
