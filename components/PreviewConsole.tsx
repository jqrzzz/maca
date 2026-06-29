"use client";

import { useState, type ReactNode } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { demoPeople, type DemoPerson, type Role } from "@/content/previewDemo";
import { type Learner } from "@/content/curiosityDemo";
import { AdminConsole } from "@/components/preview/AdminConsole";
import { MemberApp } from "@/components/preview/MemberApp";
import { StewardConsole } from "@/components/preview/StewardConsole";
import { LearnerApp } from "@/components/preview/LearnerApp";
import { StudentProfile } from "@/components/preview/StudentProfile";
import { DonorPortal } from "@/components/preview/DonorPortal";
import { AuthScreen, type AuthRole } from "@/components/preview/AuthScreen";
import { DemoBar } from "@/components/preview/DemoBar";
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
  | "student"
  | "donor";
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

  // Route a chosen role from the auth screen to its space.
  const choose = (role: AuthRole) => {
    if (role === "admin") {
      setAdminInitialTab("overview");
      setView("admin");
    } else if (role === "member") {
      setMember({ name: "Teacher", role: "volunteer" });
      setView("member");
    } else {
      setView(role);
    }
  };

  // The demo bar can jump to any space, including kid mode.
  const switchTo = (target: string) => {
    if (target === "learner") setView("learner");
    else choose(target as AuthRole);
  };

  // Returning to the login ends the session and resets the live demo state.
  const signOut = () => {
    resetCuriosityLive();
    setView("login");
  };

  let screen: ReactNode;

  if (view === "admin") {
    screen = (
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
  } else if (view === "member") {
    screen = <MemberApp member={member} onSignOut={signOut} />;
  } else if (view === "steward") {
    screen = <StewardConsole onSignOut={signOut} onSwitch={goPerspective} />;
  } else if (view === "learner") {
    screen = (
      <LearnerApp
        learner={demoLearner}
        onSignOut={signOut}
        onSwitch={goPerspective}
      />
    );
  } else if (view === "student") {
    screen = (
      <StudentProfile
        onSignOut={signOut}
        onOpenCuriosity={() => setView("learner")}
      />
    );
  } else if (view === "donor") {
    screen = <DonorPortal onSignOut={signOut} />;
  } else if (view === "setup") {
    screen = (
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
                <input
                  type="password"
                  defaultValue="demo-demo-demo"
                  className={fieldCls}
                />
              </label>
              <label className="block text-sm font-medium text-forest-700">
                Confirm password
                <input
                  type="password"
                  defaultValue="demo-demo-demo"
                  className={fieldCls}
                />
              </label>
              <button
                type="submit"
                className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-[14px] bg-clay-600 px-6 font-medium text-cream shadow-soft transition-colors hover:bg-clay-700"
              >
                Create account and continue
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
  } else {
    screen = <AuthScreen onChoose={choose} />;
  }

  const showBar = view !== "login" && view !== "setup";

  return (
    <>
      <div key={view} className="animate-view">
        {screen}
      </div>
      {showBar && (
        <DemoBar current={view} onSwitch={switchTo} onReset={signOut} />
      )}
    </>
  );
}
