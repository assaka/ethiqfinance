import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

/**
 * Wordmark with an abstract asset-ownership mark: a solid core (the real
 * asset) enclosed by an open ring (shared ownership around it).
 */
export function Logo({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "inverse";
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5 rounded-lg", className)}
      aria-label={`${siteConfig.name} — home`}
    >
      <span className="relative inline-grid h-9 w-9 place-items-center">
        <svg
          viewBox="0 0 36 36"
          className="h-9 w-9"
          aria-hidden="true"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="36"
            height="36"
            rx="10"
            className={tone === "inverse" ? "fill-white/10" : "fill-navy"}
          />
          <circle
            cx="18"
            cy="18"
            r="9"
            className="stroke-accent"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="42 14"
            transform="rotate(-35 18 18)"
          />
          <circle cx="18" cy="18" r="4" className="fill-accent" />
        </svg>
      </span>
      <span
        className={cn(
          "text-[1.0625rem] font-semibold tracking-tight",
          tone === "inverse" ? "text-white" : "text-foreground",
        )}
      >
        {siteConfig.shortName}
        <span className="text-accent-strong">.</span>
      </span>
    </Link>
  );
}
