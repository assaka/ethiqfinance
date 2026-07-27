import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card, IconBadge } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { roadmap, vehicleCategories } from "@/lib/content";

/**
 * Homepage product section — what a customer can actually finance today.
 * Investing has its own page and is offered here as a single quiet line;
 * giving it an equal card confused a page meant for people buying a vehicle.
 */
export function ProductsSection() {
  return (
    <Section id="products" size="wide" tone="muted">
      <SectionHeading
        eyebrow="What we finance"
        title="Cars, motorcycles, boats and vans"
        description="New or used, from a dealer or a private seller. If it has a registration, we can probably finance it."
      />

      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {vehicleCategories.map((category, i) => {
          const Icon = category.icon;
          return (
            <Reveal as="li" key={category.title} index={i} className="h-full">
              <Card interactive className="h-full">
                <IconBadge>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </IconBadge>
                <h3 className="mt-5 text-base font-semibold">{category.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {category.description}
                </p>
              </Card>
            </Reveal>
          );
        })}
      </ul>

      <Reveal className="mt-10 text-center">
        <Link
          href="/products/vehicle-finance"
          className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-foreground"
        >
          How vehicle finance works
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </Reveal>

      <div id="roadmap" className="mt-20 scroll-mt-24">
        <Reveal className="text-center">
          <p className="text-eyebrow text-foreground-subtle">Coming soon</p>
          <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">More on the way</h3>
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roadmap.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal as="li" key={item.title} index={i} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-dashed border-line-strong bg-surface/60 p-6">
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-foreground-subtle" aria-hidden="true" />
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground-subtle">
                      <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                      Soon
                    </span>
                  </div>
                  <h4 className="mt-5 text-base font-semibold">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-subtle">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>

      {/* Investing is a different audience — one line, not a second card. */}
      <Reveal className="mt-16">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-surface px-6 py-7 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-[0.9375rem] text-foreground-muted">
            <strong className="font-semibold text-foreground">Not looking to finance?</strong>{" "}
            You can invest in the vehicles other people are financing instead.
          </p>
          <Link
            href="/products/asset-investments"
            className="group inline-flex shrink-0 items-center gap-2 text-[0.9375rem] font-medium text-foreground"
          >
            Explore investments
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
