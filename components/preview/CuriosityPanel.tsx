"use client";

import { useState } from "react";
import {
  Sprout,
  Star,
  CircleCheck,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Users,
  Gift,
  HeartHandshake,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import {
  learners,
  learnerPrivate,
  sparks as seedSparks,
  ageBandLabel,
  sparkStatusLabel,
} from "@/content/curiosityDemo";
import { Avatar, card, usd } from "./ui";
import { CuriositySwitcher, type Perspective } from "./CuriositySwitcher";
import { useCuriosityLive, setLiveSparkStatus } from "./curiosityStore";
import { GuideTip } from "./GuideTip";
import { ownerSteps } from "@/content/onboarding";

export function CuriosityPanel({
  onSwitch,
}: {
  onSwitch?: (p: Perspective) => void;
}) {
  const sparkList = seedSparks;
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [accessLog, setAccessLog] = useState<{ name: string; at: string }[]>(
    [],
  );
  const live = useCuriosityLive();

  const given = learners.filter((l) => l.consent === "given");
  const returning = given.filter((l) => l.weeksActive >= 2).length;
  const thisWeek = given.filter(
    (l) => l.lastActive === "today" || l.lastActive === "yesterday",
  ).length;
  const pending = learners.filter((l) => l.consent === "pending").length;
  const withdrawn = learners.filter((l) => l.consent === "withdrawn").length;
  const delivered = sparkList.filter((s) => s.status === "delivered").length;

  const allSparks = [...sparkList, ...live.sparks];
  const deliveredSum = allSparks
    .filter((s) => s.status === "delivered")
    .reduce((n, s) => n + s.cost, 0);
  const approvedSum = allSparks
    .filter((s) => s.status === "approved")
    .reduce((n, s) => n + s.cost, 0);
  const awaiting = allSparks.filter((s) => s.status === "proposed").length;

  const toggle = (id: string, name: string) => {
    const willReveal = !revealed[id];
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
    if (willReveal) {
      const at = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
      setAccessLog((log) => [{ name, at }, ...log]);
    }
  };

  const stats = [
    { label: "Coming back (2+ weeks)", value: String(returning), icon: Star },
    { label: "Active this week", value: String(thisWeek), icon: Users },
    { label: "Consent given", value: String(given.length), icon: ShieldCheck },
    { label: "Sparks delivered", value: String(delivered), icon: Gift },
  ];

  return (
    <div className="space-y-6">
      {onSwitch && <CuriositySwitcher current="founder" onSwitch={onSwitch} />}

      <GuideTip title="You are the founder">
        Approve spark-fund follow-through, watch program health (return rate,
        not a head count), and reveal a private Tier 2 record, which is logged.
        The steward cannot see Tier 2.
      </GuideTip>

      {/* How to introduce this to Ong (for the owner at the sit-down) */}
      <details className="rounded-[16px] border border-gold-400/40 bg-gold-400/10 p-4">
        <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-forest-700">
          <HeartHandshake className="h-4 w-4 text-clay-600" aria-hidden />
          How to introduce this to Ong
        </summary>
        <ol className="mt-3 space-y-2.5">
          {ownerSteps.map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-clay-600 text-xs font-semibold text-cream">
                {i + 1}
              </span>
              <div>
                <div className="text-sm font-medium text-forest-700">
                  {step.title}
                </div>
                <div className="mt-0.5 text-sm text-stone">{step.body}</div>
              </div>
            </li>
          ))}
        </ol>
      </details>

      {/* Program health */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
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

      <p className="text-sm text-stone">
        We track how many learners keep coming back and how deeply they explore,
        never a head count. Consent health:{" "}
        <span className="text-forest-700">{given.length} given</span>, {pending}{" "}
        pending, {withdrawn} withdrawn.
      </p>

      {/* Spark-fund approvals */}
      <div className={`${card} p-6`}>
        <div className="flex items-center gap-2">
          <Sprout className="h-5 w-5 text-clay-600" aria-hidden />
          <h3 className="font-display text-lg font-semibold text-forest-700">
            Spark fund
          </h3>
        </div>
        <p className="mt-1 text-sm text-stone">
          Follow-through the steward has noticed or proposed. You approve before
          anything is bought; an approved spark becomes an Education expense. AI
          and the steward propose; you decide.
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className="inline-flex items-center rounded-full bg-sand px-3 py-1 font-medium text-forest-700">
            Delivered: {usd(deliveredSum)}
          </span>
          <span className="inline-flex items-center rounded-full bg-sand px-3 py-1 font-medium text-forest-700">
            Approved: {usd(approvedSum)}
          </span>
          <span className="inline-flex items-center rounded-full bg-sand px-3 py-1 font-medium text-stone">
            {awaiting} awaiting you
          </span>
          <span className="inline-flex items-center rounded-full bg-sand px-3 py-1 font-medium text-stone">
            from the Education budget
          </span>
        </div>

        {live.sparks.length > 0 && (
          <div className="mt-4 rounded-[14px] border border-clay-300/50 bg-clay-50/50 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-clay-600" />
              <h4 className="text-sm font-semibold text-forest-700">
                Live this session
              </h4>
            </div>
            <div className="mt-3 space-y-3">
              {live.sparks.map((s) => (
                <div
                  key={s.id}
                  className="flex flex-wrap items-start justify-between gap-3 rounded-[12px] border border-line bg-cream p-3"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
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
                      <span className="text-xs text-stone tabular-nums">
                        {usd(s.cost)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-stone">{s.idea}</p>
                  </div>
                  {s.status === "proposed" ? (
                    <button
                      type="button"
                      onClick={() => setLiveSparkStatus(s.id, "approved")}
                      className="inline-flex h-9 shrink-0 items-center gap-2 rounded-[12px] bg-clay-600 px-4 text-sm font-medium text-cream transition-colors hover:bg-clay-700"
                    >
                      <CircleCheck className="h-4 w-4" aria-hidden />
                      Approve
                    </button>
                  ) : s.status === "approved" ? (
                    <Badge tone="forest">
                      <CircleCheck className="h-3.5 w-3.5" aria-hidden />{" "}
                      Approved
                    </Badge>
                  ) : (
                    <span className="text-xs text-stone">
                      awaiting the steward
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <h4 className="mt-5 text-sm font-semibold text-forest-700">
          Earlier this month
        </h4>
        <div className="mt-3 space-y-3">
          {sparkList.map((s) => {
            const who = learners.find((l) => l.id === s.learnerId);
            const tone =
              s.status === "delivered" || s.status === "approved"
                ? "forest"
                : s.status === "proposed"
                  ? "gold"
                  : "neutral";
            return (
              <div
                key={s.id}
                className="flex flex-wrap items-start justify-between gap-3 rounded-[14px] border border-line bg-sand/50 p-4"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-forest-700">
                      {who?.explorerName ?? "A learner"}
                    </span>
                    <Badge tone={tone}>{sparkStatusLabel[s.status]}</Badge>
                    <span className="text-xs text-stone tabular-nums">
                      {usd(s.cost)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-stone">{s.idea}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two-layer privacy model */}
      <div className={`${card} p-6`}>
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-clay-600" aria-hidden />
          <h3 className="font-display text-lg font-semibold text-forest-700">
            Two layers per learner
          </h3>
        </div>
        <p className="mt-1 text-sm text-stone">
          The celebratory layer (Tier 0) is what the steward sees. The private
          layer (Tier 2) is admin-only, encrypted in the real system, and never
          sent to a general-purpose model. Revealing it here is logged.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge tone="neutral">Tier 0 · celebratory</Badge>
          <Badge tone="clay">Tier 2 · private, admin only</Badge>
        </div>

        <div className="mt-5 space-y-3">
          {given.map((l) => {
            const priv = learnerPrivate[l.id];
            const isOpen = !!revealed[l.id];
            return (
              <div key={l.id} className="rounded-[14px] border border-line p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={l.explorerName} className="h-9 w-9 text-xs" />
                    <div>
                      <div className="font-medium text-forest-700">
                        {l.explorerName}
                      </div>
                      <div className="text-xs text-stone">
                        {ageBandLabel(l.ageBand)} · {l.weeksActive} of 4 weeks
                        {l.spark ? ` · loves ${l.spark.toLowerCase()}` : ""}
                      </div>
                    </div>
                  </div>
                  {priv && (
                    <button
                      type="button"
                      onClick={() => toggle(l.id, l.explorerName)}
                      className="inline-flex h-9 items-center gap-2 rounded-[12px] border border-line px-3 text-sm font-medium text-forest-700 transition-colors hover:bg-sand"
                    >
                      {isOpen ? (
                        <EyeOff className="h-4 w-4" aria-hidden />
                      ) : (
                        <Eye className="h-4 w-4" aria-hidden />
                      )}
                      {isOpen ? "Hide private" : "Reveal private (Tier 2)"}
                    </button>
                  )}
                </div>

                {priv && isOpen && (
                  <div className="mt-3 rounded-[12px] bg-clay-50 p-3 text-sm text-clay-700 ring-1 ring-clay-100 ring-inset">
                    <dl className="grid gap-x-4 gap-y-1 sm:grid-cols-2">
                      <div>
                        <dt className="text-xs text-stone">Full name</dt>
                        <dd className="font-medium">{priv.fullNameMasked}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-stone">Household</dt>
                        <dd>{priv.household}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-stone">Status</dt>
                        <dd>{priv.statusNote}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-stone">Note</dt>
                        <dd>{priv.note}</dd>
                      </div>
                    </dl>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-stone">
                      <Lock className="h-3 w-3" aria-hidden />
                      Access logged (demo). Names are masked; nothing here is
                      real.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {accessLog.length > 0 && (
          <div className="mt-5 rounded-[12px] bg-sand p-3">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-forest-700">
              <Lock className="h-3.5 w-3.5" aria-hidden />
              Tier 2 access log (this session)
            </p>
            <ul className="mt-2 space-y-1">
              {accessLog.map((e, i) => (
                <li key={i} className="text-xs text-stone">
                  Viewed the private record for {e.name} · {e.at}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
