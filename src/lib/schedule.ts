import { example } from "@/lib/content";

export type OwnershipPoint = {
  month: number;
  /** Percentage of the vehicle owned by the customer. */
  customer: number;
  /** Percentage still owned by the SPV. */
  company: number;
};

export type PaymentPoint = {
  month: number;
  /** Rent on the SPV's outstanding share — falls as that share shrinks. */
  rent: number;
  /** Purchase of a slice of the SPV's share — level across the term. */
  equity: number;
  total: number;
};

const { vehiclePrice, companyContribution, termMonths, rentalRate } = example;

/** Constant amount of the SPV's share bought back each month. */
export const monthlyEquity = companyContribution / termMonths;

/**
 * Ownership split at the start of each month, from signing (month 0) to the
 * final buy-out. Linear because the equity instalment is level.
 */
export function ownershipSchedule(): OwnershipPoint[] {
  return Array.from({ length: termMonths + 1 }, (_, month) => {
    const companyValue = companyContribution - monthlyEquity * month;
    const company = (companyValue / vehiclePrice) * 100;
    return { month, company, customer: 100 - company };
  });
}

/** Rent is charged only on the share the customer does not yet own. */
export function paymentFor(month: number): PaymentPoint {
  const outstanding = companyContribution - monthlyEquity * (month - 1);
  const rent = (outstanding * rentalRate) / 12;
  return { month, rent, equity: monthlyEquity, total: rent + monthlyEquity };
}

/** A handful of milestone months, for the payment-composition chart. */
export function paymentMilestones(): PaymentPoint[] {
  return [1, 12, 24, 36, termMonths].map(paymentFor);
}
