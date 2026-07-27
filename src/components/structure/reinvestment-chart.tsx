"use client";

import { motion, useReducedMotion } from "framer-motion";
import { wealthPaths } from "@/lib/schedule";
import { example } from "@/lib/content";

const W = 720;
const H = 260;
const PAD = { top: 18, right: 96, bottom: 34, left: 52 };

const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;

const euro = (n: number) => `€${Math.round(n).toLocaleString("en-GB")}`;

const SERIES = [
  { key: "compounded", color: "var(--chart-1)", label: "All redeployed" },
  { key: "redeployed", color: "var(--chart-2)", label: "Capital redeployed" },
  { key: "idle", color: "var(--chart-3)", label: "Left idle" },
] as const;

/**
 * Three reinvestment behaviours for the same €1,000, on one axis because all
 * three measure the same thing — total wealth. Each line is direct-labelled at
 * its right-hand end as well as named in the legend, so identity never rests
 * on colour, and the summary tiles beneath repeat every final value.
 */
export function ReinvestmentChart() {
  const reduceMotion = useReducedMotion();
  const data = wealthPaths();
  const last = data[data.length - 1];

  const min = 1000;
  const max = Math.max(last.compounded, last.redeployed, last.idle) * 1.02;

  const x = (month: number) => PAD.left + (month / example.termMonths) * plotW;
  const y = (value: number) => PAD.top + (1 - (value - min) / (max - min)) * plotH;

  const path = (key: (typeof SERIES)[number]["key"]) =>
    data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(d.month).toFixed(1)} ${y(d[key]).toFixed(1)}`).join(" ");

  const yTicks = [1000, 1050, 1100, 1150, 1200];
  const xTicks = [0, 12, 24, 36, example.termMonths];

  return (
    <figure>
      <figcaption className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        {SERIES.map((s) => (
          <span
            key={s.key}
            className="inline-flex items-center gap-2 text-sm text-foreground-muted"
          >
            <span
              aria-hidden="true"
              className="inline-block h-3 w-3 rounded-[3px]"
              style={{ backgroundColor: s.color }}
            />
            {s.label}
          </span>
        ))}
      </figcaption>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Value of a €1,000 investment over ${example.termMonths} months. Left idle as capital returns it reaches ${euro(last.idle)}; with capital redeployed and income taken as cash, ${euro(last.redeployed)}; with everything redeployed it compounds to ${euro(last.compounded)}.`}
      >
        {yTicks.map((t) =>
          t <= max ? (
            <g key={t}>
              <line
                x1={PAD.left}
                x2={W - PAD.right}
                y1={y(t)}
                y2={y(t)}
                stroke="var(--border)"
                strokeWidth="1"
              />
              <text
                x={PAD.left - 10}
                y={y(t) + 4}
                textAnchor="end"
                fontSize="12"
                fill="var(--foreground-subtle)"
              >
                {euro(t)}
              </text>
            </g>
          ) : null,
        )}

        {SERIES.map((s, i) => (
          <motion.path
            key={s.key}
            d={path(s.key)}
            fill="none"
            stroke={s.color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: reduceMotion ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: reduceMotion ? 0 : 1.2,
              delay: reduceMotion ? 0 : i * 0.12,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Direct labels at the end of each line */}
        {SERIES.map((s) => (
          <text
            key={`${s.key}-label`}
            x={W - PAD.right + 8}
            y={y(last[s.key]) + 4}
            fontSize="12"
            fontWeight="600"
            fill="var(--foreground)"
          >
            {euro(last[s.key])}
          </text>
        ))}

        {xTicks.map((t) => (
          <text
            key={t}
            x={x(t)}
            y={H - 10}
            textAnchor={t === 0 ? "start" : t === example.termMonths ? "end" : "middle"}
            fontSize="12"
            fill="var(--foreground-subtle)"
          >
            {t === 0 ? "Start" : `M${t}`}
          </text>
        ))}
      </svg>
    </figure>
  );
}
