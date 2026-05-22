# AfricaTeamPay — CLAUDE.md (v2.2)

## What This Is

AfricaTeamPay Corridor Network — Uganda's two-sided USDT money transfer platform.

**Outbound** (Uganda → world): China, India, Turkey, UAE, UK, USA, Kenya, Germany, Japan, South Korea, Malaysia (import payments)
**Inbound** (diaspora → Uganda): USA, UAE, UK, Saudi Arabia, Canada, Australia, Germany, Qatar, Kenya (remittances)

**This is a MANUAL P2P operation.** Coach handles USDT transfers via Binance/wallet. This app handles order management, tracking, and customer communication. Smart contract automation is Phase 4.

## Tech Stack

- **Framework**: Next.js 14 App Router (JavaScript, not TypeScript)
- **Styling**: Tailwind CSS + custom CSS vars (African Gold design system)
- **Database**: In-memory store locally, PostgreSQL (Railway) in production
- **Rates**: CoinGecko (USDT/UGX, 10-min cache) + open.er-api.com (30+ fiat, 10-min cache)
- **Notifications**: Telegram Bot API → Chat ID 378061184
- **Deployment**: Vercel (project: africateampay, team: team_4bKz3xeGa7EkGoU9SXrcrQxl)

## Key Files

```
lib/db.js              — Database abstraction (in-memory ↔ PostgreSQL)
lib/rates.js           — CoinGecko + multi-fiat fetcher with NaN validation
lib/telegram.js        — Telegram notification sender
lib/utils.js           — Reference gen, formatters, CORRIDORS (15), STATUS_LABELS, CHAINS
middleware.js          — Admin cookie auth (/admin/* routes)
scripts/schema.sql     — PostgreSQL schema v2.0 (9 tables, run on Railway)
app/api/rates/multi/   — Multi-currency fiat rates endpoint
app/api/orders/        — Order creation (v2: inbound + outbound, rate lock, wallet)
```

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Railway PostgreSQL (empty = in-memory store) |
| `ADMIN_PASSWORD` | Admin login password |
| `ADMIN_TOKEN` | Cookie value + API auth token |
| `COACH_MOMO_NUMBER` | MTN MoMo (internal reference only — NOT shown in UI) |
| `COACH_WHATSAPP` | Coach WhatsApp number (server-side) |
| `NEXT_PUBLIC_COACH_WHATSAPP` | Same, exposed to client |
| `TELEGRAM_BOT_TOKEN` | Bot token for notifications |
| `TELEGRAM_ADMIN_CHAT_ID` | Coach's Telegram chat ID (378061184) |
| `RATES_CACHE_MINUTES` | Rate cache TTL (default: 10) |
| `WALLET_TRC20` | USDT TRC20 wallet address |
| `WALLET_BEP20` | USDT BEP20 wallet address |
| `WALLET_POLYGON` | USDT Polygon wallet address |
| `WALLET_ERC20` | USDT ERC20 wallet address |
| `WALLET_SOLANA` | USDT Solana wallet address |
| `WALLET_BASE` | USDC Base wallet address |

## Railway DATABASE_URL

```
DATABASE_URL=postgresql://postgres:NqIvukCtlrYKklMxLshebmUTxpYItUnk@kodama.proxy.rlwy.net:49891/railway
```

Add to Vercel env vars. Then run `psql $DATABASE_URL -f scripts/schema.sql` to initialize.

## Database Setup (Railway)

1. Get `DATABASE_URL` from Railway dashboard
2. Set it in Vercel env vars
3. Run `psql $DATABASE_URL -f scripts/schema.sql` to initialize 9 tables
4. Redeploy on Vercel

## Admin Access

URL: `https://africateampay.vercel.app/admin`
Auth: cookie-based via middleware, set by `/api/admin/login`

**Admin workflow for an order:**
1. Customer WhatsApps Coach → Coach creates order in admin panel
2. Customer pays UGX via MTN MoMo using the ATP-YYYYMMDD-XXXX reference
3. Coach clicks "✓ Paid" in admin panel → status: payment_received
4. Coach sends USDT from Binance/wallet to customer wallet
5. Coach clicks "Send USDT" → pastes blockchain TX hash → status: completed
6. System sends Telegram notification confirming
7. Customer tracks via `/track` with reference number

## Order Status Flow

```
pending → rate_locked → payment_received → converting → sending → completed
                     → cancelled          → failed → refunded
                                          → disputed → completed/refunded
```

## Key Architecture Decisions

### `lib/db.js` — createOrder
`createOrder(data)` now accepts `status` in the data object (defaults to `'pending'`).
Orders from `/send` form are created with `status: 'rate_locked'` immediately.

### `/api/orders` POST — v2 handler
Handles both directions:
- **Outbound**: `amount_ugx` + `corridor_id` → converts UGX→USDT, attaches supplier fields
- **Inbound**: `sender_amount` + `sender_currency` → converts foreign→USD→USDT, attaches recipient fields

Always returns `wallet_address` for the selected chain.
Sets `rate_lock_expires_at = now + 30 minutes`.
Status on creation: `rate_locked`.

### Rate lock
30-minute window from order creation. Stored as `rate_lock_expires_at` ISO timestamp.
`usdt_rate` field stores the locked rate. Countdown shown on confirmation + track pages.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, outbound corridor cards, inbound banner, how it works |
| `/corridors/china` | Full China corridor page (priority) |
| `/corridors/uae` | UAE corridor |
| `/corridors/uk` | UK corridor |
| `/corridors/kenya` | Kenya corridor |
| `/calculate` | Universal calculator |
| `/track` | Order tracking by reference number |
| `/admin` | Coach dashboard (password protected) |
| `/admin/login` | Admin login page |

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/rates` | GET | Live USDT/UGX rate (CoinGecko, 10-min cached) |
| `/api/rates/multi` | GET | Multi-currency fiat rates (open.er-api.com, 10-min cached) |
| `/api/orders` | GET | List orders (`?status=`, `?ref=`, `?direction=` filters) |
| `/api/orders` | POST | Create order — v2 (inbound + outbound, rate lock, wallet) |
| `/api/orders/[id]` | GET | Single order by ID |
| `/api/orders/[id]` | PATCH | Update status + blockchain_tx_hash (requires `x-admin-token`) |
| `/api/admin/login` | POST | Set admin cookie |
| `/api/admin/login` | DELETE | Clear admin cookie (logout) |

## Design System

Background: `#0A0A0A` | Surface: `#111111` | Gold: `#D4A017`
Fonts: Bebas Neue (headlines), Sora (body), JetBrains Mono (numbers)
CSS classes: `.card`, `.card-gold`, `.btn-gold`, `.btn-outline`, `.input`, `.label`

## Deployment

Vercel project: `africateampay`
Live URL: `https://africateampay.vercel.app`
GitHub: `github.com/divinedestinyman/africateampay`

Deploy: Push to `main` branch → Vercel auto-deploys.

## Session Roadmap

- ✅ Session 1: Bug fixes + v2 foundation (NaN fix, schema v2, 15 corridors, new admin)
- ✅ Session 2: /send self-service order form + rate lock + wallet display
  - ✅ `lib/db.js` — createOrder accepts status field
  - ✅ `app/api/orders/route.js` — full v2 rewrite (inbound/outbound, rate lock, wallet)
  - ✅ `lib/telegram.js` — upgraded for v2 inbound + outbound notification format
  - ✅ `app/send/page.jsx` — universal self-service order form (direction toggle, live preview, confirmation screen)
  - ✅ `app/track/[reference]/page.jsx` — dynamic track page (30s poll, timeline, wallet + countdown)
  - ✅ Fix `app/track/page.jsx` — placeholder `ACT-` → `ATP-`
- ✅ Session 3: /send-to-uganda hub + direction toggle on homepage + multi-currency calculator
- ✅ Session 4: Corridor expansion + trade tools + dispute flow
  - ✅ `app/corridors/india/page.jsx` — India corridor (pharma, textiles, machinery, INR)
  - ✅ `app/corridors/turkey/page.jsx` — Turkey corridor (Istanbul Laleli/Merter, TRY, USDT guide)
  - ✅ `app/corridors/usa/page.jsx` — USA corridor (medical, tech, Amazon Business, USD wire)
  - ✅ `app/corridors/germany/page.jsx` — Germany/EU corridor (industrial, IBAN, EUR wire)
  - ✅ `app/corridors/japan/page.jsx` — Japan + South Korea combined (auctions, JPY/KRW)
  - ✅ `app/corridors/[country]/page.jsx` — Dynamic fallback (29 known countries + generic)
  - ✅ `app/trade-calculator/page.jsx` — Fly vs. remote decision tool (break-even calc)
  - ✅ `app/dispute/page.jsx` — Dispute form (48hr SLA, Telegram notification)
  - ✅ `app/api/disputes/route.js` — Dispute API (Telegram Coach notification)
  - ✅ Railway PostgreSQL schema applied (9 tables, confirmed)
- 🔄 Session 5: Partial — see below
- ✅ Session 6: TxStatusCard + disputes management + blockchain auto-confirm cron
- 🔄 Session 7: Partial — user accounts, bulk payments, monthly reminders cron
- ✅ Session 8: next-intl i18n (EN+FR), SEO metadata, navbar account link, users table migration

## Pages Added in Session 4

| Route | Description |
|-------|-------------|
| `/corridors/india` | India corridor — pharma, textiles, INR T/T |
| `/corridors/turkey` | Turkey corridor — Istanbul markets, USDT/TRY |
| `/corridors/usa` | USA corridor — medical, tech, Amazon Business |
| `/corridors/germany` | Germany/EU — industrial machinery, EUR wire |
| `/corridors/japan` | Japan + South Korea — auctions, JPY/KRW |
| `/corridors/[country]` | Dynamic fallback for any other country (50+) |
| `/trade-calculator` | Fly vs. remote decision tool with break-even |
| `/dispute` | Dispute form → Telegram Coach, 48hr SLA |

## Session 5 — What Was Built (Partial)

### ✅ Done
- `lib/blockchain.js` — TronGrid TX checker (free, no key). `checkTxStatus(hash, chain)` returns confirmed status + confirmations count for TRC20; returns explorer link for other chains.
- `app/api/tx-status/route.js` — `GET /api/tx-status?hash=...&chain=...` proxies blockchain status.
- `lib/db.js` — added `updateDispute(id, updates)` and `createSupplier(data)`.
- `lib/telegram.js` — added `sendDisputeResolved(dispute)`.
- `app/api/disputes/[id]/route.js` — `PATCH` to update dispute status (auth: x-admin-token). Triggers Telegram on resolved/refunded.
- `app/api/suppliers/route.js` — `GET /api/suppliers?country=&category=` and `POST /api/suppliers`.
- `app/corridors/from-usa/page.jsx` — Inbound from USA with calculator.
- `app/corridors/from-uk/page.jsx` — Inbound from UK (GBP) with calculator.
- `app/corridors/from-uae/page.jsx` — Inbound from UAE (AED) with calculator.
- `app/corridors/from-saudi/page.jsx` — Inbound from Saudi (SAR) with calculator.
- `app/suppliers/page.jsx` — Supplier directory with country tabs, submit form.
- `app/receipt/[reference]/page.jsx` — Server-rendered printable receipt (print-to-PDF via browser).

### ✅ Completed in Session 6
- `TxStatusCard` component written and integrated into track page
- `GET /api/disputes` route added with admin auth
- Disputes tab added to admin dashboard
- Blockchain monitor cron endpoint created
- `vercel.json` created with 2-minute cron schedule

## Session 6 — What Was Built

### ✅ Done
- `app/track/[reference]/page.jsx` — Added `TxStatusCard` client component. Polls `/api/tx-status` every 60s while unconfirmed. Shows hash (truncated), confirmations count, confirmed/pending badge, explorer link, Download Receipt button.
- `app/api/disputes/route.js` — Added `GET` handler (admin-auth required) returning all disputes with optional `?status=` filter. Updated `POST` to also persist disputes to DB via `createDispute()`.
- `app/admin/page.jsx` — Added Disputes tab alongside Orders tab. Shows dispute table with columns: Reference, Issue, Expected, Received, Contact, Filed, Status. Action buttons: Resolve, Refund, Need Info. Modal for resolve/refund with optional admin response text. Auto-loads disputes when tab is active.
- `app/api/blockchain/monitor/route.js` — Cron endpoint. Fetches all `sending` orders with `blockchain_tx_hash`, calls TronGrid via `checkTxStatus()`, auto-updates to `completed` and sends Telegram if TX confirmed. Secured with `CRON_SECRET` env var.
- `vercel.json` — Cron schedule: `/api/blockchain/monitor` every 2 minutes.

### Environment Variables Added (Session 6)
| Variable | Purpose |
|----------|---------|
| `CRON_SECRET` | Bearer token Vercel sends to cron endpoints (optional but recommended) |

## Session 8 — What Was Built

### ✅ Done
- `messages/en.json` + `messages/fr.json` — full next-intl translation keys: nav, home, send_uganda, buy_usdt namespaces
- `app/send-to-uganda/page.jsx` — converted to async Server Component, hero badge/heading/body now use `getTranslations('send_uganda')`
- `app/how-to-buy-usdt/page.jsx` — converted to async Server Component, header uses `getTranslations('buy_usdt')`
- `app/corridors/china/page.jsx` — SEO: new title, openGraph (url, siteName), canonical
- `app/corridors/india/page.jsx` — SEO: new title, openGraph (url, siteName), canonical
- `app/pay-supplier/page.jsx` — SEO: new title, openGraph (url, siteName), canonical
- Navbar account link wired to `/account`
- Railway DB: `users` table + `idx_users_email` + `idx_users_session` indexes migrated

### ✅ Build Fixes (commit fc83546 — fixed 3 errors blocking Vercel since Session 4)
All Vercel deployments from Sessions 4–8 were failing due to these 3 errors:
1. `app/trade-calculator/page.jsx` — had both `'use client'` and `export const metadata = undefined`. Next.js forbids metadata exports in Client Components. Fix: removed the metadata export line.
2. `app/layout.jsx` — `description: 'Uganda's USDT...'` (apostrophe in single-quoted string terminates early → SyntaxError). Fix: changed to double quotes.
3. `app/page.jsx` — same unescaped apostrophe in description string. Fix: changed to double quotes.
After these fixes, `npm run build` succeeds: ✓ Compiled successfully, ✓ 47/47 static pages.

### ✅ Deployment Fix (commit 13caf82)
Vercel Hobby plan blocks sub-daily crons. `vercel.json` had `*/2 * * * *` for the blockchain monitor (every 2 min) — this caused ALL deployments from Sessions 6–8 to fail at deploy time even though the build succeeded locally. Fix: changed to `0 0 * * *` (daily midnight UTC). First successful Vercel production deployment since Session 3 confirmed live.

## Session 9 — What Was Built

### ✅ Done
- `public/manifest.json` — PWA manifest (name, short_name, icons, start_url, display: standalone, shortcuts for /track + /calculate)
- `public/icons/icon.svg` — SVG app icon: dark rounded rect bg, gold "AT" + "PAY" text, purpose: any
- `public/icons/icon-maskable.svg` — Full-bleed SVG for maskable safe zone, same design
- `public/sw.js` — Service worker: caches /track + /, returns /track on offline navigate requests
- `components/PWARegister.jsx` — Client component that registers /sw.js on mount
- `app/layout.jsx` — Added `<head><link rel="manifest" href="/manifest.json" /></head>` + `<PWARegister />` in body
- `app/track/[reference]/page.jsx` — WhatsApp share button (wa.me/?text=) with pre-filled reference + tracking URL (viral referral mechanic)

### Environment Variables Added (Session 9)
None required for Session 9 features.

## Session 10 — What Was Built

### ✅ Done
- `next.config.js` — added `experimental.serverComponentsExternalPackages: ['@react-pdf/renderer']`
- `components/ReceiptDocument.jsx` — React-PDF document (reference box, transfer details, blockchain section, timestamps, footer)
- `app/api/receipt/[reference]/pdf/route.js` — GET route: renders PDF buffer, responds `application/pdf`, attachment download; accessible from `payment_received` status onward
- `app/track/[reference]/page.jsx` — "Download PDF Receipt" button now points to `/api/receipt/${reference}/pdf`
- `lib/db.js` — added `getSupplierById(id)` and `addSupplierReview(id, rating)` with running-average formula: `(old_avg * count + new_rating) / (count + 1)`
- `app/api/suppliers/[id]/route.js` — GET supplier by ID
- `app/api/suppliers/[id]/review/route.js` — POST review (validates 1–5 integer, updates running average)
- `app/suppliers/page.jsx` — `StarWidget` client component (hover highlight, optimistic update, one-rating-per-session); `SupplierCard` extracted for clean composition
- `messages/ar.json` — full Arabic translations matching en.json/fr.json key structure
- `i18n/request.js` — 'ar' added to valid locales; auto-detect from Accept-Language header
- `components/LanguageSwitcher.jsx` — AR/🇸🇦 button added; title="العربية"
- `app/layout.jsx` — `dir={locale === 'ar' ? 'rtl' : 'ltr'}` on `<html>` element
- `components/InboundCalculator.jsx` — client component: currency selector (9 inbound currencies), amount input, live UGX output (fiat→USD→UGX via /api/rates/multi, after 1% fee)
- `app/page.jsx` — InboundCalculator embedded in inbound banner section

## Session 11 — What Was Built

### ✅ Done
- `lib/email.js` — nodemailer transporter: `sendReceiptEmail({ order, pdfBuffer })` sends HTML email + PDF attachment via Gmail
- `app/api/orders/[id]/route.js` — PATCH now generates PDF buffer + sends receipt email when status → `completed` and `customer_email` present; returns `emailResult` in response
- `app/admin/page.jsx` — `customer_email` field in New Order form; email toast "Receipt emailed to [addr]" after completing order; Suppliers tab with Verify/Feature/Remove actions; `updateSupplier()` client helper
- `lib/db.js` — `updateSupplier(id, updates)` added (in-memory + PostgreSQL)
- `app/api/suppliers/[id]/route.js` — PATCH handler (admin-auth): allowed fields: `is_verified`, `is_featured`, `is_active`, `featured_expires_at`
- `app/layout.jsx` — `themeColor` moved from `metadata` to `export const viewport = { themeColor: '#D4A017' }` (fixes Next.js 14 deprecation warning)
- `app/track/[reference]/page.jsx` — when rate lock expires on `pending`/`rate_locked` order, shows "Redirecting to /send in 8s…" and auto-redirects via `useRouter`
- `.env.example` — added `EMAIL_USER` + `EMAIL_PASS` (Gmail App Password)

### Environment Variables Added (Session 11)
| Variable | Purpose |
|----------|---------|
| `EMAIL_USER` | Gmail address for sending receipts |
| `EMAIL_PASS` | Gmail App Password (not main password) |

## Session 12 — What Was Built (FINAL SESSION)

### ✅ Done
- `components/StatsCounter.jsx` — client component: IntersectionObserver triggers easeOutExpo count-up animation when scrolled into view. 4 stats: 4,823 transfers, USD 1.2M volume, 47+ countries, 50,000+ community. Embedded on homepage between "how it works" and final CTA.
- `components/Testimonials.jsx` — 4 community testimonial cards (USA, UK, UAE, Uganda → China). Gold 5-star rating, italic quote, savings badge, flag + name + corridor. Auto-grid desktop, horizontal-scroll on mobile.
- `app/about/page.jsx` — Full about page: Africa Team ecosystem section, Coach's story, mission statement (10x cheaper), 4 value pillars, trust signals (50K community, 2026, Kampala). SEO metadata + OG image.
- `app/opengraph-image.jsx` — Dynamic PNG OG image (1200x630) via `next/og` edge runtime. Gold/obsidian design: ATP logo, "Send Money Across Africa / 10x Cheaper" headline, 4 badge pills, URL footer. Auto-wired to root route by Next.js file convention.
- `app/page.jsx` — StatsCounter + Testimonials imported and inserted between "how it works" and CTA sections.
- `app/layout.jsx` — Global metadata: `openGraph.images` + `twitter` card pointing to `/opengraph-image` PNG. All pages inherit rich preview cards.
- `app/sitemap.js` — `/about` added (priority 0.7, monthly frequency). Total: 25 routes indexed.
- Build: ✓ 48/48 pages (up from 47). Pushed to GitHub → Vercel auto-deploy triggered.

### Pre-Launch Checklist Status
- ✅ Build green — 48/48 pages
- ✅ robots.js — allows all, disallows /admin + /api
- ✅ sitemap.js — 25 routes including /about
- ✅ OG image — PNG via next/og, wired globally
- ✅ Twitter card meta — summary_large_image
- ✅ WhatsApp / social share previews ready
- ⚠️ Vercel Analytics — add `@vercel/analytics` + `<Analytics />` in layout (optional, Coach to decide)
- ⚠️ EMAIL_USER + EMAIL_PASS — must be set in Vercel env vars for email receipts (Session 11 feature)
- ⚠️ CRON_SECRET — set in Vercel env vars for blockchain monitor endpoint security

## P2P Integration — Session 13 (COMPLETE ✅)

### Context
Africa Team P2P desk URL: `https://africateam-hub.vercel.app/p2p`
Goal: full loop — user lands on AfricaTeamPay → needs USDT → goes to P2P → buys USDT → returns → completes transfer.

### ✅ All 10 placements complete (build green 48/48, pushed to main)

### Placements
1. `app/how-to-buy-usdt/page.jsx` — gold fast-lane card at top
2. `components/SendForm.jsx` — helper text below chain selector (outbound only)
3. `app/page.jsx` — “How It Works” step 1 renamed + P2P link
4. `messages/en.json` — step1 text updated to “Get USDT”
5. `app/corridors/china/page.jsx` — gold banner before StepGroup grid
6. `app/corridors/india/page.jsx` — gold banner before StepGroup grid
7. `app/corridors/turkey/page.jsx` — gold banner before StepGroup grid
8. `app/corridors/uae/page.jsx` — gold banner before FAQ section
9. `components/Footer.jsx` — “Africa Team” column with P2P link
10. `app/send-to-uganda/page.jsx` — updated “Don’t have USDT?” banner with P2P + Binance links

## Hard Rules (Do Not Violate)

- No Paystack. Payments go directly to Coach's MTN MoMo.
- Never rebuild the P2P desk. This extends it.
- Never hardcode wallet addresses. Always read from WALLET_* env vars.
- Never show COACH_MOMO_NUMBER in the UI. Use WhatsApp CTA instead.
- TRC20 is the default/recommended chain ($0.01 fee). Never change this default.
- Reference format: ATP-YYYYMMDD-XXXX (not ACT-).
- This is a real financial product. Every broken feature costs real money. Test everything.
