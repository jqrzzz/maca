import { cn } from "@/lib/cn";

/**
 * Typographic wrapper for long-form content (field notes, legal pages).
 * Constrains measure to ~65ch and styles nested elements warmly.
 */
export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-[65ch] text-[1.0625rem] leading-[1.75] text-ink",
        "[&_p]:mb-6",
        "[&_h2]:text-h2 [&_h2]:mt-12 [&_h2]:mb-4",
        "[&_h3]:text-h3 [&_h3]:mt-10 [&_h3]:mb-3",
        "[&_a]:text-clay-700 [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-clay-300 hover:[&_a]:decoration-clay-600",
        "[&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2 [&_li]:marker:text-clay-300",
        "[&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-gold-400 [&_blockquote]:pl-6 [&_blockquote]:font-display [&_blockquote]:text-xl [&_blockquote]:text-forest-700 [&_blockquote]:italic",
        "[&_strong]:font-semibold [&_strong]:text-forest-700",
        className,
      )}
    >
      {children}
    </div>
  );
}
