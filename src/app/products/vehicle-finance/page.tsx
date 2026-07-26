import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card, IconBadge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Accordion } from "@/components/ui/accordion";
import { CtaBand } from "@/components/home/cta-band";
import { products, vehicleCategories } from "@/lib/content";

const product = products[0];

export const metadata: Metadata = {
  title: "Vehicle Finance",
  description:
    "Ethical financing for cars, motorcycles, boats and light commercial vehicles through shared ownership rather than traditional lending. One fixed monthly amount, no interest, no hidden fees.",
  alternates: { canonical: "/products/vehicle-finance" },
};

const steps = [
  {
    title: "Choose your vehicle",
    description:
      "Pick any car, motorcycle, boat or van from a dealer, a private seller or our partner network. We finance the vehicle you actually want.",
  },
  {
    title: "We buy it",
    description:
      "We acquire the vehicle outright and become its registered owner. Nothing is lent to you, so there is no interest to charge.",
  },
  {
    title: "You lease it on fixed terms",
    description:
      "You pay one agreed monthly amount for an agreed term. The number is fixed on day one and does not move.",
  },
  {
    title: "Ownership transfers to you",
    description:
      "At the end of the term the vehicle is yours. Want it sooner? Settle the outstanding amount early — with no penalty.",
  },
];

const comparison = [
  { point: "What is financed", traditional: "Money lent to you", ethiq: "The vehicle itself" },
  { point: "Cost structure", traditional: "Interest on outstanding debt", ethiq: "Fixed, agreed profit on the sale" },
  { point: "If you pay late", traditional: "Compounding interest and charges", ethiq: "No compounding — we contact you" },
  { point: "Early settlement", traditional: "Break fees are common", ethiq: "Settle the balance, no penalty" },
  { point: "Ownership during the term", traditional: "Lender holds a charge over your asset", ethiq: "We own the asset, you hold clear use rights" },
];

const faqs = [
  {
    question: "Which vehicles can I finance?",
    answer:
      "Cars (new, used and electric), motorcycles and scooters, sailing boats and small motor cruisers, and light commercial vehicles such as vans.",
  },
  {
    question: "Do I need a deposit?",
    answer:
      "A contribution is usually required and typically starts around 10% of the vehicle value. A larger contribution lowers your monthly amount.",
  },
  {
    question: "Who insures and maintains the vehicle?",
    answer:
      "You arrange comprehensive insurance and day-to-day maintenance during the term, exactly as you would with a vehicle you own outright.",
  },
  {
    question: "What if I want to end the agreement early?",
    answer:
      "You settle the outstanding acquisition amount and ownership transfers to you. There is no early-repayment penalty, because there is no interest to unwind.",
  },
  {
    question: "Is my application credit-checked?",
    answer:
      "Yes. We assess affordability so that the agreement works for you over its full term — that assessment protects both sides.",
  },
];

export default function VehicleFinancePage() {
  return (
    <>
      <PageHeader
        eyebrow={product.eyebrow}
        title="Vehicle finance without the debt trap."
        description={product.description}
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" size="lg">
            Get started
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button href="/#how-it-works" size="lg" variant="secondary">
            See how it works
          </Button>
        </div>
      </PageHeader>

      <Section size="wide">
        <SectionHeading
          eyebrow="What we finance"
          title="Cars, motorcycles, boats and vans"
          description="Our launch product covers the vehicles people actually need financed — on land and on water."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vehicleCategories.map((category, i) => {
            const Icon = category.icon;
            return (
              <Reveal as="li" key={category.title} index={i} className="h-full">
                <Card interactive className="h-full">
                  <IconBadge>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </IconBadge>
                  <h3 className="mt-5 text-base font-semibold">{category.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    {category.description}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      <Section size="wide" tone="muted">
        <SectionHeading
          eyebrow="The process"
          title="Four steps, no surprises"
          description="From choosing a vehicle to owning it outright."
        />

        <ol className="mt-14 grid gap-6 sm:grid-cols-2">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} index={i % 2} className="h-full">
              <Card className="h-full">
                <span className="tabular text-eyebrow text-accent-strong">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-foreground-muted">
                  {step.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section size="wide">
        <SectionHeading
          eyebrow="Comparison"
          title="How this differs from a normal car loan"
          description="Same goal — a vehicle on your driveway or mooring. A fundamentally different structure."
        />

        <Reveal className="mt-14 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[42rem] border-collapse text-left">
            <caption className="sr-only">
              Traditional lending compared with asset-backed vehicle finance
            </caption>
            <thead>
              <tr className="border-b border-line bg-surface-muted">
                <th scope="col" className="px-5 py-4 text-sm font-semibold">&nbsp;</th>
                <th scope="col" className="px-5 py-4 text-sm font-semibold text-foreground-muted">
                  Traditional lending
                </th>
                <th scope="col" className="px-5 py-4 text-sm font-semibold">
                  Asset-backed finance
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.point} className="border-b border-line last:border-0">
                  <th scope="row" className="px-5 py-4 text-sm font-medium">
                    {row.point}
                  </th>
                  <td className="px-5 py-4 text-sm text-foreground-muted">{row.traditional}</td>
                  <td className="px-5 py-4 text-sm">
                    <span className="flex items-start gap-2">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong"
                        aria-hidden="true"
                      />
                      {row.ethiq}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="FAQ" title="Vehicle finance questions" />
        <Reveal className="mt-12">
          <Accordion items={faqs} />
        </Reveal>
      </Section>

      <CtaBand
        title="Ready to finance your vehicle?"
        description="Tell us what you're looking for and we'll confirm the structure and the monthly amount before anything is signed."
        primary={{ label: "Start an application", href: "/contact" }}
        secondary={{ label: "Read the FAQ", href: "/faq" }}
      />
    </>
  );
}
