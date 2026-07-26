import {
  BadgeCheck,
  Bike,
  Building2,
  Car,
  ChartLine,
  Coins,
  FileText,
  Gauge,
  HeartHandshake,
  House,
  Landmark,
  Sailboat,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
  Wallet,
} from "lucide-react";

export type Feature = {
  title: string;
  description: string;
  icon: typeof ShieldCheck;
};

/* -------------------------------------------------------------------------- */
/*  Trust                                                                     */
/* -------------------------------------------------------------------------- */

export const trustPillars: Feature[] = [
  {
    title: "Transparent",
    description:
      "No hidden fees. Clear agreements. Simple pricing you can read in a single sitting.",
    icon: ScrollText,
  },
  {
    title: "Asset-Backed",
    description:
      "Every investment is linked to a real, registered asset — never to abstract debt.",
    icon: ShieldCheck,
  },
  {
    title: "Ethical",
    description:
      "Designed around fairness, responsibility and long-term value for both sides of the agreement.",
    icon: HeartHandshake,
  },
];

/* -------------------------------------------------------------------------- */
/*  Products                                                                  */
/* -------------------------------------------------------------------------- */

export type Product = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  description: string;
  href: string;
  cta: string;
  points: string[];
  icon: typeof Car;
};

export const products: Product[] = [
  {
    slug: "vehicle-finance",
    eyebrow: "Available now",
    title: "Vehicle Finance",
    summary:
      "Ethical financing for cars, motorcycles and boats through shared ownership rather than traditional lending.",
    description:
      "We buy the vehicle you choose and lease it to you on a fixed, transparent agreement. Every payment moves you closer to full ownership — with no interest, no compounding and no penalty spiral.",
    href: "/products/vehicle-finance",
    cta: "Learn more",
    points: [
      "Cars, motorcycles, boats and light commercial vehicles",
      "One fixed monthly amount, agreed up front",
      "Ownership transfers to you at the end of the term",
      "Settle early at any point without penalty fees",
    ],
    icon: Car,
  },
  {
    slug: "asset-investments",
    eyebrow: "Available now",
    title: "Asset Investments",
    summary:
      "Own fractions of income-producing vehicles and receive monthly distributions from leasing income.",
    description:
      "Invest alongside others in a portfolio of leased cars, motorcycles and boats. You hold a real ownership share, and lease income is distributed to owners every month in proportion to that share.",
    href: "/products/asset-investments",
    cta: "Explore investments",
    points: [
      "Fractional ownership from €250 per asset",
      "Monthly distributions from real lease income",
      "Full visibility of every asset in your portfolio",
      "Returns depend on actual asset performance",
    ],
    icon: Coins,
  },
];

/** Vehicle categories financed today — the launch product line. */
export const vehicleCategories = [
  {
    title: "Cars",
    description:
      "New and used passenger cars, from city runabouts to family estates and EVs.",
    icon: Car,
  },
  {
    title: "Motorcycles",
    description: "Motorcycles and scooters for commuting, touring and leisure.",
    icon: Bike,
  },
  {
    title: "Boats",
    description:
      "Sailing boats, sloops and small motor cruisers, including berth-ready vessels.",
    icon: Sailboat,
  },
  {
    title: "Light commercial",
    description:
      "Vans and light commercial vehicles for tradespeople and small businesses.",
    icon: Truck,
  },
];

export const roadmap = [
  { title: "Home Finance", description: "Ethical property finance through co-ownership.", icon: House },
  { title: "Ethical Insurance (Takaful)", description: "Mutual protection built on shared risk.", icon: ShieldCheck },
  { title: "Business Finance", description: "Asset-backed funding for growing companies.", icon: Building2 },
  { title: "Investment Marketplace", description: "A secondary market for ownership shares.", icon: Store },
];

/* -------------------------------------------------------------------------- */
/*  How it works                                                              */
/* -------------------------------------------------------------------------- */

export type Step = {
  number: string;
  title: string;
  description: string;
  icon: typeof Wallet;
};

export const howItWorks: Step[] = [
  {
    number: "01",
    title: "Investors fund real assets",
    description:
      "Investors pool capital to purchase a specific vehicle — a car, motorcycle or boat — that has already been matched to a customer.",
    icon: Wallet,
  },
  {
    number: "02",
    title: "Assets are leased to customers",
    description:
      "The vehicle is leased to the customer on a fixed-term agreement with clear, unchanging monthly payments.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Lease income is generated",
    description:
      "Each month the customer pays their lease instalment. We handle collection, servicing and reporting.",
    icon: ChartLine,
  },
  {
    number: "04",
    title: "Returns are distributed",
    description:
      "Net lease income is distributed to investors in proportion to their ownership share, every month.",
    icon: Landmark,
  },
];

/* -------------------------------------------------------------------------- */
/*  Why choose us                                                             */
/* -------------------------------------------------------------------------- */

export const benefits: Feature[] = [
  {
    title: "Real Ownership",
    description: "Every investment is backed by a tangible, registered asset you can point to.",
    icon: BadgeCheck,
  },
  {
    title: "Transparent Pricing",
    description: "Know exactly where your money goes. Every cost is stated before you sign.",
    icon: ScrollText,
  },
  {
    title: "Shared Success",
    description: "Finance built around partnership rather than interest on debt.",
    icon: HeartHandshake,
  },
  {
    title: "Technology First",
    description: "A modern digital platform with real-time portfolio and payment reporting.",
    icon: Gauge,
  },
  {
    title: "Ethical",
    description: "Built upon internationally recognised Islamic finance principles — open to everyone.",
    icon: Sparkles,
  },
  {
    title: "Secure",
    description: "Strong governance, segregated asset ownership and independent oversight.",
    icon: ShieldCheck,
  },
];

/* -------------------------------------------------------------------------- */
/*  Social proof                                                              */
/* -------------------------------------------------------------------------- */

export const testimonials = [
  {
    quote:
      "I financed my van without a single line of small print I didn't understand. One number, agreed up front, and it never moved.",
    name: "Daniël V.",
    role: "Vehicle finance customer, Rotterdam",
  },
  {
    quote:
      "What convinced me was seeing the actual asset behind my investment — registration, lease term, monthly income. Nothing abstract.",
    name: "Amara O.",
    role: "Investor since 2024",
  },
  {
    quote:
      "It happens to align with my beliefs, but honestly I'd have chosen it anyway. The terms are simply better than my bank's.",
    name: "Sofie B.",
    role: "Motorcycle finance customer, Antwerp",
  },
];

export const stats = [
  { value: 42, suffix: "M", prefix: "€", label: "Assets financed" },
  { value: 3800, suffix: "+", label: "Vehicles on lease" },
  { value: 12, suffix: "K+", label: "Investors and customers" },
  { value: 100, suffix: "%", label: "Asset-backed agreements" },
];

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                       */
/* -------------------------------------------------------------------------- */

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Is this only for Muslims?",
    answer:
      "No. Anyone can use our products. Our financing follows Islamic finance principles, which makes it a genuinely ethical alternative for everyone — regardless of belief.",
  },
  {
    question: "How do investments work?",
    answer:
      "Investors own real assets that generate lease income. You buy a share of a specific vehicle, that vehicle is leased to a customer, and the net lease income is distributed to owners each month in proportion to their share.",
  },
  {
    question: "What makes this different from a normal loan?",
    answer:
      "Traditional finance lends money and charges interest on the debt. We finance and invest through real assets and shared ownership: we buy the asset, you lease it, and ownership transfers over the agreed term.",
  },
  {
    question: "Are returns guaranteed?",
    answer:
      "No. Returns depend on actual asset performance. Lease income can be affected by customer payment behaviour, vehicle downtime and resale values. Your capital is at risk.",
  },
  {
    question: "Which vehicles can I finance?",
    answer:
      "Today we finance cars, motorcycles, boats and light commercial vehicles across the EU. Home finance, business finance and takaful are on our roadmap.",
  },
  {
    question: "What happens if I want to end my agreement early?",
    answer:
      "You can settle early at any point. You pay the outstanding acquisition amount, not a penalty — because there is no interest to unwind.",
  },
  {
    question: "How is my money protected?",
    answer:
      "Assets are held in a ring-fenced structure separate from our operating company, and ownership records are maintained per asset. Independent oversight reviews both our structures and our reporting.",
  },
  {
    question: "How do I get started?",
    answer:
      "Choose a vehicle or an investment, complete a short online application, and our team confirms the structure with you before anything is signed.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Investor dashboard mock data                                              */
/* -------------------------------------------------------------------------- */

export const dashboard = {
  portfolioValue: 48250,
  portfolioChange: 6.4,
  monthlyIncome: 412,
  monthlyChange: 3.1,
  ownedAssets: 14,
  averageOwnership: 8.5,
  performance: [38, 41, 44, 43, 47, 52, 56, 55, 61, 66, 71, 78],
  assets: [
    { name: "Volkswagen ID.4", type: "Car", ownership: 12.5, income: 96, status: "On lease" },
    { name: "Yamaha Tracer 9", type: "Motorcycle", ownership: 22.0, income: 41, status: "On lease" },
    { name: "Beneteau Antares 8", type: "Boat", ownership: 4.2, income: 118, status: "On lease" },
    { name: "Ford Transit Custom", type: "Light commercial", ownership: 9.8, income: 87, status: "On lease" },
  ],
  distributions: [
    { date: "1 Jul 2026", asset: "Volkswagen ID.4", amount: 96 },
    { date: "1 Jul 2026", asset: "Beneteau Antares 8", amount: 118 },
    { date: "1 Jun 2026", asset: "Yamaha Tracer 9", amount: 41 },
    { date: "1 Jun 2026", asset: "Ford Transit Custom", amount: 87 },
  ],
};
