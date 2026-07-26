import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container size="wide" className="py-28 text-center sm:py-36">
      <p className="text-eyebrow text-accent-strong">404</p>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
        This page isn&apos;t here.
      </h1>
      <p className="mx-auto mt-5 max-w-md text-lg text-foreground-muted">
        The link may be out of date, or the page may have moved. Here&apos;s the way back.
      </p>

      <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
        <Button href="/" size="lg">
          Back to home
        </Button>
        <Button href="/contact" size="lg" variant="secondary">
          Contact us
        </Button>
      </div>

      <nav aria-label="Suggested pages" className="mt-14">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-foreground-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}
