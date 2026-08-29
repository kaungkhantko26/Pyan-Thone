# Pyan Thone

Trusted second-hand marketplace — a responsive, installable **PWA** built from the Figma design
(`R7N4mZjwxY4nX3wwW9lXUX`) using Next.js (App Router) + Tailwind CSS.

**Live (Vercel):** https://pyan-thone-sigma.vercel.app
**Live (GitHub Pages):** https://kaungkhantko26.github.io/Pyan-Thone/

## Flows & screens

| Area | Screens |
| --- | --- |
| **Buyer** | Login · Sign up · Choose role · Phone OTP · Marketplace · Product detail · Seller profile · Chat & offer · Checkout · Delivery tracking |
| **Seller** | Login · Sign up · Seller setup · Identity verification · Phone OTP · Dashboard · Seller profile · Chat & offer · Listing preview |
| **Admin** | Admin login · Console · Chat review · Email composer · Ban review |

## Interactivity

- Category filter + price sort on the marketplace
- Product gallery picker, add-to-cart (persisted in `localStorage`) feeding a 3-step checkout
- OTP entry with auto-advance, offer accept/reject, seller in-chat price updates
- Admin: row selection, tab filters, email/ban flows with confirmation states
- Mobile nav, responsive layouts down to 360px

## PWA

- `public/manifest.webmanifest` + generated icons (`scripts/generate-icons.mjs`)
- `public/sw.js` — network-first navigation, cache-first assets, offline app-shell fallback

## Develop

```bash
npm install
npm run dev
```

## Build (static export)

```bash
npm run build   # outputs ./out
```

`next.config.mjs` always uses `output: "export"`. The `/Pyan-Thone` base path and
`assetPrefix` are only applied when `GITHUB_PAGES=true` (set by `.github/workflows/deploy.yml`),
so the two targets stay in sync:

- **Vercel** — project `pyan-thone` linked to this repo; every push to `main` deploys to
  production at the domain root. No base path.
- **GitHub Pages** — `.github/workflows/deploy.yml` builds with `GITHUB_PAGES=true` and
  publishes to `/Pyan-Thone/` (enable **Settings → Pages → Source: GitHub Actions**).

## Design tokens

Pulled from Figma variables into `tailwind.config.ts` / `app/globals.css`:
action `#2563eb`, ink `#171a1f`, page `#f8f8f5`, trust `#168a55`, warning `#d68a00`;
radii 10/12/16; subtle shadow `0 2px 8px rgba(23,26,31,.06)`.
