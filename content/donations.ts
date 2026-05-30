/**
 * Donation-method copy + the in-kind list. Links/addresses themselves come
 * from env via lib/config.ts; this file holds the human-facing descriptions.
 */

export type MonetaryMethodCopy = {
  key: "patreon" | "stripe" | "paypal";
  title: string;
  blurb: string;
  cta: string;
};

export const monetaryCopy: MonetaryMethodCopy[] = [
  {
    key: "patreon",
    title: "Patreon",
    blurb:
      "Become a monthly supporter and follow field notes from the village as the work unfolds.",
    cta: "Support on Patreon",
  },
  {
    key: "stripe",
    title: "Card / one-time",
    blurb:
      "Give once or set up a recurring gift securely by debit or credit card.",
    cta: "Give by card",
  },
  {
    key: "paypal",
    title: "PayPal",
    blurb: "Send a gift from your PayPal balance or linked account in seconds.",
    cta: "Give with PayPal",
  },
];

export const cryptoIntro =
  "Prefer crypto? Send to one of the wallets below. Always double-check the address — blockchain transfers are irreversible.";

/** In-kind donations the community can use (from the founder's field notes). */
export const inKind: { items: string[]; note: string } = {
  items: [
    "Medicine & first-aid supplies",
    "Food & cooking staples",
    "Clothes & blankets",
    "Tools & hardware",
    "Solar panels & batteries",
    "Electrical devices & phones",
    "Vehicles & fuel",
    "Gold or other stored value",
  ],
  note: "Because the village is remote and off-grid, please message us first so we can coordinate what's needed and how to get it there.",
};

export const westernUnionIntro =
  "We can also receive support by Western Union. Please contact us first to confirm the current recipient details before sending.";
