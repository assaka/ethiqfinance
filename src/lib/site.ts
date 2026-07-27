/**
 * Single source of truth for site-wide metadata and navigation.
 * New product areas (home finance, takaful, business finance) plug in here
 * and appear in the header, footer and sitemap automatically.
 */

export const siteConfig = {
  name: "Ethiq Finance",
  shortName: "Ethiq",
  tagline: "Ethical, Asset-Backed Finance",
  description:
    "Ethical vehicle finance and asset investments built on real assets, transparent agreements and shared ownership. Open to everyone.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://assaka.github.io/ethiqfinance",
  locale: "en_EU",
  contact: {
    email: "hello@ethiqfinance.eu",
    phone: "+31 20 000 0000",
    address: "Amsterdam, Netherlands",
  },
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "X", href: "https://x.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
  ],
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

/** Primary header navigation. */
export const mainNav: NavItem[] = [
  { label: "Vehicle Finance", href: "/products/vehicle-finance" },
  { label: "Invest", href: "/products/asset-investments" },
  { label: "Structure", href: "/structure" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Products",
    items: [
      { label: "Vehicle Finance", href: "/products/vehicle-finance" },
      { label: "Asset Investments", href: "/products/asset-investments" },
      { label: "Coming soon", href: "/#roadmap" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Why choose us", href: "/#why-us" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "How the structure works", href: "/structure" },
      { label: "Where your money goes", href: "/structure#safeguards" },
      { label: "FAQ", href: "/faq" },
      { label: "Investor dashboard", href: "/#dashboard" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
];
