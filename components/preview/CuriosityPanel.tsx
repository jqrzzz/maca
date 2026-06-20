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
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import {
  learners,
  learnerPrivate,
  sparks as seedSparks,
  ageBandLabel,
  sparkStatusLabel,
  type Spark,
} from "@/content/curiosityDemo";
import { Avatar, card, usd } from "./ui";

export function CuriosityPanel() {
  const [sparkList, setSparkList] = useState<Spark[]>(seedSparks);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const given = learners.filter((l) => l.consent === "given");
  const returning = given.filter((l) => l.weeksActive >= 2).length;
  const thisWeek = given.filter(
    (l) => l.lastActive === "today" || l.lastActive === "yesterday",
  ).length;
  const pending = learners.filter((l) => l.consent === "pending").length;
  const withdrawn = learners.filter((l) => l.consent === "withdrawn").length;
  const delivered = sparkList.filter((s) => s.status === "delivered").length;

  const approve = (id: string) =>
    setSparkList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "approved" } : s)),
    );

  const toggle = (id: string) =>
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));

  const stats = [
    { label: "Coming back (2+ weeks)", value: String(returning), icon: Star },
    { label: "Active this week", value: String(thisWeek), icon: Users },
    { label: "Consent given", value: String(given.length), icon: ShieldCheck },
    { label: "Sparks delivered", value: String(delivered), icon: Gift },
  ];

  return (
    <div className="space-y-6">
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
        <div className="mt-5 space-y-3">
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
                {s.status === "proposed" ? (
                  <button
                    type="button"
                    onClick={() => approve(s.id)}
                    className="inline-flex h-9 shrink-0 items-center gap-2 rounded-[12px] bg-clay-600 px-4 text-sm font-medium text-cream transition-colors hover:bg-clay-700"
                  >
                    <CircleCheck className="h-4 w-4" aria-hidden />
                    Approve
                  </button>
                ) : s.status === "approved" ? (
                  <Badge tone="forest">
                    <CircleCheck className="h-3.5 w-3.5" aria-hidden /> Approved
                  </Badge>
                ) : null}
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
                      onClick={() => toggle(l.id)}
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
      </div>
    </div>
  );
}
