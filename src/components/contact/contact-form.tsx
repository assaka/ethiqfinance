"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

type Interest = "vehicle-finance" | "investing" | "other";

const interests: { value: Interest; label: string }[] = [
  { value: "vehicle-finance", label: "Financing a vehicle" },
  { value: "investing", label: "Investing in assets" },
  { value: "other", label: "Something else" },
];

const fieldClass =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-[0.9375rem] text-foreground " +
  "placeholder:text-foreground-subtle transition-colors focus:border-accent-strong";

const labelClass = "block text-sm font-medium text-foreground";

/**
 * The site is statically exported, so there is no server to post to yet.
 * The form validates in the browser and hands a pre-filled message to the
 * visitor's mail client. Swap `handleSubmit` for a fetch() when the API lands.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const interest =
      interests.find((i) => i.value === data.get("interest"))?.label ?? "General enquiry";

    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Interested in: ${interest}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");

    window.location.href =
      `mailto:${siteConfig.contact.email}` +
      `?subject=${encodeURIComponent(`Enquiry — ${interest}`)}` +
      `&body=${encodeURIComponent(body)}`;

    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={`mt-2 ${fieldClass}`}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={`mt-2 ${fieldClass}`}
          />
        </div>
      </div>

      <fieldset>
        <legend className={labelClass}>I&apos;m interested in</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {interests.map((interest, i) => (
            <label
              key={interest.value}
              className="cursor-pointer rounded-full border border-line px-4 py-2 text-sm text-foreground-muted transition-colors has-[:checked]:border-accent-strong has-[:checked]:bg-accent-soft has-[:checked]:text-accent-strong has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-strong"
            >
              <input
                type="radio"
                name="interest"
                value={interest.value}
                defaultChecked={i === 0}
                className="sr-only"
              />
              {interest.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className={labelClass} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us what you're looking for — the vehicle, the amount, or the questions you have."
          className={`mt-2 resize-y ${fieldClass}`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg">
          Send message
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
        <p aria-live="polite" className="text-sm text-foreground-subtle">
          {sent
            ? "Your email app should now be open with the message ready to send."
            : "We reply within one business day."}
        </p>
      </div>
    </form>
  );
}
