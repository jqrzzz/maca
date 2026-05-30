import type { FieldNote } from "./types";
import { note as ghosts } from "./the-people-the-world-calls-ghosts";
import { note as records } from "./building-medical-records-by-hand";
import { note as offGrid } from "./life-off-the-grid";
import { note as uninsured } from "./the-cost-of-being-uninsured";
import { note as afterWar } from "./after-the-war";

export type { FieldNote, FieldNoteBlock } from "./types";

/**
 * Register field notes here. To add a post: create a new file in this folder
 * exporting a `note: FieldNote`, then import + add it to this array.
 */
const all: FieldNote[] = [ghosts, records, offGrid, uninsured, afterWar];

/** Newest first. */
export function getAllFieldNotes(): FieldNote[] {
  return [...all].sort((a, b) => b.date.localeCompare(a.date));
}

export function getFieldNote(slug: string): FieldNote | undefined {
  return all.find((n) => n.slug === slug);
}

export function getFeaturedFieldNote(): FieldNote {
  return all.find((n) => n.featured) ?? getAllFieldNotes()[0];
}

/** Prev/next within the newest-first ordering. */
export function getAdjacentFieldNotes(slug: string): {
  prev?: FieldNote;
  next?: FieldNote;
} {
  const ordered = getAllFieldNotes();
  const i = ordered.findIndex((n) => n.slug === slug);
  if (i === -1) return {};
  return {
    prev: i > 0 ? ordered[i - 1] : undefined,
    next: i < ordered.length - 1 ? ordered[i + 1] : undefined,
  };
}
