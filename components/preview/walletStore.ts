"use client";

import { useSyncExternalStore } from "react";
import { stewardWalletSeed, type WalletEntry } from "@/content/stewardWallet";

/**
 * The village steward's cashbook, persisted so logged money survives switching
 * tabs and reloads, the same way the student roster does. SSR-safe via
 * useSyncExternalStore with a stable server snapshot. Receipt photos are
 * in-memory object URLs, so they are stripped from what we persist (they would
 * not survive a reload anyway). Demo only: no real money, nothing is sent, and
 * reset wipes it back to the seed.
 */

const KEY = "prasm.preview.wallet.v1";

function seed(): WalletEntry[] {
  return [...stewardWalletSeed].reverse();
}

const SERVER: WalletEntry[] = seed();
let entries: WalletEntry[] = SERVER;
let ready = false;
const listeners = new Set<() => void>();

function revoke(url?: string) {
  if (url?.startsWith("blob:")) {
    try {
      URL.revokeObjectURL(url);
    } catch {
      /* ignore */
    }
  }
}

function read(): WalletEntry[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as WalletEntry[];
  } catch {
    /* ignore */
  }
  return seed();
}

function persist() {
  try {
    // Drop in-memory blob receipt URLs; they do not survive a reload.
    const slim = entries.map((e) =>
      e.receiptUrl?.startsWith("blob:") ? { ...e, receiptUrl: undefined } : e,
    );
    window.localStorage.setItem(KEY, JSON.stringify(slim));
  } catch {
    /* ignore */
  }
}

function snapshot(): WalletEntry[] {
  if (!ready) {
    entries = read();
    ready = true;
  }
  return entries;
}

function emit() {
  listeners.forEach((l) => l());
}

export function useWallet(): WalletEntry[] {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    snapshot,
    () => SERVER,
  );
}

export function addWalletEntry(entry: WalletEntry) {
  entries = [entry, ...entries];
  ready = true;
  persist();
  emit();
}

export function removeWalletEntry(id: string) {
  revoke(entries.find((e) => e.id === id)?.receiptUrl);
  entries = entries.filter((e) => e.id !== id);
  ready = true;
  persist();
  emit();
}

/** Wipe the cashbook back to the seed entries. */
export function resetWallet() {
  for (const e of entries) revoke(e.receiptUrl);
  entries = seed();
  ready = true;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  emit();
}
