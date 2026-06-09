import { site } from "@/content/site";
import { stats } from "@/content/stats";
import type { Fact } from "./types";

/**
 * Verified facts and figures that ground PRASM's drafting. Each carries a
 * status and a source so nothing is ever stated beyond what we can stand behind.
 *
 * Impact stats are pulled straight from content/stats.ts and inherit their
 * honesty flag — placeholder stats stay marked `placeholder` here, so a draft
 * never presents them as established fact.
 */
const statFacts: Fact[] = stats.map((s) => ({
  id: `stat-${s.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  claim: `${s.value} — ${s.label}${s.caption ? ` (${s.caption})` : ""}`,
  status: s.placeholder ? "placeholder" : "verified",
  source: "content/stats.ts",
}));

export const facts: Fact[] = [
  {
    id: "who-we-support",
    claim:
      "PRASM supports Kayan refugees from Myanmar who fled war and now live, largely undocumented, off-grid in the hills of Mae Hong Son, Thailand.",
    status: "verified",
    source: "content/site.ts · content/home.ts",
  },
  {
    id: "name-and-place",
    claim: `The organization is ${site.name} ("${site.shortName}"), working in ${site.location.region}, ${site.location.country}.`,
    status: "verified",
    source: "content/site.ts",
  },
  {
    id: "founder-is-doctor",
    claim:
      "PRASM grew out of a medical doctor's visits to the village. The founder personally covered a sick child's care and built a medical record for the family.",
    status: "verified",
    source: "content/about.ts · content/home.ts",
  },
  {
    id: "statelessness",
    claim:
      "Most people in the village have no Thai ID, and many children have no identity document at all — leaving them effectively invisible to the systems built to help.",
    status: "verified",
    source: "content/need.ts",
  },
  {
    id: "healthcare-cost",
    claim:
      "Hospitals charge refugees the full foreigner rate, with no insurance — a single visit can be unaffordable.",
    status: "verified",
    source: "content/need.ts · content/programs.ts",
  },
  {
    id: "school-barrier",
    claim:
      "Without Thai ID, children are barred from public school; the nearest camp school requires paperwork and travel many families can't manage.",
    status: "verified",
    source: "content/need.ts",
  },
  {
    id: "self-reliance",
    claim:
      "The village is off-grid and largely self-sufficient: solar drives the water pump, gardens and animals provide food, and fabric is woven by hand. It is held together by deep tribal solidarity.",
    status: "verified",
    source: "content/about.ts · content/need.ts",
  },
  {
    id: "records-as-identity",
    claim:
      "A hand-written medical history does double duty: it guides future care and, for someone with no papers, becomes a first proof that they exist.",
    status: "verified",
    source: "content/about.ts · content/programs.ts",
  },
  {
    id: "what-we-do",
    claim:
      "Active work covers urgent medical care and transport, education access, the village's solar/water/food systems, and in-kind supply logistics. Identity documentation, digital medical records, and AI-assisted care are planned, not yet running.",
    status: "verified",
    source: "content/programs.ts",
  },
  {
    id: "legal-status",
    claim:
      "PRASM is an emerging, founder-led initiative still formalizing its legal structure. It cannot currently issue tax-deductible receipts and does not yet publish audited financials.",
    status: "verified",
    source: "content/transparency.ts · content/legal/donationPolicy.ts",
  },
  {
    id: "founded-year",
    claim: `PRASM traces its beginning to ${site.foundedYear}.`,
    status: "unverified",
    source: "content/site.ts",
    note: "Founding year is a TODO in content/site.ts — confirm before stating.",
  },
  ...statFacts,
];
