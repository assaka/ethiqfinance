# Ethiq Finance

Marketing site for an ethical, asset-backed finance platform. The launch product is
vehicle leasing — cars, motorcycles, boats and light commercial vehicles — alongside
fractional investment in those same income-producing assets.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion and Lucide
icons. The site is statically exported, so it can be hosted on GitHub Pages, S3, Netlify
or any static host.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
npm run lint
```

## Project structure

```
src/
  app/                     routes (App Router) — one folder per page
    products/              vehicle-finance, asset-investments
    legal/                 privacy, terms
    sitemap.ts robots.ts   generated at build time
  components/
    layout/                navbar, footer, logo, theme toggle, page shells
    home/                  homepage sections (hero, how it works, dashboard, …)
    contact/               contact form
    ui/                    primitives: button, card, section, accordion, reveal, …
  lib/
    site.ts                site metadata + navigation (single source of truth)
    content.ts             all page copy and mock data
    utils.ts               helpers
```

Copy and navigation live in `src/lib`, so adding a product means adding an entry there
and a route folder — the header, footer and sitemap pick it up automatically.

## Design system

Tokens are CSS custom properties in `src/app/globals.css`, exposed to Tailwind through
`@theme inline`. Both themes are authored explicitly rather than auto-inverted:

| Token | Light | Dark |
|---|---|---|
| Background | `#ffffff` | `#060b16` |
| Foreground | `#0f172a` (navy) | `#f1f5f9` |
| Accent (fills) | `#10b981` emerald | `#10b981` |
| Accent (text) | `#047857` | `#34d399` |

Accent text uses a darker/lighter step than accent fills so text contrast clears WCAG AA
on both surfaces. Dark mode is class-driven (`.dark` on `<html>`), set before first paint
by a small inline script and remembered in `localStorage`.

Motion is centralised in `components/ui/reveal.tsx` and `animated-number.tsx`, and every
animation degrades to a no-op under `prefers-reduced-motion`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the export and
publishes it to GitHub Pages. Enable it once under **Settings → Pages → Source →
GitHub Actions**.

For a project page the assets live under `/<repo>`, so the workflow sets:

- `NEXT_PUBLIC_BASE_PATH` — path prefix, e.g. `/ethiqfinance`
- `NEXT_PUBLIC_SITE_URL` — absolute URL used for canonical tags and the sitemap

For a custom domain, drop both variables (and add a `CNAME` file to `public/`); the site
then builds at the domain root.

## Roadmap hooks

The architecture leaves room for the products listed as "coming soon": add a route under
`app/products/`, an entry in `lib/content.ts`, and — for authenticated areas such as an
investor portal or admin dashboard — a route group alongside the marketing pages.

## Content disclaimer

Figures in the investor dashboard preview, the statistics band and the testimonials are
illustrative placeholders for design purposes. Replace them with real, verifiable data
before the site goes live.
