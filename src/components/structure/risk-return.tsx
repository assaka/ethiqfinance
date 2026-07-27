import { AlertTriangle, RefreshCw, Scale } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card, IconBadge } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { ReinvestmentChart } from "@/components/structure/reinvestment-chart";
import {
  defaultTerms,
  earlyExitRecovery,
  netInvestorRate,
  spvStake,
  totalRent,
  wealthPaths,
} from "@/lib/schedule";
import { example } from "@/lib/content";
import { formatCurrency } from "@/lib/utils";

const euro = (n: number) => formatCurrency(Math.round(n));
const pct = (n: number) => `${(n * 100).toFixed(2)}%`;

/**
 * Answers the two questions an investor actually has: what does this earn if
 * I keep the money working, and what happens when it goes wrong. Both sides
 * are shown together on purpose — a return figure without its downside is
 * marketing, not disclosure.
 */
export function RiskReturn() {
  const paths = wealthPaths();
  const final = paths[paths.length - 1];
  const net = netInvestorRate();
  const recovery = earlyExitRecovery();

  // Net income one asset produces for its shareholders across the full term.
  const perAssetIncome = totalRent() * (1 - example.managementFee);
  const worst = recovery.reduce((a, b) => (b.shortfall > a.shortfall ? b : a));
  const breakEven = perAssetIncome / (worst.shortfall + perAssetIncome);

  return (
    <Section id="risk-return" size="wide">
      <SectionHeading
        eyebrow="Risk and return"
        title="Thin margin, or capital that never stops working?"
        description={`One car produces ${euro(totalRent())} of rent on ${euro(spvStake(defaultTerms))} over four years, which looks slight. It isn't the whole picture: your capital is handed back every month, so what matters is whether it goes straight back to work.`}
      />

      {/* -------------------------- reinvestment ------------------------- */}
      <Reveal className="mt-14">
        <Card>
          <div className="flex items-start gap-4">
            <IconBadge>
              <RefreshCw className="h-5 w-5" aria-hidden="true" />
            </IconBadge>
            <div>
              <h3 className="text-lg font-semibold">
                What {euro(1000)} does over {example.termMonths} months
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-foreground-muted">
                The headline {pct(net)} is the rate on capital <em>while it is deployed</em>.
                Because a slice comes back every month, leaving it idle roughly halves what you
                earn. Rolling it straight into the next vehicle keeps the full amount working.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <ReinvestmentChart />
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            <Outcome
              color="var(--chart-3)"
              label="Left idle as it returns"
              value={euro(final.idle - 1000)}
              detail={`${pct((final.idle - 1000) / 1000 / 4)} a year on the original amount`}
            />
            <Outcome
              color="var(--chart-2)"
              label="Capital redeployed, income taken"
              value={euro(final.redeployed - 1000)}
              detail={`The full ${pct(net)} a year, drawn as cash`}
            />
            <Outcome
              color="var(--chart-1)"
              label="Everything redeployed"
              value={euro(final.compounded - 1000)}
              detail={`Balance grows to ${euro(final.compounded)}`}
              accent
            />
          </ul>

          <p className="mt-6 rounded-xl bg-surface-muted p-5 text-[0.9375rem] leading-relaxed text-foreground-muted">
            Reinvesting turns {euro(final.idle - 1000)} into {euro(final.compounded - 1000)} from
            the same {euro(1000)} — <strong className="font-semibold text-foreground">roughly
            double</strong>, without changing the rate at all. This depends on new assets being
            available when your capital returns; if nothing is open for funding, it waits.
          </p>
        </Card>
      </Reveal>

      {/* -------------------------- the downside ------------------------- */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Reveal className="h-full">
          <Card className="h-full">
            <IconBadge tone="neutral">
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
            </IconBadge>
            <h3 className="mt-5 text-lg font-semibold">What you stand to lose</h3>
            <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-foreground-muted">
              If a partnership runs its full term, capital returns in full — the customer buys
              out the whole share regardless of what the vehicle is then worth. The exposure is
              an <strong className="font-semibold text-foreground">early exit</strong>: the
              vehicle is sold and proceeds follow ownership shares, so a car worth less than it
              cost returns less than was put in.
            </p>

            <div className="mt-6 overflow-x-auto rounded-xl border border-line">
              <table className="w-full min-w-[24rem] border-collapse text-left">
                <caption className="sr-only">
                  Capital recovered on an early exit, by month of the term
                </caption>
                <thead>
                  <tr className="border-b border-line bg-surface-muted">
                    <th scope="col" className="px-4 py-3 text-xs font-semibold">Exit at</th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-semibold">Outstanding</th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-semibold">Recovered</th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-semibold">Shortfall</th>
                  </tr>
                </thead>
                <tbody>
                  {recovery
                    .filter((row) => row.month > 0 && row.month < example.termMonths)
                    .map((row) => (
                      <tr key={row.month} className="border-b border-line last:border-0">
                        <th scope="row" className="px-4 py-3 text-sm font-medium">
                          Month {row.month}
                        </th>
                        <td className="tabular px-4 py-3 text-right text-sm text-foreground-muted">
                          {euro(row.outstanding)}
                        </td>
                        <td className="tabular px-4 py-3 text-right text-sm text-foreground-muted">
                          {euro(row.recovered)}
                        </td>
                        <td className="tabular px-4 py-3 text-right text-sm font-semibold">
                          −{euro(row.shortfall)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-foreground-subtle">
              Assumes an illustrative resale curve. Takaful covers write-off and theft; it does
              not cover a vehicle simply being worth less than it cost.
            </p>
          </Card>
        </Reveal>

        <Reveal index={1} className="h-full">
          <Card className="h-full">
            <IconBadge>
              <Scale className="h-5 w-5" aria-hidden="true" />
            </IconBadge>
            <h3 className="mt-5 text-lg font-semibold">How that balances out</h3>

            <dl className="mt-6 space-y-5">
              <Balance
                term="Losses are shared, never transferred"
                detail="Each owner's share equals their outstanding capital divided by the original price — so on a sale both sides recover exactly the vehicle's retained value. The customer is never left owing money on an asset that no longer covers it, and we never walk away whole while they don't."
              />
              <Balance
                term={`Around ${(breakEven * 100).toFixed(0)}% of contracts could end early`}
                detail={`Each completed partnership returns about ${euro(perAssetIncome)} to shareholders, against a worst-case shortfall of ${euro(worst.shortfall)} on an exit at month ${worst.month}. Spread across a portfolio, returns only reach zero if roughly ${(breakEven * 100).toFixed(0)}% of contracts terminate early at the worst possible point.`}
              />
              <Balance
                term="Exposure shrinks every month"
                detail="Capital outstanding falls with each payment, so the amount at risk on any single asset declines throughout the term while the rate on it stays the same."
              />
              <Balance
                term="Diversify across assets"
                detail="Spreading a stake over several vehicles, terms and categories matters more here than the headline rate — one early exit in a portfolio of twenty is absorbed; in a portfolio of one it is not."
              />
            </dl>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}

function Outcome({
  color,
  label,
  value,
  detail,
  accent = false,
}: {
  color: string;
  label: string;
  value: string;
  detail: string;
  accent?: boolean;
}) {
  return (
    <li
      className={
        "rounded-xl border p-5 " +
        (accent ? "border-accent/40 bg-accent-soft" : "border-line bg-surface")
      }
    >
      <span className="flex items-center gap-2 text-xs font-medium text-foreground-subtle">
        <span
          aria-hidden="true"
          className="inline-block h-2.5 w-2.5 rounded-[3px]"
          style={{ backgroundColor: color }}
        />
        {label}
      </span>
      <span className="tabular mt-2 block text-2xl font-semibold">{value}</span>
      <span className="mt-1 block text-xs text-foreground-subtle">{detail}</span>
    </li>
  );
}

function Balance({ term, detail }: { term: string; detail: string }) {
  return (
    <div>
      <dt className="text-[0.9375rem] font-semibold">{term}</dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-foreground-muted">{detail}</dd>
    </div>
  );
}
