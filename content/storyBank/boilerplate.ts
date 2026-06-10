import { mission as siteMission } from "@/content/home";
import type { Boilerplate } from "./types";

/**
 * Approved, reusable descriptions of PRASM at several lengths — the blurbs a
 * grant application, donor email, or social bio can drop in verbatim, so the
 * org describes itself consistently everywhere. Keep in step with the site;
 * `mission` mirrors content/home.ts to avoid drift.
 */
export const boilerplate: Boilerplate = {
  oneLiner:
    "Dignity, identity, and care for stateless Kayan refugees in northern Thailand.",
  short:
    "PRASM stands with Kayan refugee families who fled war in Myanmar and now live without papers in the hills of Mae Hong Son, Thailand, helping them stay well, prove who they are, and build a future on their own terms.",
  standard:
    "PRASM is a small, founder-led initiative supporting Kayan refugees from Myanmar who live off-grid and largely undocumented in Mae Hong Son, Thailand. Started by a doctor, it covers urgent medical care and transport, builds a written medical history for each person (which doubles as a first proof of identity), and backs the education, solar, water, and food systems that keep the village self-reliant. We work in the community's voice, not over it.",
  mission: siteMission.statement,
  place:
    "the hills of Mae Hong Son, Thailand (exact location withheld for the community's safety)",
};
