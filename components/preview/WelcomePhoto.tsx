"use client";

import { useRef } from "react";
import { Camera, ImagePlus, RefreshCw, Trash2, Gift, Lock } from "lucide-react";

/**
 * A small, consent-gated welcome-photo capture for the steward enroll flow. Only
 * shown once the family has agreed to the framed-photo gift. The photo is taken
 * on the device and previewed inside a frame so it reads as the gift it is: a
 * printed, framed picture for the family to keep.
 *
 * In this demo the photo is an in-memory object URL. It is never uploaded and
 * nothing is saved. The real system keeps it as private, on-device, consent-
 * bound Tier 2 data, never sent to a general-purpose model.
 */
export function WelcomePhoto({
  name,
  url,
  onChange,
}: {
  name: string;
  url: string | null;
  onChange: (url: string | null) => void;
}) {
  const cameraInput = useRef<HTMLInputElement>(null);
  const libraryInput = useRef<HTMLInputElement>(null);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (url) URL.revokeObjectURL(url);
    onChange(URL.createObjectURL(file));
    e.target.value = "";
  };

  const remove = () => {
    if (url) URL.revokeObjectURL(url);
    onChange(null);
  };

  const display = name.trim() || "Your explorer";

  return (
    <div className="rounded-[16px] border border-clay-300/40 bg-clay-50/60 p-4">
      <input
        ref={cameraInput}
        type="file"
        accept="image/*"
        capture="environment"
        hidden
        onChange={onFile}
      />
      <input
        ref={libraryInput}
        type="file"
        accept="image/*"
        hidden
        onChange={onFile}
      />

      <div className="flex items-center gap-2 text-forest-700">
        <Gift className="h-4 w-4 text-clay-600" aria-hidden />
        <h3 className="font-display text-base font-semibold">
          A welcome photo
        </h3>
      </div>
      <p className="mt-1 text-xs text-stone">
        Take a photo to print and frame as a gift for the family. It stays on
        this device.
      </p>

      {url ? (
        <div className="mt-4">
          {/* The gift: a framed portrait */}
          <figure className="mx-auto max-w-[15rem]">
            <div className="rounded-[14px] border border-clay-300/60 bg-cream p-2.5 shadow-soft">
              <div className="rounded-[10px] bg-sand p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Welcome photo of ${display}`}
                  className="aspect-[4/5] w-full rounded-[6px] border border-line object-cover"
                />
                <figcaption className="px-1 pt-2 pb-0.5 text-center">
                  <div className="font-display text-sm font-semibold text-forest-700">
                    {display}
                  </div>
                  <div className="text-[11px] tracking-wide text-stone uppercase">
                    Curiosity Program
                  </div>
                </figcaption>
              </div>
            </div>
          </figure>

          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => cameraInput.current?.click()}
              className="inline-flex h-9 items-center gap-1.5 rounded-[12px] border border-line bg-cream px-3 text-sm font-medium text-forest-700 transition-colors hover:bg-sand"
            >
              <RefreshCw className="h-4 w-4" aria-hidden />
              Retake
            </button>
            <button
              type="button"
              onClick={() => libraryInput.current?.click()}
              className="inline-flex h-9 items-center gap-1.5 rounded-[12px] border border-line bg-cream px-3 text-sm font-medium text-forest-700 transition-colors hover:bg-sand"
            >
              <ImagePlus className="h-4 w-4" aria-hidden />
              Choose another
            </button>
            <button
              type="button"
              onClick={remove}
              className="inline-flex h-9 items-center gap-1.5 rounded-[12px] px-3 text-sm font-medium text-stone transition-colors hover:bg-sand hover:text-clay-700"
            >
              <Trash2 className="h-4 w-4" aria-hidden />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <div className="flex aspect-[4/5] max-w-[12rem] flex-col items-center justify-center gap-2 rounded-[12px] border-2 border-dashed border-clay-300/60 bg-cream/60 text-stone">
            <Camera className="h-7 w-7 text-clay-600" aria-hidden />
            <span className="px-4 text-center text-xs">
              No photo yet. You can do this now or later.
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => cameraInput.current?.click()}
              className="inline-flex h-10 items-center gap-2 rounded-[14px] bg-clay-600 px-4 text-sm font-medium text-cream shadow-soft transition-colors hover:bg-clay-700"
            >
              <Camera className="h-4 w-4" aria-hidden />
              Take a photo
            </button>
            <button
              type="button"
              onClick={() => libraryInput.current?.click()}
              className="inline-flex h-10 items-center gap-2 rounded-[14px] border border-line bg-cream px-4 text-sm font-medium text-forest-700 transition-colors hover:bg-sand"
            >
              <ImagePlus className="h-4 w-4" aria-hidden />
              Choose from library
            </button>
          </div>
        </div>
      )}

      <div className="mt-3 flex items-start gap-2 rounded-[12px] bg-sand px-3 py-2 text-xs text-stone ring-1 ring-line ring-inset">
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        <p>
          Stays on this device. It is a gift for the family, never uploaded or
          shared, and you can remove it any time.
        </p>
      </div>
    </div>
  );
}
