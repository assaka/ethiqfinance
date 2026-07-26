import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

/** Shared hero for every page below the homepage. */
export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-mesh">
      <Container size="wide" className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          {eyebrow ? (
            <Reveal>
              <Badge>{eyebrow}</Badge>
            </Reveal>
          ) : null}
          <Reveal delay={0.05}>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              {title}
            </h1>
          </Reveal>
          {description ? (
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-foreground-muted sm:text-xl">
                {description}
              </p>
            </Reveal>
          ) : null}
          {children ? <Reveal delay={0.15}>{children}</Reveal> : null}
        </div>
      </Container>
    </section>
  );
}
