"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Car, RefreshCw, Users, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const nodes = [
  {
    label: "Investors",
    caption: "Fund a specific asset",
    icon: Wallet,
  },
  {
    label: "Assets",
    caption: "Cars, motorcycles, boats",
    icon: Car,
  },
  {
    label: "Customers",
    caption: "Lease on fixed terms",
    icon: Users,
  },
  {
    label: "Monthly returns",
    caption: "Distributed to owners",
    icon: RefreshCw,
  },
];

/**
 * Hero illustration: capital flows from investors into real assets, assets are
 * leased to customers, and lease income returns to investors — a closed loop.
 * A light beam travels the connectors to imply continuous circulation.
 */
export function FlowDiagram({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative rounded-3xl border border-line bg-surface/80 p-6 shadow-lift backdrop-blur-sm sm:p-8",
        className,
      )}
      role="img"
      aria-label="How capital circulates: investors fund assets, assets are leased to customers, lease income returns to investors as monthly returns."
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-accent/[0.06] to-transparent" />

      <ol className="relative space-y-3" aria-hidden="true">
        {nodes.map((node, i) => {
          const Icon = node.icon;
          const isLast = i === nodes.length - 1;

          return (
            <li key={node.label} className="relative">
              <motion.div
                initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.5,
                  delay: reduceMotion ? 0 : 0.15 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  "flex items-center gap-4 rounded-2xl border px-4 py-3.5 sm:px-5",
                  isLast
                    ? "border-accent/35 bg-accent-soft"
                    : "border-line bg-background",
                )}
              >
                <span
                  className={cn(
                    "inline-grid h-10 w-10 shrink-0 place-items-center rounded-xl",
                    isLast ? "bg-accent text-navy" : "bg-surface-muted text-foreground-muted",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.9375rem] font-semibold text-foreground">
                    {node.label}
                  </span>
                  <span className="block truncate text-[0.8125rem] text-foreground-subtle">
                    {node.caption}
                  </span>
                </span>
              </motion.div>

              {!isLast ? <Connector delay={0.35 + i * 0.12} reduceMotion={!!reduceMotion} /> : null}
            </li>
          );
        })}
      </ol>

      {/* Loop back: returns feed the next round of financing. */}
      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-dashed border-line px-4 py-3">
        <RefreshCw
          className={cn("h-4 w-4 text-accent-strong", !reduceMotion && "motion-safe:animate-spin")}
          style={{ animationDuration: "6s" }}
          aria-hidden="true"
        />
        <p className="text-[0.8125rem] text-foreground-muted">
          Returns recirculate into the next asset — ownership compounds, debt doesn&apos;t.
        </p>
      </div>
    </div>
  );
}

function Connector({ delay, reduceMotion }: { delay: number; reduceMotion: boolean }) {
  return (
    <div className="relative mx-auto h-3 w-px overflow-hidden bg-line" aria-hidden="true">
      {!reduceMotion ? (
        <motion.span
          className="absolute inset-x-0 h-2 bg-accent"
          initial={{ y: -8 }}
          animate={{ y: 14 }}
          transition={{
            duration: 1.1,
            delay,
            repeat: Infinity,
            repeatDelay: 1.4,
            ease: "easeInOut",
          }}
        />
      ) : null}
    </div>
  );
}
