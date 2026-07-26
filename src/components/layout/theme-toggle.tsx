"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

/**
 * Toggles the `dark` class on <html> and remembers the choice.
 * The initial class is applied by the blocking script in the root layout,
 * so there is no flash before hydration.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode / storage disabled — the toggle still works for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      // Before hydration we don't know the theme, so describe the control generically.
      aria-label={theme ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : "Toggle colour theme"}
      className={
        "inline-grid h-10 w-10 place-items-center rounded-full border border-line text-foreground-muted " +
        "transition-colors duration-200 hover:bg-surface-muted hover:text-foreground " +
        (className ?? "")
      }
    >
      <Sun className="h-[18px] w-[18px] dark:hidden" aria-hidden="true" />
      <Moon className="hidden h-[18px] w-[18px] dark:block" aria-hidden="true" />
    </button>
  );
}
