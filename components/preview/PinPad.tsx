"use client";

import { Delete } from "lucide-react";

/**
 * A simple numeric PIN pad for the demo. Students (often children, with no
 * email) sign in on a shared device with a picture and a short PIN, so the
 * keypad is large and forgiving. Controlled: the parent holds the value.
 */
export function PinPad({
  value,
  onChange,
  length = 4,
}: {
  value: string;
  onChange: (v: string) => void;
  length?: number;
}) {
  const press = (d: string) => {
    if (value.length < length) onChange(value + d);
  };
  const back = () => onChange(value.slice(0, -1));

  return (
    <div>
      <div className="flex justify-center gap-3" aria-hidden>
        {Array.from({ length }).map((_, i) => (
          <span
            key={i}
            className={`h-3.5 w-3.5 rounded-full transition-colors ${
              i < value.length ? "bg-clay-600" : "bg-sand ring-1 ring-line"
            }`}
          />
        ))}
      </div>

      <div className="mx-auto mt-5 grid max-w-[240px] grid-cols-3 gap-2">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => press(d)}
            className="inline-flex h-14 items-center justify-center rounded-[14px] border border-line bg-cream text-xl font-medium text-forest-700 transition-colors hover:bg-sand"
          >
            {d}
          </button>
        ))}
        <span />
        <button
          type="button"
          onClick={() => press("0")}
          className="inline-flex h-14 items-center justify-center rounded-[14px] border border-line bg-cream text-xl font-medium text-forest-700 transition-colors hover:bg-sand"
        >
          0
        </button>
        <button
          type="button"
          onClick={back}
          aria-label="Delete"
          disabled={value.length === 0}
          className="inline-flex h-14 items-center justify-center rounded-[14px] text-stone transition-colors hover:bg-sand disabled:opacity-40"
        >
          <Delete className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
