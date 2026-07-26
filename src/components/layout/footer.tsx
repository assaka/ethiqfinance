import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";
import { footerNav, siteConfig } from "@/lib/site";

export function Footer() {
  const year = 2026;

  return (
    <footer className="border-t border-line bg-surface-muted">
      <Container size="wide" className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-foreground-muted">
              Ethical, asset-backed finance for everyone. Real assets, transparent
              agreements, shared ownership.
            </p>
            <ul className="mt-6 flex gap-3">
              {siteConfig.social.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex h-9 items-center rounded-full border border-line bg-surface px-3.5 text-xs font-medium text-foreground-muted transition-colors hover:text-foreground hover:border-line-strong"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-semibold text-foreground">{group.title}</h2>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={`${group.title}-${item.href}`}>
                      <Link
                        href={item.href}
                        className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-8">
          <p className="text-xs leading-relaxed text-foreground-subtle">
            {siteConfig.name} provides asset-backed finance and investment products. Capital is
            at risk and returns are not guaranteed — they depend on actual asset performance.
            This website is for information purposes and does not constitute financial advice.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-foreground-subtle">
              © {year} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex gap-5">
              <Link
                href="/legal/privacy"
                className="text-sm text-foreground-subtle transition-colors hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="/legal/terms"
                className="text-sm text-foreground-subtle transition-colors hover:text-foreground"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
