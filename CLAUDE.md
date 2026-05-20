# AfricaTeamPay — CLAUDE.md

## What This Is

AfricaTeamPay Corridor Network. A Next.js 14 web app for Coach's USDT money transfer corridors:
- Uganda → China (priority #1)
- Uganda → UAE
- Uganda → UK
- Uganda → Kenya

**This is a MANUAL P2P operation.** Coach handles USDT transfers via Binance/wallet. This app handles order management, tracking, and customer communication. Smart contract automation is Phase 4.

## Tech Stack

- **Framework**: Next.js 14 App Router (JavaScript, not TypeScript)
- **Styling**: Tailwind CSS + custom CSS vars (African Gold design system)
- **Database**: In-memory store locally, PostgreSQL (Railway) in production
- **Rates**: CoinGecko free API (5-min cache)
- **Notifications**: Telegram Bot API → Chat ID 378061184
- **Deployment**: Vercel (project: africateampay, team: team_4bKz3xeGa7EkGoU9SXrcrQxl)

## Key Files

```
lib/db.js          — Database abstraction (in-memory ↔ PostgreSQL)
lib/rates.js       — CoinGecko fetcher with 5-min cache
lib/telegram.js    — Telegram notification sender
lib/utils.js       — Reference number generator, formatters
middleware.js      — Admin cookie auth (/admin/* routes)
scripts/schema.sql — PostgreSQL schema (run when Railway recovers)
```

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Railway PostgreSQL (empty = in-memory store) |
| `ADMIN_PASSWORD` | Admin login password |
| `ADMIN_TOKEN` | Cookie value + API auth token |
| `COACH_MOMO_NUMBER` | MTN MoMo number (shown in UI) |
| `COACH_WHATSAPP` | Coach WhatsApp number |
| `NEXT_PUBLIC_COACH_WHATSAPP` | Same, exposed to client |
| `TELEGRAM_BOT_TOKEN` | Bot token for notifications |
| `TELEGRAM_ADMIN_CHAT_ID` | Coach's Telegram chat ID (378061184) |
| `RATES_CACHE_MINUTES` | CoinGecko cache TTL (default: 5) |

## Database Setup (Railway — when recovered)

1. Get `DATABASE_URL` from Railway dashboard
2. Set it in Vercel env vars (replace the placeholder)
3. Run `psql $DATABASE_URL -f scripts/schema.sql` to initialize tables
4. Redeploy on Vercel

## Admin Access

URL: `https://africateampay.vercel.app/admin`
Auth: cookie-based via middleware, set by `/api/admin/login`

**Admin workflow for an order:**
1. Customer WhatsApps Coach → Coach creates order in admin panel
2. Customer sends UGX via MTN MoMo using reference number
3. Coach clicks "✓ Payment" in admin panel
4. Coach sends USDT from Binance/wallet to customer
5. Coach clicks "Send USDT" in admin, enters Tron TX hash
6. System sends Telegram notification to Coach confirming
7. Customer can track via `/track` with reference number

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, 4 corridor cards, how it works |
| `/corridors/china` | Full China corridor page (priority) |
| `/corridors/uae` | UAE corridor |
| `/corridors/uk` | UK corridor |
| `/corridors/kenya` | Kenya corridor |
| `/calculate` | Universal calculator |
| `/track` | Order tracking by reference |
| `/admin` | Coach dashboard (password protected) |
| `/admin/login` | Admin login page |

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/rates` | GET | Live USDT rates (CoinGecko, 5-min cached) |
| `/api/orders` | GET | List orders (optional `?status=` or `?ref=` filter) |
| `/api/orders` | POST | Create new order |
| `/api/orders/[id]` | GET | Single order |
| `/api/orders/[id]` | PATCH | Update status (requires `x-admin-token` header) |
| `/api/admin/login` | POST | Set admin cookie |
| `/api/admin/login` | DELETE | Clear admin cookie (logout) |

## Design System

Background: `#0A0A0A` | Surface: `#111111` | Gold: `#D4A017`
Fonts: Bebas Neue (headlines), Sora (body), JetBrains Mono (numbers)

## Deployment

Vercel project: `africateampay`
Live URL: `https://africateampay.vercel.app`
GitHub: `github.com/divinedestinyman/africateampay`

Deploy: Push to `main` branch → Vercel auto-deploys.

## Phase Roadmap

- ✅ Phase 1–2: P2P desk (live, manual, existing)
- ✅ Phase 3: Corridor Network (this build)
- 🔜 Phase 4: PWA + Smart contract escrow (future)

## What NOT to Change

- Do NOT add Paystack. Payments go directly to Coach's MoMo.
- Do NOT rebuild the P2P desk. This extends it.
- Do NOT move away from TRC20 for USDT (Tron is cheapest).
