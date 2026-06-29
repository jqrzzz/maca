"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  HandCoins,
  TrendingUp,
  Repeat,
  FileText,
  Download,
  ReceiptText,
  ArrowRight,
  ArrowUpRight,
  LogOut,
  Pencil,
  Check,
  Eye,
  EyeOff,
  GraduationCap,
  Stethoscope,
  Sprout,
  Sparkles,
  Building2,
  Fingerprint,
  Lock,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Avatar, card, usd } from "./ui";
import {
  demoDonor,
  allocation,
  donorImpact,
  donorDocuments,
  type Gift,
} from "@/content/donor";
import { toast } from "./toast";

type Tab = "overview" | "giving" | "documents";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: TrendingUp },
  { id: "giving", label: "Giving", icon: HandCoins },
  { id: "documents", label: "Documents", icon: FileText },
];

const slotIcons: Record<string, React.ElementType> = {
  education: GraduationCap,
  medical: Stethoscope,
  sustainable: Sprout,
  identity: Fingerprint,
  operations: Building2,
  learners: GraduationCap,
  sessions: Sparkles,
  sparks: Sprout,
  clinic: Stethoscope,
};

function download(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  toast("Downloaded");
}

const money = (n: number) => `${usd(n)} USD`;

function receiptText(g: Gift, donorName: string) {
  return [
    "PRASM Foundation (demo)",
    "Donation receipt",
    "",
    `Receipt: ${g.id}`,
    `Date: ${g.date}`,
    `Donor: ${donorName}`,
    `Amount: ${money(g.amountUsd)}`,
    `Designated: ${g.fund}`,
    `Method: ${g.method}${g.recurring ? " (monthly)" : ""}`,
    "",
    "This is a demo document, not a valid tax receipt.",
  ].join("\n");
}

function statementText(donorName: string, gifts: Gift[], total: number) {
  const lines = [
    "PRASM Foundation (demo)",
    "Annual giving statement",
    "",
    `Donor: ${donorName}`,
    "",
    "Gifts:",
  ];
  gifts.forEach((g) => {
    lines.push(`  ${g.date}  ${money(g.amountUsd)}  ${g.fund}  (${g.id})`);
  });
  lines.push("");
  lines.push(`Total: ${money(total)}`);
  lines.push("");
  lines.push("This is a demo document, not a valid tax statement.");
  return lines.join("\n");
}

function impactText() {
  const lines = [
    "PRASM Foundation (demo)",
    "Impact report",
    "",
    "Where funds go:",
  ];
  allocation.forEach((a) => lines.push(`  ${a.label}: ${a.pct}%`));
  lines.push("");
  lines.push("Together this period:");
  donorImpact.forEach((s) => lines.push(`  ${s.value}  ${s.label}`));
  lines.push("");
  lines.push(
    "Figures are illustrative and aggregate. No child is identified, and no medical record is ever shared.",
  );
  return lines.join("\n");
}

/**
 * The donor portal: a donor signs in to see what they have given, where it
 * goes, the aggregate impact, and to download their documents. By design a
 * donor sees only celebratory, aggregate results, never a child's identity or
 * medical record. Demo only: data is fake and documents are samples.
 */
export function DonorPortal({ onSignOut }: { onSignOut: () => void }) {
  const [tab, setTab] = useState<Tab>("overview");
  const [name, setName] = useState(demoDonor.name);
  const [editName, setEditName] = useState(false);
  const [anonymous, setAnonymous] = useState(demoDonor.anonymous);

  const gifts = demoDonor.gifts;
  const total = gifts.reduce((n, g) => n + g.amountUsd, 0);
  const thisYear = gifts
    .filter((g) => g.date.includes("2026"))
    .reduce((n, g) => n + g.amountUsd, 0);
  const monthly = gifts.find((g) => g.recurring)?.amountUsd ?? 0;

  const stats = [
    { label: "Total invested", value: usd(total), icon: Heart },
    { label: "This year", value: usd(thisYear), icon: TrendingUp },
    { label: "Gifts", value: String(gifts.length), icon: HandCoins },
    {
      label: "Monthly",
      value: monthly > 0 ? usd(monthly) : "None",
      icon: Repeat,
    },
  ];

  return (
    <div className="min-h-[85vh] bg-sand">
      {/* Bar */}
      <header className="border-b border-line bg-cream">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-3 px-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-[12px] bg-clay-50 text-clay-600">
              <Heart className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-medium text-forest-700">
                Donor portal
              </div>
              <div className="text-xs text-stone">PRASM</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden text-sm text-stone hover:text-forest-700 sm:inline"
            >
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

      <div className="mx-auto max-w-3xl px-4 py-6">
        {/* Profile header */}
        <div className={`${card} p-5`}>
          <div className="flex items-center gap-4">
            <Avatar name={name || "Donor"} className="h-14 w-14 text-base" />
            <div className="min-w-0 flex-1">
              {editName ? (
                <div className="flex items-center gap-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-[12px] border border-line bg-cream px-3 py-1.5 text-lg font-semibold text-forest-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
                  />
                  <button
                    type="button"
                    onClick={() => setEditName(false)}
                    aria-label="Save name"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-clay-600 text-cream hover:bg-clay-700"
                  >
                    <Check className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-xl font-semibold text-forest-700">
                    {anonymous ? "Anonymous donor" : name || "Donor"}
                  </h1>
                  <button
                    type="button"
                    onClick={() => setEditName(true)}
                    aria-label="Edit your name"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md text-stone transition-colors hover:bg-sand hover:text-clay-700"
                  >
                    <Pencil className="h-3.5 w-3.5" aria-hidden />
                  </button>
                </div>
              )}
              <p className="mt-0.5 text-sm text-stone">
                {demoDonor.emailMasked} · Supporter since {demoDonor.since}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
            <button
              type="button"
              onClick={() => setAnonymous((v) => !v)}
              aria-pressed={anonymous}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-line bg-cream px-3 text-sm font-medium text-forest-700 transition-colors hover:bg-sand"
            >
              {anonymous ? (
                <EyeOff className="h-4 w-4 text-clay-600" aria-hidden />
              ) : (
                <Eye className="h-4 w-4 text-clay-600" aria-hidden />
              )}
              {anonymous ? "Giving anonymously" : "Recognized publicly"}
            </button>
            <span className="text-xs text-stone">
              You choose whether your name appears on the supporters page.
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className={`${card} p-4`}>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] bg-clay-50 text-clay-600">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <div className="mt-3 font-display text-2xl leading-none text-forest-700">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-stone">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-forest-700 text-cream"
                    : "border border-line bg-cream text-forest-700"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* OVERVIEW */}
        {tab === "overview" && (
          <div className="mt-5 space-y-4">
            <div className={`${card} p-5`}>
              <h2 className="font-display text-lg font-semibold text-forest-700">
                Where your giving goes
              </h2>
              <p className="mt-1 text-sm text-stone">
                Across the foundation, at the program level. Illustrative.
              </p>
              <ul className="mt-4 space-y-3">
                {allocation.map((a) => {
                  const Icon = slotIcons[a.icon] ?? Sparkles;
                  return (
                    <li key={a.label} className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-clay-50 text-clay-600">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-forest-700">
                            {a.label}
                          </span>
                          <span className="text-stone tabular-nums">
                            {a.pct}%
                          </span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-sand">
                          <div
                            className="h-full rounded-full bg-clay-600"
                            style={{ width: `${a.pct}%` }}
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={`${card} p-5`}>
              <h2 className="font-display text-lg font-semibold text-forest-700">
                The difference, together
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {donorImpact.map((s) => {
                  const Icon = slotIcons[s.icon] ?? Sparkles;
                  return (
                    <div key={s.label} className="rounded-[14px] bg-sand p-4">
                      <Icon className="h-5 w-5 text-clay-600" aria-hidden />
                      <div className="mt-2 font-display text-2xl leading-none text-forest-700">
                        {s.value}
                      </div>
                      <div className="mt-1 text-xs text-stone">{s.label}</div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex items-start gap-2 rounded-[12px] bg-forest-500/10 px-3 py-2 text-xs text-forest-700">
                <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                <p>
                  You see the impact your giving makes, never a child&apos;s
                  identity or medical record. Those stay private.
                </p>
              </div>
            </div>

            <Link
              href="/give"
              className="inline-flex h-11 items-center gap-2 rounded-[14px] bg-clay-600 px-5 text-sm font-medium text-cream shadow-soft transition-colors hover:bg-clay-700"
            >
              <Heart className="h-4 w-4" aria-hidden />
              Give again
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        )}

        {/* GIVING */}
        {tab === "giving" && (
          <div className="mt-5 space-y-3">
            {gifts.map((g) => (
              <div key={g.id} className={`flex flex-wrap gap-3 ${card} p-4`}>
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-clay-50 text-clay-600">
                  <HandCoins className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-forest-700">
                      {usd(g.amountUsd)}
                    </span>
                    {g.recurring && (
                      <Badge tone="forest">
                        <Repeat className="h-3.5 w-3.5" aria-hidden />
                        Monthly
                      </Badge>
                    )}
                    <span className="text-xs text-stone">{g.date}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-stone">
                    {g.fund} · {g.method} · {g.id}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    download(`receipt-${g.id}.txt`, receiptText(g, name))
                  }
                  className="inline-flex h-9 shrink-0 items-center gap-1.5 self-center rounded-[12px] border border-line px-3 text-sm font-medium text-forest-700 transition-colors hover:bg-sand"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Receipt
                </button>
              </div>
            ))}
          </div>
        )}

        {/* DOCUMENTS */}
        {tab === "documents" && (
          <div className="mt-5 space-y-3">
            {donorDocuments.map((d) => {
              const isPolicy = d.kind === "policy";
              return (
                <div key={d.id} className={`flex gap-3 ${card} p-4`}>
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-clay-50 text-clay-600">
                    {isPolicy ? (
                      <FileText className="h-5 w-5" aria-hidden />
                    ) : (
                      <ReceiptText className="h-5 w-5" aria-hidden />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-forest-700">{d.title}</div>
                    <p className="mt-0.5 text-sm text-stone">{d.desc}</p>
                  </div>
                  {isPolicy ? (
                    <a
                      href={d.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 shrink-0 items-center gap-1.5 self-center rounded-[12px] border border-line px-3 text-sm font-medium text-forest-700 transition-colors hover:bg-sand"
                    >
                      Open
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        download(
                          `${d.id}.txt`,
                          d.kind === "statement"
                            ? statementText(name, gifts, total)
                            : impactText(),
                        )
                      }
                      className="inline-flex h-9 shrink-0 items-center gap-1.5 self-center rounded-[12px] border border-line px-3 text-sm font-medium text-forest-700 transition-colors hover:bg-sand"
                    >
                      <Download className="h-4 w-4" aria-hidden />
                      Download
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-4 flex items-start gap-2 rounded-[14px] bg-clay-50 px-4 py-3 text-xs text-clay-700 ring-1 ring-clay-100 ring-inset">
          <span aria-hidden>•</span>
          <p>
            Preview: donor data is sample data, and the documents are samples,
            not valid tax receipts. Nothing here is saved or sent.
          </p>
        </div>
      </div>
    </div>
  );
}
