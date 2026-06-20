/**
 * Central media registry — the single place to swap placeholders for real
 * photos. Each entry is a MediaRef; while `placeholder` is true, <Figure>
 * renders a branded gradient slot with the alt text as a visible label.
 *
 * TO SWAP IN A REAL PHOTO:
 *   1. Drop the file at the `src` path under /public (e.g. /images/hero/main.jpg)
 *   2. Keep or refine the `alt`
 *   3. Set `placeholder: false`
 *   <Figure> then renders an optimized next/image automatically.
 *
 * See /public/images/placeholders/README.md.
 */

export type MediaRef = {
  src: string;
  alt: string;
  /** When true, render a branded placeholder slot instead of next/image. */
  placeholder?: boolean;
  /** Optional aspect ratio hint for the placeholder, e.g. "16/9". */
  ratio?: string;
};

export const images = {
  heroMain: {
    src: "/images/hero/main.jpg",
    alt: "Children of the community gathered together among the bamboo homes and forested hills of their village.",
    placeholder: false,
    ratio: "16/10",
  },
  villageLife: {
    src: "/images/village/daily-life.jpg",
    alt: "Children of the village gathered together on open ground by their homes.",
    placeholder: false,
    ratio: "4/3",
  },
  villageGathering: {
    src: "/images/village/gathering.jpg",
    alt: "A volunteer handing out supplies to families during a visit to the village.",
    placeholder: false,
    ratio: "4/3",
  },
  villageGarden: {
    src: "/images/village/garden.jpg",
    alt: "A hen and chicks foraging by a garden plot beside the bamboo homes.",
    placeholder: false,
    ratio: "4/3",
  },
  villageDusk: {
    src: "/images/village/dusk.jpg",
    alt: "Tin and bamboo rooftops of the village nestled among the trees as dusk settles over the hills.",
    placeholder: false,
    ratio: "4/3",
  },
  villageWoodfire: {
    src: "/images/village/woodfire.jpg",
    alt: "Firewood stacked beneath a stilt house, fuel for the kitchen fire.",
    placeholder: false,
    ratio: "4/3",
  },
  villageLane: {
    src: "/images/village/lane.jpg",
    alt: "Neighbours and children gathered along the village lane in the evening as cooking smoke drifts between the homes.",
    placeholder: false,
    ratio: "4/3",
  },
  villageStreet: {
    src: "/images/village/street.jpg",
    alt: "A dirt road running through the off-grid village, past tin-roofed and bamboo homes under a monsoon sky.",
    placeholder: false,
    ratio: "4/3",
  },
  villageHomes: {
    src: "/images/village/homes.jpg",
    alt: "Bamboo and timber stilt houses set among the trees.",
    placeholder: false,
    ratio: "4/3",
  },
  villageAnimals: {
    src: "/images/village/animals.jpg",
    alt: "Pigs in a timber pen, part of everyday village life.",
    placeholder: false,
    ratio: "4/3",
  },
  founderPortrait: {
    src: "/images/founder/portrait.jpg",
    alt: "PRASM's founding team together in a village home.",
    placeholder: false,
    ratio: "4/3",
  },
  needWar: {
    src: "/images/the-need/displacement.jpg",
    alt: "Mothers and children of displaced families gathered together in their hillside village in Mae Hong Son.",
    placeholder: false,
    ratio: "16/10",
  },
  programsMedical: {
    src: "/images/programs/medical-records.jpg",
    alt: "A young patient and companion at a hospital exam window, receiving medical paperwork.",
    placeholder: false,
    ratio: "4/5",
  },
} as const;

export type ImageKey = keyof typeof images;
