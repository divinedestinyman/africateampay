# AfricaTeamPay — CLAUDE.md (v2.0)

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
pending → payment_received → converting → sending → completed
       → cancelled                      → failed → refunded
       → rate_locked                    → disputed → completed/refunded
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, outbound corridor cards, inbound banner, how it works |
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
| `/api/rates` | GET | Live USDT/UGX rate (CoinGecko, 10-min cached) |
| `/api/rates/multi` | GET | Multi-currency fiat rates (open.er-api.com, 10-min cached) |
| `/api/orders` | GET | List orders (`?status=`, `?ref=` filters) |
| `/api/orders` | POST | Create new order (accepts all v2 fields) |
| `/api/orders/[id]` | GET | Single order |
| `/api/orders/[id]` | PATCH | Update status + blockchain_tx_hash (requires `x-admin-token`) |
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

## Session Roadmap

- ✅ Session 1: Bug fixes + v2 foundation (NaN fix, schema v2, 15 corridors, new admin)
- 🔜 Session 2: /send self-service order form + rate lock + wallet display
- 🔜 Session 3: /send-to-uganda hub + direction toggle homepage + multi-currency calculator
- 🔜 Session 4: Outbound expansion (India, Turkey, Japan, Korea, Malaysia)
- 🔜 Session 5: Blockchain tracking + dispute flow
- 🔜 Session 6: Supplier directory + PWA
- 🔜 Session 7: Accounts + KYC + multilingual

## Hard Rules (Do Not Violate)

- No Paystack. Payments go directly to Coach's MTN MoMo.
- Never rebuild the P2P desk. This extends it.
- Never hardcode wallet addresses. Always read from WALLET_* env vars.
- Never show COACH_MOMO_NUMBER in the UI. Use WhatsApp CTA instead.
- TRC20 is the default/recommended chain ($0.01 fee). Never change this default.
- Reference format: ATP-YYYYMMDD-XXXX (not ACT-).
- This is a real financial product. Every broken feature costs real money. Test everything.
