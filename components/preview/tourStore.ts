"use client";

import { useSyncExternalStore } from "react";

/**
 * The first-run tour's own tiny state. A visitor sees the guided walkthrough
 * once, and can replay it any time from the demo cockpit. Persisted to
 * localStorage so "seen" survives a reload, and SSR-safe via useSyncExternalStore
 * with a stable server snapshot, so the first paint matches the server and the
 * tour never flashes before hydration. Demo only: it just remembers a flag and a
 * step in this browser.
 */
export type TourState = { seen: boolean; step: number };

const KEY = "prasm.preview.tour.v1";

const SERVER: TourState = { seen: false, step: 0 };
let state: TourState = SERVER;
let ready = false;
const listeners = new Set<() => void>();

function read(): TourState {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<TourState>;
      return {
        seen: parsed.seen === true,
        step: typeof parsed.step === "number" ? parsed.step : 0,
      };
    }
  } catch {
    /* ignore */
  }
  return { seen: false, step: 0 };
}

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

function snapshot(): TourState {
  if (!ready) {
    state = read();
    ready = true;
  }
  return state;
}

function emit() {
  listeners.forEach((l) => l());
}

export function useTour(): TourState {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    snapshot,
    () => SERVER,
  );
}

export function setTourStep(step: number) {
  state = { ...state, step };
  ready = true;
  persist();
  emit();
}

export function markTourSeen() {
  state = { ...state, seen: true };
  ready = true;
  persist();
  emit();
}

/** Replay: forget that the tour was seen and rewind to the first step. */
export function resetTour() {
  state = { seen: false, step: 0 };
  ready = true;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  emit();
}
