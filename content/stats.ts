/**
 * Impact stats. VALUES ARE PLACEHOLDERS — replace with real, defensible
 * numbers before launch (see plan §12). Framed as what the community is
 * building, not as a measure of brokenness.
 */

export type Stat = {
  value: string;
  label: string;
  caption?: string;
  /** PLACEHOLDER until verified. */
  placeholder?: boolean;
};

export const stats: Stat[] = [
  {
    value: "100%",
    label: "Solar-powered",
    caption: "Water and light run off the grid, on donated solar.",
  },
  {
    value: "40+",
    label: "Families supported",
    caption: "Households the project walks alongside.",
    placeholder: true,
  },
  {
    value: "120+",
    label: "Medical records built",
    caption: "Hand-written histories that also help prove identity.",
    placeholder: true,
  },
  {
    value: "30+",
    label: "Hospital visits covered",
    caption: "Care that would otherwise be out of reach.",
    placeholder: true,
  },
];
