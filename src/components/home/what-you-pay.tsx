import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { example } from "@/lib/content";
import { defaultTerms, financePayment, monthlyPayment, serviceCharge } from "@/lib/schedule";
import { formatCurrency } from "@/lib/utils";

const euro = (n: number) => formatCurrency(Math.round(n));

/**
 * The homepage's only numbers. Deliberately one example and four figures —
 * anything more detailed belongs on /pricing, and the investor mechanics
 * belong on /structure.
 */
export function WhatYouPay() {
  const finance = financePayment(defaultTerms);
  const allIn = monthlyPayment(defaultTerms);
  const service = serviceCharge(defaultTerms);
  const deposit = (example.vehiclePrice * example.customerShare) / 100;
  const months = example.termMonths;
  const total = deposit + allIn * months;

  return (
    <Section id="what-you-pay" size="wide" tone="muted">
      <SectionHeading
        eyebrow="What it costs"
        title="One payment. It never changes."
        description={`Here is a real example: a ${euro(example.vehiclePrice)} car over ${months} months.`}
      />

      <Reveal className="mt-14">
        <Card className="p-6 sm:p-9">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
            <div>
              <p className="text-sm font-medium text-foreground-subtle">
                You put in {euro(deposit)} and own {example.customerShare}% straight away
              </p>

              <p className="mt-5 flex flex-wrap items-baseline gap-x-3">
                <span className="tabular text-5xl font-semibold tracking-tight sm:text-6xl">
                  {euro(allIn)}
                </span>
                <span className="text-lg text-foreground-muted">a month</span>
              </p>

              <p className="mt-4 text-[0.9375rem] leading-relaxed text-foreground-muted">
                Fixed for all {months} months, with takaful, road tax and servicing included.
                Prefer to arrange those yourself? That plan is {euro(finance)} a month.
              </p>

              <ul className="mt-7 space-y-3">
                {[
                  "Insurance, road tax, servicing and tyres included",
                  "No interest, no penalties, no mileage limit",
                  "The car is yours at the end — no final payment",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong"
                      aria-hidden="true"
                    />
                    <span className="text-[0.9375rem] text-foreground-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-line bg-surface-muted p-6 sm:p-7">
              <h3 className="text-sm font-semibold">What you pay in total</h3>
              <dl className="mt-5 space-y-4">
                <Line label="Your contribution" value={euro(deposit)} />
                <Line label={`${months} × ${euro(allIn)}`} value={euro(allIn * months)} />
                <Line
                  label="Insurance, tax, servicing"
                  value="Included"
                  note={`worth about ${euro(service)}/month`}
                />
                <div className="border-t border-line-strong pt-4">
                  <dt className="text-sm font-semibold">Total by the end</dt>
                  <dd className="tabular mt-1 text-3xl font-semibold tracking-tight">
                    {euro(total)}
                  </dd>
                  <dd className="mt-2 text-sm text-accent-strong">
                    and the car is 100% yours
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <p className="mt-8 border-t border-line pt-6 text-sm text-foreground-subtle">
            Illustrative. Your quote depends on the vehicle, your contribution and the term.{" "}
            <Link
              href="/pricing"
              className="font-medium text-foreground underline underline-offset-4"
            >
              Compare both plans
            </Link>
            .
          </p>
        </Card>
      </Reveal>

      <Reveal className="mt-10 text-center">
        <Link
          href="/pricing"
          className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-foreground"
        >
          See pricing for cars, motorcycles, boats and vans
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </Reveal>
    </Section>
  );
}

function Line({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-sm text-foreground-muted">
        {label}
        {note ? <span className="block text-xs text-foreground-subtle">{note}</span> : null}
      </dt>
      <dd className="tabular text-sm font-medium">{value}</dd>
    </div>
  );
}
