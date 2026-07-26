import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  /** Adds a subtle lift + border highlight on hover. */
  interactive?: boolean;
  as?: "div" | "article" | "li";
};

export function Card({ children, className, interactive = false, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-line bg-surface p-6 sm:p-7 shadow-soft",
        interactive &&
          "transition-[transform,box-shadow,border-color] duration-300 ease-out " +
            "hover:-translate-y-1 hover:shadow-lift hover:border-line-strong",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

type IconBadgeProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "accent" | "neutral";
};

/** Rounded square that holds a Lucide icon at the top of a card. */
export function IconBadge({ children, className, tone = "accent" }: IconBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
        tone === "accent"
          ? "bg-accent-soft text-accent-strong"
          : "bg-surface-muted text-foreground-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "accent" | "neutral" | "outline";
};

export function Badge({ children, className, tone = "accent" }: BadgeProps) {
  const tones = {
    accent: "bg-accent-soft text-accent-strong",
    neutral: "bg-surface-muted text-foreground-muted",
    outline: "border border-line-strong text-foreground-muted",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
