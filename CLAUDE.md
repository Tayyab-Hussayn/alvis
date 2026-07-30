# CLAUDE.md

## Project overview
Alvis agency website. Next.js 14 App Router, TypeScript, Tailwind CSS v3.
Deployed to Namecheap cPanel via a custom Node.js server (`server.js`), not Vercel.

## Commands
```
npm run dev      # next dev
npm run build    # next build
npm run lint     # next lint
npm run serve    # NODE_ENV=production node server.js  ← cPanel deploy, not npm start
```

## Architecture
- **Routing:** `app/` directory. Each route is a `page.tsx`. Root layout: `app/layout.tsx`.
- **Home sections:** `components/sections/home/` — one file per section, all `'use client'`.
- **Other page sections:** `components/sections/{about,blog,contact,case-studies,services}/`.
- **UI primitives:** `components/ui/` — Button, Badge, Container, SectionLabel, CustomCursor.
- **Layout:** `components/layout/` — Header, Footer, MobileMenu. Footer is in root layout, not pages.
- **Static data:** `data/` — blogPosts.ts, caseStudies.ts, services.ts, team.ts, testimonials.ts.
- **Design tokens:** defined as CSS vars in `styles/globals.css` `:root`, consumed by `tailwind.config.ts`.
- **Fonts:** loaded via `next/font/google` in `lib/fonts.ts`, injected as `--font-display/body/mono` vars.
- **Contact API:** `app/api/contact/route.ts` (nodemailer). No other API routes.
- **No global state.** All state is local React or URL params.

## Design system

### Color tokens (`styles/globals.css` → `tailwind.config.ts`)
| Token | Hex | Tailwind class |
|---|---|---|
| bg | `#F9F9F7` | `bg-bg` |
| surface | `#FFFFFF` | `bg-surface` |
| subtle | `#F2F2F0` | `bg-subtle` |
| text | `#0D0D0D` | `text-text` / `bg-text` |
| text-muted | `#6B7280` | `text-text-muted` |
| accent | `#2563EB` | `text-accent` / `bg-accent` |
| accent-dark | `#1D4ED8` | `bg-accent-dark` |
| accent-soft | `#EFF6FF` | `bg-accent-soft` |
| border | `#E5E5E3` | `border-border` |

### Stitch-derived sections use a separate palette (hardcoded hex, not CSS vars)
Sections built from Google Stitch designs (Hero, ServicesBento, ProcessCascading,
PortfolioPreview, StatsCounter, Testimonials) use these values directly:
- Primary blue: `#004ac6` (darker than accent)
- Dark navy: `#0b1c30`
- Body text: `#434655`
- Border: `#c3c6d7`
- Surface low: `#eff4ff`
- Surface container: `#e5eeff`

Do not "clean up" these to CSS var tokens — the two palettes coexist intentionally.

### Fonts
- `font-display` → Plus Jakarta Sans (headlines)
- `font-body` → Inter (body)
- `font-mono` → DM Mono

### Type scale (from `tailwind.config.ts`)
`display-2xl` → `display-xl` → `display-lg` → `display-md` → `body-lg` → `body-md` → `body-sm` → `label`

### Never do
- No `framer-motion` `whileInView` + `initial={{ opacity: 0 }}` on section cards — cards in
  viewport on mount start invisible and never animate. Already burned by this in ServicesBento.
  Use plain `div` + Tailwind CSS hover transitions instead.
- No Material Symbols icons. Lucide React only.
- No external Stitch image URLs in source. Download to `public/images/` first (see gotchas).

## Conventions
- All `components/sections/home/` files are `'use client'` — they use hover state or refs.
- New home sections go in `components/sections/home/NewSection.tsx`, exported as named function.
- Import and add to `app/page.tsx` directly — no barrel files.
- Stitch-sourced images: download with `curl` to `public/images/<subfolder>/`, use `<img>` tag
  (not `next/image`). The `next.config.mjs` CSP allows `img-src https:` but don't rely on
  external CDN URLs — they expire.
- CSS-only utilities needed by Stitch sections (masonry grid, tilt cards, speech bubble, etc.)
  live in `styles/globals.css` after the existing `@tailwind utilities` block.

## Known gotchas
- **cPanel deploy:** Run `npm run build` then `npm run serve` (not `npm start`). `server.js` is
  the production entry point for the Node.js app on Namecheap.
- **`speech-bubble::after`** in `styles/globals.css` is hardcoded `border-top: 15px solid #ffffff`.
  If the testimonials Card 7 background changes from white, this triangle will be the wrong color.
- **SVG connector paths** in `ProcessCascading.tsx` were manually calibrated to a 1280px-wide
  container with `viewBox="0 0 1000 800"`. If card positions or container width change, the paths
  need recalculation — they won't auto-adjust.
- **`tsconfig.tsbuildinfo`** and **`next-env.d.ts`** are in `.gitignore`. If tsc complains about
  missing incremental build info, that's expected — it regenerates on first compile.
