# Swapping placeholder images for real photos

Every image on the site is registered in [`lib/images.ts`](../../../lib/images.ts)
as a `MediaRef`. While `placeholder: true`, the `<Figure>` component renders a
branded gradient slot with the intended-photo description shown as a label.

## To add a real photo

1. **Drop the file** at the `src` path declared in `lib/images.ts`.
   Example: for `heroMain` with `src: "/images/hero/main.jpg"`, save your file to
   `public/images/hero/main.jpg`.
2. **Keep or refine the `alt`** text — it matters for accessibility and SEO.
   Write what is actually in the photo.
3. **Set `placeholder: false`** on that entry.

That's it — `<Figure>` automatically switches to an optimized `next/image`
(AVIF/WebP, responsive, lazy-loaded). The hero image is the only one marked
`priority`.

## Guidelines

- **Consent first.** Do not publish identifiable photos of people — especially
  children, wounded individuals, or anyone vulnerable — without explicit,
  informed consent. When in doubt, leave the placeholder.
- **Dignity over pity.** Choose images that show agency, community, and
  everyday life — not suffering as spectacle.
- **Safety.** Avoid images or captions that reveal the village's exact location.
- Prefer landscape JP/WebP at ~2000px on the long edge; the component handles
  resizing and cropping (`object-cover`).

## Folder map

| Folder                 | Used by                          |
| ---------------------- | -------------------------------- |
| `hero/`                | Home hero                        |
| `village/`             | Daily life, weaving, gardens, solar, water, woodfire |
| `founder/`             | Founder portrait                 |
| `the-need/`            | The Need page                    |
| `programs/`            | Programs page                    |
| `field-notes/`         | Field note hero images           |

## Status & future upgrade: add more photos later

As of June 2026, every registered slot shows a **real photo** of the village:
`heroMain`, `villageLife`, `villageGarden`, `villageWoodfire`, `villageStreet`,
`villageHomes`, `villageAnimals`, `villageLane`, `villageDusk`,
`villageGathering`, `founderPortrait`, `needWar`, and `programsMedical`.

No branded placeholders remain. The earlier `villageWeaving`, `villageSolar`,
and `villageWater` slots were renamed to `villageGathering`, `villageDusk`, and
`villageLane` because the photo set had no weaving / solar / water-collection
shots; each now points at a real, accurately described village photo.

A larger set of the founder's source photos is in the repo (`IMG2026*.jpg`
at the project root) and in git history: community gatherings, more village
scenes, signage, and a hospital visit. Only ~8 of ~50 are in use. To add
more later:

1. Pick a photo; resize to ~2000px on the long edge and save it under the
   right `public/images/...` path (see the folder map above).
2. Point the matching `lib/images.ts` entry at it (or add a new key), set
   `placeholder: false`, and write an accurate `alt`.
3. Optional: surface extra photos by adding keys to a `<PhotoStrip>` or a
   new gallery section (e.g. on The Need, Programs, or Get Involved).

The consent, dignity, and location-safety rules above apply to every photo
added.
