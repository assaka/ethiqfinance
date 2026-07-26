import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/layout/legal-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms that apply when you use the ${siteConfig.name} website.`,
  alternates: { canonical: "/legal/terms" },
};

const sections: LegalSection[] = [
  {
    heading: "About these terms",
    body: [
      `These terms govern your use of the ${siteConfig.name} website. By using the site you accept them. If you do not accept them, please stop using the site.`,
      "Separate contractual terms apply to any finance agreement or investment you enter into. Those terms take precedence over anything on this website.",
    ],
  },
  {
    heading: "Not financial advice",
    body: [
      "The content on this website is provided for information only. It does not constitute financial, tax or legal advice, and it does not take account of your personal circumstances or objectives.",
      "You should consider seeking independent advice before entering into a finance agreement or making an investment.",
    ],
  },
  {
    heading: "Risk",
    body: [
      "Investing places your capital at risk. Returns depend on actual asset performance — including customer payment behaviour, asset downtime and end-of-term resale values — and are not guaranteed.",
      "Any figures, projections or illustrations shown on this website are examples. They are not promises of future performance and past performance does not predict future results.",
    ],
  },
  {
    heading: "Eligibility",
    body: [
      "You must be at least 18 years old and legally able to enter into a contract. Some products are available only to residents of specific countries, and all applications are subject to identity, affordability and anti-money-laundering checks.",
    ],
  },
  {
    heading: "Acceptable use",
    body: [
      "You may not use the website unlawfully, attempt to gain unauthorised access to it, interfere with its operation, or scrape or reproduce substantial parts of it without our written permission.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      `All content on this website — text, design, graphics, logos and code — belongs to ${siteConfig.name} or its licensors. You may view and print pages for your own use; any other reproduction requires our permission.`,
    ],
  },
  {
    heading: "Third-party links",
    body: [
      "Where we link to other websites we do so for convenience. We do not control them and are not responsible for their content or their privacy practices.",
    ],
  },
  {
    heading: "Liability",
    body: [
      "We take care to keep the website accurate and available, but we do not guarantee that it will be uninterrupted or error-free. To the extent permitted by law we exclude liability for loss arising from reliance on website content.",
      "Nothing in these terms limits liability for fraud, death or personal injury caused by negligence, or any liability that cannot lawfully be excluded.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These terms are governed by the laws of the Netherlands, and the courts of the Netherlands have exclusive jurisdiction over any dispute arising from them.",
    ],
  },
  {
    heading: "Contact",
    body: [`Questions about these terms can be sent to ${siteConfig.contact.email}.`],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="1 July 2026"
      intro="The rules that apply to this website, and the limits of what it tells you."
      sections={sections}
    />
  );
}
