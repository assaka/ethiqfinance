import { Coins, TrendingDown, Wallet } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card, Badge, IconBadge } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { customerScenarios, example, investorScenarios } from "@/lib/content";
import {
  monthlyPayment,
  schedule,
  spvStake,
  totalRent,
  type Terms,
} from "@/lib/schedule";
import { formatCurrency } from "@/lib/utils";

const termsFor = (s: (typeof customerScenarios)[number]): Terms => ({
  price: s.price,
  customerShare: s.customerShare,
  termMonths: s.termMonths,
  rate: example.rentalRate,
  runningCost: s.runningCost,
});

const euro = (n: number) => formatCurrency(Math.round(n));

/**
 * Concrete scenarios on both sides of the same asset. Every number here is
 * derived from `lib/schedule.ts`, so a customer's payment and the investor's
 * income are guaranteed to describe the same vehicle.
 */
export function ExampleScenarios() {
  return (
    <Section id="examples" size="wide" tone="muted">
      <SectionHeading
        eyebrow="Worked examples"
        title="What this looks like in practice"
        description="Four vehicles, seen from both sides: what the customer pays each month, and what an investor funding the same asset receives. Figures are illustrative and assume payments are made on schedule."
      />

      {/* ------------------------------- customers ------------------------ */}
      <div className="mt-16">
        <Reveal>
          <h3 className="text-xl font-semibold sm:text-2xl">If you&apos;re financing a vehicle</h3>
          <p className="mt-2 max-w-2xl text-[0.9375rem] text-foreground-muted">
            One fixed payment covers everything: rent on our share, the purchase of that share,
            and the running costs — takaful, road tax, servicing and tyres. You buy the fuel;
            nothing else is billed on top.
          </p>
        </Reveal>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {customerScenarios.map((scenario, i) => {
            const terms = termsFor(scenario);
            const payment = monthlyPayment(terms);
            const rows = schedule(terms);
            const Icon = scenario.icon;

            return (
              <Reveal as="li" key={scenario.name} index={i % 2} className="h-full">
                <Card interactive className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <IconBadge>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </IconBadge>
                    <Badge tone="outline">{scenario.category}</Badge>
                  </div>

                  <h4 className="mt-6 text-lg font-semibold">{scenario.vehicle}</h4>
                  <p className="mt-1 text-sm text-foreground-subtle">{scenario.name}</p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-foreground-muted">
                    {scenario.note}
                  </p>

                  <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
                    <Cell label="Vehicle price" value={euro(scenario.price)} />
                    <Cell
                      label="Your contribution"
                      value={`${euro((scenario.price * scenario.customerShare) / 100)}`}
                      sub={`${scenario.customerShare}% owned on day one`}
                    />
                    <Cell label="Term" value={`${scenario.termMonths} months`} />
                    <Cell
                      label="Fixed monthly, all-in"
                      value={euro(payment)}
                      sub={`incl. ${euro(scenario.runningCost / 12)} running costs`}
                      accent
                    />
                  </dl>

                  <div className="mt-5 space-y-2 text-sm text-foreground-muted">
                    {/* Rent is rounded and ownership absorbs the remainder, so both
                        lines always sum to the fixed payment shown above. */}
                    <Split
                      label="Month 1"
                      rent={Math.round(rows[0].rent)}
                      service={Math.round(rows[0].service)}
                      equity={
                        Math.round(payment) -
                        Math.round(rows[0].rent) -
                        Math.round(rows[0].service)
                      }
                    />
                    <Split
                      label={`Month ${scenario.termMonths}`}
                      rent={Math.round(rows[rows.length - 1].rent)}
                      service={Math.round(rows[rows.length - 1].service)}
                      equity={
                        Math.round(payment) -
                        Math.round(rows[rows.length - 1].rent) -
                        Math.round(rows[rows.length - 1].service)
                      }
                    />
                  </div>

                  <p className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-sm font-medium text-accent-strong">
                    <TrendingDown className="h-4 w-4" aria-hidden="true" />
                    Same all-in payment throughout — more of it becomes yours each month
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </ul>
      </div>

      {/* ------------------------------- investors ------------------------ */}
      <div className="mt-20">
        <Reveal>
          <h3 className="text-xl font-semibold sm:text-2xl">If you&apos;re investing</h3>
          <p className="mt-2 max-w-2xl text-[0.9375rem] text-foreground-muted">
            You become a shareholder in the SPV that owns one of those same vehicles. The
            customer pays rent to the SPV, and each month you receive your share of it plus a
            slice of your capital back as the buy-out proceeds.
          </p>
        </Reveal>

        <ul className="mt-8 grid gap-6 lg:grid-cols-3">
          {investorScenarios.map((investment, i) => {
            const scenario = customerScenarios[investment.asset];
            const terms = termsFor(scenario);
            const stake = investment.amount / spvStake(terms);
            const rows = schedule(terms);
            const firstMonth = rows[0];
            const income = totalRent(terms) * stake;

            return (
              <Reveal as="li" key={investment.label} index={i} className="h-full">
                <Card interactive className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <IconBadge>
                      <Coins className="h-5 w-5" aria-hidden="true" />
                    </IconBadge>
                    <Badge tone="outline">{scenario.category}</Badge>
                  </div>

                  <h4 className="mt-6 text-lg font-semibold">{investment.label}</h4>
                  <p className="mt-1 text-sm text-foreground-subtle">
                    {scenario.vehicle} · {scenario.termMonths} months
                  </p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-foreground-muted">
                    {investment.note}
                  </p>

                  <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
                    <Cell label="You invest" value={euro(investment.amount)} />
                    <Cell
                      label="Your shareholding"
                      value={`${(stake * 100).toFixed(1)}%`}
                      sub="of the SPV that owns it"
                    />
                    <Cell
                      label="Month 1 payout"
                      value={euro((firstMonth.rent + firstMonth.equity) * stake)}
                      sub={`${euro(firstMonth.rent * stake)} income · ${euro(firstMonth.equity * stake)} capital`}
                    />
                    <Cell
                      label="Total rental income"
                      value={euro(income)}
                      sub={`over ${scenario.termMonths} months`}
                      accent
                    />
                  </dl>

                  <p className="mt-5 flex items-start gap-2 border-t border-line pt-4 text-sm text-foreground-muted">
                    <Wallet className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    Your {euro(investment.amount)} is returned in full across the term, alongside
                    the income above.
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-8">
          <p className="rounded-2xl border border-line bg-surface p-6 text-sm leading-relaxed text-foreground-muted">
            <strong className="font-semibold text-foreground">Read these as arithmetic, not
            promises.</strong>{" "}
            They show what the structure produces when a customer pays on schedule for the full
            term. Income falls if a customer stops paying, if an asset is off the road, or if a
            partnership ends early and the vehicle sells for less than expected. Because running
            costs are carried by the owners, a year of unusually heavy repairs also reduces what
            reaches shareholders. Returns depend on actual asset performance and your capital is
            at risk. Figures are shown gross of the management fee.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

function Cell({
  label,
  value,
  sub,
  accent = false,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className={"p-4 " + (accent ? "bg-accent-soft" : "bg-surface")}>
      <dt className="text-xs text-foreground-subtle">{label}</dt>
      <dd>
        <span
          className={
            "tabular mt-1 block text-base font-semibold " + (accent ? "text-accent-strong" : "")
          }
        >
          {value}
        </span>
        {sub ? <span className="mt-0.5 block text-xs text-foreground-subtle">{sub}</span> : null}
      </dd>
    </div>
  );
}

function Split({
  label,
  rent,
  service,
  equity,
}: {
  label: string;
  rent: number;
  service: number;
  equity: number;
}) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="text-foreground-subtle">{label}</span>
      <Part color="var(--chart-2)" value={rent} label="rent" />
      <Part color="var(--chart-3)" value={service} label="running" />
      <Part color="var(--chart-1)" value={equity} label="ownership" />
    </p>
  );
}

function Part({ color, value, label }: { color: string; value: number; label: string }) {
  return (
    <span className="tabular inline-flex items-center gap-1.5 font-medium text-foreground">
      <span
        aria-hidden="true"
        className="inline-block h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      {euro(value)} {label}
    </span>
  );
}
