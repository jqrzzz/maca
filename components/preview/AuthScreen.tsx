"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Lock,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  UserCog,
  HardHat,
  Compass,
  User,
  HandCoins,
  Apple,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { card } from "./ui";
import { avatarChoices } from "@/content/studentProfile";
import { PinPad } from "./PinPad";
import { toast } from "./toast";

export type AuthRole = "admin" | "member" | "steward" | "student" | "donor";

type AccessModel = "self" | "invite" | "steward";

const accessLabel: Record<AccessModel, string> = {
  self: "Create an account",
  invite: "Invite only",
  steward: "Added by your steward",
};

const roles: {
  id: AuthRole;
  label: string;
  desc: string;
  access: AccessModel;
  icon: React.ElementType;
  accent: string;
}[] = [
  {
    id: "donor",
    label: "Donor",
    desc: "See your giving, impact, and documents.",
    access: "self",
    icon: HandCoins,
    accent: "bg-clay-700",
  },
  {
    id: "student",
    label: "Student or family",
    desc: "Your profile, your health notes, and learning.",
    access: "steward",
    icon: User,
    accent: "bg-forest-700",
  },
  {
    id: "steward",
    label: "Village steward",
    desc: "Welcome students, run sessions, and log money.",
    access: "invite",
    icon: Compass,
    accent: "bg-clay-500",
  },
  {
    id: "member",
    label: "Field member",
    desc: "Capture photos, notes, voice memos, expenses.",
    access: "invite",
    icon: HardHat,
    accent: "bg-forest-500",
  },
  {
    id: "admin",
    label: "Admin",
    desc: "The founder console: people, finance, approvals.",
    access: "invite",
    icon: UserCog,
    accent: "bg-clay-600",
  },
];

const field =
  "w-full rounded-[14px] border border-line bg-sand px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400";

/**
 * The demo front door. Industry-standard sign-in, but demo mode: any details
 * work and nothing is saved. Roles get in differently, which is the point of
 * the demo: donors create an account, staff are invite only, and students
 * (often children with no email) are added by their steward and sign in with a
 * picture and a PIN.
 */
export function AuthScreen({
  onChoose,
}: {
  onChoose: (role: AuthRole) => void;
}) {
  const [role, setRole] = useState<AuthRole | null>(null);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [pin, setPin] = useState("");
  const [avatar, setAvatar] = useState(avatarChoices[0]);

  const active = roles.find((r) => r.id === role) ?? null;

  const select = (r: AuthRole) => {
    setRole(r);
    setMode("signin");
    setEmail("");
    setPassword("");
    setConfirm("");
    setForgot(false);
    setPin("");
    setAvatar(avatarChoices[0]);
  };

  const formValid =
    email.trim().length > 0 &&
    password.length > 0 &&
    (mode === "signin" || password === confirm);

  // ---- Role picker ----
  if (!active) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-sand px-6 py-16">
        <div className="w-full max-w-md">
          <div className={`${card} p-8`}>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-[14px] bg-clay-50 text-clay-600">
              <Lock className="h-6 w-6" strokeWidth={1.75} aria-hidden />
            </span>
            <div className="mt-5 flex items-center gap-2">
              <h1 className="font-display text-2xl font-semibold text-forest-700">
                Sign in
              </h1>
              <Badge tone="gold">Preview</Badge>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-stone">
              A demo of the team and community platform. Choose how you are
              signing in. This is a demo: any details work, and nothing you type
              leaves your browser.
            </p>

            <div className="mt-6 grid gap-3">
              {roles.map((r) => {
                const Icon = r.icon;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => select(r.id)}
                    className="flex items-center gap-3 rounded-[16px] border border-line bg-cream p-4 text-left transition-colors hover:bg-sand/60"
                  >
                    <span
                      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] text-cream ${r.accent}`}
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 font-medium text-forest-700">
                        {r.label}
                        <span className="rounded-full bg-sand px-2 py-0.5 text-[0.6875rem] font-medium text-stone ring-1 ring-line ring-inset">
                          {accessLabel[r.access]}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-xs text-stone">
                        {r.desc}
                      </span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-stone"
                      aria-hidden
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-clay-700 underline decoration-clay-300 underline-offset-4 hover:decoration-clay-600"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to the site
            </Link>
            <a
              href="/steward-guide.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-stone underline decoration-line underline-offset-4 hover:text-forest-700"
            >
              Steward guide
            </a>
          </div>
        </div>
      </div>
    );
  }

  const Icon = active.icon;

  const go = () => {
    toast(`Signed in as ${active.label}`);
    onChoose(active.id);
  };

  // ---- Role-specific sign-in ----
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-sand px-6 py-16">
      <div className="w-full max-w-md">
        <div className={`${card} p-8`}>
          <button
            type="button"
            onClick={() => setRole(null)}
            className="hover:text-clay-800 inline-flex items-center gap-1.5 text-sm font-medium text-clay-700"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All roles
          </button>

          <div className="mt-4 flex items-center gap-3">
            <span
              className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] text-cream ${active.accent}`}
            >
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h1 className="font-display text-xl font-semibold text-forest-700">
                {active.label}
              </h1>
              <p className="text-xs text-stone">{accessLabel[active.access]}</p>
            </div>
          </div>

          {active.access === "steward" ? (
            /* Student: picture + PIN */
            <div className="mt-6">
              <p className="text-sm text-stone">
                Sign in with your picture and PIN.
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {avatarChoices.slice(0, 6).map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAvatar(a)}
                    aria-pressed={a === avatar}
                    aria-label={`Choose ${a}`}
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
              <div className="mt-5">
                <PinPad value={pin} onChange={setPin} />
              </div>
              <button
                type="button"
                onClick={go}
                disabled={pin.length < 4}
                className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-clay-600 px-6 font-medium text-cream shadow-soft transition-colors hover:bg-clay-700 disabled:opacity-40"
              >
                Sign in
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              <p className="mt-4 text-center text-xs text-stone">
                New here? Your steward adds you, with your family&apos;s
                consent.
              </p>
            </div>
          ) : (
            /* Staff and donors: email + password */
            <div className="mt-6">
              {active.access === "self" && (
                <div className="mb-4 inline-flex rounded-full bg-sand p-1 text-sm">
                  <button
                    type="button"
                    onClick={() => setMode("signin")}
                    className={`rounded-full px-3 py-1 font-medium transition-colors ${
                      mode === "signin"
                        ? "bg-cream text-forest-700 shadow-soft"
                        : "text-stone"
                    }`}
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className={`rounded-full px-3 py-1 font-medium transition-colors ${
                      mode === "signup"
                        ? "bg-cream text-forest-700 shadow-soft"
                        : "text-stone"
                    }`}
                  >
                    Create account
                  </button>
                </div>
              )}

              {active.access === "invite" && (
                <div className="mb-4 flex items-start gap-2 rounded-[12px] bg-sand px-3 py-2 text-xs text-stone ring-1 ring-line ring-inset">
                  <ShieldCheck
                    className="mt-0.5 h-3.5 w-3.5 shrink-0"
                    aria-hidden
                  />
                  <p>
                    Invite only. Use the link your foundation sent, or sign in
                    with the account they set up for you.
                  </p>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (formValid) go();
                }}
                className="space-y-3"
              >
                <label className="block text-sm font-medium text-forest-700">
                  Email
                  <span className="mt-1.5 flex items-center gap-2 rounded-[14px] border border-line bg-sand px-3 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-gold-400">
                    <Mail className="h-4 w-4 shrink-0 text-stone" aria-hidden />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.org"
                      className="w-full bg-transparent py-3 text-ink focus-visible:outline-none"
                    />
                  </span>
                </label>

                <label className="block text-sm font-medium text-forest-700">
                  Password
                  <span className="mt-1.5 flex items-center gap-2 rounded-[14px] border border-line bg-sand px-3 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-gold-400">
                    <KeyRound
                      className="h-4 w-4 shrink-0 text-stone"
                      aria-hidden
                    />
                    <input
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your password"
                      className="w-full bg-transparent py-3 text-ink focus-visible:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      aria-label={showPw ? "Hide password" : "Show password"}
                      className="shrink-0 text-stone hover:text-forest-700"
                    >
                      {showPw ? (
                        <EyeOff className="h-4 w-4" aria-hidden />
                      ) : (
                        <Eye className="h-4 w-4" aria-hidden />
                      )}
                    </button>
                  </span>
                </label>

                {active.access === "self" && mode === "signup" && (
                  <label className="block text-sm font-medium text-forest-700">
                    Confirm password
                    <input
                      type={showPw ? "text" : "password"}
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="Repeat your password"
                      className={`mt-1.5 ${field}`}
                    />
                  </label>
                )}

                {mode === "signin" && (
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => setForgot(true)}
                      className="hover:text-clay-800 text-xs font-medium text-clay-700"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}
                {forgot && (
                  <p className="text-xs text-stone">
                    Demo: password reset is not wired up. Pick any password to
                    continue.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!formValid}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-clay-600 px-6 font-medium text-cream shadow-soft transition-colors hover:bg-clay-700 disabled:opacity-40"
                >
                  {mode === "signup" ? "Create account" : "Sign in"}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              </form>

              <div className="my-4 flex items-center gap-3 text-xs text-stone">
                <span className="h-px flex-1 bg-line" />
                or
                <span className="h-px flex-1 bg-line" />
              </div>

              <div className="grid gap-2">
                <button
                  type="button"
                  onClick={go}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-[14px] border border-line bg-cream text-sm font-medium text-forest-700 transition-colors hover:bg-sand"
                >
                  <Globe className="h-4 w-4" aria-hidden />
                  Continue with Google
                </button>
                <button
                  type="button"
                  onClick={go}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-[14px] border border-line bg-cream text-sm font-medium text-forest-700 transition-colors hover:bg-sand"
                >
                  <Apple className="h-4 w-4" aria-hidden />
                  Continue with Apple
                </button>
              </div>

              <p className="mt-4 text-center text-xs text-stone">
                Demo mode. Any details work, and nothing is saved or sent.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
