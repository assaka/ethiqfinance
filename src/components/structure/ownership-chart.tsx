"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ownershipSchedule } from "@/lib/schedule";
import { example } from "@/lib/content";

const W = 720;
const H = 260;
const PAD = { top: 18, right: 18, bottom: 34, left: 44 };

const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;

/**
 * Ownership split across the term — two series stacked to 100%.
 * Both series are named in the legend AND direct-labelled at the right edge,
 * so identity never rests on colour alone. The figures also appear in the
 * payment table beside it, which is the table view for this chart.
 */
export function OwnershipChart() {
  const reduceMotion = useReducedMotion();
  const data = ownershipSchedule();

  const x = (month: number) => PAD.left + (month / example.termMonths) * plotW;
  const y = (pct: number) => PAD.top + (1 - pct / 100) * plotH;

  // Customer share fills from the bottom; the SPV's share is what's left above.
  const customerLine = data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(d.month).toFixed(1)} ${y(d.customer).toFixed(1)}`).join(" ");
  const customerArea = `${customerLine} L ${x(example.termMonths)} ${PAD.top + plotH} L ${PAD.left} ${PAD.top + plotH} Z`;
  const companyArea = `${customerLine} L ${x(example.termMonths)} ${PAD.top} L ${PAD.left} ${PAD.top} Z`;

  const ticks = [0, 12, 24, 36, example.termMonths];
  const yTicks = [0, 25, 50, 75, 100];

  return (
    <figure>
      <figcaption className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <LegendSwatch color="var(--chart-1)" label="Your share" />
        <LegendSwatch color="var(--chart-2)" label="Our share (leased to you)" />
      </figcaption>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Ownership of the vehicle over ${example.termMonths} months. Your share rises from ${example.customerShare}% at signing to 100% at the end of the term, while our share falls from ${example.companyShare}% to zero.`}
      >
        {yTicks.map((t) => (
          <g key={t}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(t)}
              y2={y(t)}
              stroke="var(--border)"
              strokeWidth="1"
            />
            <text x={PAD.left - 10} y={y(t) + 4} textAnchor="end" fontSize="12" fill="var(--foreground-subtle)">
              {t}%
            </text>
          </g>
        ))}

        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduceMotion ? 0 : 0.7 }}
        >
          <path d={companyArea} fill="var(--chart-2)" fillOpacity="0.85" />
          <path d={customerArea} fill="var(--chart-1)" fillOpacity="0.9" />
          {/* 2px surface gap keeps the two fills from bleeding into each other. */}
          <path d={customerLine} fill="none" stroke="var(--surface)" strokeWidth="2" />
        </motion.g>

        {ticks.map((t) => (
          <text
            key={t}
            x={x(t)}
            y={H - 10}
            textAnchor={t === 0 ? "start" : t === example.termMonths ? "end" : "middle"}
            fontSize="12"
            fill="var(--foreground-subtle)"
          >
            {t === 0 ? "Signing" : `M${t}`}
          </text>
        ))}
      </svg>

      {/* Direct labels for the two endpoints — the numbers that matter. */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Endpoint
          color="var(--chart-1)"
          label="At signing"
          value={`You ${example.customerShare}% · Us ${example.companyShare}%`}
        />
        <Endpoint
          color="var(--chart-1)"
          label={`After ${example.termMonths} months`}
          value="You 100% · Us 0%"
        />
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

function Endpoint({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line p-4">
      <span className="flex items-center gap-2 text-xs font-medium text-foreground-subtle">
        <span
          aria-hidden="true"
          className="inline-block h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        {label}
      </span>
      <span className="tabular mt-1.5 block text-sm font-semibold">{value}</span>
    </div>
  );
}
