import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <Section size="wide" tone="muted">
      <SectionHeading
        eyebrow="Testimonials"
        title="Chosen on the terms, not the label"
        description="Customers and investors come to us for clarity. The ethical structure is what keeps them."
      />

      <ul className="mt-14 grid gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <Reveal as="li" key={testimonial.name} index={i} className="h-full">
            <Card className="flex h-full flex-col">
              <span aria-hidden="true" className="text-3xl leading-none text-accent">
                &ldquo;
              </span>
              <blockquote className="mt-3 flex-1">
                <p className="text-[0.9375rem] leading-relaxed text-foreground-muted">
                  {testimonial.quote}
                </p>
              </blockquote>
              <footer className="mt-6 border-t border-line pt-5">
                <p className="text-sm font-semibold">{testimonial.name}</p>
                <p className="mt-0.5 text-sm text-foreground-subtle">{testimonial.role}</p>
              </footer>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
