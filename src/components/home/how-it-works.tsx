"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { howItWorks } from "@/lib/content";

/**
 * Four-step timeline. The connecting rail draws itself once the section
 * scrolls into view, so the sequence reads as a flow rather than a list.
 */
export function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id="how-it-works" size="wide">
      <SectionHeading
        eyebrow="How it works"
        title="A closed loop between investors and customers"
        description="No lending, no interest. Capital buys a real vehicle, the customer co-owns it and rents the rest, and that rental income is shared with the people who funded it."
      />

      <div className="relative mt-16">
        {/* Vertical rail (mobile / tablet) */}
        <div
          className="absolute left-[27px] top-6 hidden h-[calc(100%-3rem)] w-px bg-line sm:block lg:hidden"
          aria-hidden="true"
        >
          <motion.div
            className="h-full w-full origin-top bg-accent/60"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: reduceMotion ? 0 : 1.2, ease: "easeInOut" }}
          />
        </div>

        {/* Horizontal rail (desktop) */}
        <div
          className="absolute left-0 top-[27px] hidden h-px w-full bg-line lg:block"
          aria-hidden="true"
        >
          <motion.div
            className="h-full w-full origin-left bg-accent/60"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: reduceMotion ? 0 : 1.2, ease: "easeInOut" }}
          />
        </div>

        <ol className="relative grid gap-10 sm:gap-12 lg:grid-cols-4 lg:gap-8">
          {howItWorks.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal as="li" key={step.number} index={i} className="relative">
                <div className="flex gap-5 sm:gap-6 lg:block">
                  <span className="relative z-10 inline-grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-line bg-surface text-accent-strong shadow-soft">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>

                  <div className="lg:mt-6">
                    <span className="tabular text-eyebrow text-foreground-subtle">
                      Step {step.number}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-foreground-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>

      <Reveal className="mt-14 text-center">
        <Link
          href="/structure"
          className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-foreground"
        >
          See the full structure, with worked numbers
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </Reveal>
    </Section>
  );
}
