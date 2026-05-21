# AfricaTeamPay — CLAUDE.md (v2.1)

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
- 🔜 Session 7: Accounts + KYC + multilingual

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

#### 1. TxStatusCard component (track page is broken without it)
`app/track/[reference]/page.jsx` references `<TxStatusCard>` but the component was never written. The file has this placeholder where the old TX hash block was:
```jsx
{order.blockchain_tx_hash && (
  <TxStatusCard hash={order.blockchain_tx_hash} chain={order.sending_chain || 'trc20'} reference={order.reference} />
)}
```
Add `TxStatusCard` as a client component at the top of the file:
- Polls `/api/tx-status?hash=...&chain=...` every 30s while `!confirmed`
- Shows: TX hash (truncated), confirmations count (e.g. "14 confirmations"), confirmed ✅ / pending ⏳ badge
- Explorer link with correct chain (tronscan / bscscan / polygonscan etc)
- Download receipt button: `<a href={/receipt/${reference}}>Download Receipt</a>`

#### 2. Admin disputes tab
`app/admin/page.jsx` needs a "Disputes" tab alongside the orders table:
- Fetch `GET /api/disputes` with admin auth header (add this route — currently only `POST /api/disputes` and `PATCH /api/disputes/[id]` exist)
- Show: reference, issue type, contact, expected vs received, status, created date
- Action buttons: "Resolve", "Refund", "Need Info" — call `PATCH /api/disputes/[id]`
- Filter by status: open / resolved / refunded
- Need to add `GET /api/disputes/route.js` as well (returns all disputes with admin auth)

#### 3. GET /api/disputes route (missing)
Add `GET` handler to `app/api/disputes/route.js` (currently only has `POST`):
```js
export async function GET(request) {
  const token = request.headers.get('x-admin-token');
  if (!token || token !== process.env.ADMIN_TOKEN) return 401;
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || undefined;
  const disputes = await getDisputes({ status });
  return NextResponse.json({ disputes });
}
```

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

## What Next Session Must Build (Session 7)

## Hard Rules (Do Not Violate)

- No Paystack. Payments go directly to Coach's MTN MoMo.
- Never rebuild the P2P desk. This extends it.
- Never hardcode wallet addresses. Always read from WALLET_* env vars.
- Never show COACH_MOMO_NUMBER in the UI. Use WhatsApp CTA instead.
- TRC20 is the default/recommended chain ($0.01 fee). Never change this default.
- Reference format: ATP-YYYYMMDD-XXXX (not ACT-).
- This is a real financial product. Every broken feature costs real money. Test everything.
