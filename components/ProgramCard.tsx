import {
  Stethoscope,
  GraduationCap,
  Leaf,
  Package,
  Fingerprint,
  FileText,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import type { ProgramIcon } from "@/content/programs";

const icons: Record<ProgramIcon, React.ElementType> = {
  stethoscope: Stethoscope,
  graduation: GraduationCap,
  leaf: Leaf,
  package: Package,
  fingerprint: Fingerprint,
  fileText: FileText,
  sparkles: Sparkles,
};

export function ProgramCard({
  icon,
  title,
  summary,
  href,
  status = "active",
}: {
  icon: ProgramIcon;
  title: string;
  summary: string;
  href?: string;
  status?: "active" | "planned";
}) {
  const Icon = icons[icon];
  const planned = status === "planned";

  const inner = (
    <div
      className={cn(
        "group flex h-full flex-col rounded-[20px] border border-line bg-cream p-6 shadow-soft transition-shadow md:p-7",
        href && "hover:shadow-lift",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "inline-flex h-12 w-12 items-center justify-center rounded-[14px]",
            planned ? "bg-forest-500/10 text-forest-600" : "bg-clay-50 text-clay-600",
          )}
        >
          <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
        </span>
        {planned && <Badge tone="gold">Planned</Badge>}
      </div>
      <h3 className="mt-5 text-h3">{title}</h3>
      <p className="mt-2 flex-1 text-stone">{summary}</p>
      {href && (
        <span className="mt-5 inline-flex items-center gap-1.5 font-medium text-clay-700">
          Learn more
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {inner}
      </Link>
    );
  }
  return inner;
}
