"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import type { Faq } from "@/lib/content";
import { cn } from "@/lib/utils";

type AccordionProps = {
  items: Faq[];
  className?: string;
  /** Index opened on first render. Pass `null` to start fully collapsed. */
  defaultOpen?: number | null;
};

export function Accordion({ items, className, defaultOpen = 0 }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("divide-y divide-line rounded-2xl border border-line bg-surface", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-6 px-6 py-5 text-left sm:px-7 sm:py-6"
              >
                <span className="text-base font-medium text-foreground sm:text-lg">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line",
                    "text-foreground-muted transition-[transform,background-color,color] duration-300",
                    isOpen && "rotate-45 bg-accent-soft text-accent-strong border-transparent",
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.32,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-[0.9375rem] leading-relaxed text-foreground-muted sm:px-7 sm:pb-7 sm:text-base">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
