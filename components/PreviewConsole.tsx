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
} from "lucide-react";
import { demoPeople, demoExpenses } from "@/content/previewDemo";

type Tab = "overview" | "people" | "finance" | "approvals";

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
const card = "rounded-[20px] border border-line bg-cream p-6 shadow-soft";
const chip =
  "inline-flex items-center rounded-full bg-clay-50 px-2.5 py-0.5 text-xs font-medium text-clay-700";

export function PreviewConsole() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");
  const [signedOff, setSignedOff] = useState<Record<string, boolean>>({});

  const activePeople = demoPeople.filter((p) => p.status === "active");
  const approved = demoExpenses.filter((e) => e.status === "approved");
  const pending = demoExpenses.filter((e) => e.status === "pending");
  const approvedSpend = approved.reduce((s, e) => s + e.amountUsd, 0);

  if (!authed) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
        <div className={card}>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-[14px] bg-clay-50 text-clay-600">
            <Lock className="h-6 w-6" strokeWidth={1.75} aria-hidden />
          </span>
          <h1 className="mt-5 text-h3">PRASM Internal</h1>
          <p className="mt-2 text-sm text-stone">
            A visual preview of the future team console. This is a demo: there is
            no real account, and nothing you type leaves your browser.
          </p>
          <form
            className="mt-6 flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              setAuthed(true);
            }}
          >
            <label className="text-sm font-medium text-forest-700">
              Email
              <input
                type="email"
                defaultValue="founder@prasm.demo"
                className="mt-1 w-full rounded-[14px] border border-line bg-sand px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
              />
            </label>
            <label className="text-sm font-medium text-forest-700">
              Password
              <input
                type="password"
                defaultValue="demo-demo-demo"
                className="mt-1 w-full rounded-[14px] border border-line bg-sand px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
              />
            </label>
            <button
              type="submit"
              className="mt-2 inline-flex h-12 items-center justify-center rounded-[14px] bg-clay-600 px-6 font-medium text-cream shadow-soft transition-colors hover:bg-clay-700"
            >
              Enter the demo
            </button>
          </form>
          <Link
            href="/"
            className="mt-5 inline-flex items-center gap-1.5 text-sm text-clay-700 underline underline-offset-4"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to the site
          </Link>
        </div>
        <p className="mt-6 text-center text-xs text-stone">
          When this is built for real, sign-in will be a secure login and each
          person will see only what their role allows.
        </p>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "people", label: "People", icon: Users },
    { id: "finance", label: "Finance", icon: Banknote },
    { id: "approvals", label: "Approvals", icon: ClipboardCheck },
  ];

  return (
    <div className="min-h-[80vh] bg-sand">
      {/* Top bar */}
      <div className="border-b border-line bg-cream">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-forest-700">
              PRASM
            </span>
            <span className="text-stone">·</span>
            <span className="text-sm text-stone">Internal</span>
            <span className="ml-1 rounded-full bg-clay-50 px-2 py-0.5 text-[0.625rem] font-semibold tracking-wide text-clay-700 uppercase">
              Preview
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-stone hover:text-forest-700">
              Back to site
            </Link>
            <button
              type="button"
              onClick={() => setAuthed(false)}
              className="inline-flex items-center gap-1.5 text-clay-700 hover:text-clay-600"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Honest banner */}
        <div className="rounded-[14px] border border-clay-300/50 bg-clay-50 px-4 py-3 text-sm text-clay-700">
          This is a visual preview with sample data. It is not connected to a
          backend, and nothing here is real or saved. It shows how the internal
          system will look once built on a secure login.
        </div>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-current={active ? "page" : undefined}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-forest-700 text-cream"
                    : "bg-cream text-forest-700 hover:bg-cream/70"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          {tab === "overview" && (
            <div>
              <p className="text-stone">
                One place to run the foundation: people and roles control who can
                do what, money is tracked and signed off, and AI drafts the
                busywork while a human approves. Here is a snapshot.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Active people", value: String(activePeople.length) },
                  { label: "Pending approvals", value: String(pending.length) },
                  { label: "Approved spend", value: usd(approvedSpend) },
                  { label: "Methods live", value: "Soon" },
                ].map((s) => (
                  <div key={s.label} className={card}>
                    <div className="font-display text-3xl text-forest-700">
                      {s.value}
                    </div>
                    <div className="mt-1 text-sm text-stone">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "people" && (
            <div>
              <p className="text-stone">
                Your team and their roles. A role decides what each person can see
                and do (approve money, approve content, view sensitive records).
              </p>
              <div className={`mt-6 overflow-x-auto ${card} p-0`}>
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-line text-stone">
                    <tr>
                      <th className="px-5 py-3 font-medium">Name</th>
                      <th className="px-5 py-3 font-medium">Role</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                      <th className="px-5 py-3 font-medium">Onboarding</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoPeople.map((p) => (
                      <tr key={p.name} className="border-b border-line/60 last:border-0">
                        <td className="px-5 py-3 text-forest-700">{p.name}</td>
                        <td className="px-5 py-3">{p.role}</td>
                        <td className="px-5 py-3">
                          <span
                            className={
                              p.status === "active"
                                ? "text-forest-600"
                                : "text-stone"
                            }
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex flex-wrap gap-1.5">
                            {p.onboarding.map((o) => (
                              <span key={o} className={chip}>
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
            <div>
              <p className="text-stone">
                Every expense, with its category and sign-off. Use of funds rolls
                up from here, and a receipt backs each one.
              </p>
              <div className={`mt-6 overflow-x-auto ${card} p-0`}>
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-line text-stone">
                    <tr>
                      <th className="px-5 py-3 font-medium">Date</th>
                      <th className="px-5 py-3 font-medium">Payee</th>
                      <th className="px-5 py-3 font-medium">Category</th>
                      <th className="px-5 py-3 font-medium">Amount</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoExpenses.map((e) => (
                      <tr key={e.id} className="border-b border-line/60 last:border-0">
                        <td className="px-5 py-3 text-stone">{e.date}</td>
                        <td className="px-5 py-3 text-forest-700">{e.payee}</td>
                        <td className="px-5 py-3">{e.category}</td>
                        <td className="px-5 py-3">{usd(e.amountUsd)}</td>
                        <td className="px-5 py-3">
                          <span
                            className={
                              e.status === "approved"
                                ? "inline-flex items-center gap-1 text-forest-600"
                                : "inline-flex items-center gap-1 text-clay-700"
                            }
                          >
                            {e.status === "approved" && (
                              <CircleCheck className="h-4 w-4" aria-hidden />
                            )}
                            {e.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "approvals" && (
            <div>
              <p className="text-stone">
                Items waiting for a second person to sign off. Above a threshold,
                the approver cannot be the person who spent the money.
              </p>
              <div className="mt-6 space-y-3">
                {pending.length === 0 && (
                  <div className={card}>Nothing pending. All clear.</div>
                )}
                {pending.map((e) => (
                  <div
                    key={e.id}
                    className={`flex flex-wrap items-center justify-between gap-3 ${card}`}
                  >
                    <div>
                      <div className="text-forest-700">
                        {e.payee} · {usd(e.amountUsd)}
                      </div>
                      <div className="text-sm text-stone">
                        {e.category} · {e.date} · {e.id}
                      </div>
                    </div>
                    {signedOff[e.id] ? (
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-600">
                        <CircleCheck className="h-4 w-4" aria-hidden />
                        Signed off (demo)
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          setSignedOff((s) => ({ ...s, [e.id]: true }))
                        }
                        className="inline-flex h-10 items-center justify-center rounded-[14px] bg-clay-600 px-5 text-sm font-medium text-cream transition-colors hover:bg-clay-700"
                      >
                        Approve
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-stone">
                In the real system, approving records your name and the time, and
                git-style history keeps a tamper-evident trail.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
