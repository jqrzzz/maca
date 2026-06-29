"use client";

import { useSyncExternalStore } from "react";

/**
 * A tiny toast store for the /preview demo, so actions get immediate, friendly
 * confirmation. SSR-safe via useSyncExternalStore; auto-dismisses. Demo only.
 */
export type ToastTone = "success" | "info";
export type Toast = { id: number; message: string; tone: ToastTone };

let toasts: Toast[] = [];
let seq = 0;
const listeners = new Set<() => void>();
const EMPTY: Toast[] = [];

function emit() {
  listeners.forEach((l) => l());
}

export function dismissToast(id: number) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

export function toast(message: string, tone: ToastTone = "success") {
  const id = (seq += 1);
  toasts = [...toasts, { id, message, tone }];
  emit();
  if (typeof window !== "undefined") {
    window.setTimeout(() => dismissToast(id), 2600);
  }
}

export function useToasts(): Toast[] {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => toasts,
    () => EMPTY,
  );
}
