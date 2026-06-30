"use client";

import { useSyncExternalStore } from "react";
import {
  learners as seedLearners,
  type Learner,
} from "@/content/curiosityDemo";
import { avatarChoices } from "@/content/studentProfile";

/**
 * A persisted, shared roster of students for the /preview demo. This is what
 * connects the roles: the steward enrolls a student here, the founder sees them,
 * and the student signs in (picture + PIN) from the front door. Persisted to
 * localStorage so the demo remembers across role switches and reloads, which is
 * what makes it feel real. Still a demo: fake data, and reset wipes it.
 *
 * A student is a Learner plus the sign-in a steward sets with the family: a
 * chosen picture (avatar) and a short PIN. Welcome photos are in-memory object
 * URLs, so they are stripped from what we persist (they would not survive a
 * reload anyway).
 */
export type StudentRecord = Learner & { avatar: string; pin: string };

const KEY = "prasm.preview.students.v1";

function seed(): StudentRecord[] {
  return seedLearners.map((l, i) => ({
    ...l,
    avatar: avatarChoices[i % avatarChoices.length],
    pin: "1234",
  }));
}

const SERVER: StudentRecord[] = seed();
let students: StudentRecord[] = SERVER;
let ready = false;
const listeners = new Set<() => void>();

function read(): StudentRecord[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as StudentRecord[];
  } catch {
    /* ignore */
  }
  return seed();
}

function persist() {
  try {
    // Drop in-memory blob photo URLs; they do not survive a reload.
    const slim = students.map((s) => {
      const { welcomePhoto: _omit, ...rest } = s;
      return rest;
    });
    window.localStorage.setItem(KEY, JSON.stringify(slim));
  } catch {
    /* ignore */
  }
}

function snapshot(): StudentRecord[] {
  if (!ready) {
    students = read();
    ready = true;
  }
  return students;
}

function emit() {
  listeners.forEach((l) => l());
}

export function useStudents(): StudentRecord[] {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    snapshot,
    () => SERVER,
  );
}

export function addStudent(rec: StudentRecord) {
  students = [rec, ...students];
  ready = true;
  persist();
  emit();
}

/** Wipe the roster back to the seed data. */
export function resetDemoStudents() {
  students = seed();
  ready = true;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  emit();
}
