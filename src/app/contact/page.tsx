import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { Card, IconBadge } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to us about financing a car, motorcycle, boat or van — or about investing in income-producing assets.",
  alternates: { canonical: "/contact" },
};

const channels = [
  {
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    icon: Mail,
  },
  {
    label: "Phone",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
    icon: Phone,
  },
  {
    label: "Office",
    value: siteConfig.contact.address,
    icon: MapPin,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about what you need."
        description="Financing a vehicle, investing in one, or just working out whether this fits — we'll give you a straight answer."
      />

      <Section size="wide">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <Reveal>
            <Card className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold">Send us a message</h2>
              <p className="mt-2 text-[0.9375rem] text-foreground-muted">
                A few details are enough to get started.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4">
              {channels.map((channel) => {
                const Icon = channel.icon;
                const content = (
                  <>
                    <IconBadge>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </IconBadge>
                    <span className="mt-4 block text-sm font-medium text-foreground-subtle">
                      {channel.label}
                    </span>
                    <span className="mt-1 block text-[0.9375rem] font-medium text-foreground">
                      {channel.value}
                    </span>
                  </>
                );

                return channel.href ? (
                  <a
                    key={channel.label}
                    href={channel.href}
                    className="block rounded-2xl border border-line bg-surface p-6 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={channel.label}
                    className="rounded-2xl border border-line bg-surface p-6 shadow-soft"
                  >
                    {content}
                  </div>
                );
              })}

              <div className="rounded-2xl border border-line bg-surface-muted p-6">
                <h2 className="text-sm font-semibold">Response times</h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  We reply to every enquiry within one business day. Applications are usually
                  assessed within three.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
