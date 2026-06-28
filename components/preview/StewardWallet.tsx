"use client";

import { useRef, useState } from "react";
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  ReceiptText,
  Camera,
  Trash2,
  Check,
  X,
  CircleCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { card, thb } from "./ui";
import {
  stewardWalletSeed,
  moneyInCategories,
  moneyOutCategories,
  walletTotals,
  spentByCategory,
  type WalletEntry,
  type WalletDirection,
} from "@/content/stewardWallet";

const field =
  "mt-1.5 w-full rounded-[14px] border border-line bg-cream px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400";

const todayLabel = () =>
  new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });

/**
 * The steward's money view: a simple, dignified cashbook so Ong can see what he
 * has, record money he receives, and log what he spends with a category and an
 * optional receipt photo, in his own currency (Thai baht). It mirrors the field
 * member's capture flow and the foundation's finance model (logged, then the
 * founder confirms). Demo only: no real money, nothing leaves the device.
 */
export function StewardWallet() {
  const [entries, setEntries] = useState<WalletEntry[]>(() =>
    [...stewardWalletSeed].reverse(),
  );
  const [composer, setComposer] = useState<WalletDirection | null>(null);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<string>(moneyOutCategories[0]);
  const [note, setNote] = useState("");
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);
  const receiptInput = useRef<HTMLInputElement>(null);

  const totals = walletTotals(entries);
  const byCategory = spentByCategory(entries);
  const breakdown = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);

  const open = (dir: WalletDirection) => {
    setComposer(dir);
    setCategory(dir === "in" ? moneyInCategories[0] : moneyOutCategories[0]);
    setAmount("");
    setNote("");
    if (receiptUrl) URL.revokeObjectURL(receiptUrl);
    setReceiptUrl(null);
  };

  const cancel = () => {
    if (receiptUrl) URL.revokeObjectURL(receiptUrl);
    setReceiptUrl(null);
    setComposer(null);
  };

  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (receiptUrl) URL.revokeObjectURL(receiptUrl);
    setReceiptUrl(URL.createObjectURL(file));
    e.target.value = "";
  };

  const save = () => {
    if (!composer) return;
    const value = Math.round(Number(amount));
    if (!Number.isFinite(value) || value <= 0) return;
    const entry: WalletEntry = {
      id: `W-${Date.now()}`,
      direction: composer,
      date: todayLabel(),
      amount: value,
      category,
      note: note.trim(),
      receiptUrl: composer === "out" ? (receiptUrl ?? undefined) : undefined,
      status: composer === "in" ? "approved" : "logged",
    };
    setEntries((prev) => [entry, ...prev]);
    // Ownership of the object URL transfers to the entry; do not revoke.
    setReceiptUrl(null);
    setAmount("");
    setNote("");
    setComposer(null);
  };

  const remove = (id: string) => {
    setEntries((prev) => {
      const gone = prev.find((e) => e.id === id);
      if (gone?.receiptUrl) URL.revokeObjectURL(gone.receiptUrl);
      return prev.filter((e) => e.id !== id);
    });
  };

  const cats = composer === "in" ? moneyInCategories : moneyOutCategories;

  return (
    <div className="mt-5 space-y-4">
      <input
        ref={receiptInput}
        type="file"
        accept="image/*"
        capture="environment"
        hidden
        onChange={onPhoto}
      />

      {/* Balance */}
      <div className={`${card} p-5`}>
        <div className="flex items-center gap-2 text-stone">
          <Wallet className="h-4 w-4 text-clay-600" aria-hidden />
          <span className="text-sm font-medium">Money on hand</span>
        </div>
        <div className="mt-1 font-display text-4xl leading-none text-forest-700">
          {thb(totals.balance)}
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-500/10 px-3 py-1 font-medium text-forest-700">
            <ArrowDownLeft className="h-3.5 w-3.5" aria-hidden />
            In {thb(totals.inSum)}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-clay-50 px-3 py-1 font-medium text-clay-700">
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            Spent {thb(totals.outSum)}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => open("in")}
            className="inline-flex h-10 items-center gap-2 rounded-[14px] border border-line bg-cream px-4 text-sm font-medium text-forest-700 transition-colors hover:bg-sand"
          >
            <ArrowDownLeft className="h-4 w-4 text-forest-600" aria-hidden />
            Money I received
          </button>
          <button
            type="button"
            onClick={() => open("out")}
            className="inline-flex h-10 items-center gap-2 rounded-[14px] bg-clay-600 px-4 text-sm font-medium text-cream shadow-soft transition-colors hover:bg-clay-700"
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden />
            Money I spent
          </button>
        </div>
      </div>

      {/* Composer */}
      {composer && (
        <div className={`${card} p-5`}>
          <h3 className="font-display text-lg font-semibold text-forest-700">
            {composer === "in" ? "Money I received" : "Money I spent"}
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-medium text-forest-700">
              Amount (฿)
              <input
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
                className={field}
              />
            </label>
            <label className="text-sm font-medium text-forest-700">
              {composer === "in" ? "Where it came from" : "What it was for"}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={field}
              >
                {cats.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="mt-3 block text-sm font-medium text-forest-700">
            A short note
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={
                composer === "in"
                  ? "Who gave it, and what for"
                  : "What you bought"
              }
              className={field}
            />
          </label>

          {composer === "out" && (
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={() => receiptInput.current?.click()}
                className="inline-flex h-10 items-center gap-2 rounded-[14px] border border-line px-4 text-sm font-medium text-forest-700 transition-colors hover:bg-sand"
              >
                <Camera className="h-4 w-4" aria-hidden />
                {receiptUrl ? "Change receipt photo" : "Add a receipt photo"}
              </button>
              {receiptUrl && (
                <span className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={receiptUrl}
                    alt="Receipt"
                    className="h-12 w-12 rounded-[10px] border border-line object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      URL.revokeObjectURL(receiptUrl);
                      setReceiptUrl(null);
                    }}
                    aria-label="Remove receipt photo"
                    className="absolute -top-2 -right-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-ink/80 text-cream"
                  >
                    <X className="h-3 w-3" aria-hidden />
                  </button>
                </span>
              )}
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={save}
              disabled={!(Number(amount) > 0)}
              className="inline-flex h-10 items-center gap-2 rounded-[14px] bg-clay-600 px-5 text-sm font-medium text-cream transition-colors hover:bg-clay-700 disabled:opacity-40"
            >
              <Check className="h-4 w-4" aria-hidden />
              Save
            </button>
            <button
              type="button"
              onClick={cancel}
              className="inline-flex h-10 items-center gap-2 rounded-[14px] border border-line px-5 text-sm font-medium text-forest-700 transition-colors hover:bg-sand"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Where it went */}
      {breakdown.length > 0 && (
        <div className={`${card} p-5`}>
          <h3 className="font-display text-base font-semibold text-forest-700">
            Where the money went
          </h3>
          <ul className="mt-3 space-y-2">
            {breakdown.map(([cat, sum]) => (
              <li
                key={cat}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="text-stone">{cat}</span>
                <span className="font-medium text-clay-700 tabular-nums">
                  {thb(sum)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Ledger */}
      <div>
        <h3 className="font-display text-lg font-semibold text-forest-700">
          Every entry
        </h3>
        <ul className="mt-3 space-y-3">
          {entries.map((e) => {
            const isIn = e.direction === "in";
            return (
              <li key={e.id} className={`flex gap-3 ${card} p-4`}>
                {e.receiptUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={e.receiptUrl}
                    alt="Receipt"
                    className="h-12 w-12 shrink-0 rounded-[12px] border border-line object-cover"
                  />
                ) : (
                  <span
                    className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] ${
                      isIn
                        ? "bg-forest-500/10 text-forest-700"
                        : "bg-clay-50 text-clay-600"
                    }`}
                  >
                    {isIn ? (
                      <ArrowDownLeft className="h-5 w-5" aria-hidden />
                    ) : (
                      <ArrowUpRight className="h-5 w-5" aria-hidden />
                    )}
                  </span>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-medium text-forest-700">
                      {e.category}
                    </span>
                    <span
                      className={`shrink-0 font-semibold tabular-nums ${
                        isIn ? "text-forest-700" : "text-clay-700"
                      }`}
                    >
                      {isIn ? "+" : "-"}
                      {thb(e.amount)}
                    </span>
                  </div>
                  {e.note && (
                    <p className="mt-0.5 text-sm text-stone">{e.note}</p>
                  )}
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-stone">{e.date}</span>
                      {isIn ? (
                        <Badge tone="forest">Received</Badge>
                      ) : e.status === "approved" ? (
                        <Badge tone="forest">
                          <CircleCheck className="h-3.5 w-3.5" aria-hidden />
                          Approved
                        </Badge>
                      ) : (
                        <Badge tone="gold">Logged</Badge>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(e.id)}
                      aria-label="Delete entry"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-stone transition-colors hover:bg-sand hover:text-clay-700"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-start gap-2 rounded-[14px] bg-clay-50 px-4 py-3 text-xs text-clay-700 ring-1 ring-clay-100 ring-inset">
        <ReceiptText className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        <p>
          A practice space. No real money moves here, and nothing is saved or
          sent. Logging what you spend, with a photo of the receipt, is how the
          foundation keeps everything fair and clear for everyone.
        </p>
      </div>
    </div>
  );
}
