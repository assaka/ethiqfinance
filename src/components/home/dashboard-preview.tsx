import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { PerformanceChart } from "@/components/home/performance-chart";
import { dashboard } from "@/lib/content";

export function DashboardPreview() {
  return (
    <Section id="dashboard" size="wide">
      <SectionHeading
        eyebrow="Investor dashboard"
        title="Every asset, every euro, in one view"
        description="Track what you own, what it earns and when it pays — updated as lease payments land."
      />

      <Reveal className="mt-14">
        <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-lift">
          {/* App chrome */}
          <div className="flex items-center gap-2 border-b border-line bg-surface-muted px-5 py-3.5">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
            </span>
            <p className="ml-3 text-xs text-foreground-subtle">
              Portfolio overview — illustrative preview
            </p>
          </div>

          <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.6fr_1fr]">
            <div className="space-y-6">
              {/* Stat tiles — the headline numbers are not a chart. */}
              <dl className="grid gap-4 sm:grid-cols-2">
                <StatTile
                  label="Portfolio value"
                  value={<AnimatedNumber value={dashboard.portfolioValue} prefix="€" />}
                  change={`+${dashboard.portfolioChange}% this year`}
                />
                <StatTile
                  label="Monthly income"
                  value={<AnimatedNumber value={dashboard.monthlyIncome} prefix="€" />}
                  change={`+${dashboard.monthlyChange}% vs last month`}
                />
                <StatTile
                  label="Owned assets"
                  value={<AnimatedNumber value={dashboard.ownedAssets} />}
                  change="Cars, motorcycles & boats"
                  muted
                />
                <StatTile
                  label="Average ownership"
                  value={<AnimatedNumber value={dashboard.averageOwnership} decimals={1} suffix="%" />}
                  change="Across all assets"
                  muted
                />
              </dl>

              <div className="rounded-2xl border border-line p-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-sm font-semibold">Asset performance</h3>
                  <p className="text-xs text-foreground-subtle">Portfolio value, €k</p>
                </div>
                <PerformanceChart data={dashboard.performance} />
              </div>

              {/* Table view of the same holdings — identity never rests on colour. */}
              <div className="overflow-x-auto rounded-2xl border border-line">
                <table className="w-full min-w-[34rem] border-collapse text-left">
                  <caption className="sr-only">Assets currently held in the portfolio</caption>
                  <thead>
                    <tr className="border-b border-line bg-surface-muted">
                      <th scope="col" className="px-4 py-3 text-xs font-semibold">Asset</th>
                      <th scope="col" className="px-4 py-3 text-xs font-semibold">Type</th>
                      <th scope="col" className="px-4 py-3 text-right text-xs font-semibold">Ownership</th>
                      <th scope="col" className="px-4 py-3 text-right text-xs font-semibold">Monthly</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboard.assets.map((asset) => (
                      <tr key={asset.name} className="border-b border-line last:border-0">
                        <th scope="row" className="px-4 py-3 text-sm font-medium">
                          {asset.name}
                        </th>
                        <td className="px-4 py-3 text-sm text-foreground-muted">{asset.type}</td>
                        <td className="tabular px-4 py-3 text-right text-sm text-foreground-muted">
                          {asset.ownership.toFixed(1)}%
                        </td>
                        <td className="tabular px-4 py-3 text-right text-sm font-medium">
                          €{asset.income}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl border border-line p-5">
              <h3 className="text-sm font-semibold">Recent distributions</h3>
              <ul className="mt-4 space-y-1">
                {dashboard.distributions.map((d, i) => (
                  <li
                    key={`${d.date}-${d.asset}`}
                    className={
                      "flex items-center justify-between gap-4 py-3" +
                      (i === dashboard.distributions.length - 1 ? "" : " border-b border-line")
                    }
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">{d.asset}</span>
                      <span className="block text-xs text-foreground-subtle">{d.date}</span>
                    </span>
                    <span className="tabular inline-flex items-center gap-1 text-sm font-semibold text-accent-strong">
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />€{d.amount}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 rounded-xl bg-surface-muted p-4 text-xs leading-relaxed text-foreground-subtle">
                Illustrative figures. Returns depend on actual asset performance and are not
                guaranteed.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function StatTile({
  label,
  value,
  change,
  muted = false,
}: {
  label: string;
  value: React.ReactNode;
  change: string;
  muted?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-line p-5">
      <dt className="text-xs font-medium text-foreground-subtle">{label}</dt>
      <dd>
        <span className="tabular mt-2 block text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
          {value}
        </span>
        <span
          className={
            "mt-2 inline-flex items-center gap-1.5 text-xs " +
            (muted ? "text-foreground-subtle" : "text-accent-strong")
          }
        >
          {!muted ? <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" /> : null}
          {change}
        </span>
      </dd>
    </div>
  );
}
