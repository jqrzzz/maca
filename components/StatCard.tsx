import { Reveal } from "@/components/ui/Reveal";
import type { Stat } from "@/content/stats";

export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px] bg-line lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Reveal key={stat.label} delay={i * 80}>
          <div className="h-full bg-cream p-6 md:p-8">
            <p className="font-display text-4xl font-semibold text-clay-600 md:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 font-medium text-forest-700">{stat.label}</p>
            {stat.caption && (
              <p className="mt-1 text-sm leading-snug text-stone">
                {stat.caption}
              </p>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
