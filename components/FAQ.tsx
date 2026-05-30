import { Plus } from "lucide-react";
import type { Faq } from "@/content/faqs";

/**
 * Accessible FAQ accordion built on native <details>/<summary> — keyboard
 * and screen-reader friendly with no JS.
 */
export function FAQ({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-line rounded-[20px] border border-line bg-cream">
      {items.map((item) => (
        <details key={item.q} className="group p-6 [&_summary]:list-none">
          <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium text-forest-700">
            {item.q}
            <Plus
              aria-hidden
              className="h-5 w-5 shrink-0 text-clay-600 transition-transform group-open:rotate-45"
              strokeWidth={2}
            />
          </summary>
          <p className="mt-3 text-stone">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
