import type { Metadata } from "next";
import { Compass, Eye, Target } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card, IconBadge } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { CtaBand } from "@/components/home/cta-band";
import { StatsBand } from "@/components/home/stats-band";

export const metadata: Metadata = {
  title: "About",
  description:
    "We combine modern technology with ethical finance principles to create transparent financial products backed by real assets.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Mission",
    description:
      "To build Europe's most trusted ethical asset-backed finance platform.",
    icon: Target,
  },
  {
    title: "Vision",
    description:
      "A financial ecosystem where people can finance, invest and protect their assets through transparent, ethical, asset-backed products.",
    icon: Eye,
  },
  {
    title: "Approach",
    description:
      "Every product starts from a real asset and a clear agreement. If we can't explain it in a paragraph, we don't ship it.",
    icon: Compass,
  },
];

const values = [
  { title: "Transparency", description: "Every cost, term and assumption is stated before you commit." },
  { title: "Trust", description: "We would rather lose a deal than gain one on unclear terms." },
  { title: "Fairness", description: "Agreements that work when things go well — and when they don't." },
  { title: "Real Ownership", description: "Finance that ends with you owning something tangible." },
  { title: "Shared Success", description: "Both sides carry the outcome, so both sides care about it." },
  { title: "Long-term Thinking", description: "Built for decades of relationships, not quarterly volume." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Finance should create ownership — not unnecessary debt."
        description="We combine modern technology with ethical finance principles to create transparent financial products backed by real assets."
      />

      <Section>
        <Reveal className="prose-lg max-w-none">
          <div className="space-y-6 text-lg leading-relaxed text-foreground-muted">
            <p>
              Most financial products are built around lending money and charging for the
              privilege. That structure quietly pushes risk onto the person with the least
              capacity to carry it, and it grows fastest exactly when someone can least afford
              it.
            </p>
            <p>
              We started from a different question: what if the thing being financed was the
              asset itself? We buy the vehicle, we own it, and we lease it to you on terms fixed
              at the start. Investors fund those assets and share in what they earn. Nobody is
              charged interest on a balance that compounds while they struggle.
            </p>
            <p>
              This structure follows internationally recognised Islamic finance principles. That
              is a genuine benefit — but it is not a membership requirement. Our customers and
              investors come from every background, and they choose us because the terms are
              better and the documents are readable.
            </p>
            <p className="text-foreground">
              We began with vehicles — cars, motorcycles, boats and vans — because they are
              tangible, well-understood and generate predictable lease income. Home finance,
              business finance and takaful follow the same blueprint.
            </p>
          </div>
        </Reveal>
      </Section>

      <StatsBand />

      <Section size="wide">
        <SectionHeading
          eyebrow="What drives us"
          title="Mission, vision, approach"
        />
        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {principles.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal as="li" key={item.title} index={i} className="h-full">
                <Card interactive className="h-full">
                  <IconBadge>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </IconBadge>
                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-foreground-muted">
                    {item.description}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      <Section size="wide" tone="muted">
        <SectionHeading eyebrow="Core values" title="Six commitments we hold ourselves to" />
        <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, i) => (
            <Reveal as="li" key={value.title} index={i % 3}>
              <h3 className="border-l-2 border-accent pl-4 text-lg font-semibold">
                {value.title}
              </h3>
              <p className="mt-3 pl-4 text-[0.9375rem] leading-relaxed text-foreground-muted">
                {value.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CtaBand
        title="Ethical finance, open to everyone."
        description="Whether you want to finance a vehicle or invest in one, the structure is the same: real assets, clear terms, shared outcomes."
      />
    </>
  );
}
