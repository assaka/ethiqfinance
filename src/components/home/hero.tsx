import { ArrowRight, Bike, Car, Sailboat, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { FlowDiagram } from "@/components/home/flow-diagram";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-mesh">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.5]" aria-hidden="true" />

      <Container size="wide" className="relative pb-20 pt-14 sm:pt-20 lg:pb-28 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            {/* The brand positioning sits in the eyebrow so the headline is
                free to say the one thing a customer came here to find out. */}
            <Reveal>
              <Badge>
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Ethical, asset-backed finance
              </Badge>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 text-[2.5rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.25rem]">
                Get it now.
                <br /> Pay monthly.
                <br /> <span className="text-accent-strong">Own it at the end.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted sm:text-xl">
                One fixed monthly payment for your next car, motorcycle or boat. No interest, no
                penalties — and it&apos;s yours outright when the term ends.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" size="lg">
                  Get started
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button href="/pricing" size="lg" variant="secondary">
                  See what it costs
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-foreground-subtle">
                <li className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-accent-strong" aria-hidden="true" /> Cars
                </li>
                <li className="flex items-center gap-2">
                  <Bike className="h-4 w-4 text-accent-strong" aria-hidden="true" /> Motorcycles
                </li>
                <li className="flex items-center gap-2">
                  <Sailboat className="h-4 w-4 text-accent-strong" aria-hidden="true" /> Boats
                </li>
                <li className="text-foreground-subtle">Insurance &amp; servicing included</li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:pl-4">
            <FlowDiagram />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
