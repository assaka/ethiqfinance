"use client";

import { motion, useReducedMotion } from "framer-motion";
import { monthlyPayment, paymentMilestones, type ScheduleRow } from "@/lib/schedule";
import { example } from "@/lib/content";

const euro = (n: number) => `€${n.toLocaleString("en-GB")}`;

/**
 * The fixed total is the headline claim, so it is rounded once and treated as
 * authoritative; the ownership figure absorbs the rounding. Rounding both
 * components independently would make month 1 read a euro higher than the
 * rest and quietly contradict "your payment never changes".
 */
function rounded(row: ScheduleRow, total: number) {
  const rent = Math.round(row.rent);
  return { month: row.month, rent, equity: total - rent, total };
}

/**
 * Composition of the monthly payment at five points in the term.
 * Every bar is the same height because the payment never changes — the whole
 * point of the chart is the shifting split inside it. Colours match the
 * ownership chart: emerald is the part that becomes yours, indigo is rent on
 * the share still ours. The table underneath is the table view.
 */
export function PaymentChart() {
  const reduceMotion = useReducedMotion();
  const fixedTotal = Math.round(monthlyPayment());
  const rows = paymentMilestones().map((row) => rounded(row, fixedTotal));

  return (
    <figure>
      <figcaption className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        <LegendSwatch color="var(--chart-1)" label="Buys your ownership" />
        <LegendSwatch color="var(--chart-2)" label="Rent on our share" />
      </figcaption>

      <div
        className="flex items-end justify-between gap-3 sm:gap-6"
        role="img"
        aria-label={`Composition of the fixed ${euro(Math.round(monthlyPayment()))} monthly payment. In month 1, ${euro(rows[0].rent)} is rent and ${euro(rows[0].equity)} buys ownership. By month ${example.termMonths} the rent has fallen to ${euro(rows[rows.length - 1].rent)} and ${euro(rows[rows.length - 1].equity)} buys ownership. The total never changes.`}
      >
        {rows.map((row, i) => {
          const rentPct = (row.rent / row.total) * 100;
          const equityPct = 100 - rentPct;

          return (
            <div key={row.month} className="flex min-w-0 flex-1 flex-col items-center">
              <span className="tabular mb-2 text-xs font-semibold text-foreground sm:text-sm">
                {euro(row.total)}
              </span>

              <div className="flex h-44 w-full max-w-16 flex-col justify-end sm:h-52">
                <motion.span
                  className="w-full rounded-t-[4px]"
                  style={{ backgroundColor: "var(--chart-2)" }}
                  initial={{ height: reduceMotion ? `${rentPct}%` : "50%" }}
                  whileInView={{ height: `${rentPct}%` }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.7,
                    delay: reduceMotion ? 0 : i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
                {/* 2px surface gap between stacked segments */}
                <span className="h-0.5 w-full bg-surface" aria-hidden="true" />
                <motion.span
                  className="w-full"
                  style={{ backgroundColor: "var(--chart-1)" }}
                  initial={{ height: reduceMotion ? `${equityPct}%` : "50%" }}
                  whileInView={{ height: `${equityPct}%` }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.7,
                    delay: reduceMotion ? 0 : i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </div>

              <span className="mt-3 text-xs text-foreground-subtle">
                {row.month === 1 ? "Month 1" : `M${row.month}`}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[26rem] border-collapse text-left">
          <caption className="sr-only">
            The fixed monthly payment split into rent and ownership, at milestone months
          </caption>
          <thead>
            <tr className="border-b border-line bg-surface-muted">
              <th scope="col" className="px-4 py-3 text-xs font-semibold">Month</th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-semibold">Rent</th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-semibold">Ownership</th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-semibold">You pay</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.month} className="border-b border-line last:border-0">
                <th scope="row" className="px-4 py-3 text-sm font-medium">
                  {row.month}
                </th>
                <td className="tabular px-4 py-3 text-right text-sm text-foreground-muted">
                  {euro(row.rent)}
                </td>
                <td className="tabular px-4 py-3 text-right text-sm text-foreground-muted">
                  {euro(row.equity)}
                </td>
                <td className="tabular px-4 py-3 text-right text-sm font-semibold">
                  {euro(row.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

function LegendSwatch({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-foreground-muted">
      <span
        aria-hidden="true"
        className="inline-block h-3 w-3 rounded-[3px]"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}
