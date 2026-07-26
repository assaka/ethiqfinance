import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { faqs } from "@/lib/content";

export function FaqSection() {
  return (
    <Section id="faq">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions people actually ask"
        description="Short answers, no small print."
      />

      <Reveal className="mt-12">
        <Accordion items={faqs.slice(0, 5)} />
      </Reveal>

      <Reveal className="mt-8 text-center">
        <Link
          href="/faq"
          className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-foreground"
        >
          See all questions
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </Reveal>
    </Section>
  );
}
