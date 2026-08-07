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

## Deployment to Namecheap cPanel

**One-line deploy:** `python3 deploy.py`

The `deploy.py` script automates the entire production workflow:

1. **Local build** — Runs `npm run build` and verifies the `.next` output directory exists.
2. **Package artifacts** — Zips `.next`, `public`, `server.js`, `package.json`, `package-lock.json`, `next.config.mjs` (~12 MB). Excludes `.next/cache`, `node_modules`, `.git`, source files.
3. **SSH/SFTP upload** — Connects to Namecheap cPanel via paramiko using credentials from `AGENTS/cpanel-ssh.md` (gitignored). Uploads the zip.
4. **Extract and install** — Extracts on the server at `~/alvis`, runs `npm install --omit=dev` for production dependencies only.
5. **Restart app** — Signals Node.js via `cloudlinux-selector restart` (cPanel's process manager).
6. **Health check** — Waits 6 seconds and verifies `https://alvismarketing.com/` responds 200 OK.

**SSH details** (stored in `AGENTS/cpanel-ssh.md`):
- Host: `198.187.29.21:21098`
- User: `alvigohn`
- App root: `~/alvis`
- Node binary: `/opt/alt/alt-nodejs20/root/usr/bin/node`

**Do not commit `AGENTS/cpanel-ssh.md`** — it holds plaintext credentials and is in `.gitignore`.

## Architecture
- **Routing:** `app/` directory. Each route is a `page.tsx`. Root layout: `app/layout.tsx`.
- **Home sections:** `components/sections/home/` — one file per section, all `'use client'`.
- **Other page sections:** `components/sections/{about,blog,contact,case-studies,services}/`.
- **UI primitives:** `components/ui/` — Button, Badge, Container, SectionLabel, CustomCursor, Preloader.
- **Layout:** `components/layout/` — Header, Footer, MobileMenu. Footer is in root layout, not pages.
- **Static data:** `data/` — blogPosts.ts, caseStudies.ts, services.ts, testimonials.ts.
- **Site identity:** `lib/site.ts` is the single source of truth for the canonical URL,
  contact email, phone, NAP, Google Maps link, social URLs **and company stats**.
  Never hardcode any of these in a component. `siteUrl` strips a trailing slash from
  `NEXT_PUBLIC_SITE_URL`; use `absoluteUrl('/path')` to build absolute links.
- **Design tokens:** CSS vars in `styles/globals.css` `:root` (legacy blue) **plus** hardcoded
  red-theme hex registered directly in `tailwind.config.ts`. See Design system.
- **Homepage section order** (`app/page.tsx`): Hero → ServicesBento → ProcessCascading →
  PortfolioPreview → Testimonials → StatsCounter → HomeCTA. `StatsCounter` is the
  "Why Businesses Choose Alvis" section — the filename predates the redesign.
  `BlogPreview.tsx` still exists but is **not** rendered on the homepage.
- **Fonts:** loaded via `next/font/google` in `lib/fonts.ts`, injected as `--font-display/body/mono` vars.
- **Contact API:** `app/api/contact/route.ts` (nodemailer). No other API routes.
  Handles two payloads: the Zod-validated contact form, and `{ type: 'newsletter' }`
  signups. Both send real mail via `lib/mail.ts` — newsletter signups used to be
  `console.log`-ed and silently dropped.
- **Newsletter forms** (footer, blog sidebar, blog CTA) all share
  `components/hooks/useNewsletterSubscribe.ts`. Markup differs per placement, behaviour
  does not. Two of the three previously had no submit handler at all.
- **Voice assistant:** Retell AI web-call widget, `components/ui/VoiceAgent.tsx`, mounted
  globally in `app/layout.tsx`. Three routes under `app/api/retell/`:
  `web-call` (mints a 30-second access token — never prefetch it, it expires),
  `lead` (the agent's `capture_lead` function), `webhook` (`call_analyzed`).
  Both inbound routes verify `X-Retell-Signature` via `lib/retell.ts`, which delegates
  to `retell-sdk`'s `verify()` — see the signature gotcha below before touching it.
  Always pass the **raw** body; re-serialising parsed JSON changes the bytes.
  Leads are appended to `.leads/voice-leads.jsonl` **before** email is attempted, so a
  failing SMTP account cannot lose them. `.leads/` is gitignored.
  The call flow rings first and connects after (`RING_MIN_MS` in `VoiceAgent.tsx`,
  currently 4000ms): Retell speaks its greeting the instant it joins, so connecting
  during the ring would talk over the ringtone or clip the opening line.
  The ringback is synthesized in `lib/ringtone.ts` (Web Audio, no audio file).
  Agent config reference lives in `AGENTS/retell-voice-agent.md` (gitignored).
  Needs `RETELL_API_KEY` and `RETELL_AGENT_ID` in `.env.local` **and on the server** —
  `deploy.py` never uploads `.env.local`. Optional `RETELL_AGENT_VERSION` pins the
  agent version (see versioning gotcha).
- **No global state.** All state is local React or URL params.

## Design system

> **The site is mid-migration to a new red theme.** The homepage is rebuilt and is the
> reference implementation. Every other page still runs the legacy blue theme and is
> scheduled to be rebuilt on the red one. When touching any page, check which theme it is
> on before picking colors — see the migration table below.

### Migration status
| Area | Theme | Notes |
|---|---|---|
| Homepage (`app/page.tsx` + `components/sections/home/`) | **Red (new)** | Done — use as the reference |
| `components/layout/Header.tsx` | **Red (new)** | Floating pill navbar |
| `components/layout/Footer.tsx` | **Red (new)** | Rebuilt as the light 5-column footer from the page designs |
| about, services, contact, case-studies, blog | **Red (new)** | Rebuilt from `AGENTS/pages/*.jpeg` — see below |
| `components/layout/MobileMenu.tsx` | **Red (new)** | Panel is `#fff8f7`; active link is red via the `accent` token |
| blog/case-study **detail** pages (`[slug]`) | **Red (new)** | Retheme only — layout unchanged from the original build |
| `components/ui/` (Button, Badge, SectionLabel…) | **Red (new)** | Red via the `accent` CSS var; `Button` gained a circular arrow chip |
| privacy, terms | **Red (new)** | Were blank stubs; now real content via `sections/shared/LegalPage.tsx` |
| `components/ui/Preloader.tsx` | **Red (new)** | Navy `#0a1b3d` field, red progress bar |

**The whole site is now on the red theme — there is no legacy blue left in source.**
A grep for `#004ac6|#0b1c30|#434655|#c3c6d7|#eff4ff|#e5eeff|#2563eb|#1d4ed8` over
`app components lib styles data` returns nothing; keep it that way.

### Red theme (current target — hardcoded hex, not CSS vars)
This is the palette for all new and rebuilt work. Sourced from the Stitch project.

| Role | Hex |
|---|---|
| Primary (brand red) | `#b7102a` |
| Bright red / accent red | `#e63946` |
| Page background | `#fff8f7` |
| Card / container surface | `#fdeeed` |
| Card border | `#f8e0df` |
| Panel surface (inner, near-white) | `#fffbfb` / `#fffdfc` |
| Icon-chip background | `#fad6d5` / `#fbdedd` |
| Heading text | `#1c1414` / `#271717` |
| Body text | `#5b4948` / `#5b403f` |
| Muted / meta text | `#8f6f6e` / `#a98d8c` |
| Outline variant | `#e4bebc` |
| Secondary (steel blue) | `#485f84` |
| Tertiary | `#286182` |
| Data blue (charts) | `#00B4FF` / `#3b82f6` |
| Soft teal (positive) | `#77C1C1` |

The full Material-style token set (`primary`, `on-surface`, `surface-container-*`,
`outline-variant`, `alvis-red`, …) is also registered in `tailwind.config.ts`, so
`bg-surface-container` / `text-on-surface-variant` etc. resolve. New home sections mostly use
inline `style={{ }}` hex instead, because the values are fixed per the design and inline hex
keeps a section self-contained.

### Legacy blue palette (pages not yet rebuilt)
Still live on services / about / case-studies / contact / blog. Leave it alone until that page
is rebuilt — do not partially convert a page.
- Primary blue `#004ac6` · Dark navy `#0b1c30` · Body `#434655`
- Border `#c3c6d7` · Surface low `#eff4ff` · Surface container `#e5eeff`

### CSS-var tokens (`styles/globals.css` `:root` → `tailwind.config.ts`)
Consumed by `components/ui/` and the detail pages. Still wired up; do not delete.
**These were re-pointed at the red palette**, which is what flipped every `text-accent` /
`bg-accent` / `border-border` consumer to the new theme in one move — retheming a legacy
component is usually a matter of leaving these tokens alone, not hardcoding hex:
`bg` `#fff8f7`, `surface` `#FFFFFF`, `subtle` `#fdeeed`, `text` `#0D0D0D`,
`text-muted` `#5b403f`, `text-faint` `#8f6f6e`, `accent` `#e63946`,
`accent-dark` `#b7102a`, `accent-soft` `#fde8ea`, `border` `#f3dedd`,
`border-dark` `#e4bebc`.

Dark full-bleed sections use navy `#0a1b3d` — never `bg-text` (near-black), which reads as a
different theme next to the navy bands on the rebuilt pages.

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
- No Material Symbols icons. Stitch exports use them; always substitute. In red-theme sections
  use **inline SVG** (24×24 viewBox, `strokeWidth` ~1.8, round cap/join) so icon colour can be
  driven by the same hex constants as the rest of the section. Lucide React is fine where a
  component already imports it (e.g. `Menu` in Header).
- No external Stitch image URLs in source. Download to `public/images/` first (see gotchas).
- Do not partially convert a legacy blue page to red. Rebuild the whole page in one pass,
  otherwise it ends up with two palettes on screen at once.

## Conventions
- All `components/sections/home/` files are `'use client'` — they use hover state or refs.
- New home sections go in `components/sections/home/NewSection.tsx`, exported as named function.
- Import and add to `app/page.tsx` directly — no barrel files.
- Stitch-sourced images: download with `curl` to `public/images/<subfolder>/`, use `<img>` tag
  (not `next/image`). The `next.config.mjs` CSP allows `img-src https:` but don't rely on
  external CDN URLs — they expire. Homepage assets live in `public/images/homepage/`.
  The `<img>` usage trips the `@next/next/no-img-element` lint warning — that is expected and
  accepted, not something to "fix".
- CSS-only utilities needed by Stitch sections (masonry grid, tilt cards, speech bubble, etc.)
  live in `styles/globals.css` after the existing `@tailwind utilities` block. Homepage
  animations `hero-float` and `logo-scroll` are keyframes there, applied via inline
  `style={{ animation: ... }}`.

### Pulling a screen out of Stitch
Use the **Stitch MCP tools only** — do not drive the Stitch web UI with browser automation.
1. `mcp__stitch__list_screens` with the project id → find the screen by `title`, take
   `htmlCode.downloadUrl`.
2. `curl -sL "<url>" -o <scratchpad>/screen.html`, then read the file. Do not use WebFetch —
   it summarises the page instead of returning raw HTML.
3. Extract asset URLs from that saved HTML with `grep` and `curl` them into
   `public/images/<subfolder>/`. Copying a URL by hand truncates the long tokens and silently
   downloads a Google error page — check with `file` that you got real image data.

#### Generating a screen (the MCP tool times out — use the HTTP endpoint)
`mcp__stitch__generate_screen_from_text` **will time out** for anything bigger than a trivial
page. Claude Code's MCP client caps tool calls at ~60s and has no configurable tool timeout,
while Stitch needs 2–10 minutes. The call dies mid-flight and the screen is never persisted.

The Stitch MCP server is a plain **stateless JSON-RPC HTTP endpoint**, so call it directly and
set your own timeout. The API key lives in `~/.claude.json` under
`projects → /home/krawin/code/alvis → mcpServers → stitch → headers → X-Goog-Api-Key`:

```
POST https://stitch.googleapis.com/mcp
  X-Goog-Api-Key: <key>
  Content-Type: application/json
  Accept: application/json, text/event-stream
  {"jsonrpc":"2.0","id":1,"method":"tools/call",
   "params":{"name":"generate_screen_from_text","arguments":{...}}}
```
No `initialize` handshake or session id is needed. Run it in the background with a 900s timeout.

#### One call ≠ one full page
Gemini caps output length, so a seed generation only ever returns **navbar + hero + footer**
(~2,900px tall) no matter how detailed the prompt. Build long pages iteratively:
seed → `edit_screens` → `edit_screens`, 2–3 sections per pass, always chaining from the newest
screen id (**`edit_screens` mints a new screen id every pass**).

#### Other traps
- `list_screens` and `get_project` are heavily cached and can lag by 10+ minutes — a new screen
  genuinely exists even when absent from the listing. `get_screen` reads fresh; prefer the id
  returned inline by the generate/edit call.
- Stitch ignores "no Material Symbols" on the seed pass. Tell it again in an `edit_screens`
  pass ("replace every Material Symbols icon with inline SVG") — that does clear them.
- It also drifts on exact copy (renames "Discover"→"Discovery", drops a coloured word). Treat
  Stitch output as layout/structure and re-type the exact copy from the design during the port.
- For hero art, cropping the illustration straight out of `AGENTS/pages/*.jpeg` with
  ImageMagick beats Stitch's generated image — it is the actual target art on clean white.
  Watch the crop height so you don't catch the next section's pills/cards in the bleed.

## Known gotchas
- **OUTSTANDING — outbound email is broken in production.** SMTP auth fails with
  `535 5.7.8 Authentication failed` because `SMTP_USER` is a **Gmail address** while
  `SMTP_HOST` is `mail.privateemail.com` (Namecheap). You cannot authenticate to Namecheap's
  mail server with a Gmail account. Nothing sends: contact form, newsletter signups, and
  voice-agent lead notifications all fail. Fix on the server in `~/alvis/.env.local` —
  `SMTP_USER` and `CONTACT_EMAIL` must be `info@alvismarketing.com` with that mailbox's own
  password. Until then, voice leads survive only in `.leads/voice-leads.jsonl` on the server
  and the contact form silently loses every submission.
- **cPanel deploy:** Use `python3 deploy.py` to push to production. It handles the full build → zip → upload → extract → restart cycle. The `server.js` file is the production entry point (not `npm start`).
- **`.env.local` is never uploaded by `deploy.py`** (by design — it must not clobber server
  secrets). Any new env var has to be added to `~/alvis/.env.local` by hand or the feature
  500s in production while working fine locally. Bit us with `RETELL_API_KEY`.
- **`speech-bubble::after`** in `styles/globals.css` is hardcoded `border-top: 15px solid #ffffff`.
  If the testimonials Card 7 background changes from white, this triangle will be the wrong color.
- **`ProcessCascading.tsx` zigzag layout is coordinate-coupled.** On `lg+` the four step cards
  are absolutely positioned via CSS custom properties (`--step-top/left/width`, applied by the
  `.process-step` rule in `globals.css`), and the dashed connector arrows are an SVG overlay
  using the *same* percentage x-values (`39%`, `55%`, …). Cards and arrows only line up because
  both read the constants at the top of the file. If you move a card or rewrite a step
  description so it wraps to a different number of lines, update the matching `<line>`
  coordinates too. Below `lg` the absolute positioning is off and the overlay is hidden.
  Arrowheads come from one `<marker orient="auto">`, so it serves all directions.
  Note SVG `<line>` accepts `%` for x, but path `d` does **not** — that's why these are lines,
  not paths.
- **`tsconfig.tsbuildinfo`** and **`next-env.d.ts`** are in `.gitignore`. If tsc complains about
  missing incremental build info, that's expected — it regenerates on first compile.
- **Logo:** `public/images/alvisLogo.jpg` is the active logo (JPG, white background). `public/logo.svg`
  still exists but is only used as the favicon source. Do not reference `logo.svg` for visible UI.
- **Preloader:** uses `sessionStorage` key `alvis_preloader_shown` to show only once per session.
  Clearing that key in DevTools → Application → sessionStorage replays it.
- **Dev server serves unstyled HTML after a config change.** Editing `tailwind.config.ts` or
  `globals.css` while `next dev` is running can leave a stale CSS chunk — the page renders as
  raw serif HTML with the `sr-only` "Skip to main content" link visible. Restart `npm run dev`.
  Verify it is only a cache issue by confirming `npm run build` still emits a full-size
  `.next/static/css/*.css` (~56KB); if it does, the config is fine.
- **The CSP and Permissions-Policy gate the voice widget.** `next.config.mjs` must keep
  `microphone=(self)` (not `microphone=()`, which blocks getUserMedia outright even
  same-origin) and `connect-src` must allow `wss://*.livekit.cloud` — the Retell SDK
  signals through LiveKit Cloud (`wss://retell-ai-4ihahnq7.livekit.cloud`). Tightening
  either one silently kills the assistant with no visible error but a console CSP block.
- **Never hand-roll the Retell webhook signature.** It is *not* `HMAC-SHA256(apiKey, body)`.
  The header is `v=<timestamp>,d=<hex>`, the digest covers `body + timestamp`, and there
  is a five-minute replay window. Retell does not publish the algorithm; the docs only say
  to use the SDK. A hand-written HMAC over the body alone returns 401 for every genuine
  request while still passing your own tests — which is exactly how it shipped once and
  silently 401'd 28 calls' worth of webhooks. Use `retell-sdk`'s `verify()`; it is async,
  so `await` it. To generate a valid test signature, use the SDK's `sign()`.
- **Retell serves the LATEST agent version, published or not.** `create-web-call` without
  an explicit `agent_version` ignores both the publish flag and the version selected in the
  dashboard UI. An unfinished draft is live to visitors the moment it exists. Confirmed
  against real call records. Set `RETELL_AGENT_VERSION` to pin the site to a known-good
  version while editing. Also note the dashboard's version *titles* are free text and drift
  from the real numbers (a version titled "v06" was actually V7) — trust the API, not the label.
- **Retell agent versioning:** a published agent version cannot be PATCHed
  (`422 Cannot update published agent`). Create a draft with
  `POST /create-agent-version/{id}` with `base_version`, PATCH that version, then
  `POST /publish-agent/{id}?version=N`. Note the new draft branches its Retell-LLM from
  the *base* version, so prompt edits made on a different LLM version do not carry over.
- **Retell knowledge bases are multipart, not JSON.** `create-knowledge-base` takes
  `multipart/form-data` where `knowledge_base_urls` / `knowledge_base_texts` are
  **JSON-encoded strings**, not repeated `field[]` entries. A JSON body returns a bare
  `500 Internal Server Error`. Adding a text source to an existing KB also 500s — create a
  second KB instead; an agent can have several attached.
- **Google Fonts timeouts in dev are harmless.** `next/font/google` logs `AbortError` /
  "Failed to download `Plus Jakarta Sans`" and falls back to system fonts on a slow connection.
  Pages still return 200 and production builds fetch and inline the fonts correctly.
