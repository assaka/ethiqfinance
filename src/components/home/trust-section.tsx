import { Section } from "@/components/ui/section";
import { Card, IconBadge } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { trustPillars } from "@/lib/content";

export function TrustSection() {
  return (
    <Section size="wide" className="pt-16 sm:pt-20">
      <ul className="grid gap-6 md:grid-cols-3">
        {trustPillars.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <Reveal as="li" key={pillar.title} index={i} className="h-full">
              <Card interactive className="h-full">
                <IconBadge>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </IconBadge>
                <h3 className="mt-5 text-lg font-semibold">{pillar.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-foreground-muted">
                  {pillar.description}
                </p>
              </Card>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
