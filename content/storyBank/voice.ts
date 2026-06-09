import type { VoiceGuide } from "./types";

/**
 * The house voice, distilled from the published site (content/about.ts values,
 * content/need.ts framing, content/home.ts). This grounds every AI draft so it
 * sounds like PRASM — and never drifts into pity, saviorism, or overclaim.
 */
export const voice: VoiceGuide = {
  summary:
    "Sober but dignified. We tell hard truths plainly and always turn toward agency. The people are partners, never projects; we stand alongside, not above.",
  tone: [
    "Warm, plain, and concrete — short sentences and real images (a solar pump, a hand-written record, fabric woven by hand).",
    "Honest about what we are and what we are not yet.",
    "Hopeful without being saccharine; it earns its hope with specifics.",
  ],
  doList: [
    "Lead with dignity and agency; end on what people are building, not only on what they lack.",
    "Prefer specific, sensory detail from the field over abstractions.",
    "Name the hard facts — statelessness, foreigner-rate hospital bills — soberly.",
    "Credit the community first; PRASM helps carry the load, it doesn't rescue.",
  ],
  dontList: [
    "No pity, no saviorism, no 'poor them'. People are not projects.",
    "No overclaiming — never imply charity registration, tax-deductibility, audited financials, or impact we can't show.",
    "No invented numbers, names, or quotes.",
    "No melodrama or trauma as spectacle, especially involving children.",
  ],
  prefer: [
    "refugees · families · the community · neighbors",
    "stateless · without papers · undocumented",
    "be seen · proof of existence · a record · dignity · self-reliance · solidarity",
  ],
  avoid: [
    "victims · the needy · the poor · 'beneficiaries' (in public copy)",
    "exoticizing or tribe-as-spectacle framing",
    "anything that names or locates the village",
  ],
  rules: [
    "Never reveal or hint at the village's exact location.",
    "Never name or show a person beyond the consent level recorded for them in the Story Bank.",
    "Every figure must trace to a verified fact; never state a placeholder as fact.",
    "A human reviews and approves every public draft before it ships.",
  ],
};
