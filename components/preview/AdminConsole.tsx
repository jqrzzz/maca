"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Lock,
  LayoutDashboard,
  Users,
  Banknote,
  ClipboardCheck,
  Camera,
  CircleCheck,
  LogOut,
  Wallet,
  UserPlus,
  Copy,
  Check,
  ArrowRight,
  FileText,
  Image as ImageIcon,
  Mic,
  ReceiptText,
  Landmark,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import {
  demoExpenses,
  demoCaptures,
  demoGoals,
  demoTimeline,
  demoDecisions,
  roleOptions,
  type DemoPerson,
  type DemoCapture,
  type DemoDecision,
  type Role,
} from "@/content/previewDemo";
import { Avatar, card, usd, roleTone } from "./ui";

type Tab =
  | "overview"
  | "people"
  | "finance"
  | "approvals"
  | "captures"
  | "boardroom";
type Invite = { name: string; email: string; role: Role };

const tabs: { id: Tab; label: string; icon: React.ElementType; blurb: string }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, blurb: "One place to run the foundation: roles decide who can do what, money is tracked and signed off, and AI drafts the busywork while a person approves." },
  { id: "people", label: "People", icon: Users, blurb: "Your team and their roles. Invite a member and they get a link to set a password and start capturing from the field." },
  { id: "finance", label: "Finance", icon: Banknote, blurb: "Every expense, with its category and sign-off. Use of funds rolls up from here, and a receipt backs each one." },
  { id: "approvals", label: "Approvals", icon: ClipboardCheck, blurb: "Items waiting for a second person to sign off. Above a threshold, the approver cannot be the person who spent the money." },
  { id: "captures", label: "Field captures", icon: Camera, blurb: "Photos, notes, voice memos, and expenses from field members land here for a person to review before anything is published or recorded." },
  { id: "boardroom", label: "Boardroom", icon: Landmark, blurb: "The internal space to come back to: goals, the story so far, and governance decisions to revisit and discuss together." },
];

const captureIcon: Record<DemoCapture["kind"], React.ElementType> = {
  note: FileText,
  photo: ImageIcon,
  voice: Mic,
  expense: ReceiptText,
};

export function AdminConsole({
  me,
  people,
  onAddMember,
  onOpenSetup,
  onSignOut,
}: {
  me: DemoPerson;
  people: DemoPerson[];
  onAddMember: (m: Invite) => void;
  onOpenSetup: (m: Invite) => void;
  onSignOut: () => void;
}) {
  const [tab, setTab] = useState<Tab>("overview");
  const [signedOff, setSignedOff] = useState<Record<string, boolean>>({});
  const [reviewed, setReviewed] = useState<Record<string, boolean>>({});

  // Add-member flow
  const [addOpen, setAddOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("volunteer");
  const [invite, setInvite] = useState<(Invite & { token: string }) | null>(null);
  const [copied, setCopied] = useState(false);

  // Boardroom: governance notes you can add in the demo (local only)
  const [notes, setNotes] = useState<DemoDecision[]>(demoDecisions);
  const [noteText, setNoteText] = useState("");
  const addNote = () => {
    if (!noteText.trim()) return;
    setNotes((prev) => [
      { id: `D-${Date.now()}`, title: noteText.trim(), status: "proposed", note: "", by: "You", at: "just now" },
      ...prev,
    ]);
    setNoteText("");
  };
  const decisionTone = (s: DemoDecision["status"]) =>
    s === "agreed" ? "forest" : s === "proposed" ? "gold" : "neutral";

  const active = tabs.find((t) => t.id === tab)!;
  const activePeople = people.filter((p) => p.status === "active");
  const approved = demoExpenses.filter((e) => e.status === "approved");
  const pending = demoExpenses.filter((e) => e.status === "pending");
  const approvedSpend = approved.reduce((s, e) => s + e.amountUsd, 0);
  const byCategory = approved.reduce<Record<string, number>>((a, e) => {
    a[e.category] = (a[e.category] || 0) + e.amountUsd;
    return a;
  }, {});
  const categories = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);
  const pendingCaptures = demoCaptures.filter((c) => c.status === "pending");

  const createMember = () => {
    if (!name.trim() || !email.trim()) return;
    const m: Invite = { name: name.trim(), email: email.trim(), role };
    onAddMember(m);
    setInvite({ ...m, token: Math.random().toString(36).slice(2, 10) });
    setName("");
    setEmail("");
    setRole("volunteer");
    setAddOpen(false);
    setCopied(false);
  };

  const inviteLink = invite
    ? `https://prasm.life/setup?token=${invite.token}`
    : "";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable; the link is visible to copy manually */
    }
  };

  const field =
    "w-full rounded-[14px] border border-line bg-sand px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400";

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
              <span className="font-display font-semibold text-forest-700">PRASM</span>{" "}
              <span className="text-sm text-stone">Internal</span>
            </div>
            <Badge tone="gold" className="hidden sm:inline-flex">Preview</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden text-sm text-stone transition-colors hover:text-forest-700 sm:inline">
              Back to site
            </Link>
            <div className="flex items-center gap-2.5 border-l border-line pl-3">
              <Avatar name={me.name} className="h-9 w-9 text-xs" />
              <div className="hidden leading-tight sm:block">
                <div className="text-sm font-medium text-forest-700">{me.name}</div>
                <div className="text-xs text-stone">{me.role}</div>
              </div>
              <button type="button" onClick={onSignOut} aria-label="Sign out" className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md text-stone transition-colors hover:bg-sand hover:text-clay-700">
                <LogOut className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
        <div className="flex items-start gap-2.5 rounded-[14px] bg-clay-50 px-4 py-3 text-sm text-clay-700 ring-1 ring-clay-100 ring-inset">
          <span aria-hidden>•</span>
          <p>This is a visual preview with sample data. It is not connected to a backend, and nothing here is real or saved.</p>
        </div>

        {/* Mobile tabs */}
        <div className="mt-5 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:hidden">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = tab === t.id;
            return (
              <button key={t.id} type="button" onClick={() => setTab(t.id)} aria-current={isActive ? "page" : undefined} className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${isActive ? "bg-forest-700 text-cream" : "border border-line bg-cream text-forest-700"}`}>
                <Icon className="h-4 w-4" aria-hidden />
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="mt-5 lg:mt-6 lg:grid lg:grid-cols-[220px_1fr] lg:gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <nav aria-label="Console" className="sticky top-24 space-y-1">
              {tabs.map((t) => {
                const Icon = t.icon;
                const isActive = tab === t.id;
                return (
                  <button key={t.id} type="button" onClick={() => setTab(t.id)} aria-current={isActive ? "page" : undefined} className={`flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? "bg-clay-50 text-clay-700" : "text-forest-700 hover:bg-cream"}`}>
                    <Icon className="h-5 w-5" aria-hidden />
                    {t.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main */}
          <main className="min-w-0">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl font-semibold text-forest-700">{active.label}</h2>
                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-stone">{active.blurb}</p>
              </div>
              {tab === "people" && (
                <button type="button" onClick={() => { setAddOpen((v) => !v); setInvite(null); }} className="inline-flex h-10 items-center gap-2 rounded-[14px] bg-clay-600 px-4 text-sm font-medium text-cream shadow-soft transition-colors hover:bg-clay-700">
                  <UserPlus className="h-4 w-4" aria-hidden />
                  Add member
                </button>
              )}
            </div>

            {/* OVERVIEW */}
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
                        <div className="mt-4 font-display text-3xl leading-none text-forest-700">{s.value}</div>
                        <div className="mt-1.5 text-sm text-stone">{s.label}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
                  <div className={`${card} p-6`}>
                    <h3 className="font-display text-lg font-semibold text-forest-700">Use of funds</h3>
                    <p className="mt-1 text-sm text-stone">Approved spend by category, this period.</p>
                    <div className="mt-5 space-y-4">
                      {categories.map(([cat, amt]) => {
                        const pct = approvedSpend ? Math.round((amt / approvedSpend) * 100) : 0;
                        return (
                          <div key={cat}>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-forest-700">{cat}</span>
                              <span className="text-stone tabular-nums">{usd(amt)} · {pct}%</span>
                            </div>
                            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-sand">
                              <div className="h-full rounded-full bg-clay-500" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className={`${card} p-6`}>
                    <h3 className="font-display text-lg font-semibold text-forest-700">Latest from the field</h3>
                    <p className="mt-1 text-sm text-stone">Recent captures awaiting review.</p>
                    <ul className="mt-5 space-y-3">
                      {demoCaptures.slice(0, 3).map((c) => {
                        const Icon = captureIcon[c.kind];
                        return (
                          <li key={c.id} className="flex items-start gap-3">
                            <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay-50 text-clay-600">
                              <Icon className="h-4 w-4" aria-hidden />
                            </span>
                            <div className="min-w-0">
                              <p className="truncate text-sm text-forest-700">{c.summary}</p>
                              <p className="text-xs text-stone">{c.by} · {c.at}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* PEOPLE */}
            {tab === "people" && (
              <div className="space-y-5">
                {addOpen && (
                  <div className={`${card} p-6`}>
                    <h3 className="font-display text-lg font-semibold text-forest-700">Invite a member</h3>
                    <p className="mt-1 text-sm text-stone">They get a link to set a password, then a simple app to capture from the field.</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <label className="text-sm font-medium text-forest-700">Name
                        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className={`mt-1.5 ${field}`} />
                      </label>
                      <label className="text-sm font-medium text-forest-700">Email
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@email.com" className={`mt-1.5 ${field}`} />
                      </label>
                      <label className="text-sm font-medium text-forest-700">Role
                        <select value={role} onChange={(e) => setRole(e.target.value as Role)} className={`mt-1.5 ${field}`}>
                          {roleOptions.map((r) => (<option key={r.value} value={r.value}>{r.label}</option>))}
                        </select>
                      </label>
                    </div>
                    <button type="button" onClick={createMember} className="mt-4 inline-flex h-10 items-center gap-2 rounded-[14px] bg-clay-600 px-5 text-sm font-medium text-cream hover:bg-clay-700">
                      Create & generate invite
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                )}

                {invite && (
                  <div className={`${card} border-clay-300/50 p-6`}>
                    <div className="flex items-center gap-2">
                      <CircleCheck className="h-5 w-5 text-forest-600" aria-hidden />
                      <h3 className="font-display text-lg font-semibold text-forest-700">{invite.name} invited</h3>
                    </div>
                    <p className="mt-1 text-sm text-stone">Send them this link to set a password and sign in. (Demo link, nothing is emailed.)</p>
                    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                      <input readOnly value={inviteLink} className={`flex-1 font-mono text-sm ${field}`} onFocus={(e) => e.currentTarget.select()} />
                      <button type="button" onClick={copyLink} className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] border border-line px-4 text-sm font-medium text-forest-700 hover:bg-sand">
                        {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                    <button type="button" onClick={() => onOpenSetup({ name: invite.name, email: invite.email, role: invite.role })} className="mt-3 inline-flex h-10 items-center gap-2 rounded-[14px] bg-clay-600 px-5 text-sm font-medium text-cream hover:bg-clay-700">
                      Open the set-up link (demo)
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                )}

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
                        {people.map((p, i) => (
                          <tr key={`${p.name}-${i}`} className="border-b border-line/60 transition-colors last:border-0 hover:bg-sand/60">
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <Avatar name={p.name} className="h-8 w-8 text-xs" />
                                <span className="font-medium text-forest-700">{p.name}</span>
                              </div>
                            </td>
                            <td className="px-5 py-4"><Badge tone={roleTone[p.role] ?? "neutral"}>{p.role}</Badge></td>
                            <td className="px-5 py-4"><Badge tone={p.status === "active" ? "forest" : "neutral"}>{p.status}</Badge></td>
                            <td className="px-5 py-4">
                              <div className="flex flex-wrap gap-1.5">
                                {p.onboarding.length === 0 ? (
                                  <span className="text-xs text-stone italic">awaiting set-up</span>
                                ) : (
                                  p.onboarding.map((o) => (
                                    <span key={o} className="inline-flex items-center rounded-full bg-sand px-2.5 py-0.5 text-xs font-medium text-stone">{o}</span>
                                  ))
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* FINANCE */}
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
                        <tr key={e.id} className="border-b border-line/60 transition-colors last:border-0 hover:bg-sand/60">
                          <td className="px-5 py-4 whitespace-nowrap text-stone tabular-nums">{e.date}</td>
                          <td className="px-5 py-4 font-medium text-forest-700">{e.payee}</td>
                          <td className="px-5 py-4 text-stone">{e.category}</td>
                          <td className="px-5 py-4 text-right font-medium text-forest-700 tabular-nums">{usd(e.amountUsd)}</td>
                          <td className="px-5 py-4">
                            <Badge tone={e.status === "approved" ? "forest" : "gold"}>
                              {e.status === "approved" && <CircleCheck className="h-3.5 w-3.5" aria-hidden />}
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

            {/* APPROVALS */}
            {tab === "approvals" && (
              <div className="space-y-3">
                {pending.length === 0 && <div className={`${card} p-6 text-sm text-stone`}>Nothing pending. All clear.</div>}
                {pending.map((e) => (
                  <div key={e.id} className={`${card} flex flex-wrap items-center justify-between gap-4 p-5`}>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] bg-clay-50 text-clay-600"><Banknote className="h-5 w-5" strokeWidth={1.75} aria-hidden /></span>
                      <div>
                        <div className="font-medium text-forest-700">{e.payee} <span className="text-stone tabular-nums">· {usd(e.amountUsd)}</span></div>
                        <div className="text-sm text-stone">{e.category} · {e.date} · {e.id}</div>
                      </div>
                    </div>
                    {signedOff[e.id] ? (
                      <Badge tone="forest"><CircleCheck className="h-3.5 w-3.5" aria-hidden />Signed off (demo)</Badge>
                    ) : (
                      <button type="button" onClick={() => setSignedOff((s) => ({ ...s, [e.id]: true }))} className="inline-flex h-10 items-center justify-center rounded-[14px] bg-clay-600 px-5 text-sm font-medium text-cream shadow-soft transition-colors hover:bg-clay-700">Approve</button>
                    )}
                  </div>
                ))}
                <p className="pt-1 text-xs text-stone">In the real system, approving records your name and the time, and a tamper-evident history keeps the trail.</p>
              </div>
            )}

            {/* FIELD CAPTURES */}
            {tab === "captures" && (
              <div className="space-y-3">
                {demoCaptures.map((c) => {
                  const Icon = captureIcon[c.kind];
                  const isApproved = c.status === "approved" || reviewed[c.id];
                  return (
                    <div key={c.id} className={`${card} flex flex-wrap items-center justify-between gap-4 p-5`}>
                      <div className="flex items-start gap-3">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-clay-50 text-clay-600"><Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden /></span>
                        <div>
                          <div className="font-medium text-forest-700">{c.summary}</div>
                          <div className="text-sm text-stone">{c.by} · {c.at}</div>
                        </div>
                      </div>
                      {isApproved ? (
                        <Badge tone="forest"><CircleCheck className="h-3.5 w-3.5" aria-hidden />Reviewed</Badge>
                      ) : (
                        <button type="button" onClick={() => setReviewed((s) => ({ ...s, [c.id]: true }))} className="inline-flex h-10 items-center justify-center rounded-[14px] bg-clay-600 px-5 text-sm font-medium text-cream shadow-soft transition-colors hover:bg-clay-700">Approve</button>
                      )}
                    </div>
                  );
                })}
                <p className="pt-1 text-xs text-stone">{pendingCaptures.length} pending. Approving a capture is what lets the field-to-story tool turn it into a draft, or a receipt into a ledger entry. A person always decides first.</p>
              </div>
            )}

            {/* BOARDROOM */}
            {tab === "boardroom" && (
              <div className="space-y-8">
                {/* Goals */}
                <section>
                  <h3 className="font-display text-lg font-semibold text-forest-700">Goals</h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {demoGoals.map((g) => (
                      <div key={g.title} className={`${card} p-5`}>
                        <div className="flex items-center justify-between gap-2">
                          <Badge tone={g.status === "planned" ? "gold" : "forest"}>{g.status}</Badge>
                          <span className="text-xs text-stone">{g.horizon}</span>
                        </div>
                        <h4 className="mt-3 font-medium text-forest-700">{g.title}</h4>
                        <p className="mt-1 text-sm text-stone">{g.detail}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Timeline */}
                <section>
                  <h3 className="font-display text-lg font-semibold text-forest-700">The story so far</h3>
                  <ol className="mt-4 border-l border-line pl-6">
                    {demoTimeline.map((m, i) => (
                      <li key={i} className="relative pb-6 last:pb-0">
                        <span className="absolute top-1 -left-[1.6rem] inline-flex h-3 w-3 rounded-full bg-clay-500 ring-4 ring-sand" />
                        <div className="text-xs font-semibold tracking-wide text-clay-600 uppercase">{m.date}</div>
                        <div className="mt-0.5 font-medium text-forest-700">{m.title}</div>
                        <p className="mt-0.5 text-sm text-stone">{m.detail}</p>
                      </li>
                    ))}
                  </ol>
                </section>

                {/* Governance decisions */}
                <section>
                  <h3 className="font-display text-lg font-semibold text-forest-700">Governance decisions</h3>
                  <p className="mt-1 text-sm text-stone">A place to capture what we have agreed and what is still open. Add a note to start a discussion.</p>
                  <div className={`mt-4 ${card} p-5`}>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <input
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") addNote();
                        }}
                        placeholder="Propose a decision or idea to discuss…"
                        className={`flex-1 ${field}`}
                      />
                      <button type="button" onClick={addNote} className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-[14px] bg-clay-600 px-5 text-sm font-medium text-cream hover:bg-clay-700">
                        <Plus className="h-4 w-4" aria-hidden />
                        Add note
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {notes.map((d) => (
                      <div key={d.id} className={`${card} p-5`}>
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="font-medium text-forest-700">{d.title}</h4>
                          <Badge tone={decisionTone(d.status)}>{d.status}</Badge>
                        </div>
                        {d.note && <p className="mt-1.5 text-sm text-stone">{d.note}</p>}
                        <p className="mt-2 text-xs text-stone">{d.by} · {d.at}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
