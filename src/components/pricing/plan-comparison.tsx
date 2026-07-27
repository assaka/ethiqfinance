import { Check, Minus } from "lucide-react";
import { Card, Badge } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { plans, example } from "@/lib/content";
import { defaultTerms, financePayment, monthlyPayment, serviceCharge } from "@/lib/schedule";
import { formatCurrency } from "@/lib/utils";

const euro = (n: number) => formatCurrency(Math.round(n));

/**
 * The two plans side by side, priced on the standard worked example.
 * Both end in full ownership — the difference is only whether running costs
 * are bundled into the fixed payment or arranged by the customer.
 */
export function PlanComparison() {
  const finance = financePayment(defaultTerms);
  const allIn = monthlyPayment(defaultTerms);
  const service = serviceCharge(defaultTerms);
  const deposit = (example.vehiclePrice * example.customerShare) / 100;
  const months = example.termMonths;

  const monthlyFor = (id: string) => (id === "essential" ? finance : allIn);
  const totalFor = (id: string) => deposit + monthlyFor(id) * months;

  return (
    <>
      <ul className="grid gap-6 lg:grid-cols-2">
        {plans.map((plan, i) => {
          const monthly = monthlyFor(plan.id);
          const recommended = "recommended" in plan && plan.recommended;

          return (
            <Reveal as="li" key={plan.id} index={i} className="h-full">
              <Card
                className={
                  "flex h-full flex-col " + (recommended ? "border-accent/45 shadow-lift" : "")
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                    <p className="mt-1 text-sm text-foreground-subtle">{plan.tagline}</p>
                  </div>
                  {recommended ? <Badge>Most popular</Badge> : null}
                </div>

                <p className="mt-5 text-[0.9375rem] leading-relaxed text-foreground-muted">
                  {plan.description}
                </p>

                <div className="mt-7 rounded-2xl border border-line bg-surface-muted p-6">
                  <span className="tabular block text-4xl font-semibold tracking-tight">
                    {euro(monthly)}
                  </span>
                  <span className="mt-1.5 block text-sm text-foreground-subtle">
                    per month, fixed for all {months} months
                  </span>
                  {plan.id === "complete" ? (
                    <span className="mt-3 block text-xs text-foreground-subtle">
                      Includes {euro(service)} a month of running costs
                    </span>
                  ) : (
                    <span className="mt-3 block text-xs text-foreground-subtle">
                      Running costs are yours — budget roughly {euro(service)} a month
                    </span>
                  )}
                </div>

                <div className="mt-7">
                  <h4 className="text-sm font-semibold">What&apos;s included</h4>
                  <ul className="mt-3.5 space-y-2.5">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong"
                          aria-hidden="true"
                        />
                        <span className="text-[0.9375rem] text-foreground-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-semibold">You take care of</h4>
                  <ul className="mt-3.5 space-y-2.5">
                    {plan.yourResponsibility.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Minus
                          className="mt-0.5 h-4 w-4 shrink-0 text-foreground-subtle"
                          aria-hidden="true"
                        />
                        <span className="text-[0.9375rem] text-foreground-subtle">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-7 border-t border-line pt-5 text-sm leading-relaxed text-foreground-muted">
                  <strong className="font-semibold text-foreground">Best for:</strong>{" "}
                  {plan.bestFor}
                </p>
              </Card>
            </Reveal>
          );
        })}
      </ul>

      {/* The point most people miss: the totals are the same. */}
      <Reveal className="mt-8">
        <Card>
          <h3 className="text-lg font-semibold">
            What you pay in total, by the end of the {months} months
          </h3>
          <p className="mt-2 text-[0.9375rem] text-foreground-muted">
            On a {euro(example.vehiclePrice)} vehicle with a {euro(deposit)} contribution. Both
            routes finish with the vehicle fully yours.
          </p>

          <div className="mt-7 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <caption className="sr-only">
                Total cost of each plan across the full term, including running costs
              </caption>
              <thead>
                <tr className="border-b border-line bg-surface-muted">
                  <th scope="col" className="px-5 py-4 text-sm font-semibold">&nbsp;</th>
                  <th scope="col" className="px-5 py-4 text-right text-sm font-semibold">
                    Essential
                  </th>
                  <th scope="col" className="px-5 py-4 text-right text-sm font-semibold">
                    Complete
                  </th>
                </tr>
              </thead>
              <tbody>
                <Row
                  label="Your contribution"
                  a={euro(deposit)}
                  b={euro(deposit)}
                  note="Buys your opening ownership share"
                />
                <Row
                  label={`${months} monthly payments`}
                  a={euro(finance * months)}
                  b={euro(allIn * months)}
                />
                <Row
                  label="Running costs you pay separately"
                  a={euro(service * months)}
                  b="Included"
                  note="Insurance, road tax, servicing, tyres"
                />
                <tr className="border-t-2 border-line-strong bg-surface-muted">
                  <th scope="row" className="px-5 py-4 text-sm font-semibold">
                    Total cost of ownership
                  </th>
                  <td className="tabular px-5 py-4 text-right text-base font-semibold">
                    {euro(deposit + finance * months + service * months)}
                  </td>
                  <td className="tabular px-5 py-4 text-right text-base font-semibold text-accent-strong">
                    {euro(totalFor("complete"))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 rounded-xl bg-accent-soft p-5 text-[0.9375rem] leading-relaxed text-foreground-muted">
            <strong className="font-semibold text-foreground">
              The totals are the same — that&apos;s the point.
            </strong>{" "}
            Complete isn&apos;t a more expensive plan, it&apos;s the same money with the admin
            removed and the price fixed. What you&apos;re really choosing is who handles the
            paperwork, and who absorbs it when the repair bill is bigger than expected.
          </p>

          <p className="mt-5 text-sm leading-relaxed text-foreground-subtle">
            Running-cost figures are estimates for a vehicle of this value and will differ for
            your own. On Essential your actual costs could land above or below the figure shown;
            on Complete they are fixed for the whole term whatever happens.
          </p>
        </Card>
      </Reveal>
    </>
  );
}

function Row({ label, a, b, note }: { label: string; a: string; b: string; note?: string }) {
  return (
    <tr className="border-b border-line">
      <th scope="row" className="px-5 py-4 text-sm font-medium">
        {label}
        {note ? (
          <span className="mt-0.5 block text-xs font-normal text-foreground-subtle">{note}</span>
        ) : null}
      </th>
      <td className="tabular px-5 py-4 text-right text-sm text-foreground-muted">{a}</td>
      <td className="tabular px-5 py-4 text-right text-sm text-foreground-muted">{b}</td>
    </tr>
  );
}
