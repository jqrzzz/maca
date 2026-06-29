"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Pencil,
  Plus,
  Check,
  Trash2,
  ShieldCheck,
  Lock,
  Activity,
  Stethoscope,
  Pill,
  TriangleAlert,
  NotebookPen,
  GraduationCap,
  Sparkles,
  HandHeart,
  LogOut,
  HeartPulse,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { card } from "./ui";
import { ageBandLabel } from "@/content/curiosityDemo";
import {
  demoStudent,
  avatarChoices,
  medicalKindLabel,
  type MedicalKind,
  type MedicalEntry,
} from "@/content/studentProfile";
import { LanguageCenter } from "./LanguageCenter";

type Tab = "me" | "health" | "learn";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "me", label: "Me", icon: User },
  { id: "health", label: "Health", icon: HeartPulse },
  { id: "learn", label: "Learn", icon: GraduationCap },
];

const medicalIcons: Record<MedicalKind, React.ElementType> = {
  allergy: TriangleAlert,
  condition: Activity,
  medication: Pill,
  visit: Stethoscope,
  note: NotebookPen,
};

const medicalKinds = Object.keys(medicalKindLabel) as MedicalKind[];

const field =
  "mt-1.5 w-full rounded-[14px] border border-line bg-cream px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400";

const todayLabel = () =>
  new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });

/**
 * The student/member account: the individual login at the heart of the platform.
 * It holds the four data domains, each with its privacy posture clearly shown:
 * Identity (private), Health (most protected, never sent to the AI), and the
 * Learn space (the Language Center, plus the children's Curiosity). Demo only:
 * nothing is saved or sent; the real system keeps Identity and Health encrypted
 * and under the family's control.
 */
export function StudentProfile({
  onSignOut,
  onOpenCuriosity,
}: {
  onSignOut: () => void;
  onOpenCuriosity?: () => void;
}) {
  const [tab, setTab] = useState<Tab>("me");
  const [avatar, setAvatar] = useState(demoStudent.avatar);
  const [pickAvatar, setPickAvatar] = useState(false);
  const [name, setName] = useState(demoStudent.explorerName);
  const [editName, setEditName] = useState(false);

  const [medical, setMedical] = useState<MedicalEntry[]>(demoStudent.medical);
  const [adding, setAdding] = useState(false);
  const [mKind, setMKind] = useState<MedicalKind>("note");
  const [mTitle, setMTitle] = useState("");
  const [mDetail, setMDetail] = useState("");

  const addMedical = () => {
    if (!mTitle.trim()) return;
    setMedical((prev) => [
      {
        id: `M-${Date.now()}`,
        kind: mKind,
        title: mTitle.trim(),
        detail: mDetail.trim(),
        date: todayLabel(),
      },
      ...prev,
    ]);
    setMKind("note");
    setMTitle("");
    setMDetail("");
    setAdding(false);
  };

  const removeMedical = (id: string) =>
    setMedical((prev) => prev.filter((m) => m.id !== id));

  return (
    <div className="min-h-[85vh] bg-sand">
      {/* Bar */}
      <header className="border-b border-line bg-cream">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between gap-3 px-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-[12px] bg-clay-50 text-clay-600">
              <User className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-medium text-forest-700">
                My account
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

      <div className="mx-auto max-w-2xl px-4 py-6">
        {/* Identity header */}
        <div className={`${card} p-5`}>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setPickAvatar((v) => !v)}
              aria-label="Choose your picture"
              className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-clay-50 text-3xl ring-1 ring-line transition-colors hover:bg-sand"
            >
              {avatar}
            </button>
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
                    {name || "Your name"}
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
                {ageBandLabel(demoStudent.ageBand)} · Joined{" "}
                {demoStudent.joined}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {demoStudent.languages.map((l) => (
                  <span
                    key={l}
                    className="inline-flex items-center rounded-full bg-sand px-2.5 py-0.5 text-xs font-medium text-forest-700 ring-1 ring-line ring-inset"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {pickAvatar && (
            <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
              {avatarChoices.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => {
                    setAvatar(a);
                    setPickAvatar(false);
                  }}
                  aria-label={`Choose ${a}`}
                  aria-pressed={a === avatar}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-2xl ring-1 transition-colors ring-inset ${
                    a === avatar
                      ? "bg-clay-50 ring-clay-300"
                      : "bg-cream ring-line hover:bg-sand"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          )}
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

        {/* ME */}
        {tab === "me" && (
          <div className="mt-5 space-y-4">
            <div className={`${card} p-5`}>
              <div className="flex items-center justify-between gap-2">
                <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-forest-700">
                  <Lock className="h-4 w-4 text-clay-600" aria-hidden />
                  Identity
                </h2>
                <Badge tone="clay">Private</Badge>
              </div>
              <p className="mt-1 text-sm text-stone">
                Only you and the people you allow can see this. In the real
                system it is encrypted and access is logged.
              </p>
              <dl className="mt-4 grid gap-x-4 gap-y-3 sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-stone">Full name</dt>
                  <dd className="font-medium text-forest-700">
                    {demoStudent.fullNameMasked}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-stone">Household</dt>
                  <dd className="text-ink">{demoStudent.household}</dd>
                </div>
                <div>
                  <dt className="text-xs text-stone">Status</dt>
                  <dd className="text-ink">{demoStudent.statusNote}</dd>
                </div>
                <div>
                  <dt className="text-xs text-stone">Consent</dt>
                  <dd>
                    <Badge tone="forest">
                      <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                      Given
                    </Badge>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="flex items-start gap-3 rounded-[16px] border border-dashed border-line bg-cream p-4">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-sand text-clay-600">
                <HandHeart className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-forest-700">Ask for help</h3>
                  <Badge tone="gold">Coming soon</Badge>
                </div>
                <p className="mt-0.5 text-sm text-stone">
                  Later, you will be able to request aid through the app, in
                  your language, and follow what happens next.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* HEALTH */}
        {tab === "health" && (
          <div className="mt-5 space-y-4">
            <div className="flex items-start gap-2 rounded-[14px] bg-clay-50 px-4 py-3 text-sm text-clay-700 ring-1 ring-clay-100 ring-inset">
              <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <p>
                <strong>Most protected.</strong> Only you and the people you
                allow can see your health notes. They are never sent to the AI.
                In this demo they stay on your device and are not saved.
              </p>
            </div>

            {!adding && (
              <button
                type="button"
                onClick={() => setAdding(true)}
                className="inline-flex h-10 items-center gap-2 rounded-[14px] bg-clay-600 px-4 text-sm font-medium text-cream shadow-soft transition-colors hover:bg-clay-700"
              >
                <Plus className="h-4 w-4" aria-hidden />
                Add a health note
              </button>
            )}

            {adding && (
              <div className={`${card} p-5`}>
                <h3 className="font-display text-base font-semibold text-forest-700">
                  Add a health note
                </h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <label className="text-sm font-medium text-forest-700">
                    Kind
                    <select
                      value={mKind}
                      onChange={(e) => setMKind(e.target.value as MedicalKind)}
                      className={field}
                    >
                      {medicalKinds.map((k) => (
                        <option key={k} value={k}>
                          {medicalKindLabel[k]}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-sm font-medium text-forest-700">
                    Title
                    <input
                      value={mTitle}
                      onChange={(e) => setMTitle(e.target.value)}
                      placeholder="For example: Penicillin"
                      className={field}
                    />
                  </label>
                </div>
                <label className="mt-3 block text-sm font-medium text-forest-700">
                  Detail
                  <textarea
                    rows={3}
                    value={mDetail}
                    onChange={(e) => setMDetail(e.target.value)}
                    placeholder="A few words to remember"
                    className={`resize-y ${field}`}
                  />
                </label>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={addMedical}
                    disabled={!mTitle.trim()}
                    className="inline-flex h-10 items-center gap-2 rounded-[14px] bg-clay-600 px-5 text-sm font-medium text-cream transition-colors hover:bg-clay-700 disabled:opacity-40"
                  >
                    <Check className="h-4 w-4" aria-hidden />
                    Save note
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdding(false)}
                    className="inline-flex h-10 items-center rounded-[14px] border border-line px-5 text-sm font-medium text-forest-700 transition-colors hover:bg-sand"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {medical.length === 0 ? (
              <div className={`${card} p-6 text-center text-sm text-stone`}>
                No health notes yet. Add allergies, conditions, medicines, or
                clinic visits so they are remembered.
              </div>
            ) : (
              <ul className="space-y-3">
                {medical.map((m) => {
                  const Icon = medicalIcons[m.kind];
                  return (
                    <li key={m.id} className={`flex gap-3 ${card} p-4`}>
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-clay-50 text-clay-600">
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-medium text-forest-700">
                            {m.title}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeMedical(m.id)}
                            aria-label="Delete note"
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-stone transition-colors hover:bg-sand hover:text-clay-700"
                          >
                            <Trash2 className="h-4 w-4" aria-hidden />
                          </button>
                        </div>
                        {m.detail && (
                          <p className="mt-0.5 text-sm text-stone">
                            {m.detail}
                          </p>
                        )}
                        <div className="mt-2 flex items-center gap-2">
                          <Badge tone="neutral">
                            {medicalKindLabel[m.kind]}
                          </Badge>
                          <span className="text-xs text-stone">{m.date}</span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        {/* LEARN */}
        {tab === "learn" && (
          <div className="mt-5 space-y-4">
            {demoStudent.interest && (
              <div className="flex items-center gap-3 rounded-[16px] bg-gold-400/10 p-4 ring-1 ring-gold-400/30 ring-inset">
                <Sparkles
                  className="h-5 w-5 shrink-0 text-clay-600"
                  aria-hidden
                />
                <p className="text-sm text-forest-700">
                  You love{" "}
                  <span className="font-medium">
                    {demoStudent.interest.toLowerCase()}
                  </span>
                  . Your teacher can build lessons around it.
                </p>
              </div>
            )}

            {onOpenCuriosity && (
              <button
                type="button"
                onClick={onOpenCuriosity}
                className="flex w-full items-center gap-3 rounded-[16px] border border-line bg-cream p-4 text-left transition-colors hover:bg-sand/60"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-gold-400 text-forest-700">
                  <Sparkles className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block font-medium text-forest-700">
                    Your children&apos;s Curiosity
                  </span>
                  <span className="mt-0.5 block text-xs text-stone">
                    Open kid mode, where children ask the friendly guide
                    anything.
                  </span>
                </span>
              </button>
            )}

            <LanguageCenter />
          </div>
        )}
      </div>
    </div>
  );
}
