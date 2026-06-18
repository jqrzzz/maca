"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  Camera,
  NotebookPen,
  Mic,
  ReceiptText,
  Square,
  LogOut,
  FileText,
  Image as ImageIcon,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Avatar, card } from "./ui";

type Kind = "photo" | "note" | "voice" | "expense";
type Capture = {
  id: string;
  kind: Kind;
  at: Date;
  text?: string;
  url?: string;
  amount?: string;
  category?: string;
  durationSec?: number;
};

const EXPENSE_CATS = [
  "Medical",
  "Education",
  "Sustainable",
  "In-kind & logistics",
  "Operations",
];

const kindMeta: Record<Kind, { label: string; icon: React.ElementType }> = {
  photo: { label: "Photo", icon: ImageIcon },
  note: { label: "Field note", icon: FileText },
  voice: { label: "Voice memo", icon: Mic },
  expense: { label: "Expense", icon: ReceiptText },
};

const fmtTime = (d: Date) =>
  d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
const fmtDur = (s: number) =>
  `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export function MemberApp({
  member,
  onSignOut,
}: {
  member: { name: string; role: string };
  onSignOut: () => void;
}) {
  const [captures, setCaptures] = useState<Capture[]>([]);
  const [composer, setComposer] = useState<null | "note" | "expense">(null);
  const [noteText, setNoteText] = useState("");
  const [expAmount, setExpAmount] = useState("");
  const [expCat, setExpCat] = useState(EXPENSE_CATS[0]);
  const [expUrl, setExpUrl] = useState<string | undefined>();
  const [recording, setRecording] = useState(false);
  const [recSecs, setRecSecs] = useState(0);

  const photoInput = useRef<HTMLInputElement>(null);
  const expInput = useRef<HTMLInputElement>(null);
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const add = (c: Omit<Capture, "id" | "at">) =>
    setCaptures((prev) => [
      { ...c, id: `c-${Date.now()}`, at: new Date() },
      ...prev,
    ]);

  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>, into: Kind) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (into === "expense") {
      setExpUrl(url);
    } else {
      add({ kind: "photo", url });
    }
    e.target.value = "";
  };

  const startVoice = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunks.current = [];
      rec.ondataavailable = (ev: BlobEvent) => chunks.current.push(ev.data);
      rec.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        add({ kind: "voice", url, durationSec: recSecs });
        stream.getTracks().forEach((t) => t.stop());
      };
      rec.start();
      recorder.current = rec;
      setRecSecs(0);
      setRecording(true);
      timer.current = setInterval(() => setRecSecs((s) => s + 1), 1000);
    } catch {
      // Mic unavailable or denied: still show the flow with a simulated memo.
      add({ kind: "voice", durationSec: 8 });
    }
  };

  const stopVoice = () => {
    if (timer.current) clearInterval(timer.current);
    recorder.current?.stop();
    recorder.current = null;
    setRecording(false);
  };

  const saveNote = () => {
    if (!noteText.trim()) return;
    add({ kind: "note", text: noteText.trim() });
    setNoteText("");
    setComposer(null);
  };

  const saveExpense = () => {
    if (!expAmount.trim()) return;
    add({ kind: "expense", amount: expAmount.trim(), category: expCat, url: expUrl });
    setExpAmount("");
    setExpCat(EXPENSE_CATS[0]);
    setExpUrl(undefined);
    setComposer(null);
  };

  const runAction = (kind: Kind) => {
    if (kind === "photo") photoInput.current?.click();
    else if (kind === "note") setComposer((c) => (c === "note" ? null : "note"));
    else if (kind === "voice") {
      if (recording) stopVoice();
      else startVoice();
    } else if (kind === "expense") {
      setComposer((c) => (c === "expense" ? null : "expense"));
    }
  };

  const actions: {
    kind: Kind;
    label: string;
    hint: string;
    icon: React.ElementType;
  }[] = [
    { kind: "photo", label: "Take a photo", hint: "Camera or library", icon: Camera },
    { kind: "note", label: "Write a field note", hint: "A few lines is plenty", icon: NotebookPen },
    { kind: "voice", label: "Record a voice memo", hint: "Hands-free in the field", icon: Mic },
    { kind: "expense", label: "Log an expense", hint: "Snap the receipt", icon: ReceiptText },
  ];

  const field =
    "w-full rounded-[14px] border border-line bg-cream px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400";

  return (
    <div className="min-h-[85vh] bg-sand">
      {/* Hidden capture inputs */}
      <input ref={photoInput} type="file" accept="image/*" capture="environment" hidden onChange={(e) => onPhoto(e, "photo")} />
      <input ref={expInput} type="file" accept="image/*" capture="environment" hidden onChange={(e) => onPhoto(e, "expense")} />

      {/* Bar */}
      <header className="border-b border-line bg-cream">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between gap-3 px-4">
          <div className="flex items-center gap-2.5">
            <Avatar name={member.name} className="h-9 w-9 text-xs" />
            <div className="leading-tight">
              <div className="text-sm font-medium text-forest-700">{member.name}</div>
              <div className="text-xs text-stone">Field member</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="hidden text-sm text-stone hover:text-forest-700 sm:inline">
              Back to site
            </Link>
            <button
              type="button"
              onClick={onSignOut}
              aria-label="Sign out"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-stone transition-colors hover:bg-sand hover:text-clay-700"
            >
              <LogOut className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-6">
        <h1 className="font-display text-2xl font-semibold text-forest-700">
          Capture from the field
        </h1>
        <p className="mt-1.5 text-sm leading-relaxed text-stone">
          Snap a photo, jot a note, record a memo, or log an expense. It saves
          here, then syncs to PRASM and waits for a quick review when you have
          signal.
        </p>

        <div className="mt-3 flex items-start gap-2 rounded-[14px] bg-clay-50 px-4 py-2.5 text-xs text-clay-700 ring-1 ring-clay-100 ring-inset">
          <span aria-hidden>•</span>
          <p>Preview: captures stay on this device and are not uploaded.</p>
        </div>

        {/* Recording bar */}
        {recording && (
          <div className="mt-4 flex items-center justify-between gap-3 rounded-[16px] border border-clay-300/40 bg-cream px-4 py-3 shadow-soft">
            <span className="flex items-center gap-2 text-sm font-medium text-clay-700">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-clay-600" />
              Recording · {fmtDur(recSecs)}
            </span>
            <button
              type="button"
              onClick={stopVoice}
              className="inline-flex items-center gap-2 rounded-[12px] bg-clay-600 px-4 py-2 text-sm font-medium text-cream hover:bg-clay-700"
            >
              <Square className="h-4 w-4" aria-hidden />
              Stop
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {actions.map((a) => {
            const Icon = a.icon;
            const isRec = a.kind === "voice" && recording;
            return (
              <button
                key={a.kind}
                type="button"
                onClick={() => runAction(a.kind)}
                className={`flex flex-col items-start gap-3 rounded-[20px] border p-5 text-left shadow-soft transition-colors ${
                  isRec
                    ? "border-clay-300 bg-clay-50"
                    : "border-line bg-cream hover:bg-sand/60"
                }`}
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-[14px] bg-clay-50 text-clay-600">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <span>
                  <span className="block font-medium text-forest-700">
                    {isRec ? "Stop recording" : a.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-stone">{a.hint}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Note composer */}
        {composer === "note" && (
          <div className={`mt-4 ${card} p-5`}>
            <h2 className="font-display text-lg font-semibold text-forest-700">
              Field note
            </h2>
            <textarea
              rows={4}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="What happened? Who, what's needed, anything to follow up."
              className={`mt-3 resize-y ${field}`}
            />
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={saveNote}
                className="inline-flex h-10 items-center rounded-[14px] bg-clay-600 px-5 text-sm font-medium text-cream hover:bg-clay-700"
              >
                Save note
              </button>
              <button
                type="button"
                onClick={() => setComposer(null)}
                className="inline-flex h-10 items-center rounded-[14px] border border-line px-5 text-sm font-medium text-forest-700 hover:bg-sand"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Expense composer */}
        {composer === "expense" && (
          <div className={`mt-4 ${card} p-5`}>
            <h2 className="font-display text-lg font-semibold text-forest-700">
              Log an expense
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-medium text-forest-700">
                Amount (USD)
                <input
                  inputMode="decimal"
                  value={expAmount}
                  onChange={(e) => setExpAmount(e.target.value)}
                  placeholder="38"
                  className={`mt-1.5 ${field}`}
                />
              </label>
              <label className="text-sm font-medium text-forest-700">
                Category
                <select
                  value={expCat}
                  onChange={(e) => setExpCat(e.target.value)}
                  className={`mt-1.5 ${field}`}
                >
                  {EXPENSE_CATS.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={() => expInput.current?.click()}
                className="inline-flex h-10 items-center gap-2 rounded-[14px] border border-line px-4 text-sm font-medium text-forest-700 hover:bg-sand"
              >
                <Camera className="h-4 w-4" aria-hidden />
                {expUrl ? "Change receipt photo" : "Snap receipt"}
              </button>
              {expUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={expUrl} alt="" className="h-12 w-12 rounded-[10px] border border-line object-cover" />
              )}
            </div>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={saveExpense}
                className="inline-flex h-10 items-center rounded-[14px] bg-clay-600 px-5 text-sm font-medium text-cream hover:bg-clay-700"
              >
                Save expense
              </button>
              <button
                type="button"
                onClick={() => setComposer(null)}
                className="inline-flex h-10 items-center rounded-[14px] border border-line px-5 text-sm font-medium text-forest-700 hover:bg-sand"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Recent captures */}
        <div className="mt-8">
          <h2 className="font-display text-lg font-semibold text-forest-700">
            Recent captures
          </h2>
          {captures.length === 0 ? (
            <div className={`mt-3 ${card} p-6 text-center text-sm text-stone`}>
              Nothing yet. Your captures will appear here.
            </div>
          ) : (
            <ul className="mt-3 space-y-3">
              {captures.map((c) => {
                const meta = kindMeta[c.kind];
                const Icon = meta.icon;
                return (
                  <li key={c.id} className={`flex gap-3 ${card} p-4`}>
                    {c.url && (c.kind === "photo" || c.kind === "expense") ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.url} alt="" className="h-14 w-14 shrink-0 rounded-[12px] border border-line object-cover" />
                    ) : (
                      <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[12px] bg-clay-50 text-clay-600">
                        <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-forest-700">{meta.label}</span>
                        <span className="flex items-center gap-1 text-xs text-stone">
                          <Clock className="h-3.5 w-3.5" aria-hidden />
                          {fmtTime(c.at)}
                        </span>
                      </div>
                      {c.kind === "note" && (
                        <p className="mt-1 line-clamp-2 text-sm text-stone">{c.text}</p>
                      )}
                      {c.kind === "expense" && (
                        <p className="mt-1 text-sm text-stone">
                          ${c.amount} · {c.category}
                        </p>
                      )}
                      {c.kind === "voice" &&
                        (c.url ? (
                          <audio controls src={c.url} className="mt-2 h-9 w-full max-w-xs" />
                        ) : (
                          <p className="mt-1 text-sm text-stone">
                            Voice memo · {fmtDur(c.durationSec ?? 0)} (demo)
                          </p>
                        ))}
                      <div className="mt-2">
                        <Badge tone="gold">Pending review</Badge>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
