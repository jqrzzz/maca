"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Users,
  UserPlus,
  Sprout,
  HeartHandshake,
  Lock,
  CircleCheck,
  Camera,
  ArrowRight,
  Star,
  LogOut,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import {
  learners as seedLearners,
  sparks as seedSparks,
  stewardComp,
  ageBandLabel,
  sparkStatusLabel,
  type Learner,
  type Spark,
  type AgeBand,
  type AvatarTone,
} from "@/content/curiosityDemo";
import { Avatar, card } from "./ui";

type Tab = "learners" | "enroll" | "sparks" | "pay";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "learners", label: "Learners", icon: Users },
  { id: "enroll", label: "Enroll", icon: UserPlus },
  { id: "sparks", label: "Sparks", icon: Sprout },
  { id: "pay", label: "How I'm paid", icon: HeartHandshake },
];

const consentTone = (c: Learner["consent"]) =>
  c === "given" ? "forest" : c === "pending" ? "gold" : "neutral";

const tones: AvatarTone[] = ["clay", "forest", "gold"];

export function StewardConsole({ onSignOut }: { onSignOut: () => void }) {
  const [tab, setTab] = useState<Tab>("learners");
  const [list, setList] = useState<Learner[]>(seedLearners);
  const [sparkList, setSparkList] = useState<Spark[]>(seedSparks);

  // Enroll form
  const [name, setName] = useState("");
  const [age, setAge] = useState<AgeBand>("child");
  const [guardian, setGuardian] = useState(false);
  const [photo, setPhoto] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const active = list.filter((l) => l.consent === "given");
  const returning = active.filter((l) => l.weeksActive >= 2).length;
  const thisWeek = active.filter(
    (l) => l.lastActive === "today" || l.lastActive === "yesterday",
  ).length;

  const enroll = () => {
    if (!name.trim() || !guardian) return;
    const learner: Learner = {
      id: `L-${Date.now()}`,
      explorerName: name.trim(),
      ageBand: age,
      consent: "given",
      photoConsent: photo,
      joined: "just now",
      weeksActive: 0,
      sessions: 0,
      lastActive: "not yet",
      stickers: [],
      tone: tones[list.length % tones.length],
    };
    setList((prev) => [learner, ...prev]);
    setJustAdded(learner.explorerName);
    setName("");
    setAge("child");
    setGuardian(false);
    setPhoto(false);
    setTab("learners");
  };

  const propose = (id: string) =>
    setSparkList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "proposed" } : s)),
    );

  const field =
    "w-full rounded-[14px] border border-line bg-cream px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400";

  return (
    <div className="min-h-[85vh] bg-sand">
      {/* Bar */}
      <header className="border-b border-line bg-cream">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between gap-3 px-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-[12px] bg-clay-50 text-clay-600">
              <Compass className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-medium text-forest-700">
                Village steward
              </div>
              <div className="text-xs text-stone">Curiosity Program</div>
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

      <div className="mx-auto max-w-2xl px-4 py-6">
        <div className="flex items-start gap-2.5 rounded-[14px] bg-clay-50 px-4 py-3 text-sm text-clay-700 ring-1 ring-clay-100 ring-inset">
          <span aria-hidden>•</span>
          <p>
            Preview with sample data. Not connected to a backend, and nothing
            here is saved.
          </p>
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

        {/* LEARNERS */}
        {tab === "learners" && (
          <div className="mt-5 space-y-4">
            {justAdded && (
              <div className="flex items-center gap-2 rounded-[14px] border border-clay-300/40 bg-clay-50 px-4 py-3 text-sm text-clay-700">
                <CircleCheck
                  className="h-4 w-4 shrink-0 text-forest-600"
                  aria-hidden
                />
                <span>
                  <strong>{justAdded}</strong> is welcomed. Their framed photo
                  can be printed as a gift.
                </span>
              </div>
            )}

            {/* What we watch */}
            <div className="grid grid-cols-2 gap-3">
              <div className={`${card} p-4`}>
                <div className="font-display text-2xl text-forest-700">
                  {returning}
                </div>
                <div className="mt-0.5 text-xs text-stone">
                  Coming back (2+ weeks)
                </div>
              </div>
              <div className={`${card} p-4`}>
                <div className="font-display text-2xl text-forest-700">
                  {thisWeek}
                </div>
                <div className="mt-0.5 text-xs text-stone">
                  Active this week
                </div>
              </div>
            </div>
            <p className="text-xs text-stone">
              We watch how many learners keep coming back and how deeply they
              explore, never a sign-up count.
            </p>

            {/* List */}
            <div className="space-y-3">
              {list.map((l) => {
                const faded = l.consent === "withdrawn";
                return (
                  <div
                    key={l.id}
                    className={`${card} p-4 ${faded ? "opacity-60" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar
                        name={l.explorerName}
                        className="h-10 w-10 text-sm"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-forest-700">
                            {l.explorerName}
                          </span>
                          <span className="text-xs text-stone">
                            {ageBandLabel(l.ageBand)}
                          </span>
                          <Badge tone={consentTone(l.consent)}>
                            consent {l.consent}
                          </Badge>
                          {l.photoConsent && (
                            <span className="inline-flex items-center gap-1 text-xs text-stone">
                              <Camera className="h-3.5 w-3.5" aria-hidden />{" "}
                              photo
                            </span>
                          )}
                        </div>
                        {!faded ? (
                          <>
                            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone">
                              <span className="inline-flex items-center gap-1">
                                <Star
                                  className="h-3.5 w-3.5 text-gold-400"
                                  aria-hidden
                                />
                                {l.weeksActive} of 4 weeks
                              </span>
                              <span>{l.sessions} sessions</span>
                              <span>last: {l.lastActive}</span>
                            </div>
                            {l.spark && (
                              <p className="mt-1.5 text-sm text-forest-700">
                                <span className="text-stone">Loves:</span>{" "}
                                {l.spark}
                              </p>
                            )}
                          </>
                        ) : (
                          <p className="mt-1.5 text-xs text-stone italic">
                            Consent withdrawn. The record is being removed.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-start gap-2 rounded-[14px] bg-sand px-4 py-3 text-xs text-stone ring-1 ring-line ring-inset">
              <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
              <p>
                Private details (full names, family, status) are not shown here.
                They are kept separately, seen only by the founder, and looking
                is logged.
              </p>
            </div>
          </div>
        )}

        {/* ENROLL */}
        {tab === "enroll" && (
          <div className="mt-5 space-y-4">
            <div className={`${card} p-5`}>
              <h2 className="font-display text-lg font-semibold text-forest-700">
                Welcome a new explorer
              </h2>
              <p className="mt-1 text-sm text-stone">
                Start with consent. Explain it to the family in their language.
                They decide, and they can withdraw any time without losing
                anything.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="text-sm font-medium text-forest-700">
                  Name or nickname
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="An explorer name is fine"
                    className={`mt-1.5 ${field}`}
                  />
                </label>
                <label className="text-sm font-medium text-forest-700">
                  Age group
                  <select
                    value={age}
                    onChange={(e) => setAge(e.target.value as AgeBand)}
                    className={`mt-1.5 ${field}`}
                  >
                    <option value="child">Child</option>
                    <option value="teen">Teen</option>
                    <option value="adult">Adult</option>
                  </select>
                </label>
              </div>

              <div className="mt-4 space-y-2.5">
                <label className="flex items-start gap-3 rounded-[14px] border border-line bg-cream p-3 text-sm">
                  <input
                    type="checkbox"
                    checked={guardian}
                    onChange={(e) => setGuardian(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-clay-600"
                  />
                  <span className="text-forest-700">
                    A parent or guardian has freely given consent, in their
                    language, and knows it can be withdrawn.{" "}
                    <span className="text-clay-700">Required.</span>
                  </span>
                </label>
                <label className="flex items-start gap-3 rounded-[14px] border border-line bg-cream p-3 text-sm">
                  <input
                    type="checkbox"
                    checked={photo}
                    onChange={(e) => setPhoto(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-clay-600"
                  />
                  <span className="text-forest-700">
                    The family would like a printed, framed photo as a welcome
                    gift (optional).
                  </span>
                </label>
              </div>

              <button
                type="button"
                onClick={enroll}
                disabled={!name.trim() || !guardian}
                className="mt-4 inline-flex h-11 items-center gap-2 rounded-[14px] bg-clay-600 px-5 text-sm font-medium text-cream shadow-soft transition-colors hover:bg-clay-700 disabled:opacity-40"
              >
                Welcome explorer
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <p className="text-xs text-stone">
              We collect the minimum to begin: a name or nickname, an age group,
              and consent. Nothing more until there is a reason and a safe place
              to keep it.
            </p>
          </div>
        )}

        {/* SPARKS */}
        {tab === "sparks" && (
          <div className="mt-5 space-y-4">
            <p className="text-sm text-stone">
              When a learner keeps lighting up about something, suggest a small,
              real follow-up. The founder approves before anything is bought.
              You suggest; a person decides.
            </p>
            {sparkList.map((s) => {
              const who = list.find((l) => l.id === s.learnerId);
              return (
                <div key={s.id} className={`${card} p-4`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-forest-700">
                      {who?.explorerName ?? "A learner"}
                    </span>
                    <Badge
                      tone={
                        s.status === "delivered" || s.status === "approved"
                          ? "forest"
                          : s.status === "proposed"
                            ? "gold"
                            : "neutral"
                      }
                    >
                      {sparkStatusLabel[s.status]}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-forest-700">
                    <span className="text-stone">Loves:</span> {s.interest}
                  </p>
                  <p className="mt-1 text-sm text-stone">{s.idea}</p>
                  {s.status === "noticed" ? (
                    <button
                      type="button"
                      onClick={() => propose(s.id)}
                      className="mt-3 inline-flex h-9 items-center gap-2 rounded-[12px] bg-clay-600 px-4 text-sm font-medium text-cream transition-colors hover:bg-clay-700"
                    >
                      <Sprout className="h-4 w-4" aria-hidden />
                      Suggest follow-through
                    </button>
                  ) : (
                    <p className="mt-2 text-xs text-stone">{s.note}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* PAY */}
        {tab === "pay" && (
          <div className="mt-5 space-y-4">
            <div className={`${card} p-5`}>
              <h2 className="font-display text-lg font-semibold text-forest-700">
                How I am supported
              </h2>
              <p className="mt-1 text-sm text-stone">{stewardComp.intro}</p>
              <ul className="mt-4 space-y-3">
                {stewardComp.lines.map((line) => (
                  <li
                    key={line.label}
                    className="flex items-start justify-between gap-3 border-b border-line/60 pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <div className="text-sm font-medium text-forest-700">
                        {line.label}
                      </div>
                      <div className="mt-0.5 text-sm text-stone">
                        {line.detail}
                      </div>
                    </div>
                    <span className="shrink-0 text-xs font-medium text-clay-700">
                      {line.amount}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-start gap-2 rounded-[14px] bg-sand px-4 py-3 text-xs text-stone ring-1 ring-line ring-inset">
              <HeartHandshake
                className="mt-0.5 h-3.5 w-3.5 shrink-0"
                aria-hidden
              />
              <p>{stewardComp.note}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
