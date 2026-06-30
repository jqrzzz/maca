"use client";

import { useState } from "react";
import {
  HeartHandshake,
  UserPlus,
  Camera,
  KeyRound,
  ClipboardCheck,
  ShieldCheck,
  Printer,
  ArrowLeft,
  ArrowRight,
  Check,
  CircleCheck,
  RotateCcw,
} from "lucide-react";
import { card } from "./ui";
import { type AgeBand } from "@/content/curiosityDemo";
import { avatarChoices } from "@/content/studentProfile";
import { WelcomePhoto } from "./WelcomePhoto";
import { PinPad } from "./PinPad";

export type EnrollData = {
  name: string;
  ageBand: AgeBand;
  photoUrl: string | null;
  avatar: string;
  pin: string;
};

const steps = [
  { title: "Consent", icon: HeartHandshake },
  { title: "About them", icon: UserPlus },
  { title: "Welcome photo", icon: Camera },
  { title: "Sign-in", icon: KeyRound },
  { title: "Review", icon: ClipboardCheck },
];

const field =
  "mt-1.5 w-full rounded-[14px] border border-line bg-cream px-4 py-3 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400";

/**
 * The steward's guided flow for adding a student, consent first. It mirrors a
 * real onboarding wizard but fits the audience: families consent in their own
 * language, and a child with no email signs in later with a picture and a PIN
 * the steward sets with them. Demo only: nothing is saved or sent.
 */
export function EnrollStudent({
  onEnroll,
}: {
  onEnroll: (data: EnrollData) => void;
}) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [ageBand, setAgeBand] = useState<AgeBand>("child");
  const [consentFamily, setConsentFamily] = useState(false);
  const [grownup, setGrownup] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [avatar, setAvatar] = useState(avatarChoices[0]);
  const [pin, setPin] = useState("");
  const [done, setDone] = useState(false);

  const last = step === steps.length - 1;
  const valid = [
    consentFamily && grownup,
    name.trim().length > 0,
    true,
    pin.length === 4,
    true,
  ][step];

  const next = () => {
    if (!valid) return;
    if (last) {
      onEnroll({ name: name.trim(), ageBand, photoUrl, avatar, pin });
      setDone(true);
    } else {
      setStep((s) => s + 1);
    }
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const reset = () => {
    setStep(0);
    setName("");
    setAgeBand("child");
    setConsentFamily(false);
    setGrownup(false);
    // Ownership of any photo URL transferred to the learner record; do not revoke.
    setPhotoUrl(null);
    setAvatar(avatarChoices[0]);
    setPin("");
    setDone(false);
  };

  if (done) {
    return (
      <div className="mt-5">
        <div
          className={`${card} p-6 text-center`}
          data-tour-id="enroll-success"
        >
          <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-forest-500/10 text-forest-700">
            <CircleCheck className="h-7 w-7" aria-hidden />
          </span>
          <h2 className="mt-3 font-display text-xl font-semibold text-forest-700">
            {name || "Your explorer"} is welcomed
          </h2>
          <p className="mt-1.5 text-sm text-stone">
            They can sign in on the tablet with their picture{" "}
            <span className="align-middle text-xl">{avatar}</span> and their
            PIN. You will find them in your Learners list.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-[14px] bg-clay-600 px-5 text-sm font-medium text-cream shadow-soft transition-colors hover:bg-clay-700"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            Welcome another
          </button>
        </div>
      </div>
    );
  }

  const StepIcon = steps[step].icon;

  return (
    <div className="mt-5">
      <div className={`${card} p-6`}>
        {/* Progress */}
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-forest-700">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-clay-50 text-clay-600">
              <StepIcon className="h-4 w-4" aria-hidden />
            </span>
            {steps[step].title}
          </span>
          <span className="text-xs font-medium text-stone">
            Step {step + 1} of {steps.length}
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-sand">
          <div
            className="h-full rounded-full bg-clay-600 transition-all"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div className="mt-5">
          {/* Step 0: Consent */}
          {step === 0 && (
            <div>
              <h2 className="font-display text-lg font-semibold text-forest-700">
                Start with consent
              </h2>
              <p className="mt-1 text-sm text-stone">
                Explain it to the family in their language. They decide, and
                they can withdraw any time without losing anything.
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-stone">
                <li>
                  A small learning club. A child asks a friendly, safe helper
                  anything, and a grown-up is always there.
                </li>
                <li>
                  To begin we keep only a name or nickname and an age group.
                  Nothing more without your agreement.
                </li>
                <li>
                  It is free and voluntary. You can stop or remove their record
                  any time.
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

              <div className="mt-4 space-y-2.5">
                <label className="flex items-start gap-3 rounded-[14px] border border-line bg-cream p-3 text-sm">
                  <input
                    type="checkbox"
                    checked={consentFamily}
                    onChange={(e) => setConsentFamily(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-clay-600"
                  />
                  <span className="text-forest-700">
                    A parent or guardian has freely given consent, in their
                    language, and knows it can be withdrawn.
                  </span>
                </label>
                <label className="flex items-start gap-3 rounded-[14px] border border-line bg-cream p-3 text-sm">
                  <input
                    type="checkbox"
                    checked={grownup}
                    onChange={(e) => setGrownup(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-clay-600"
                  />
                  <span className="text-forest-700">
                    A trusted grown-up is present for the session.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Step 1: About them */}
          {step === 1 && (
            <div>
              <h2 className="font-display text-lg font-semibold text-forest-700">
                About them
              </h2>
              <p className="mt-1 text-sm text-stone">
                Just the minimum to begin: a name or nickname and an age group.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="text-sm font-medium text-forest-700">
                  Name or nickname
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="An explorer name is fine"
                    className={field}
                  />
                </label>
                <label className="text-sm font-medium text-forest-700">
                  Age group
                  <select
                    value={ageBand}
                    onChange={(e) => setAgeBand(e.target.value as AgeBand)}
                    className={field}
                  >
                    <option value="child">Child</option>
                    <option value="teen">Teen</option>
                    <option value="adult">Adult</option>
                  </select>
                </label>
              </div>
            </div>
          )}

          {/* Step 2: Welcome photo */}
          {step === 2 && (
            <div>
              <h2 className="font-display text-lg font-semibold text-forest-700">
                A welcome photo
              </h2>
              <p className="mt-1 mb-3 text-sm text-stone">
                Optional. Only if the family would like a printed, framed photo
                as a gift. You can skip this.
              </p>
              <WelcomePhoto name={name} url={photoUrl} onChange={setPhotoUrl} />
            </div>
          )}

          {/* Step 3: Sign-in */}
          {step === 3 && (
            <div>
              <h2 className="font-display text-lg font-semibold text-forest-700">
                Set up how they sign in
              </h2>
              <p className="mt-1 text-sm text-stone">
                A child does not need an email. They sign in on the tablet by
                picking their picture and tapping a short PIN. Set it with the
                family so they remember it.
              </p>
              <div className="mt-4">
                <p className="text-sm font-medium text-forest-700">
                  Pick a picture
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {avatarChoices.map((a) => (
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
              </div>
              <div className="mt-5">
                <p className="text-center text-sm font-medium text-forest-700">
                  Choose a 4-digit PIN
                </p>
                <div className="mt-3">
                  <PinPad value={pin} onChange={setPin} />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div>
              <h2 className="font-display text-lg font-semibold text-forest-700">
                Review and create
              </h2>
              <dl className="mt-4 space-y-2.5 text-sm">
                <div className="flex items-center justify-between gap-3 border-b border-line/60 pb-2.5">
                  <dt className="text-stone">Name</dt>
                  <dd className="font-medium text-forest-700">
                    {name || "Your explorer"}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-line/60 pb-2.5">
                  <dt className="text-stone">Age group</dt>
                  <dd className="text-ink capitalize">{ageBand}</dd>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-line/60 pb-2.5">
                  <dt className="text-stone">Consent</dt>
                  <dd className="inline-flex items-center gap-1.5 text-forest-700">
                    <ShieldCheck className="h-4 w-4" aria-hidden />
                    Given, grown-up present
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-line/60 pb-2.5">
                  <dt className="text-stone">Welcome photo</dt>
                  <dd className="text-ink">{photoUrl ? "Taken" : "None"}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-stone">Sign-in</dt>
                  <dd className="inline-flex items-center gap-1.5 text-ink">
                    <span className="text-lg">{avatar}</span> and a PIN
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>

        {/* Nav */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="inline-flex h-10 items-center gap-1.5 rounded-[14px] border border-line px-4 text-sm font-medium text-forest-700 transition-colors hover:bg-sand disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back
          </button>
          <button
            type="button"
            data-tour-id="enroll-next"
            onClick={next}
            disabled={!valid}
            className="inline-flex h-10 items-center gap-1.5 rounded-[14px] bg-clay-600 px-5 text-sm font-medium text-cream shadow-soft transition-colors hover:bg-clay-700 disabled:opacity-40"
          >
            {last ? (
              <>
                <Check className="h-4 w-4" aria-hidden />
                Create account
              </>
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4" aria-hidden />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
