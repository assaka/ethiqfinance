import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export type LegalSection = { heading: string; body: string[] };

/** Shared shell for long-form legal copy — narrow measure, generous rhythm. */
export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader eyebrow={`Last updated ${updated}`} title={title} description={intro} />

      <Section size="narrow">
        <div className="space-y-12">
          {sections.map((section, i) => (
            <Reveal key={section.heading} index={Math.min(i, 3)}>
              <h2 className="text-xl font-semibold sm:text-2xl">{section.heading}</h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-[0.9375rem] leading-relaxed text-foreground-muted sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
