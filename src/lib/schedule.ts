import { example } from "@/lib/content";

export type Terms = {
  /** Purchase price of the vehicle. */
  price: number;
  /** The customer's opening ownership share, as a percentage. */
  customerShare: number;
  termMonths: number;
  /** Annual rental rate applied to the SPV's outstanding share. */
  rate: number;
  /**
   * Annual running cost of the vehicle — takaful, road tax, servicing,
   * tyres and inspection. These are ownership expenses, so the owners carry
   * them; the customer funds them through the service component of the
   * monthly payment rather than being billed separately.
   */
  runningCost: number;
};

export const defaultTerms: Terms = {
  price: example.vehiclePrice,
  customerShare: example.customerShare,
  termMonths: example.termMonths,
  rate: example.rentalRate,
  runningCost: example.annualRunningCost,
};

/** The SPV's opening contribution — the part the customer buys out. */
export const spvStake = (t: Terms) => t.price * (1 - t.customerShare / 100);

/** Flat monthly charge covering the running costs of the vehicle. */
export const serviceCharge = (t: Terms) => t.runningCost / 12;

/** Capital + rent portion only, before the service charge. */
export function financePayment(t: Terms = defaultTerms): number {
  const r = t.rate / 12;
  return (spvStake(t) * r) / (1 - Math.pow(1 + r, -t.termMonths));
}

/**
 * What the customer actually pays each month — one fixed, all-in amount.
 * It never changes across the term. Inside it, rent shrinks as the SPV's
 * share is bought down, the ownership portion grows to fill the gap, and
 * the service charge stays flat.
 */
export function monthlyPayment(t: Terms = defaultTerms): number {
  return financePayment(t) + serviceCharge(t);
}

export type ScheduleRow = {
  month: number;
  /** Rent on the share the customer does not yet own. */
  rent: number;
  /** The part of the payment that buys ownership. */
  equity: number;
  /** Running costs of the vehicle, carried by the owners. */
  service: number;
  /** Fixed across the term. */
  total: number;
  /** Value of the SPV's share remaining after this payment. */
  balance: number;
  /** Percentage of the vehicle owned by the customer after this payment. */
  customerPct: number;
};

/** Full month-by-month schedule for a given set of terms. */
export function schedule(t: Terms = defaultTerms): ScheduleRow[] {
  const r = t.rate / 12;
  const finance = financePayment(t);
  const service = serviceCharge(t);
  const rows: ScheduleRow[] = [];
  let balance = spvStake(t);

  for (let month = 1; month <= t.termMonths; month++) {
    const rent = balance * r;
    // Absorb floating-point drift into the final instalment.
    const equity = month === t.termMonths ? balance : finance - rent;
    balance = Math.max(0, balance - equity);

    rows.push({
      month,
      rent,
      equity,
      service,
      total: rent + equity + service,
      balance,
      customerPct: 100 - (balance / t.price) * 100,
    });
  }

  return rows;
}

/**
 * Total rent across the term — the gross income the asset produces.
 * Excludes the service charge, which is a cost pass-through, not profit.
 */
export function totalRent(t: Terms = defaultTerms): number {
  return schedule(t).reduce((sum, row) => sum + row.rent, 0);
}

export type OwnershipPoint = { month: number; customer: number; company: number };

/** Ownership split from signing (month 0) through to the final buy-out. */
export function ownershipSchedule(t: Terms = defaultTerms): OwnershipPoint[] {
  return [
    { month: 0, customer: t.customerShare, company: 100 - t.customerShare },
    ...schedule(t).map((row) => ({
      month: row.month,
      customer: row.customerPct,
      company: 100 - row.customerPct,
    })),
  ];
}

/** Milestone months used by the payment-composition chart. */
export function paymentMilestones(t: Terms = defaultTerms): ScheduleRow[] {
  const rows = schedule(t);
  return [1, 12, 24, 36, t.termMonths]
    .filter((m) => m <= t.termMonths)
    .map((m) => rows[m - 1]);
}

/* -------------------------------------------------------------------------- */
/*  Investor projections                                                      */
/* -------------------------------------------------------------------------- */

/** The rate reaching investors once the management fee is taken from rent. */
export function netInvestorRate(t: Terms = defaultTerms): number {
  return t.rate * (1 - example.managementFee);
}

export type WealthPoint = {
  month: number;
  /** Capital returned each month sits idle — income comes from one asset only. */
  idle: number;
  /** Returned capital is redeployed; income is taken as cash. */
  redeployed: number;
  /** Both capital and income are redeployed, so the balance compounds. */
  compounded: number;
};

/**
 * What €1,000 does over the term under three reinvestment behaviours.
 * The point of the comparison: capital comes back monthly, so leaving it idle
 * roughly halves the return — the headline rate assumes it stays at work.
 */
export function wealthPaths(amount = 1000, t: Terms = defaultTerms): WealthPoint[] {
  const rows = schedule(t);
  const stake = amount / spvStake(t);
  const net = netInvestorRate(t);
  const monthly = net / 12;

  let idleIncome = 0;
  const points: WealthPoint[] = [{ month: 0, idle: amount, redeployed: amount, compounded: amount }];

  rows.forEach((row, i) => {
    const month = i + 1;
    idleIncome += row.rent * (1 - example.managementFee) * stake;
    points.push({
      month,
      idle: amount + idleIncome,
      redeployed: amount + amount * monthly * month,
      compounded: amount * Math.pow(1 + monthly, month),
    });
  });

  return points;
}

/**
 * On an early exit the vehicle is sold and proceeds split by ownership share.
 * Because each owner's share equals their outstanding capital divided by the
 * original price, both sides recover exactly the vehicle's retained-value
 * percentage — the loss is shared, never transferred to the customer.
 */
export function earlyExitRecovery(t: Terms = defaultTerms) {
  const rows = schedule(t);
  return example.depreciationCurve.map(({ month, retained }) => {
    const balance = month === 0 ? spvStake(t) : rows[month - 1].balance;
    return {
      month,
      retained,
      vehicleValue: t.price * retained,
      outstanding: balance,
      recovered: balance * retained,
      shortfall: balance * (1 - retained),
    };
  });
}
