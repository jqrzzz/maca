"use client";

import { useSyncExternalStore } from "react";

/**
 * A tiny in-memory store for the *live* state of a Curiosity Program walkthrough,
 * shared across the learner, steward, and founder views so the loop is visible in
 * real time: a child earns a sticker and surfaces an interest in kid mode, the
 * steward sees that spark and suggests follow-through, and the founder approves
 * it. It resets on reload and on returning to the login, so each walkthrough
 * starts clean. Read through useSyncExternalStore so it stays SSR-safe.
 */

export type LiveSparkStatus = "noticed" | "proposed" | "approved";

export type LiveSpark = {
  id: string;
  learner: string;
  interest: string;
  idea: string;
  cost: number;
  status: LiveSparkStatus;
};

type LiveState = { stickers: string[]; sparks: LiveSpark[] };

const EMPTY: LiveState = { stickers: [], sparks: [] };
let state: LiveState = EMPTY;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};

const getSnapshot = () => state;
const getServerSnapshot = () => EMPTY;

export function useCuriosityLive(): LiveState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Sensible follow-through ideas for the interests kid mode can surface. */
const ideaFor: Record<string, { idea: string; cost: number }> = {
  "Plants and growing things": {
    idea: "A botany starter kit: seeds, two pots, a hand lens, and a picture book",
    cost: 16,
  },
  "Birds and flying": {
    idea: "A beginner bird-spotting card and a small field notebook",
    cost: 9,
  },
};

export function earnSticker(name: string): void {
  if (state.stickers.includes(name)) return;
  state = { ...state, stickers: [...state.stickers, name] };
  emit();
}

export function noticeSpark(learner: string, interest: string): void {
  if (state.sparks.some((s) => s.interest === interest)) return;
  const meta = ideaFor[interest] ?? {
    idea: "Something to help them explore this further",
    cost: 12,
  };
  state = {
    ...state,
    sparks: [
      ...state.sparks,
      {
        id: `live-${Date.now()}`,
        learner,
        interest,
        idea: meta.idea,
        cost: meta.cost,
        status: "noticed",
      },
    ],
  };
  emit();
}

export function setLiveSparkStatus(id: string, status: LiveSparkStatus): void {
  state = {
    ...state,
    sparks: state.sparks.map((s) => (s.id === id ? { ...s, status } : s)),
  };
  emit();
}

export function resetCuriosityLive(): void {
  if (state === EMPTY) return;
  state = EMPTY;
  emit();
}
