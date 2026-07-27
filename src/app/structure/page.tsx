import type { Metadata } from "next";
import { ArrowRight, Check, FileText, Handshake, Scale, User, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card, Badge, IconBadge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { OwnershipChart } from "@/components/structure/ownership-chart";
import { PaymentChart } from "@/components/structure/payment-chart";
import { CapitalSafeguards } from "@/components/home/capital-safeguards";
import { ExampleScenarios } from "@/components/examples/example-scenarios";
import { CtaBand } from "@/components/home/cta-band";
import {
  contracts,
  earlyExit,
  example,
  fundingSources,
  moneyFlow,
  riskAllocation,
  structureStages,
} from "@/lib/content";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "How the structure works",
  description:
    "Diminishing Musharakah combined with Ijarah: you and the SPV buy the vehicle together, we lease you our share, and you buy it out month by month. Full detail on risk sharing, early exit and the contracts involved.",
  alternates: { canonical: "/structure" },
};

export default function StructurePage() {
  return (
    <>
      <PageHeader
        eyebrow="The structure"
        title="Co-ownership that shrinks into ownership."
        description="Our vehicle finance combines diminishing Musharakah — a partnership that reduces over time — with Ijarah, a lease of the share you don't yet own. Here is exactly how the two fit together."
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" size="lg">
            Get started
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button href="/products/vehicle-finance" size="lg" variant="secondary">
            Vehicle finance
          </Button>
        </div>
      </PageHeader>

      {/* ---------------------------------------------------------------- */}
      <Section size="wide">
        <SectionHeading
          eyebrow="Three moving parts"
          title="Partnership, lease, buy-out"
          description="Calling a lease a partnership is not enough. Ownership, risk and profit all have to reflect genuine partnership — which is why these three pieces are structured, and documented, separately."
        />

        <ol className="mt-14 grid gap-6 lg:grid-cols-3">
          {structureStages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <Reveal as="li" key={stage.number} index={i} className="h-full">
                <Card interactive className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <IconBadge>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </IconBadge>
                    <Badge tone="outline">{stage.arabic}</Badge>
                  </div>
                  <span className="tabular mt-6 text-eyebrow text-foreground-subtle">
                    Stage {stage.number}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold">{stage.name}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-foreground-muted">
                    {stage.description}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </ol>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section size="wide" tone="muted">
        <SectionHeading
          eyebrow="A worked example"
          title={`A ${formatCurrency(example.vehiclePrice)} car over ${example.termMonths} months`}
          description="Real numbers, so nothing depends on trust in a diagram. Figures are illustrative — your own terms depend on the vehicle, your contribution and the term you choose."
        />

        <Reveal className="mt-14">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Figure label="Vehicle price" value={formatCurrency(example.vehiclePrice)} />
            <Figure
              label="Your contribution"
              value={`${formatCurrency(example.customerContribution)} · ${example.customerShare}%`}
              accent
            />
            <Figure
              label="Our contribution"
              value={`${formatCurrency(example.companyContribution)} · ${example.companyShare}%`}
            />
            <Figure label="Term" value={`${example.termMonths} months`} />
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full">
              <h3 className="text-lg font-semibold">Ownership over the term</h3>
              <p className="mt-2 text-[0.9375rem] text-foreground-muted">
                Your share rises every month. Ours falls to zero.
              </p>
              <div className="mt-7">
                <OwnershipChart />
              </div>
            </Card>
          </Reveal>

          <Reveal index={1}>
            <Card className="h-full">
              <h3 className="text-lg font-semibold">What you pay each month</h3>
              <p className="mt-2 text-[0.9375rem] text-foreground-muted">
                The total never changes. Inside it, running costs stay flat, the rent shrinks
                with our share, and the ownership portion grows to fill the gap.
              </p>
              <div className="mt-7">
                <PaymentChart />
              </div>
            </Card>
          </Reveal>
        </div>

        <Reveal className="mt-8">
          <p className="rounded-2xl border border-line bg-surface p-6 text-[0.9375rem] leading-relaxed text-foreground-muted">
            <strong className="font-semibold text-foreground">Why the split moves.</strong> Rent is
            charged only for the share you do not yet own. Once you own more of the vehicle there
            is less of ours left to rent — charging rent on the whole car would mean charging you
            for something already yours. Your payment stays the same; what it buys does not.
          </p>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section size="wide">
        <SectionHeading
          eyebrow="Risk sharing"
          title="We own a share, so we carry its risks"
          description="This is where most 'ethical' products quietly fall down. Ownership risk sits with the owners, in proportion to their shares — it is not repackaged and handed to the customer."
        />

        <Reveal className="mt-14 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[44rem] border-collapse text-left">
            <caption className="sr-only">
              Allocation of costs and risks between the co-owners and the customer
            </caption>
            <thead>
              <tr className="border-b border-line bg-surface-muted">
                <th scope="col" className="px-5 py-4 text-sm font-semibold">Cost or risk</th>
                <th scope="col" className="px-5 py-4 text-sm font-semibold">Carried by</th>
                <th scope="col" className="px-5 py-4 text-sm font-semibold">Why</th>
              </tr>
            </thead>
            <tbody>
              {riskAllocation.map((row) => (
                <tr key={row.item} className="border-b border-line last:border-0">
                  <th scope="row" className="px-5 py-4 text-sm font-medium">
                    {row.item}
                  </th>
                  <td className="px-5 py-4">
                    <span
                      className={
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium " +
                        (row.bearer === "shared"
                          ? "bg-accent-soft text-accent-strong"
                          : "bg-surface-muted text-foreground-muted")
                      }
                    >
                      {row.bearer === "shared" ? (
                        <Users className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        <User className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                      {row.bearer === "shared" ? "Both owners" : "Customer"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-foreground-muted">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Section>

      <ExampleScenarios />

      {/* ---------------------------------------------------------------- */}
      <CapitalSafeguards />

      {/* ---------------------------------------------------------------- */}
      <Section size="wide">
        <SectionHeading
          eyebrow="Who pays whom"
          title="Rent belongs to the owner, not to us"
          description="Ethiq arranges the agreement and runs the servicing, but it does not own your vehicle — so it cannot lease it to you. Rent is paid to the SPV that does."
        />

        <ol className="mt-14 grid gap-6 lg:grid-cols-3">
          {moneyFlow.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <Reveal as="li" key={stage.title} index={i} className="h-full">
                <Card className="flex h-full flex-col">
                  <IconBadge tone={stage.tone}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </IconBadge>
                  <h3 className="mt-5 text-lg font-semibold">{stage.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-foreground-muted">
                    {stage.description}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </ol>

        <Reveal className="mt-8">
          <p className="rounded-2xl border border-line bg-surface-muted p-6 text-sm leading-relaxed text-foreground-muted">
            <strong className="font-semibold text-foreground">Why this matters.</strong> If we
            took the rent as our own income we would be leasing an asset we do not own — which is
            exactly the defect that turns a partnership back into a loan. Our fee is charged to
            the SPV for work actually performed, is disclosed in full, and is never an extra line
            on your monthly payment.
          </p>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section size="wide" tone="muted">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <IconBadge>
              <Scale className="h-5 w-5" aria-hidden="true" />
            </IconBadge>
            <h2 className="mt-6 text-2xl font-semibold sm:text-3xl">Leaving early</h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-foreground-muted">
              Because nothing was lent, there is no balance to accelerate and no interest to
              unwind. Ending early is a valuation exercise, not a penalty.
            </p>
            <ol className="mt-7 space-y-4">
              {earlyExit.map((step, i) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="tabular mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-surface-muted text-xs font-semibold text-foreground-muted">
                    {i + 1}
                  </span>
                  <span className="text-[0.9375rem] leading-relaxed text-foreground-muted">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal index={1}>
            <IconBadge>
              <FileText className="h-5 w-5" aria-hidden="true" />
            </IconBadge>
            <h2 className="mt-6 text-2xl font-semibold sm:text-3xl">The contracts</h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-foreground-muted">
              Kept deliberately separate. Bundling incompatible obligations into one document is
              what turns a partnership back into a loan.
            </p>
            <ul className="mt-7 space-y-4">
              {contracts.map((contract) => (
                <li key={contract.title} className="flex items-start gap-3">
                  <Check
                    className="mt-1 h-4 w-4 shrink-0 text-accent-strong"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-[0.9375rem] font-medium">{contract.title}</span>
                    <span className="block text-sm text-foreground-subtle">
                      {contract.description}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section size="wide" tone="muted">
        <SectionHeading
          eyebrow="Funding the fleet"
          title="We don't borrow on interest either"
          description="The structure has to hold on both sides. Capital for the vehicles comes from partners who share in the profits and the risks of the business."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fundingSources.map((source, i) => (
            <Reveal as="li" key={source.title} index={i} className="h-full">
              <Card className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <IconBadge tone={source.soon ? "neutral" : "accent"}>
                    <Handshake className="h-5 w-5" aria-hidden="true" />
                  </IconBadge>
                  {source.soon ? <Badge tone="neutral">Later</Badge> : null}
                </div>
                <h3 className="mt-5 text-base font-semibold">{source.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {source.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10">
          <p className="rounded-2xl border border-line bg-surface p-6 text-sm leading-relaxed text-foreground-muted">
            <strong className="font-semibold text-foreground">On compliance.</strong> Diminishing
            Musharakah combined with Ijarah is used precisely because it has extensive scholarly
            precedent. Our contracts, product terms and operating procedures are reviewed by an
            independent Sharia supervisory board, and the review is repeated whenever the
            structure changes.
          </p>
        </Reveal>
      </Section>

      <CtaBand
        title="Structure you can actually check."
        description="Ask us for the contract templates, the valuation method or the SPV documentation. We'd rather you read them than take our word for it."
        primary={{ label: "Ask us anything", href: "/contact" }}
        secondary={{ label: "Read the FAQ", href: "/faq" }}
      />
    </>
  );
}

function Figure({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={
        "rounded-2xl border p-5 " +
        (accent ? "border-accent/40 bg-accent-soft" : "border-line bg-surface")
      }
    >
      <span className="block text-xs font-medium text-foreground-subtle">{label}</span>
      <span className="tabular mt-2 block text-lg font-semibold">{value}</span>
    </div>
  );
}
