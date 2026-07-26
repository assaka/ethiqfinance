import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { TrustSection } from "@/components/home/trust-section";
import { StatsBand } from "@/components/home/stats-band";
import { ProductsSection } from "@/components/home/products-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { DashboardPreview } from "@/components/home/dashboard-preview";
import { Testimonials } from "@/components/home/testimonials";
import { FaqSection } from "@/components/home/faq-section";
import { CtaBand } from "@/components/home/cta-band";
import { faqs } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

/** Structured data helps the FAQ and organisation surface in search results. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FinancialService",
      name: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
      areaServed: "EU",
      email: siteConfig.contact.email,
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <TrustSection />
      <StatsBand />
      <ProductsSection />
      <HowItWorks />
      <WhyChooseUs />
      <DashboardPreview />
      <Testimonials />
      <FaqSection />
      <CtaBand />
    </>
  );
}
