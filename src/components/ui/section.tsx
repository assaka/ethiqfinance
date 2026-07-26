import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  /** `muted` tints the band; `inverse` flips to the navy panel treatment. */
  tone?: "default" | "muted" | "inverse";
  size?: "narrow" | "default" | "wide";
  containerClassName?: string;
};

export function Section({
  children,
  id,
  className,
  tone = "default",
  size = "default",
  containerClassName,
}: SectionProps) {
  const tones = {
    default: "bg-background",
    muted: "bg-surface-muted",
    inverse: "bg-navy text-slate-100",
  } as const;

  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-20 sm:py-24 lg:py-28", tones[tone], className)}
    >
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Use on the navy panel so contrast stays correct. */
  tone?: "default" | "inverse";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  tone = "default",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-eyebrow mb-4",
            tone === "inverse" ? "text-accent" : "text-accent-strong",
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={cn(
          "text-3xl font-semibold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]",
          tone === "inverse" ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            tone === "inverse" ? "text-slate-300" : "text-foreground-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
