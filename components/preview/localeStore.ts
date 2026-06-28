"use client";

import { useSyncExternalStore } from "react";
import { translate, type Locale, type StringKey } from "@/content/i18n";

/**
 * The chosen language for the demo, shared across views and kept for the session
 * (localStorage), read through useSyncExternalStore so it stays SSR-safe.
 */

const KEY = "prasm.preview.locale.v1";
const listeners = new Set<() => void>();
let current: Locale = "en";
let ready = false;

function read(): Locale {
  try {
    const v = window.localStorage.getItem(KEY);
    if (v === "en" || v === "th" || v === "my" || v === "kayan") return v;
  } catch {
    /* ignore unreadable storage */
  }
  return "en";
}

function getSnapshot(): Locale {
  if (!ready) {
    current = read();
    ready = true;
  }
  return current;
}

function getServerSnapshot(): Locale {
  return "en";
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function useLocale(): Locale {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setLocale(locale: Locale): void {
  current = locale;
  ready = true;
  try {
    window.localStorage.setItem(KEY, locale);
  } catch {
    /* ignore unwritable storage */
  }
  listeners.forEach((cb) => cb());
}

/** A translator bound to the current locale, with English fallback. */
export function useT(): (key: StringKey) => string {
  const locale = useLocale();
  return (key: StringKey) => translate(locale, key);
}
