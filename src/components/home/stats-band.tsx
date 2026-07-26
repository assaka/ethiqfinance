import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { stats } from "@/lib/content";

export function StatsBand() {
  return (
    <section className="border-y border-line bg-surface-muted py-14">
      <Container size="wide">
        <dl className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} index={i}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="tabular block text-3xl font-semibold tracking-tight sm:text-4xl">
                  <AnimatedNumber
                    value={stat.value}
                    prefix={"prefix" in stat ? stat.prefix : undefined}
                    suffix={stat.suffix}
                  />
                </span>
                <span className="mt-2 block text-sm text-foreground-muted">{stat.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
