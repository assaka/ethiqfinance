import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card, IconBadge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Accordion } from "@/components/ui/accordion";
import { OwnershipChart } from "@/components/structure/ownership-chart";
import { CtaBand } from "@/components/home/cta-band";
import { example, products, vehicleCategories } from "@/lib/content";
import { formatCurrency } from "@/lib/utils";

const product = products[0];

export const metadata: Metadata = {
  title: "Vehicle Finance",
  description:
    "Buy your car, motorcycle or boat jointly with us and buy out our share month by month. Co-ownership from day one, rent that falls as you own more, no interest and no penalties.",
  alternates: { canonical: "/products/vehicle-finance" },
};

const steps = [
  {
    title: "Choose your vehicle",
    description:
      "Pick any car, motorcycle, boat or van from a dealer, a private seller or our partner network. We finance the vehicle you actually want.",
  },
  {
    title: "Buy it together",
    description: `You contribute your share and the SPV contributes the rest — ${example.customerShare}% and ${example.companyShare}% in our worked example. You are a real co-owner from the moment of purchase.`,
  },
  {
    title: "Lease our share",
    description:
      "Because you use the whole vehicle, you pay rent for the portion you don't yet own. Only that portion — never the part that's already yours.",
  },
  {
    title: "Buy us out, month by month",
    description:
      "Each payment also purchases a slice of our share. Your ownership climbs, our share falls, the rent falls with it, and at the end you own 100%.",
  },
];

const comparison = [
  { point: "What is financed", traditional: "Money lent to you", ethiq: "A share of the vehicle, owned jointly" },
  { point: "Your position on day one", traditional: "A debtor with a liability", ethiq: "A registered co-owner with equity" },
  { point: "Cost structure", traditional: "Interest on outstanding debt", ethiq: "Rent on the share you don't yet own" },
  { point: "How payments change", traditional: "Fixed or rising with rates", ethiq: "Falls as your ownership grows" },
  { point: "Who carries ownership risk", traditional: "You, entirely", ethiq: "Both owners, in proportion to shares" },
  { point: "Early settlement", traditional: "Break fees are common", ethiq: "Valuation and buy-out, no penalty" },
];

const faqs = [
  {
    question: "Which vehicles can I finance?",
    answer:
      "Cars (new, used and electric), motorcycles and scooters, sailing boats and small motor cruisers, and light commercial vehicles such as vans.",
  },
  {
    question: "How much do I need to contribute?",
    answer: `Your contribution is your opening ownership share, so it is never a lost 'deposit'. It typically starts around ${example.customerShare}% of the vehicle value — a larger share means less to rent and a lower monthly payment.`,
  },
  {
    question: "Whose name is the vehicle registered in?",
    answer:
      "Registration reflects the co-ownership and varies by country. We handle the registration mechanics and set out exactly how title is held before you sign.",
  },
  {
    question: "Who insures and maintains the vehicle?",
    answer:
      "Takaful cover is arranged for the owners as an ownership expense, shared in proportion to shares. Fuel, charging, routine servicing, fines and any damage through misuse are yours as the user.",
  },
  {
    question: "What if the vehicle is written off?",
    answer:
      "It is an ownership risk, so it is shared between the co-owners in proportion to their shares at that moment, backed by the takaful cover. You are not left owing the full value of an asset that no longer exists.",
  },
  {
    question: "What if I want to end the agreement early?",
    answer:
      "The vehicle is valued using the agreed method. Either it is sold or one party buys out the other's share, and proceeds follow the ownership split. There is no break fee and no penalty interest.",
  },
  {
    question: "Is my application assessed?",
    answer:
      "Yes. We assess affordability so the partnership works for you over its full term — that assessment protects you, us and the investors funding the asset.",
  },
];

export default function VehicleFinancePage() {
  return (
    <>
      <PageHeader
        eyebrow={product.eyebrow}
        title="Own a piece from day one. Then own all of it."
        description={product.description}
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" size="lg">
            Get started
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button href="/structure" size="lg" variant="secondary">
            See the full structure
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
          description="From choosing a vehicle to owning every last percent of it."
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

        <Reveal className="mt-10">
          <Card>
            <h3 className="text-lg font-semibold">
              Your ownership on a {formatCurrency(example.vehiclePrice)} vehicle
            </h3>
            <p className="mt-2 text-[0.9375rem] text-foreground-muted">
              Illustrative, over a {example.termMonths}-month term.
            </p>
            <div className="mt-7">
              <OwnershipChart />
            </div>
            <p className="mt-7 text-sm text-foreground-subtle">
              Want the payment breakdown and the risk allocation?{" "}
              <a href="/structure" className="font-medium text-foreground underline underline-offset-4">
                See the full structure
              </a>
              .
            </p>
          </Card>
        </Reveal>
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
              Traditional lending compared with diminishing co-ownership
            </caption>
            <thead>
              <tr className="border-b border-line bg-surface-muted">
                <th scope="col" className="px-5 py-4 text-sm font-semibold">&nbsp;</th>
                <th scope="col" className="px-5 py-4 text-sm font-semibold text-foreground-muted">
                  Traditional lending
                </th>
                <th scope="col" className="px-5 py-4 text-sm font-semibold">
                  Diminishing co-ownership
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
        title="Ready to co-own your vehicle?"
        description="Tell us what you're looking for and we'll confirm the shares, the rent and the monthly payment before anything is signed."
        primary={{ label: "Start an application", href: "/contact" }}
        secondary={{ label: "See the structure", href: "/structure" }}
      />
    </>
  );
}
