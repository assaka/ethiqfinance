"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

const MONTHS = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const W = 640;
const H = 200;
const PAD = { top: 16, right: 16, bottom: 26, left: 16 };

/**
 * Single-series area chart of portfolio value over 12 months.
 * One series, so identity needs no legend — the surrounding heading names it.
 * Axis labels use text tokens; the emerald mark carries no textual meaning.
 */
export function PerformanceChart({ data }: { data: number[] }) {
  const gradientId = useId();
  const reduceMotion = useReducedMotion();

  const max = Math.max(...data);
  const min = Math.min(...data);
  // Pad the domain so the line never touches the frame.
  const top = max + (max - min) * 0.15;
  const bottom = Math.max(0, min - (max - min) * 0.25);

  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const x = (i: number) => PAD.left + (i / (data.length - 1)) * plotW;
  const y = (v: number) => PAD.top + (1 - (v - bottom) / (top - bottom)) * plotH;

  const linePath = data.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L ${x(data.length - 1).toFixed(1)} ${PAD.top + plotH} L ${x(0).toFixed(1)} ${PAD.top + plotH} Z`;

  const gridLines = [0.25, 0.5, 0.75, 1];

  return (
    <figure className="mt-1">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Portfolio value over the last twelve months, rising from ${min} to ${max} thousand euro.`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Recessive grid */}
        {gridLines.map((g) => (
          <line
            key={g}
            x1={PAD.left}
            x2={W - PAD.right}
            y1={PAD.top + plotH * g}
            y2={PAD.top + plotH * g}
            stroke="var(--border)"
            strokeWidth="1"
          />
        ))}

        <motion.path
          d={areaPath}
          fill={`url(#${gradientId})`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.4 }}
        />

        <motion.path
          d={linePath}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduceMotion ? 0 : 1.3, ease: "easeInOut" }}
        />

        {/* Only the latest point is marked — no number on every point. */}
        <motion.circle
          cx={x(data.length - 1)}
          cy={y(data[data.length - 1])}
          r="5"
          fill="var(--accent)"
          stroke="var(--surface)"
          strokeWidth="2"
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 1.1 }}
        />

        {MONTHS.map((m, i) =>
          i % 3 === 0 || i === MONTHS.length - 1 ? (
            <text
              key={m}
              x={x(i)}
              y={H - 6}
              textAnchor={i === 0 ? "start" : i === MONTHS.length - 1 ? "end" : "middle"}
              fontSize="12"
              fill="var(--foreground-subtle)"
            >
              {m}
            </text>
          ) : null,
        )}
      </svg>
      <figcaption className="sr-only">
        Monthly portfolio value in thousands of euro, {MONTHS[0]} to {MONTHS[MONTHS.length - 1]}.
      </figcaption>
    </figure>
  );
}
