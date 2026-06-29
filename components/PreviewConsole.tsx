"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Lock,
  ArrowRight,
  ArrowLeft,
  UserCog,
  HardHat,
  Compass,
  Sparkles,
  BookOpen,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { demoPeople, type DemoPerson, type Role } from "@/content/previewDemo";
import { type Learner } from "@/content/curiosityDemo";
import { AdminConsole } from "@/components/preview/AdminConsole";
import { MemberApp } from "@/components/preview/MemberApp";
import { StewardConsole } from "@/components/preview/StewardConsole";
import { LearnerApp } from "@/components/preview/LearnerApp";
import { StudentProfile } from "@/components/preview/StudentProfile";
import { type Perspective } from "@/components/preview/CuriositySwitcher";
import { resetCuriosityLive } from "@/components/preview/curiosityStore";
import { card } from "@/components/preview/ui";

type View =
  | "login"
  | "admin"
  | "setup"
  | "member"
  | "steward"
  | "learner"
  | "student";
type Invite = { name: string; email: string; role: Role };

const fieldCls =
  "mt-1.5 w-full rounded-[14px] border border-line bg-sand px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400";

/** A fresh explorer for the learner (kid mode) demo: starts with no stickers so
 *  they can be earned live by asking questions. */
const demoLearner: Learner = {
  id: "L-you",
  explorerName: "Maple",
  ageBand: "child",
  consent: "given",
  photoConsent: true,
  joined: "today",
  weeksActive: 1,
  sessions: 1,
  lastActive: "today",
  stickers: [],
  tone: "forest",
};

export function PreviewConsole() {
  const [view, setView] = useState<View>("login");
  const [people, setPeople] = useState<DemoPerson[]>(demoPeople);
  const [invite, setInvite] = useState<Invite | null>(null);
  const [member, setMember] = useState<{ name: string; role: string }>({
    name: "Teacher",
    role: "volunteer",
  });
  const [adminInitialTab, setAdminInitialTab] = useState<
    "overview" | "curiosity"
  >("overview");

  const addMember = (m: Invite) =>
    setPeople((prev) => [
      ...prev,
      { name: m.name, role: m.role, status: "active", onboarding: [] },
    ]);

  // Hop between the three Curiosity Program perspectives during a walkthrough.
  const goPerspective = (p: Perspective) => {
    if (p === "learner") setView("learner");
    else if (p === "steward") setView("steward");
    else {
      setAdminInitialTab("curiosity");
      setView("admin");
    }
  };

  // Returning to the login ends the session and resets the live demo state.
  const signOut = () => {
    resetCuriosityLive();
    setView("login");
  };

  // ---- Admin console ----
  if (view === "admin") {
    return (
      <AdminConsole
        me={people[0]}
        people={people}
        onAddMember={addMember}
        onOpenSetup={(m) => {
          setInvite(m);
          setView("setup");
        }}
        onSignOut={signOut}
        initialTab={adminInitialTab}
        onSwitchPerspective={goPerspective}
      />
    );
  }

  // ---- Member field app ----
  if (view === "member") {
    return (
      <MemberApp member={member} onSignOut={signOut} />
    );
  }

  // ---- Village steward (Curiosity Program) ----
  if (view === "steward") {
    return (
      <StewardConsole
        onSignOut={signOut}
        onSwitch={goPerspective}
      />
    );
  }

  // ---- Young learner (kid mode) ----
  if (view === "learner") {
    return (
      <LearnerApp
        learner={demoLearner}
        onSignOut={signOut}
        onSwitch={goPerspective}
      />
    );
  }

  // ---- Student account (individual login) ----
  if (view === "student") {
    return (
      <StudentProfile
        onSignOut={signOut}
        onOpenCuriosity={() => setView("learner")}
      />
    );
  }

  // ---- Set-password (from an invite link) ----
  if (view === "setup") {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-sand px-6 py-16">
        <div className="w-full max-w-md">
          <div className={`${card} p-8`}>
            <Badge tone="gold">Invite link · demo</Badge>
            <h1 className="mt-4 font-display text-2xl font-semibold text-forest-700">
              Set your password
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-stone">
              Welcome{invite ? `, ${invite.name}` : ""}. Choose a password to
              activate your PRASM account and open the field app.
            </p>
            <form
              className="mt-6 flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (invite) setMember({ name: invite.name, role: invite.role });
                setView("member");
              }}
            >
              {invite && (
                <label className="block text-sm font-medium text-forest-700">
                  Email
                  <input readOnly value={invite.email} className={fieldCls} />
                </label>
              )}
              <label className="block text-sm font-medium text-forest-700">
                New password
                <input type="password" defaultValue="demo-demo-demo" className={fieldCls} />
              </label>
              <label className="block text-sm font-medium text-forest-700">
                Confirm password
                <input type="password" defaultValue="demo-demo-demo" className={fieldCls} />
              </label>
              <button
                type="submit"
                className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-[14px] bg-clay-600 px-6 font-medium text-cream shadow-soft transition-colors hover:bg-clay-700"
              >
                Create account & continue
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </form>
          </div>
          <button
            type="button"
            onClick={() => setView("login")}
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-clay-700 underline decoration-clay-300 underline-offset-4 hover:decoration-clay-600"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back
          </button>
        </div>
      </div>
    );
  }

  // ---- Login (choose a role to preview) ----
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
            A visual preview of the future team console. This is a demo: no real
            account, and nothing you type leaves your browser. Choose a view.
          </p>

          <div className="mt-6 grid gap-3">
            <p className="text-xs font-semibold tracking-wide text-stone uppercase">
              Internal console
            </p>
            <button
              type="button"
              onClick={() => {
                setAdminInitialTab("overview");
                setView("admin");
              }}
              className="flex items-center gap-3 rounded-[16px] border border-line bg-cream p-4 text-left transition-colors hover:bg-sand/60"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-clay-600 text-cream">
                <UserCog className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 font-medium text-forest-700">
                  Enter as admin <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
                <span className="mt-0.5 block text-xs text-stone">
                  The founder console: people, finance, approvals, field captures.
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMember({ name: "Teacher", role: "volunteer" });
                setView("member");
              }}
              className="flex items-center gap-3 rounded-[16px] border border-line bg-cream p-4 text-left transition-colors hover:bg-sand/60"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-forest-500 text-cream">
                <HardHat className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 font-medium text-forest-700">
                  Enter as a field member <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
                <span className="mt-0.5 block text-xs text-stone">
                  The simple capture app: photos, notes, voice memos, expenses.
                </span>
              </span>
            </button>

            <p className="pt-2 text-xs font-semibold tracking-wide text-stone uppercase">
              Curiosity Program
            </p>

            <button
              type="button"
              onClick={() => setView("steward")}
              className="flex items-center gap-3 rounded-[16px] border border-line bg-cream p-4 text-left transition-colors hover:bg-sand/60"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-clay-500 text-cream">
                <Compass className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 font-medium text-forest-700">
                  Enter as the village steward{" "}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
                <span className="mt-0.5 block text-xs text-stone">
                  The Curiosity Program: welcome learners, see who comes back,
                  suggest follow-through.
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setView("learner")}
              className="flex items-center gap-3 rounded-[16px] border border-line bg-cream p-4 text-left transition-colors hover:bg-sand/60"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-gold-400 text-forest-700">
                <Sparkles className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 font-medium text-forest-700">
                  Enter as a young learner{" "}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
                <span className="mt-0.5 block text-xs text-stone">
                  Kid mode: a safe, friendly AI to ask anything, earn stickers,
                  and explore.
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setView("student")}
              className="flex items-center gap-3 rounded-[16px] border border-line bg-cream p-4 text-left transition-colors hover:bg-sand/60"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-forest-700 text-cream">
                <User className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 font-medium text-forest-700">
                  Enter as a student account{" "}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
                <span className="mt-0.5 block text-xs text-stone">
                  The individual login: your profile, your health notes, and the
                  language center.
                </span>
              </span>
            </button>

            <a
              href="/steward-guide.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-[16px] border border-dashed border-line bg-cream p-4 text-left transition-colors hover:bg-sand/60"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-sand text-clay-600">
                <BookOpen className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 font-medium text-forest-700">
                  Open the steward guide{" "}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
                <span className="mt-0.5 block text-xs text-stone">
                  A read-aloud explanation and onboarding to show, print, or
                  share. Opens in a new tab.
                </span>
              </span>
            </a>
          </div>
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
