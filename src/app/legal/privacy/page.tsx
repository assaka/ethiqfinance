import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/layout/legal-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects personal data.`,
  alternates: { canonical: "/legal/privacy" },
};

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    body: [
      `${siteConfig.name} provides ethical, asset-backed finance and investment products. For the purposes of the GDPR we are the data controller for the personal data described in this policy. You can reach us at ${siteConfig.contact.email}.`,
    ],
  },
  {
    heading: "What we collect",
    body: [
      "Identity and contact details you give us — your name, email address, phone number and postal address — when you enquire, apply or open an investor account.",
      "Financial information needed to assess an application or an investment, such as income, employment status and, where required by law, identity documents.",
      "Technical information collected automatically when you browse, including approximate location derived from your IP address, device type and the pages you visit.",
    ],
  },
  {
    heading: "Why we use it",
    body: [
      "To respond to your enquiry and provide the products you ask for.",
      "To meet legal obligations, including anti-money-laundering and know-your-customer checks.",
      "To assess affordability and manage risk, which protects both you and other investors.",
      "To improve the website and our products, using aggregated information that does not identify you.",
    ],
  },
  {
    heading: "Legal bases",
    body: [
      "We rely on performance of a contract for the products you hold with us, legal obligation for regulatory checks, legitimate interests for security and product improvement, and consent for optional marketing — which you can withdraw at any time.",
    ],
  },
  {
    heading: "Sharing",
    body: [
      "We share personal data with service providers who help us operate — identity verification, payment processing, hosting and customer support — under contracts that restrict them to our instructions.",
      "We share data with regulators, auditors or law enforcement where we are legally required to. We never sell personal data.",
    ],
  },
  {
    heading: "Retention",
    body: [
      "We keep personal data for as long as you hold a product with us and then for the period required by financial regulation, typically seven years after the relationship ends. Enquiry data that does not lead to an application is deleted within 24 months.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You can request access to your data, correction of inaccurate data, deletion where no legal obligation requires us to keep it, restriction or objection to processing, and portability of data you provided to us.",
      `To exercise any of these rights, contact ${siteConfig.contact.email}. You also have the right to complain to your national data protection authority.`,
    ],
  },
  {
    heading: "Cookies",
    body: [
      "We use strictly necessary cookies to make the website work, and — only with your consent — analytics cookies that help us understand which pages are useful. You can change your choice at any time in your browser settings.",
    ],
  },
  {
    heading: "Changes",
    body: [
      "We update this policy when our processing changes. Material changes are communicated to account holders by email before they take effect.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="1 July 2026"
      intro="What we collect, why we collect it, and the control you have over it."
      sections={sections}
    />
  );
}
