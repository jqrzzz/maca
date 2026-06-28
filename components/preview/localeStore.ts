"use client";

import { useSyncExternalStore } from "react";
import { translate, type Locale, type StringKey } from "@/content/i18n";

/* ---------------------------------------------------------------------------
 * Chosen language for the demo, shared across views and kept for the session.
 * ------------------------------------------------------------------------- */

const KEY = "prasm.preview.locale.v1";
const localeListeners = new Set<() => void>();
let currentLocale: Locale = "en";
let localeReady = false;

function readLocale(): Locale {
  try {
    const v = window.localStorage.getItem(KEY);
    if (v === "en" || v === "th" || v === "my" || v === "kayan") return v;
  } catch {
    /* ignore */
  }
  return "en";
}

function localeSnapshot(): Locale {
  if (!localeReady) {
    currentLocale = readLocale();
    localeReady = true;
  }
  return currentLocale;
}

function localeSubscribe(cb: () => void): () => void {
  localeListeners.add(cb);
  return () => {
    localeListeners.delete(cb);
  };
}

export function useLocale(): Locale {
  return useSyncExternalStore(localeSubscribe, localeSnapshot, () => "en");
}

export function setLocale(locale: Locale): void {
  currentLocale = locale;
  localeReady = true;
  try {
    window.localStorage.setItem(KEY, locale);
  } catch {
    /* ignore */
  }
  localeListeners.forEach((cb) => cb());
}

/* ---------------------------------------------------------------------------
 * Live translation overrides. Words captured during a walkthrough (for example
 * from Ong) layer on top of the static translations so the app updates instantly.
 * They persist for the session and can be exported into the worksheet.
 * ------------------------------------------------------------------------- */

type Overrides = Record<Locale, Partial<Record<StringKey, string>>>;

const O_KEY = "prasm.preview.translations.v1";
const EMPTY_OVERRIDES: Overrides = { en: {}, th: {}, my: {}, kayan: {} };
const overrideListeners = new Set<() => void>();
let overrides: Overrides = EMPTY_OVERRIDES;
let overridesReady = false;

function readOverrides(): Overrides {
  try {
    const raw = window.localStorage.getItem(O_KEY);
    if (raw) return { ...EMPTY_OVERRIDES, ...(JSON.parse(raw) as Overrides) };
  } catch {
    /* ignore */
  }
  return EMPTY_OVERRIDES;
}

function overridesSnapshot(): Overrides {
  if (!overridesReady) {
    overrides = readOverrides();
    overridesReady = true;
  }
  return overrides;
}

function overridesSubscribe(cb: () => void): () => void {
  overrideListeners.add(cb);
  return () => {
    overrideListeners.delete(cb);
  };
}

export function useOverrides(): Overrides {
  return useSyncExternalStore(
    overridesSubscribe,
    overridesSnapshot,
    () => EMPTY_OVERRIDES,
  );
}

export function setOverride(
  locale: Locale,
  key: StringKey,
  value: string,
): void {
  overrides = {
    ...overrides,
    [locale]: { ...overrides[locale], [key]: value },
  };
  overridesReady = true;
  try {
    window.localStorage.setItem(O_KEY, JSON.stringify(overrides));
  } catch {
    /* ignore */
  }
  overrideListeners.forEach((cb) => cb());
}

export function clearOverrides(locale: Locale): void {
  overrides = { ...overrides, [locale]: {} };
  try {
    window.localStorage.setItem(O_KEY, JSON.stringify(overrides));
  } catch {
    /* ignore */
  }
  overrideListeners.forEach((cb) => cb());
}

/* A translator for the current locale: captured overrides first, then the
   static translation, then English. */
export function useT(): (key: StringKey) => string {
  const locale = useLocale();
  const ov = useOverrides();
  return (key: StringKey) => ov[locale]?.[key] || translate(locale, key);
}
