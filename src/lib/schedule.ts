import { example } from "@/lib/content";

export type Terms = {
  /** Purchase price of the vehicle. */
  price: number;
  /** The customer's opening ownership share, as a percentage. */
  customerShare: number;
  termMonths: number;
  /** Annual rental rate applied to the SPV's outstanding share. */
  rate: number;
};

export const defaultTerms: Terms = {
  price: example.vehiclePrice,
  customerShare: example.customerShare,
  termMonths: example.termMonths,
  rate: example.rentalRate,
};

/** The SPV's opening contribution — the part the customer buys out. */
export const spvStake = (t: Terms) => t.price * (1 - t.customerShare / 100);

/**
 * The customer pays one fixed amount every month. Inside it, rent is charged
 * on the SPV's outstanding share and the remainder buys that share down — so
 * the total never moves, but the split shifts steadily towards ownership.
 * This is a level-payment (annuity) schedule.
 */
export function monthlyPayment(t: Terms = defaultTerms): number {
  const r = t.rate / 12;
  return (spvStake(t) * r) / (1 - Math.pow(1 + r, -t.termMonths));
}

export type ScheduleRow = {
  month: number;
  /** Rent on the share the customer does not yet own. */
  rent: number;
  /** The part of the payment that buys ownership. */
  equity: number;
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
  const payment = monthlyPayment(t);
  const rows: ScheduleRow[] = [];
  let balance = spvStake(t);

  for (let month = 1; month <= t.termMonths; month++) {
    const rent = balance * r;
    // Absorb floating-point drift into the final instalment.
    const equity = month === t.termMonths ? balance : payment - rent;
    balance = Math.max(0, balance - equity);

    rows.push({
      month,
      rent,
      equity,
      total: rent + equity,
      balance,
      customerPct: 100 - (balance / t.price) * 100,
    });
  }

  return rows;
}

/** Total rent paid across the term — the gross income the asset produces. */
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
