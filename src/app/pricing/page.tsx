import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Accordion } from "@/components/ui/accordion";
import { PlanComparison } from "@/components/pricing/plan-comparison";
import { ExampleScenarios } from "@/components/examples/example-scenarios";
import { CtaBand } from "@/components/home/cta-band";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Two ways to finance your vehicle: Essential covers the finance alone, Complete bundles takaful, road tax and servicing into one fixed monthly payment. Both end with you owning the vehicle outright.",
  alternates: { canonical: "/pricing" },
};

const faqs = [
  {
    question: "Which plan should I choose?",
    answer:
      "If you already have an insurer and a garage you trust, Essential gives you the lowest monthly figure and full control. If you would rather have one predictable number and never think about road tax or a service bill again, choose Complete. The total cost over the term works out about the same either way.",
  },
  {
    question: "Do I own the vehicle on both plans?",
    answer:
      "Yes. Essential and Complete follow exactly the same ownership schedule — your share grows every month and you own 100% at the end of the term. The plans differ only in whether the running costs are bundled into your fixed payment or arranged by you.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Yes, at any anniversary of your agreement. Moving to Complete adds the service component to your payment; moving to Essential removes it and hands the running costs back to you. Your ownership schedule is unaffected either way.",
  },
  {
    question: "What if repairs cost more than the estimate on Complete?",
    answer:
      "Your payment does not change. That is the point of the plan — the owners carry the running costs for the whole term, so an expensive year is absorbed rather than passed to you.",
  },
  {
    question: "Is there a mileage limit?",
    answer:
      "No. You are buying the vehicle, not renting time on it, so there is no mileage cap and no excess charge. Heavy use will affect what the vehicle is worth if you sell it early, but it never triggers a penalty from us.",
  },
  {
    question: "What happens at the end of the term?",
    answer:
      "You own 100% of the vehicle. There is no balloon payment, no option fee and no final settlement — the last monthly payment completes the buy-out and the vehicle is simply yours.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="One fixed payment. Two ways to build it."
        description="Choose whether your monthly payment covers the vehicle alone, or the vehicle and everything it costs to keep on the road. Both routes end with you owning it outright."
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" size="lg">
            Get a quote
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button href="/structure" size="lg" variant="secondary">
            How the structure works
          </Button>
        </div>
      </PageHeader>

      <Section size="wide">
        <SectionHeading
          eyebrow="Choose your plan"
          title="Essential or Complete"
          description="Priced on a €40,000 vehicle over 48 months with a 20% contribution. Your own quote depends on the vehicle, your contribution and the term."
        />
        <div className="mt-14">
          <PlanComparison />
        </div>
      </Section>

      <ExampleScenarios />

      <Section tone="muted">
        <SectionHeading eyebrow="FAQ" title="Questions about pricing" />
        <Reveal className="mt-12">
          <Accordion items={faqs} />
        </Reveal>
      </Section>

      <CtaBand
        title="Get a quote on the vehicle you want."
        description="Tell us the vehicle, your contribution and the term. We'll send both plans priced side by side, with nothing hidden underneath."
        primary={{ label: "Request a quote", href: "/contact" }}
        secondary={{ label: "See the structure", href: "/structure" }}
      />
    </>
  );
}
