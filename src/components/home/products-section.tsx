import Link from "next/link";
import { ArrowRight, Check, Clock3 } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card, Badge, IconBadge } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { products, roadmap } from "@/lib/content";

export function ProductsSection() {
  return (
    <Section id="products" size="wide" tone="muted">
      <SectionHeading
        eyebrow="Products"
        title="Finance a vehicle — or fund one"
        description="Most people come here to finance a car, motorcycle or boat. If you would rather put capital behind those vehicles instead, you can do that too."
      />

      <ul className="mt-14 grid gap-6 lg:grid-cols-2">
        {products.map((product, i) => {
          const Icon = product.icon;
          return (
            <Reveal as="li" key={product.slug} index={i} className="h-full">
              <Card interactive className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <IconBadge>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </IconBadge>
                  <Badge tone="outline">{product.eyebrow}</Badge>
                </div>

                <h3 className="mt-6 text-2xl font-semibold">{product.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-foreground-muted">
                  {product.summary}
                </p>

                <ul className="mt-6 space-y-3">
                  {product.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong"
                        aria-hidden="true"
                      />
                      <span className="text-[0.9375rem] text-foreground-muted">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-2">
                  <Link
                    href={product.href}
                    className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-foreground"
                  >
                    {product.cta}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </ul>

      <div id="roadmap" className="mt-20 scroll-mt-24">
        <Reveal className="text-center">
          <p className="text-eyebrow text-foreground-subtle">Coming soon</p>
          <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">
            The rest of the ecosystem
          </h3>
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
    </Section>
  );
}
