"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  NotebookPen,
  X,
  Trash2,
  Copy,
  Check,
  Download,
  Plus,
} from "lucide-react";

type Note = { id: string; text: string; context: string; at: string };

const KEY = "prasm.preview.sessionNotes.v1";

/* ---------------------------------------------------------------------------
 * A tiny localStorage-backed store, read through useSyncExternalStore so the
 * notes are SSR-safe (no hydration mismatch) and shared across every instance
 * of the panel. Nothing leaves the browser.
 * ------------------------------------------------------------------------- */

const listeners = new Set<() => void>();
let cache = "[]";
let cacheReady = false;

function readRaw(): string {
  try {
    return window.localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function getSnapshot(): string {
  if (!cacheReady) {
    cache = readRaw();
    cacheReady = true;
  }
  return cache;
}

function getServerSnapshot(): string {
  return "[]";
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cacheReady = false;
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function writeNotes(notes: Note[]): void {
  cache = JSON.stringify(notes);
  cacheReady = true;
  try {
    window.localStorage.setItem(KEY, cache);
  } catch {
    /* ignore unwritable storage */
  }
  listeners.forEach((l) => l());
}

const stamp = () =>
  new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

/**
 * A lightweight notes pad for a walkthrough session. Notes are saved in this
 * browser so they survive moving between views and a reload, and can be exported
 * to Markdown. Self-contained: drop it into any preview screen; every instance
 * shares the same saved notes.
 */
export function SessionNotes({ context = "Preview" }: { context?: string }) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const notes = useMemo<Note[]>(() => {
    try {
      return JSON.parse(raw) as Note[];
    } catch {
      return [];
    }
  }, [raw]);

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);

  // Close on Escape while open (setState lives in the callback, not the effect).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const add = () => {
    const text = draft.trim();
    if (!text) return;
    writeNotes([
      { id: `n-${Date.now()}`, text, context, at: stamp() },
      ...notes,
    ]);
    setDraft("");
  };

  const remove = (id: string) => writeNotes(notes.filter((n) => n.id !== id));

  const clearAll = () => {
    if (notes.length === 0) return;
    if (window.confirm("Clear all session notes? This cannot be undone."))
      writeNotes([]);
  };

  const toMarkdown = () => {
    const lines = [
      "# PRASM preview: session notes",
      "",
      `Exported ${stamp()}`,
      "",
    ];
    // Stored newest-first; export oldest-first so it reads in order.
    [...notes]
      .reverse()
      .forEach((n) => lines.push(`- (${n.context}, ${n.at}) ${n.text}`));
    return lines.join("\n") + "\n";
  };

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(toMarkdown());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const download = () => {
    const blob = new Blob([toMarkdown()], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prasm-preview-notes.md";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open session notes"
        className="fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full bg-forest-700 px-4 py-3 text-sm font-medium text-cream shadow-lift transition-transform hover:scale-[1.03]"
      >
        <NotebookPen className="h-4 w-4" aria-hidden />
        Notes
        {notes.length > 0 && (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-cream px-1.5 text-xs font-semibold text-forest-700">
            {notes.length}
          </span>
        )}
      </button>

      {/* Slide-over */}
      {open && (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Session notes"
        >
          <button
            type="button"
            aria-label="Close notes"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/30"
          />
          <div className="absolute top-0 right-0 flex h-full w-full max-w-sm flex-col bg-cream shadow-lift">
            <div className="flex items-start justify-between gap-3 border-b border-line p-4">
              <div>
                <h2 className="font-display text-lg font-semibold text-forest-700">
                  Session notes
                </h2>
                <p className="mt-0.5 text-xs text-stone">
                  Saved in this browser for your walkthrough. Nothing is
                  uploaded.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-stone transition-colors hover:bg-sand hover:text-clay-700"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            {/* Composer */}
            <div className="border-b border-line p-4">
              <textarea
                rows={3}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) add();
                }}
                placeholder="Jot a note, a question, an idea to revisit…"
                className="w-full resize-y rounded-[14px] border border-line bg-sand px-4 py-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
              />
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="text-xs text-stone">
                  Filing under:{" "}
                  <span className="text-forest-700">{context}</span>
                </span>
                <button
                  type="button"
                  onClick={add}
                  disabled={!draft.trim()}
                  className="inline-flex h-9 items-center gap-1.5 rounded-[12px] bg-clay-600 px-4 text-sm font-medium text-cream transition-colors hover:bg-clay-700 disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" aria-hidden />
                  Add note
                </button>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {notes.length === 0 ? (
                <p className="rounded-[14px] bg-sand px-4 py-6 text-center text-sm text-stone">
                  No notes yet. Jot down what you notice as you click through.
                </p>
              ) : (
                notes.map((n) => (
                  <div
                    key={n.id}
                    className="rounded-[14px] border border-line bg-cream p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="inline-flex items-center rounded-full bg-sand px-2.5 py-0.5 text-xs font-medium text-stone">
                        {n.context}
                      </span>
                      <button
                        type="button"
                        onClick={() => remove(n.id)}
                        aria-label="Delete note"
                        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-stone transition-colors hover:bg-sand hover:text-clay-700"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden />
                      </button>
                    </div>
                    <p className="mt-1.5 text-sm whitespace-pre-wrap text-ink">
                      {n.text}
                    </p>
                    <p className="mt-1 text-xs text-stone">{n.at}</p>
                  </div>
                ))
              )}
            </div>

            {/* Footer actions */}
            <div className="flex flex-wrap items-center gap-2 border-t border-line p-4">
              <button
                type="button"
                onClick={copyAll}
                disabled={notes.length === 0}
                className="inline-flex h-9 items-center gap-1.5 rounded-[12px] border border-line px-3 text-sm font-medium text-forest-700 transition-colors hover:bg-sand disabled:opacity-40"
              >
                {copied ? (
                  <Check className="h-4 w-4" aria-hidden />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden />
                )}
                {copied ? "Copied" : "Copy all"}
              </button>
              <button
                type="button"
                onClick={download}
                disabled={notes.length === 0}
                className="inline-flex h-9 items-center gap-1.5 rounded-[12px] border border-line px-3 text-sm font-medium text-forest-700 transition-colors hover:bg-sand disabled:opacity-40"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download
              </button>
              <button
                type="button"
                onClick={clearAll}
                disabled={notes.length === 0}
                className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-[12px] px-3 text-sm font-medium text-stone transition-colors hover:bg-sand hover:text-clay-700 disabled:opacity-40"
              >
                <Trash2 className="h-4 w-4" aria-hidden />
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
