"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Compass,
  BookOpen,
  Users,
  UserPlus,
  Sprout,
  HeartHandshake,
  Lock,
  CircleCheck,
  Camera,
  ArrowRight,
  Star,
  Sparkles,
  Languages,
  NotebookPen,
  Printer,
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
  type AgeBand,
  type AvatarTone,
} from "@/content/curiosityDemo";
import { Avatar, card } from "./ui";
import { CuriositySwitcher, type Perspective } from "./CuriositySwitcher";
import { SessionNotes } from "./SessionNotes";
import { useCuriosityLive, setLiveSparkStatus } from "./curiosityStore";
import { GuideTip } from "./GuideTip";
import { StewardGuide } from "./StewardGuide";
import { WelcomePhoto } from "./WelcomePhoto";

type Tab = "guide" | "learners" | "enroll" | "sparks" | "pay";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "guide", label: "Guide", icon: BookOpen },
  { id: "learners", label: "Learners", icon: Users },
  { id: "enroll", label: "Enroll", icon: UserPlus },
  { id: "sparks", label: "Sparks", icon: Sprout },
  { id: "pay", label: "How I'm paid", icon: HeartHandshake },
];

const consentTone = (c: Learner["consent"]) =>
  c === "given" ? "forest" : c === "pending" ? "gold" : "neutral";

const tones: AvatarTone[] = ["clay", "forest", "gold"];

export function StewardConsole({
  onSignOut,
  onSwitch,
}: {
  onSignOut: () => void;
  onSwitch?: (p: Perspective) => void;
}) {
  const [tab, setTab] = useState<Tab>("guide");
  const [list, setList] = useState<Learner[]>(seedLearners);
  const sparkList = seedSparks;
  const live = useCuriosityLive();

  // Enroll form
  const [name, setName] = useState("");
  const [age, setAge] = useState<AgeBand>("child");
  const [guardian, setGuardian] = useState(false);
  const [photo, setPhoto] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState<{
    name: string;
    photo: boolean;
  } | null>(null);
  const [sessionNote, setSessionNote] = useState("");
  const [sessionLog, setSessionLog] = useState<
    { id: string; text: string; at: string }[]
  >([]);

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
      welcomePhoto: photo ? (photoUrl ?? undefined) : undefined,
    };
    setList((prev) => [learner, ...prev]);
    setJustAdded({ name: learner.explorerName, photo: !!learner.welcomePhoto });
    setName("");
    setAge("child");
    setGuardian(false);
    setPhoto(false);
    // Ownership of the object URL transfers to the learner record; do not revoke.
    setPhotoUrl(null);
    setTab("learners");
  };

  const logSession = () => {
    const text = sessionNote.trim();
    if (!text) return;
    const at = new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
    setSessionLog((prev) => [{ id: `s-${Date.now()}`, text, at }, ...prev]);
    setSessionNote("");
  };

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
        {onSwitch && (
          <CuriositySwitcher current="steward" onSwitch={onSwitch} />
        )}

        <GuideTip title="You are Ong, the village steward">
          Interests from kid-mode sessions arrive in the Sparks tab as a live
          list. Suggest follow-through and the founder approves it. You see the
          celebratory details only, never the private Tier 2 record.
        </GuideTip>

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

        {/* GUIDE */}
        {tab === "guide" && (
          <div className="mt-5 space-y-3">
            <StewardGuide />
            <a
              href="/preview/steward-guide"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-clay-700 underline decoration-clay-300 underline-offset-4 hover:decoration-clay-600"
            >
              <Printer className="h-4 w-4" aria-hidden />
              Open a printable version
            </a>
          </div>
        )}

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
                  <strong>{justAdded.name}</strong> is welcomed.
                  {justAdded.photo
                    ? " Their welcome photo is ready to print and frame as a gift."
                    : ""}
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

            {onSwitch && (
              <button
                type="button"
                onClick={() => onSwitch("learner")}
                className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-clay-600 px-4 py-3 text-sm font-medium text-cream shadow-soft transition-colors hover:bg-clay-700"
              >
                <Sparkles className="h-4 w-4" aria-hidden />
                Start a learning session
              </button>
            )}

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
                      {l.welcomePhoto ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={l.welcomePhoto}
                          alt={`Welcome photo of ${l.explorerName}`}
                          className="h-10 w-10 shrink-0 rounded-[10px] border border-line object-cover"
                        />
                      ) : (
                        <Avatar
                          name={l.explorerName}
                          className="h-10 w-10 text-sm"
                        />
                      )}
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

            {/* Session log */}
            <div className={`${card} p-5`}>
              <h3 className="font-display text-base font-semibold text-forest-700">
                Log a session
              </h3>
              <p className="mt-1 text-xs text-stone">
                A quick note: who came, and what they got excited about. It
                helps us see what is working.
              </p>
              <textarea
                rows={2}
                value={sessionNote}
                onChange={(e) => setSessionNote(e.target.value)}
                placeholder="Six children came. Two love animals; one keeps asking about the river."
                className={`mt-3 resize-y ${field}`}
              />
              <button
                type="button"
                onClick={logSession}
                disabled={!sessionNote.trim()}
                className="mt-2 inline-flex h-9 items-center gap-2 rounded-[12px] bg-clay-600 px-4 text-sm font-medium text-cream transition-colors hover:bg-clay-700 disabled:opacity-40"
              >
                <NotebookPen className="h-4 w-4" aria-hidden />
                Save note
              </button>
              {sessionLog.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {sessionLog.map((s) => (
                    <li
                      key={s.id}
                      className="rounded-[12px] border border-line bg-sand/50 p-3"
                    >
                      <p className="text-sm text-ink">{s.text}</p>
                      <p className="mt-1 text-xs text-stone">{s.at}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* ENROLL */}
        {tab === "enroll" && (
          <div className="mt-5 space-y-4">
            <details className="rounded-[16px] border border-gold-400/40 bg-gold-400/10 p-4">
              <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-forest-700">
                <Languages className="h-4 w-4 text-clay-600" aria-hidden />
                What to say to the family (in their language)
              </summary>
              <ul className="mt-3 space-y-1.5 text-sm text-stone">
                <li>
                  This is a small learning club. Your child can ask a friendly,
                  safe helper anything they wonder about, and a grown-up is
                  always there.
                </li>
                <li>
                  To begin we keep only a name or nickname and an age group.
                  Nothing more without your agreement.
                </li>
                <li>
                  If you like, we will print and frame a photo of your child for
                  you to keep.
                </li>
                <li>
                  When your child keeps getting excited about something, we
                  notice it openly and tell you, so we can bring something
                  helpful.
                </li>
                <li>
                  It is free and voluntary. Nothing depends on sharing anything
                  private, and you can stop or remove their record any time.
                </li>
              </ul>
              <a
                href="/preview/consent"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-clay-700 underline decoration-clay-300 underline-offset-4 hover:decoration-clay-600"
              >
                <Printer className="h-4 w-4" aria-hidden />
                Open a printable consent card
              </a>
            </details>
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
                    onChange={(e) => {
                      const on = e.target.checked;
                      setPhoto(on);
                      if (!on && photoUrl) {
                        URL.revokeObjectURL(photoUrl);
                        setPhotoUrl(null);
                      }
                    }}
                    className="mt-0.5 h-4 w-4 accent-clay-600"
                  />
                  <span className="text-forest-700">
                    The family would like a printed, framed photo as a welcome
                    gift (optional).
                  </span>
                </label>
                {photo && (
                  <WelcomePhoto
                    name={name}
                    url={photoUrl}
                    onChange={setPhotoUrl}
                  />
                )}
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

            {live.sparks.length > 0 && (
              <div className={`${card} border-clay-300/50 p-4`}>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-clay-600" />
                  <h3 className="font-display text-sm font-semibold text-forest-700">
                    Live this session
                  </h3>
                </div>
                <div className="mt-3 space-y-3">
                  {live.sparks.map((s) => (
                    <div
                      key={s.id}
                      className="rounded-[12px] border border-line bg-sand/50 p-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-medium text-forest-700">
                          {s.learner}
                        </span>
                        <Badge
                          tone={
                            s.status === "approved"
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
                          onClick={() => setLiveSparkStatus(s.id, "proposed")}
                          className="mt-3 inline-flex h-9 items-center gap-2 rounded-[12px] bg-clay-600 px-4 text-sm font-medium text-cream transition-colors hover:bg-clay-700"
                        >
                          <Sprout className="h-4 w-4" aria-hidden />
                          Suggest follow-through
                        </button>
                      ) : s.status === "proposed" ? (
                        <p className="mt-2 text-xs text-stone">
                          Sent to the founder for approval.
                        </p>
                      ) : (
                        <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-forest-700">
                          <CircleCheck className="h-3.5 w-3.5" aria-hidden />
                          Approved by the founder.
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h3 className="pt-1 text-sm font-semibold text-forest-700">
              Earlier this month
            </h3>
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
                  <p className="mt-2 text-xs text-stone">{s.note}</p>
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

        <SessionNotes context="Steward" />
      </div>
    </div>
  );
}
