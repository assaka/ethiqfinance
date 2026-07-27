import type { Metadata } from "next";
import { ArrowRight, ChartPie, Coins, FileText, ShieldAlert } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card, IconBadge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Accordion } from "@/components/ui/accordion";
import { DashboardPreview } from "@/components/home/dashboard-preview";
import { CapitalSafeguards } from "@/components/home/capital-safeguards";
import { CtaBand } from "@/components/home/cta-band";
import { products } from "@/lib/content";

const product = products[1];

export const metadata: Metadata = {
  title: "Asset Investments",
  description:
    "Fund an SPV that co-owns income-producing cars, motorcycles and boats, and receive monthly distributions from real rental income. Capital at risk; returns depend on asset performance.",
  alternates: { canonical: "/products/asset-investments" },
};

const highlights = [
  {
    title: "Fractional ownership",
    description:
      "Buy a share of a specific, identifiable vehicle from €250. Your stake is recorded against that named asset in its SPV.",
    icon: ChartPie,
  },
  {
    title: "Monthly distributions",
    description:
      "Rent paid on the SPV's share is distributed monthly, in proportion to your stake. No lock-up of your income.",
    icon: Coins,
  },
  {
    title: "Full documentation",
    description:
      "Every asset comes with its purchase price, the ownership split, the lease term and the rental schedule.",
    icon: FileText,
  },
  {
    title: "Genuine risk sharing",
    description:
      "You are an owner, not a lender. Ownership risks — write-off, defects, depreciation — sit with the owners in proportion to their shares.",
    icon: ShieldAlert,
  },
];

const flow = [
  {
    title: "Browse available assets",
    description:
      "Each listing shows the vehicle, its price, the customer's opening share, the term and the projected rental income.",
  },
  {
    title: "Choose your stake",
    description:
      "Invest from €250 in a single asset, or spread across several to diversify across vehicle types and terms.",
  },
  {
    title: "The partnership starts",
    description:
      "Once funded, the SPV buys the vehicle jointly with the customer and leases its share to them.",
  },
  {
    title: "Income is distributed",
    description:
      "Rental income lands in your account each month. Withdraw it, or roll it into the next asset.",
  },
];

const faqs = [
  {
    question: "What can my investment be used for?",
    answer:
      "Purchasing the specific vehicle you invested in — and nothing else. Funds never cover our operating costs, are never lent out, are never pooled across the business and are never reinvested elsewhere. Each asset sits in a dedicated Special Purpose Vehicle whose only activity is owning and leasing it.",
  },
  {
    question: "Why does income from one asset decline over its term?",
    answer:
      "Because rent is charged only on the share the customer does not yet own, and that share shrinks every month as they buy it out. The trade-off is that your capital is progressively returned as the buy-out proceeds, rather than sitting locked until the end.",
  },
  {
    question: "What return can I expect?",
    answer:
      "Each listing shows a projected net yield based on the ownership split, the rental rate and the term of that specific asset. Projections are not promises — actual returns depend on customer payments, downtime, depreciation and resale value.",
  },
  {
    question: "Are returns guaranteed?",
    answer:
      "No. Returns depend on actual asset performance and your capital is at risk. We publish the assumptions behind every projection so you can judge them yourself.",
  },
  {
    question: "What risks do I carry as an owner?",
    answer:
      "Ownership risks in proportion to your stake: total loss, structural defects and depreciation while the SPV still holds a share. Takaful cover is arranged for the owners, but cover is not the same as a guarantee.",
  },
  {
    question: "What happens if a customer stops paying?",
    answer:
      "We work with the customer first. If the partnership cannot continue, the vehicle is valued and sold, and the proceeds are distributed according to ownership shares at that moment — not according to a penalty schedule.",
  },
  {
    question: "How long is my capital committed?",
    answer:
      "For the term of the asset, typically 24 to 60 months, with capital returned progressively as the customer buys out the SPV's share. A marketplace for transferring stakes before term is on our roadmap.",
  },
  {
    question: "How is this different from a bond?",
    answer:
      "A bond pays interest on money you lent. Here you own a share of a physical vehicle through an SPV and receive a share of the rent it earns — with the upside and the downside both tracking the real asset.",
  },
];

export default function AssetInvestmentsPage() {
  return (
    <>
      <PageHeader
        eyebrow={product.eyebrow}
        title="Invest in assets you can point at."
        description={product.description}
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" size="lg">
            Explore investments
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button href="/structure" size="lg" variant="secondary">
            See the structure
          </Button>
        </div>
      </PageHeader>

      <Section size="wide">
        <SectionHeading
          eyebrow="What you get"
          title="Real ownership, monthly income"
          description="Investing here means holding a share of a working vehicle through its SPV — not a claim on someone else's debt."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal as="li" key={item.title} index={i % 2} className="h-full">
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

      <CapitalSafeguards />

      <Section size="wide">
        <SectionHeading
          eyebrow="How investing works"
          title="From listing to monthly distribution"
        />

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {flow.map((step, i) => (
            <Reveal as="li" key={step.title} index={i} className="h-full">
              <Card className="h-full">
                <span className="tabular text-eyebrow text-accent-strong">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-foreground-muted">
                  {step.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </ol>
      </Section>

      <DashboardPreview />

      <Section tone="muted">
        <SectionHeading eyebrow="FAQ" title="Investment questions" />
        <Reveal className="mt-12">
          <Accordion items={faqs} />
        </Reveal>

        <Reveal className="mt-10">
          <p className="rounded-2xl border border-line bg-surface p-6 text-sm leading-relaxed text-foreground-muted">
            <strong className="font-semibold text-foreground">Risk warning.</strong> Investing
            places your capital at risk. Ring-fencing determines what your money may be used for;
            it does not remove investment risk. Returns depend on actual asset performance and
            are not guaranteed. Past performance does not predict future results. Nothing on this
            website is financial advice — consider your own circumstances and seek independent
            advice if you are unsure.
          </p>
        </Reveal>
      </Section>

      <CtaBand
        title="Put your capital behind real assets."
        description="Join the investor list and we'll show you the assets currently open for funding."
        primary={{ label: "Join the investor list", href: "/contact" }}
        secondary={{ label: "Vehicle finance", href: "/products/vehicle-finance" }}
      />
    </>
  );
}
