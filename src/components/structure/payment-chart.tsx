"use client";

import { motion, useReducedMotion } from "framer-motion";
import { paymentMilestones } from "@/lib/schedule";
import { example } from "@/lib/content";

const euro = (n: number) => `€${n.toLocaleString("en-GB")}`;

/**
 * Round the parts first and derive the total from them, so the displayed
 * figures always add up. Sub-euro precision is meaningless on an illustration.
 */
const rounded = (p: { month: number; rent: number; equity: number }) => {
  const rent = Math.round(p.rent);
  const equity = Math.round(p.equity);
  return { month: p.month, rent, equity, total: rent + equity };
};

/**
 * Composition of the monthly payment at five points in the term.
 * The ownership instalment is level; the rent shrinks with our share, so the
 * total falls over time. Colours match the ownership chart: emerald is the
 * part that becomes yours, indigo is rent on the share still ours.
 * The table underneath is the table view — every plotted value appears in it.
 */
export function PaymentChart() {
  const reduceMotion = useReducedMotion();
  const rows = paymentMilestones().map(rounded);
  const max = Math.max(...rows.map((r) => r.total));

  return (
    <figure>
      <figcaption className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        <LegendSwatch color="var(--chart-1)" label="Buys your ownership" />
        <LegendSwatch color="var(--chart-2)" label="Rent on our share" />
      </figcaption>

      <div
        className="flex items-end justify-between gap-3 sm:gap-6"
        role="img"
        aria-label={`Monthly payment composition. In month 1 the payment is ${euro(rows[0].total)}, of which ${euro(rows[0].rent)} is rent. By month ${example.termMonths} the payment has fallen to ${euro(rows[rows.length - 1].total)} as the rent approaches zero.`}
      >
        {rows.map((row, i) => {
          const equityH = (row.equity / max) * 100;
          const rentH = (row.rent / max) * 100;

          return (
            <div key={row.month} className="flex min-w-0 flex-1 flex-col items-center">
              <span className="tabular mb-2 text-xs font-semibold text-foreground sm:text-sm">
                {euro(row.total)}
              </span>

              <div className="flex h-44 w-full max-w-16 flex-col justify-end sm:h-52">
                <motion.span
                  className="w-full rounded-t-[4px]"
                  style={{ backgroundColor: "var(--chart-2)" }}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${rentH}%` }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.6,
                    delay: reduceMotion ? 0 : 0.1 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
                {/* 2px surface gap between stacked segments */}
                <span className="h-0.5 w-full bg-surface" aria-hidden="true" />
                <motion.span
                  className="w-full"
                  style={{ backgroundColor: "var(--chart-1)" }}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${equityH}%` }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.6,
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
            Monthly payment split into rent and ownership, at milestone months
          </caption>
          <thead>
            <tr className="border-b border-line bg-surface-muted">
              <th scope="col" className="px-4 py-3 text-xs font-semibold">Month</th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-semibold">Rent</th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-semibold">Ownership</th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-semibold">Total</th>
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
