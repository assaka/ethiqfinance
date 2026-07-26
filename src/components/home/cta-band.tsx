import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

type CtaBandProps = {
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function CtaBand({
  title = "Finance that creates ownership.",
  description = "Start with a vehicle or start with an investment. Either way, you'll know exactly what you own and exactly what it costs.",
  primary = { label: "Get started", href: "/contact" },
  secondary = { label: "Explore investments", href: "/products/asset-investments" },
}: CtaBandProps) {
  return (
    <section className="py-20 sm:py-24">
      <Container size="wide">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-16 text-center sm:px-12 sm:py-20">
            <div
              className="pointer-events-none absolute inset-0 opacity-90"
              style={{
                backgroundImage:
                  "radial-gradient(40rem 20rem at 50% 120%, rgba(16,185,129,0.28), transparent 70%)",
              }}
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-semibold text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                {title}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
                {description}
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href={primary.href} size="lg" variant="inverse">
                  {primary.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  href={secondary.href}
                  size="lg"
                  variant="secondary"
                  className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:border-white/40"
                >
                  {secondary.label}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
