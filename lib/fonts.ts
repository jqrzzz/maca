import { Fraunces, Inter } from "next/font/google";

/**
 * Self-hosted at build time by next/font (no runtime network calls, zero CLS).
 * CSS variables are mapped into the Tailwind theme in app/globals.css.
 */

// Display serif — warm, humanist, optical sizing. Used for headings + pull quotes.
// Loaded as a variable font (the full 100–900 weight axis + optical sizing).
export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

// Body/UI sans — clean, highly legible.
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const fontVariables = `${fraunces.variable} ${inter.variable}`;
