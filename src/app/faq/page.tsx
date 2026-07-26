import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { CtaBand } from "@/components/home/cta-band";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about ethical asset-backed finance: who it is for, how vehicle financing works, how investments generate monthly income, and what the risks are.",
  alternates: { canonical: "/faq" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        eyebrow="FAQ"
        title="Everything you might reasonably ask."
        description="If something here isn't clear, that's on us — get in touch and we'll rewrite it."
      />

      <Section>
        <Reveal>
          <Accordion items={faqs} defaultOpen={null} />
        </Reveal>
      </Section>

      <CtaBand
        title="Still have a question?"
        description="Ask us anything about the structure, the terms or the risks. We answer plainly."
        primary={{ label: "Contact us", href: "/contact" }}
        secondary={{ label: "How it works", href: "/#how-it-works" }}
      />
    </>
  );
}
