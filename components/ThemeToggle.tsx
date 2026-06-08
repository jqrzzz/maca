"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Light/dark toggle (no system option). Which icon shows is driven purely by
 * the `.dark` class on <html> (set by next-themes before paint), so there's no
 * hydration flash and no mounted-state effect — just a clean toggle.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() =>
        setTheme(
          document.documentElement.classList.contains("dark")
            ? "light"
            : "dark",
        )
      }
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md",
        "text-forest-600 transition-colors hover:bg-sand",
        "dark:text-cream dark:hover:bg-forest-600",
        className,
      )}
      aria-label="Toggle light and dark mode"
      title="Toggle light and dark mode"
    >
      {/* Light mode shows the moon (click → dark); dark mode shows the sun. */}
      <Moon className="h-5 w-5 dark:hidden" />
      <Sun className="hidden h-5 w-5 dark:block" />
      <span className="sr-only">Toggle light and dark mode</span>
    </button>
  );
}
