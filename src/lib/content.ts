import {
  BadgeCheck,
  Bike,
  Building2,
  Car,
  ChartLine,
  Coins,
  FileText,
  Gauge,
  Handshake,
  HeartHandshake,
  House,
  Landmark,
  Lock,
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
      "No hidden fees. Clear agreements. Every monthly payment is split into rent and ownership, line by line.",
    icon: ScrollText,
  },
  {
    title: "Asset-Backed",
    description:
      "Every euro buys a real, registered vehicle held by a dedicated Special Purpose Vehicle — never abstract debt.",
    icon: ShieldCheck,
  },
  {
    title: "Ethical",
    description:
      "Genuine co-ownership: we carry ownership risk alongside you for as long as we hold a share.",
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
      "Buy your car, motorcycle or boat together with us — then buy out our share month by month until you own all of it.",
    description:
      "We purchase the vehicle jointly with you. You own your share from day one, we lease you ours, and each monthly payment buys a slice of our share. The payment never changes — but every month more of it becomes ownership and less of it is rent, until you own 100%.",
    href: "/products/vehicle-finance",
    cta: "Learn more",
    points: [
      "Co-ownership from day one — your share is real, not promised",
      "Takaful, road tax and servicing included — one all-in payment",
      "One fixed monthly payment for the entire term",
      "Exit any time by valuation — no interest, no break fee",
    ],
    icon: Car,
  },
  {
    slug: "asset-investments",
    eyebrow: "Available now",
    title: "Asset Investments",
    summary:
      "Fund the vehicles behind those partnerships and share in the rental income they generate.",
    description:
      "Investors fund an SPV that co-owns income-producing vehicles. Rental income from the leased share is distributed to investors monthly, in proportion to their stake — and investors share the ownership risks too.",
    href: "/products/asset-investments",
    cta: "Explore investments",
    points: [
      "Capital is committed to a named vehicle, nothing else",
      "Assets held by a dedicated Special Purpose Vehicle, separate from our balance sheet",
      "Monthly distributions from real rental income",
      "Genuine risk sharing — returns follow the asset, not a promise",
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
    title: "Investors fund the SPV",
    description:
      "Capital is committed to a named vehicle and held by a dedicated Special Purpose Vehicle. It is never used for anything else.",
    icon: Wallet,
  },
  {
    number: "02",
    title: "The vehicle is bought jointly",
    description:
      "The customer contributes their share and the SPV contributes the rest. Both become real co-owners from day one.",
    icon: Handshake,
  },
  {
    number: "03",
    title: "The SPV's share is leased",
    description:
      "The customer pays rent for using the SPV's share, plus an amount that buys a slice of that share each month.",
    icon: FileText,
  },
  {
    number: "04",
    title: "Ownership and income transfer",
    description:
      "Rent is collected by the SPV and distributed to its shareholders each month, alongside the capital they get back as the buy-out proceeds.",
    icon: ChartLine,
  },
];

/* -------------------------------------------------------------------------- */
/*  Capital safeguards — what funds may and may not be used for               */
/* -------------------------------------------------------------------------- */

export const capitalUse = {
  does: [
    "Purchases the specific vehicle it was committed to — and only that vehicle",
    "Sits with the SPV that holds legal title to that asset",
    "Earns rent, paid to the SPV and distributed to its shareholders monthly",
  ],
  never: [
    "Funds our operating costs, salaries or marketing",
    "Is lent out, pooled across the business or reinvested elsewhere",
    "Sits on our own balance sheet or secures our obligations",
  ],
};

export const spvFacts: Feature[] = [
  {
    title: "One purpose, by constitution",
    description:
      "Each SPV exists to do exactly one thing: own and lease its vehicles. It has no other business and takes on no other liabilities.",
    icon: Lock,
  },
  {
    title: "Legally separate",
    description:
      "The SPV sits outside our operating company. The structure is designed so its assets stay with their owners independently of us.",
    icon: Landmark,
  },
  {
    title: "Recorded per asset",
    description:
      "Ownership shares are recorded against a named, registered vehicle — with its purchase price, lease term and income schedule.",
    icon: FileText,
  },
];

/* -------------------------------------------------------------------------- */
/*  Structure — Diminishing Musharakah + Ijarah                               */
/* -------------------------------------------------------------------------- */

/** Worked example used across the structure page and the charts. */
export const example = {
  vehiclePrice: 40000,
  customerContribution: 8000,
  customerShare: 20,
  companyContribution: 32000,
  companyShare: 80,
  termMonths: 48,
  /** Annual rental rate applied to the SPV's outstanding share value. */
  rentalRate: 0.0625,
  /**
   * Annual running cost carried by the owners — takaful, road tax, servicing,
   * tyres and inspection. Funded by the service component of the payment, so
   * the customer is never billed for it separately.
   */
  annualRunningCost: 2885,
  /** Share of rent Ethiq retains as a management fee for servicing the SPV. */
  managementFee: 0.2,
  /**
   * Illustrative retained value of a mainstream car, as a fraction of its
   * purchase price. Used only to show what an early exit recovers — resale
   * values vary by model, mileage and condition.
   */
  depreciationCurve: [
    { month: 0, retained: 1.0 },
    { month: 12, retained: 0.75 },
    { month: 24, retained: 0.61 },
    { month: 36, retained: 0.51 },
    { month: 48, retained: 0.44 },
  ],
};

export const structureStages = [
  {
    number: "01",
    name: "Form the partnership",
    arabic: "Musharakah",
    description:
      "You and the SPV buy the vehicle together. On a €40,000 car, a €8,000 contribution makes you a 20% owner and the SPV an 80% owner. Both shares are real and proportional.",
    icon: Handshake,
  },
  {
    number: "02",
    name: "Lease our share",
    arabic: "Ijarah",
    description:
      "Because you use the whole vehicle, the SPV leases its share to you. You pay rent for the portion you don't yet own — and only for that portion.",
    icon: FileText,
  },
  {
    number: "03",
    name: "Buy it out, month by month",
    arabic: "Musharakah Mutanaqisah",
    description:
      "Alongside the rent, each payment buys a slice of the SPV's share. You pay the same amount every month — but the share of it going to ownership grows, until you own 100%.",
    icon: BadgeCheck,
  },
];

/**
 * Who carries which cost or risk, and why.
 *
 * Running and ownership expenses both sit with the owners, funded by the
 * service component of the payment. Only the costs the driver personally
 * creates — fuel, fines, misuse — fall outside the fixed monthly amount.
 */
export const riskAllocation = [
  {
    item: "Total loss or write-off",
    bearer: "shared" as const,
    detail: "Borne by the owners in proportion to their shares at the time, backed by takaful cover.",
  },
  {
    item: "Manufacturing or structural defects",
    bearer: "shared" as const,
    detail: "An ownership risk, so it follows ownership shares — never pushed onto the customer.",
  },
  {
    item: "Depreciation over the term",
    bearer: "shared" as const,
    detail: "We hold a real share, so we absorb our proportion of the fall in value.",
  },
  {
    item: "Major structural repair",
    bearer: "shared" as const,
    detail: "Faults in the asset itself, as opposed to wear from use, remain with the owners.",
  },
  {
    item: "Takaful / insurance cover",
    bearer: "shared" as const,
    detail: "An ownership expense, arranged by us at fleet rates and covered by your service component.",
  },
  {
    item: "Servicing, maintenance and tyres",
    bearer: "shared" as const,
    detail: "A running expense of the asset, so the owners carry it — never billed on top of your payment.",
  },
  {
    item: "Road tax and periodic inspection",
    bearer: "shared" as const,
    detail: "Attached to the vehicle rather than the driver, so it follows ownership.",
  },
  {
    item: "Fuel, charging and consumables",
    bearer: "customer" as const,
    detail: "Created by use rather than by ownership — you buy the fuel you burn.",
  },
  {
    item: "Traffic fines and penalties",
    bearer: "customer" as const,
    detail: "Attached to the driver, never to the owners.",
  },
  {
    item: "Damage through negligence or misuse",
    bearer: "customer" as const,
    detail: "Ownership risk covers ordinary wear, not avoidable harm.",
  },
];

/**
 * Worked scenarios. Every figure on the site is computed from these terms by
 * `lib/schedule.ts` — nothing is typed in by hand, so the numbers stay
 * internally consistent if the rate or a term changes.
 */
export type CustomerScenario = {
  name: string;
  vehicle: string;
  category: string;
  price: number;
  customerShare: number;
  termMonths: number;
  /** Annual running cost of this vehicle, carried by the owners. */
  runningCost: number;
  note: string;
  icon: typeof Car;
};

export const customerScenarios: CustomerScenario[] = [
  {
    name: "Yasmin, Utrecht",
    vehicle: "Volkswagen Golf, 3 years old",
    category: "Car",
    price: 18000,
    customerShare: 20,
    termMonths: 36,
    runningCost: 1950,
    note: "Wanted a reliable commuter car without a loan hanging over her.",
    icon: Car,
  },
  {
    name: "Marek, Antwerp",
    vehicle: "Yamaha Tracer 9",
    category: "Motorcycle",
    price: 9500,
    customerShare: 20,
    termMonths: 24,
    runningCost: 1020,
    note: "Short term, small ticket — owns it outright in two years.",
    icon: Bike,
  },
  {
    name: "Tom & Ilse, Friesland",
    vehicle: "Beneteau Antares 8",
    category: "Boat",
    price: 65000,
    customerShare: 25,
    termMonths: 60,
    runningCost: 5000,
    note: "A larger contribution up front to keep the monthly payment down.",
    icon: Sailboat,
  },
  {
    name: "De Vries Installaties",
    vehicle: "Ford Transit Custom",
    category: "Light commercial",
    price: 34000,
    customerShare: 20,
    termMonths: 48,
    runningCost: 2400,
    note: "A working van for a two-person plumbing business.",
    icon: Truck,
  },
];

export type InvestorScenario = {
  label: string;
  amount: number;
  /** Index into `customerScenarios` — the asset being funded. */
  asset: number;
  note: string;
};

export const investorScenarios: InvestorScenario[] = [
  {
    label: "Testing the water",
    amount: 1000,
    asset: 1,
    note: "A short 24-month asset returns capital quickly, which suits a first investment.",
  },
  {
    label: "A single car",
    amount: 5000,
    asset: 3,
    note: "A four-year van lease, with income and capital arriving every month.",
  },
  {
    label: "A larger stake",
    amount: 10000,
    asset: 2,
    note: "The longest term on offer, so income continues for five years.",
  },
];

/**
 * Where the customer's payment actually goes. Rent accrues to the SPV because
 * the SPV owns the asset; Ethiq is its agent and is paid a separate,
 * disclosed fee for the servicing work.
 */
export const moneyFlow = [
  {
    title: "You pay the SPV",
    description:
      "Your fixed monthly payment goes to the SPV that co-owns your vehicle, into a segregated collection account. We operate that account as the SPV's agent — the money is never ours.",
    icon: Wallet,
    tone: "accent" as const,
  },
  {
    title: "The SPV pays its shareholders",
    description:
      "The rent portion is distributed to investors as income. The ownership portion returns their capital as your share of the vehicle grows.",
    icon: Coins,
    tone: "accent" as const,
  },
  {
    title: "The SPV pays us a fee",
    description:
      "Ethiq earns a disclosed management fee from the SPV for arranging, servicing and reporting — a share of the rent, never a charge added on top of your payment.",
    icon: Landmark,
    tone: "neutral" as const,
  },
];

export const earlyExit = [
  "The vehicle is independently valued using the method agreed at the start.",
  "Either it is sold, or one party buys out the other's share at that valuation.",
  "Proceeds are distributed strictly according to ownership shares at that moment.",
  "There is no break fee and no penalty interest — there is no interest to unwind.",
];

export const contracts = [
  { title: "Musharakah agreement", description: "Establishes the co-ownership and each party's share." },
  { title: "Vehicle purchase agreement", description: "The joint acquisition of the asset itself." },
  { title: "Ijarah (lease) agreement", description: "Covers the lease of the SPV's share to the customer." },
  { title: "Undertaking to purchase", description: "A unilateral promise to acquire the remaining shares over the term." },
  { title: "Service and maintenance agreement", description: "Sets out who does what to keep the vehicle roadworthy." },
  { title: "Takaful arrangements", description: "Mutual cover for the asset, arranged for the owners." },
  { title: "Default and dispute procedure", description: "Remedies based on valuation and sale, never punitive interest." },
];

/** How the fleet itself is funded — no interest-bearing borrowing. */
export const fundingSources = [
  { title: "Equity investors", description: "Long-term capital that shares in the profits and the risks of the business." },
  { title: "Musharakah investors", description: "Partners funding specific assets and sharing the income they produce." },
  { title: "Profit-sharing accounts", description: "Deposits that participate in returns rather than earning interest." },
  { title: "Sukuk", description: "Asset-backed certificates, at the scale where they make sense.", soon: true },
];

/* -------------------------------------------------------------------------- */
/*  Why choose us                                                             */
/* -------------------------------------------------------------------------- */

export const benefits: Feature[] = [
  {
    title: "Real Ownership",
    description: "You hold a genuine share in a registered vehicle from the first payment.",
    icon: BadgeCheck,
  },
  {
    title: "Transparent Pricing",
    description: "Every payment is split into rent and ownership, so you always know what you bought.",
    icon: ScrollText,
  },
  {
    title: "Shared Risk",
    description: "We co-own the asset, so we carry ownership risk proportionally — not just the upside.",
    icon: HeartHandshake,
  },
  {
    title: "Technology First",
    description: "A modern platform showing your ownership percentage and payments in real time.",
    icon: Gauge,
  },
  {
    title: "Ethical",
    description: "Built on diminishing Musharakah and Ijarah — recognised structures, open to everyone.",
    icon: Sparkles,
  },
  {
    title: "Ring-Fenced",
    description: "Assets sit in dedicated Special Purpose Vehicles and funds buy vehicles — nothing else, ever.",
    icon: Lock,
  },
];

/* -------------------------------------------------------------------------- */
/*  Social proof                                                              */
/* -------------------------------------------------------------------------- */

export const testimonials = [
  {
    quote:
      "I could see my ownership percentage go up every month. That's a very different feeling from watching a loan balance go down.",
    name: "Daniël V.",
    role: "Vehicle finance customer, Rotterdam",
  },
  {
    quote:
      "What convinced me was the separation. My money bought a named vehicle held by its own entity — not a line on someone's balance sheet.",
    name: "Amara O.",
    role: "Investor since 2024",
  },
  {
    quote:
      "Same amount out of my account every month, but the share of it buying the bike kept growing. I could watch it happen.",
    name: "Sofie B.",
    role: "Motorcycle finance customer, Antwerp",
  },
];

export const stats = [
  { value: 42, suffix: "M", prefix: "€", label: "Assets financed" },
  { value: 3800, suffix: "+", label: "Vehicles co-owned" },
  { value: 12, suffix: "K+", label: "Investors and customers" },
  { value: 100, suffix: "%", label: "Of funds used to buy vehicles" },
];

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                       */
/* -------------------------------------------------------------------------- */

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Is this only for Muslims?",
    answer:
      "No. Anyone can use our products. The structure follows Islamic finance principles, which makes it a genuinely ethical alternative for everyone — regardless of belief.",
  },
  {
    question: "What can my money be used for?",
    answer:
      "One thing only: purchasing vehicles for lease. Funds are never used for our operating costs, never lent out, never pooled across the business and never reinvested elsewhere. Each vehicle is owned by a dedicated Special Purpose Vehicle whose only activity is holding and leasing that asset.",
  },
  {
    question: "What is an SPV and why does it matter?",
    answer:
      "A special purpose vehicle is a separate legal entity constituted to do exactly one thing — here, to own and lease specific vehicles. Because it is separate from our operating company and carries no other liabilities, the structure is designed so the assets stay with their owners independently of us.",
  },
  {
    question: "How does the financing actually work?",
    answer:
      "Through diminishing Musharakah combined with Ijarah. You and the SPV buy the vehicle together, so you are a real co-owner from day one. The SPV leases you its share, and each monthly payment covers rent for that share plus the purchase of a slice of it. As the SPV's share shrinks, the rent shrinks with it, until you own 100%.",
  },
  {
    question: "What is in my monthly payment?",
    answer:
      "The total is fixed for the whole term, and inside it sit two separately accounted components: rent for the share you do not yet own, and a payment that buys more of that share. As your ownership grows there is less left to rent, so month by month less of the same payment is rent and more of it is ownership.",
  },
  {
    question: "Do you share the risk, or just the profit?",
    answer:
      "Both. Because we hold a real ownership share, we carry ownership risks in proportion to it — total loss, structural defects and depreciation while we co-own. You remain responsible for negligence, misuse, fines, fuel and routine running costs.",
  },
  {
    question: "What happens if I want to exit early?",
    answer:
      "The vehicle is valued using the method agreed at the outset. It is either sold or one party buys out the other's share, and proceeds are distributed according to ownership shares at that moment. No break fee, no penalty interest.",
  },
  {
    question: "How do investments generate a return?",
    answer:
      "Investors fund an SPV that co-owns vehicles. The rent paid on the SPV's share is distributed monthly in proportion to each investor's stake. Because rent tracks a shrinking ownership share, income from a single asset declines across its term.",
  },
  {
    question: "Are returns guaranteed?",
    answer:
      "No. Returns depend on actual asset performance and your capital is at risk. Rental income can be affected by customer payment behaviour, vehicle downtime, depreciation and resale values.",
  },
  {
    question: "Which vehicles can I finance?",
    answer:
      "Today we finance cars, motorcycles, boats and light commercial vehicles across the EU. Home finance, business finance and takaful are on our roadmap.",
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
