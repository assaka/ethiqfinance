import { Check, Lock, X } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { IconBadge } from "@/components/ui/card";
import { capitalUse, spvFacts } from "@/lib/content";

/**
 * The capital-use commitment. Deliberately blunt: a "does" list against a
 * "never" list reads faster than a paragraph, and the promise is absolute.
 */
export function CapitalSafeguards() {
  return (
    <Section id="safeguards" size="wide" tone="muted">
      <SectionHeading
        eyebrow="Where your money goes"
        title="Funds buy vehicles. Nothing else. Ever."
        description="Every euro committed is used for one purpose only — purchasing the vehicle it was committed to. Those vehicles are held by a dedicated special purpose vehicle, legally separate from our operating company."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <Reveal className="h-full">
          <div className="h-full rounded-2xl border border-accent/30 bg-surface p-6 shadow-soft sm:p-8">
            <h3 className="text-lg font-semibold">What your capital does</h3>
            <ul className="mt-6 space-y-4">
              {capitalUse.does.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-strong"
                  >
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[0.9375rem] leading-relaxed text-foreground-muted">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal index={1} className="h-full">
          <div className="h-full rounded-2xl border border-line bg-surface p-6 shadow-soft sm:p-8">
            <h3 className="text-lg font-semibold">What it never does</h3>
            <ul className="mt-6 space-y-4">
              {capitalUse.never.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-surface-muted text-foreground-subtle"
                  >
                    <X className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[0.9375rem] leading-relaxed text-foreground-muted line-through decoration-line-strong decoration-1">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-6">
        <SpvDiagram />
      </Reveal>

      <ul className="mt-6 grid gap-6 lg:grid-cols-3">
        {spvFacts.map((fact, i) => {
          const Icon = fact.icon;
          return (
            <Reveal as="li" key={fact.title} index={i} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-surface p-6">
                <IconBadge>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </IconBadge>
                <h3 className="mt-5 text-base font-semibold">{fact.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {fact.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

/** Visualises the separation between the asset-holding SPV and the operator. */
function SpvDiagram() {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-soft sm:p-8">
      <div className="grid items-center gap-5 lg:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-2xl border border-accent/40 bg-accent-soft p-6">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-strong">
            <Lock className="h-3.5 w-3.5" aria-hidden="true" />
            Ring-fenced
          </span>
          <h3 className="mt-3 text-lg font-semibold">The SPV</h3>
          <ul className="mt-4 space-y-2 text-[0.9375rem] text-foreground-muted">
            <li>Holds legal title to the vehicles</li>
            <li>Owns nothing else and owes nothing else</li>
            <li>Distributes rental income to its owners</li>
          </ul>
        </div>

        <div className="flex items-center justify-center lg:flex-col">
          <span className="h-px w-full bg-line-strong lg:h-16 lg:w-px" aria-hidden="true" />
          <span className="mx-4 whitespace-nowrap rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-foreground-subtle lg:mx-0 lg:my-3">
            legally separate
          </span>
          <span className="h-px w-full bg-line-strong lg:h-16 lg:w-px" aria-hidden="true" />
        </div>

        <div className="rounded-2xl border border-dashed border-line-strong p-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
            Operating company
          </span>
          <h3 className="mt-3 text-lg font-semibold text-foreground-muted">Ethiq Finance</h3>
          <ul className="mt-4 space-y-2 text-[0.9375rem] text-foreground-subtle">
            <li>Runs the platform and servicing</li>
            <li>Earns fees for the work it does</li>
            <li>Has no claim on the SPV&apos;s assets</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
