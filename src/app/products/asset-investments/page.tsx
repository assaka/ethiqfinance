import type { Metadata } from "next";
import { ArrowRight, Coins, FileText, PieChart, ShieldAlert } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card, IconBadge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Accordion } from "@/components/ui/accordion";
import { DashboardPreview } from "@/components/home/dashboard-preview";
import { CtaBand } from "@/components/home/cta-band";
import { products } from "@/lib/content";

const product = products[1];

export const metadata: Metadata = {
  title: "Asset Investments",
  description:
    "Own fractions of income-producing cars, motorcycles and boats. Receive monthly distributions from real leasing income. Capital at risk; returns depend on asset performance.",
  alternates: { canonical: "/products/asset-investments" },
};

const highlights = [
  {
    title: "Fractional ownership",
    description:
      "Buy a share of a specific, identifiable vehicle from €250. Your name sits on the ownership register for that asset.",
    icon: PieChart,
  },
  {
    title: "Monthly distributions",
    description:
      "Net lease income is paid out monthly, in proportion to your share. No lock-up of your income.",
    icon: Coins,
  },
  {
    title: "Full documentation",
    description:
      "Every asset comes with its lease term, registration details, acquisition cost and expected income schedule.",
    icon: FileText,
  },
  {
    title: "Honest about risk",
    description:
      "Income can fall if a customer stops paying or an asset sits idle. Your capital is at risk and returns are never guaranteed.",
    icon: ShieldAlert,
  },
];

const flow = [
  {
    title: "Browse available assets",
    description:
      "Each listing shows the vehicle, its acquisition cost, the lease term and the projected monthly income.",
  },
  {
    title: "Choose your share",
    description:
      "Invest from €250 in a single asset, or spread across several to diversify across vehicle types and lease terms.",
  },
  {
    title: "The asset is leased",
    description:
      "Once fully funded, the vehicle is delivered to the customer and the lease begins.",
  },
  {
    title: "Income is distributed",
    description:
      "Net lease income lands in your account each month. You can withdraw it or reinvest it into the next asset.",
  },
];

const faqs = [
  {
    question: "What return can I expect?",
    answer:
      "Each listing shows a projected net yield based on the lease terms of that specific asset. Projections are not promises — actual returns depend on customer payments, downtime and end-of-term resale value.",
  },
  {
    question: "Are returns guaranteed?",
    answer:
      "No. Returns depend on actual asset performance and your capital is at risk. We publish the assumptions behind every projection so you can judge them yourself.",
  },
  {
    question: "How long is my money committed?",
    answer:
      "For the lease term of the asset, typically 24 to 60 months. An investment marketplace for transferring shares before term is on our roadmap.",
  },
  {
    question: "What happens if a customer stops paying?",
    answer:
      "We work with the customer first. If the agreement cannot continue, the vehicle is recovered and sold, and net proceeds are distributed to the owners of that asset.",
  },
  {
    question: "Who actually owns the vehicle?",
    answer:
      "The asset is held in a ring-fenced structure on behalf of its investors, separate from our operating company. Your ownership share is recorded per asset.",
  },
  {
    question: "How is this different from a bond or a savings product?",
    answer:
      "A bond pays interest on money you lent. Here you own a share of a physical vehicle and receive a share of what it earns — the upside and the downside both track the real asset.",
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
          <Button href="/#dashboard" size="lg" variant="secondary">
            See the dashboard
          </Button>
        </div>
      </PageHeader>

      <Section size="wide">
        <SectionHeading
          eyebrow="What you get"
          title="Real ownership, monthly income"
          description="Investing here means holding a share of a working vehicle — not a claim on someone else's debt."
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

      <Section size="wide" tone="muted">
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
            places your capital at risk. Returns depend on actual asset performance and are not
            guaranteed. Past performance does not predict future results. Nothing on this website
            is financial advice — consider your own circumstances and seek independent advice if
            you are unsure.
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
