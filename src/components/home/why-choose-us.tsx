import { Section, SectionHeading } from "@/components/ui/section";
import { IconBadge } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { benefits } from "@/lib/content";

export function WhyChooseUs() {
  return (
    <Section id="why-us" size="wide" tone="muted">
      <SectionHeading
        eyebrow="Why choose us"
        title="Built to be understood, not decoded"
        description="Everything we do follows from one idea: finance should create ownership rather than unnecessary debt."
      />

      <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, i) => {
          const Icon = benefit.icon;
          return (
            <Reveal as="li" key={benefit.title} index={i % 3}>
              <IconBadge>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </IconBadge>
              <h3 className="mt-5 text-lg font-semibold">{benefit.title}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-foreground-muted">
                {benefit.description}
              </p>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
