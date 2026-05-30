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
    alt: "Karenni villagers gathered together in the hills of Mae Hong Son at golden hour.",
    placeholder: true,
    ratio: "16/10",
  },
  villageLife: {
    src: "/images/village/daily-life.jpg",
    alt: "Children playing on open ground in the off-grid village.",
    placeholder: true,
    ratio: "4/3",
  },
  villageWeaving: {
    src: "/images/village/weaving.jpg",
    alt: "A woman weaving fabric by hand on a wooden loom.",
    placeholder: true,
    ratio: "4/3",
  },
  villageGarden: {
    src: "/images/village/garden.jpg",
    alt: "Vegetable gardens and free-roaming chickens beside bamboo homes.",
    placeholder: true,
    ratio: "4/3",
  },
  villageSolar: {
    src: "/images/village/solar.jpg",
    alt: "Solar panels powering a water pump for the village.",
    placeholder: true,
    ratio: "4/3",
  },
  villageWoodfire: {
    src: "/images/village/woodfire.jpg",
    alt: "A family cooking over a wood fire inside a bamboo kitchen.",
    placeholder: true,
    ratio: "4/3",
  },
  villageWater: {
    src: "/images/village/water.jpg",
    alt: "Villagers filling tanks with water during the dry season.",
    placeholder: true,
    ratio: "4/3",
  },
  founderPortrait: {
    src: "/images/founder/portrait.jpg",
    alt: "Portrait of MACA's founding doctor in the village.",
    placeholder: true,
    ratio: "1/1",
  },
  needWar: {
    src: "/images/the-need/displacement.jpg",
    alt: "A family that recently crossed into Thailand after fleeing conflict in Myanmar.",
    placeholder: true,
    ratio: "16/10",
  },
  programsMedical: {
    src: "/images/programs/medical-records.jpg",
    alt: "A doctor writing a medical record by hand for a patient.",
    placeholder: true,
    ratio: "4/3",
  },
} as const;

export type ImageKey = keyof typeof images;
