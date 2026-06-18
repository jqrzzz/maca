"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Lock,
  LayoutDashboard,
  Users,
  Banknote,
  ClipboardCheck,
  CircleCheck,
  LogOut,
  ArrowLeft,
  ArrowRight,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { demoPeople, demoExpenses } from "@/content/previewDemo";

type Tab = "overview" | "people" | "finance" | "approvals";
type Tone = "clay" | "forest" | "gold" | "neutral";

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

const initials = (name: string) =>
  name
    .replace(/[^a-zA-Z ]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || "?";

const roleTone: Record<string, Tone> = {
  admin: "clay",
  treasurer: "forest",
  board: "forest",
  "content-approver": "gold",
  volunteer: "neutral",
};

const tabs: { id: Tab; label: string; icon: React.ElementType; blurb: string }[] = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    blurb:
      "One place to run the foundation: roles decide who can do what, money is tracked and signed off, and AI drafts the busywork while a person approves.",
  },
  {
    id: "people",
    label: "People",
    icon: Users,
    blurb:
      "Your team and their roles. A role decides what each person can see and do, from approving money to viewing sensitive records.",
  },
  {
    id: "finance",
    label: "Finance",
    icon: Banknote,
    blurb:
      "Every expense, with its category and sign-off. Use of funds rolls up from here, and a receipt backs each one.",
  },
  {
    id: "approvals",
    label: "Approvals",
    icon: ClipboardCheck,
    blurb:
      "Items waiting for a second person to sign off. Above a threshold, the approver cannot be the person who spent the money.",
  },
];

const card = "rounded-[20px] border border-line bg-cream shadow-soft";

function Avatar({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-clay-50 font-semibold text-clay-700 ${className}`}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}

export function PreviewConsole() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");
  const [signedOff, setSignedOff] = useState<Record<string, boolean>>({});

  const me = demoPeople[0];
  const activePeople = demoPeople.filter((p) => p.status === "active");
  const approved = demoExpenses.filter((e) => e.status === "approved");
  const pending = demoExpenses.filter((e) => e.status === "pending");
  const approvedSpend = approved.reduce((s, e) => s + e.amountUsd, 0);

  const byCategory = approved.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amountUsd;
    return acc;
  }, {});
  const categories = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);

  // ---- Login gate ---------------------------------------------------------
  if (!authed) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-sand px-6 py-16">
        <div className="w-full max-w-md">
          <div className={`${card} p-8`}>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-[14px] bg-clay-50 text-clay-600">
              <Lock className="h-6 w-6" strokeWidth={1.75} aria-hidden />
            </span>
            <div className="mt-5 flex items-center gap-2">
              <h1 className="font-display text-2xl font-semibold text-forest-700">
                PRASM Internal
              </h1>
              <Badge tone="gold">Preview</Badge>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-stone">
              A visual preview of the future team console. This is a demo: there
              is no real account, and nothing you type leaves your browser.
            </p>
            <form
              className="mt-6 flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setAuthed(true);
              }}
            >
              <label className="block text-sm font-medium text-forest-700">
                Email
                <input
                  type="email"
                  defaultValue="founder@prasm.demo"
                  className="mt-1.5 w-full rounded-[14px] border border-line bg-sand px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
                />
              </label>
              <label className="block text-sm font-medium text-forest-700">
                Password
                <input
                  type="password"
                  defaultValue="demo-demo-demo"
                  className="mt-1.5 w-full rounded-[14px] border border-line bg-sand px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
                />
              </label>
              <button
                type="submit"
                className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-[14px] bg-clay-600 px-6 font-medium text-cream shadow-soft transition-colors hover:bg-clay-700"
              >
                Enter the demo
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </form>
            <p className="mt-4 text-center text-xs text-stone">
              Demo credentials are prefilled. Just press enter.
            </p>
          </div>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-clay-700 underline decoration-clay-300 underline-offset-4 hover:decoration-clay-600"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to the site
          </Link>
        </div>
      </div>
    );
  }

  const active = tabs.find((t) => t.id === tab)!;

  // ---- Console ------------------------------------------------------------
  return (
    <div className="min-h-[85vh] bg-sand">
      {/* Console bar */}
      <header className="border-b border-line bg-cream">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] bg-clay-600 text-cream">
              <Lock className="h-5 w-5" strokeWidth={2} aria-hidden />
            </span>
            <div className="leading-tight">
              <span className="font-display font-semibold text-forest-700">
                PRASM
              </span>{" "}
              <span className="text-sm text-stone">Internal</span>
            </div>
            <Badge tone="gold" className="hidden sm:inline-flex">
              Preview
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden text-sm text-stone transition-colors hover:text-forest-700 sm:inline"
            >
              Back to site
            </Link>
            <div className="flex items-center gap-2.5 border-l border-line pl-3">
              <Avatar name={me.name} className="h-9 w-9 text-xs" />
              <div className="hidden leading-tight sm:block">
                <div className="text-sm font-medium text-forest-700">
                  {me.name}
                </div>
                <div className="text-xs text-stone">{me.role}</div>
              </div>
              <button
                type="button"
                onClick={() => setAuthed(false)}
                aria-label="Sign out"
                className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md text-stone transition-colors hover:bg-sand hover:text-clay-700"
              >
                <LogOut className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
        {/* Honest banner */}
        <div className="flex items-start gap-2.5 rounded-[14px] bg-clay-50 px-4 py-3 text-sm text-clay-700 ring-1 ring-clay-100 ring-inset">
          <span aria-hidden>•</span>
          <p>
            This is a visual preview with sample data. It is not connected to a
            backend, and nothing here is real or saved. It shows how the internal
            system will look once built on a secure login.
          </p>
        </div>

        {/* Mobile tabs */}
        <div className="mt-5 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:hidden">
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

        <div className="mt-5 lg:mt-6 lg:grid lg:grid-cols-[220px_1fr] lg:gap-8">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block">
            <nav aria-label="Console" className="sticky top-24 space-y-1">
              {tabs.map((t) => {
                const Icon = t.icon;
                const isActive = tab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-clay-50 text-clay-700"
                        : "text-forest-700 hover:bg-cream"
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                    {t.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main */}
          <main className="min-w-0">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-semibold text-forest-700">
                {active.label}
              </h2>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-stone">
                {active.blurb}
              </p>
            </div>

            {tab === "overview" && (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { label: "Active people", value: String(activePeople.length), icon: Users },
                    { label: "Pending approvals", value: String(pending.length), icon: ClipboardCheck },
                    { label: "Approved spend", value: usd(approvedSpend), icon: Banknote },
                    { label: "Methods live", value: "Soon", icon: Wallet },
                  ].map((s) => {
                    const Icon = s.icon;
                    return (
                      <div key={s.label} className={`${card} p-5`}>
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] bg-clay-50 text-clay-600">
                          <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                        </span>
                        <div className="mt-4 font-display text-3xl leading-none text-forest-700">
                          {s.value}
                        </div>
                        <div className="mt-1.5 text-sm text-stone">{s.label}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
                  {/* Use of funds */}
                  <div className={`${card} p-6`}>
                    <h3 className="font-display text-lg font-semibold text-forest-700">
                      Use of funds
                    </h3>
                    <p className="mt-1 text-sm text-stone">
                      Approved spend by category, this period.
                    </p>
                    <div className="mt-5 space-y-4">
                      {categories.map(([cat, amt]) => {
                        const pct = approvedSpend
                          ? Math.round((amt / approvedSpend) * 100)
                          : 0;
                        return (
                          <div key={cat}>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-forest-700">{cat}</span>
                              <span className="tabular-nums text-stone">
                                {usd(amt)} · {pct}%
                              </span>
                            </div>
                            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-sand">
                              <div
                                className="h-full rounded-full bg-clay-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Needs attention */}
                  <div className={`${card} p-6`}>
                    <h3 className="font-display text-lg font-semibold text-forest-700">
                      Needs attention
                    </h3>
                    <p className="mt-1 text-sm text-stone">
                      Items waiting on a person.
                    </p>
                    <ul className="mt-5 space-y-3">
                      {pending.map((e) => (
                        <li
                          key={e.id}
                          className="flex items-center justify-between gap-3 rounded-[14px] bg-sand px-4 py-3"
                        >
                          <span className="text-sm text-forest-700">
                            {e.payee}
                          </span>
                          <Badge tone="gold">{usd(e.amountUsd)} · sign off</Badge>
                        </li>
                      ))}
                      {pending.length === 0 && (
                        <li className="text-sm text-stone">All clear.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {tab === "people" && (
              <div className={`${card} overflow-hidden`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-line text-xs tracking-wide text-stone uppercase">
                        <th className="px-5 py-3 font-semibold">Name</th>
                        <th className="px-5 py-3 font-semibold">Role</th>
                        <th className="px-5 py-3 font-semibold">Status</th>
                        <th className="px-5 py-3 font-semibold">Onboarding</th>
                      </tr>
                    </thead>
                    <tbody>
                      {demoPeople.map((p) => (
                        <tr
                          key={p.name}
                          className="border-b border-line/60 transition-colors last:border-0 hover:bg-sand/60"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <Avatar name={p.name} className="h-8 w-8 text-xs" />
                              <span className="font-medium text-forest-700">
                                {p.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <Badge tone={roleTone[p.role] ?? "neutral"}>
                              {p.role}
                            </Badge>
                          </td>
                          <td className="px-5 py-4">
                            <Badge tone={p.status === "active" ? "forest" : "neutral"}>
                              {p.status}
                            </Badge>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex flex-wrap gap-1.5">
                              {p.onboarding.map((o) => (
                                <span
                                  key={o}
                                  className="inline-flex items-center rounded-full bg-sand px-2.5 py-0.5 text-xs font-medium text-stone"
                                >
                                  {o}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === "finance" && (
              <div className={`${card} overflow-hidden`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-line text-xs tracking-wide text-stone uppercase">
                        <th className="px-5 py-3 font-semibold">Date</th>
                        <th className="px-5 py-3 font-semibold">Payee</th>
                        <th className="px-5 py-3 font-semibold">Category</th>
                        <th className="px-5 py-3 text-right font-semibold">Amount</th>
                        <th className="px-5 py-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {demoExpenses.map((e) => (
                        <tr
                          key={e.id}
                          className="border-b border-line/60 transition-colors last:border-0 hover:bg-sand/60"
                        >
                          <td className="px-5 py-4 whitespace-nowrap text-stone tabular-nums">
                            {e.date}
                          </td>
                          <td className="px-5 py-4 font-medium text-forest-700">
                            {e.payee}
                          </td>
                          <td className="px-5 py-4 text-stone">{e.category}</td>
                          <td className="px-5 py-4 text-right font-medium text-forest-700 tabular-nums">
                            {usd(e.amountUsd)}
                          </td>
                          <td className="px-5 py-4">
                            <Badge tone={e.status === "approved" ? "forest" : "gold"}>
                              {e.status === "approved" && (
                                <CircleCheck className="h-3.5 w-3.5" aria-hidden />
                              )}
                              {e.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === "approvals" && (
              <div className="space-y-3">
                {pending.length === 0 && (
                  <div className={`${card} p-6 text-sm text-stone`}>
                    Nothing pending. All clear.
                  </div>
                )}
                {pending.map((e) => (
                  <div
                    key={e.id}
                    className={`${card} flex flex-wrap items-center justify-between gap-4 p-5`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] bg-clay-50 text-clay-600">
                        <Banknote className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                      </span>
                      <div>
                        <div className="font-medium text-forest-700">
                          {e.payee}{" "}
                          <span className="text-stone tabular-nums">
                            · {usd(e.amountUsd)}
                          </span>
                        </div>
                        <div className="text-sm text-stone">
                          {e.category} · {e.date} · {e.id}
                        </div>
                      </div>
                    </div>
                    {signedOff[e.id] ? (
                      <Badge tone="forest">
                        <CircleCheck className="h-3.5 w-3.5" aria-hidden />
                        Signed off (demo)
                      </Badge>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          setSignedOff((s) => ({ ...s, [e.id]: true }))
                        }
                        className="inline-flex h-10 items-center justify-center rounded-[14px] bg-clay-600 px-5 text-sm font-medium text-cream shadow-soft transition-colors hover:bg-clay-700"
                      >
                        Approve
                      </button>
                    )}
                  </div>
                ))}
                <p className="pt-1 text-xs text-stone">
                  In the real system, approving records your name and the time,
                  and a tamper-evident history keeps the trail.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
