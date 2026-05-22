AFRICATEAMPAY — COMPLETE ULTIMATE SYSTEMS BRIEF v2.0
====================================================
Read every word before writing a single line of code.
This is the master document. Nothing is optional.
====================================================

WHAT THIS DOCUMENT COVERS:
  Part A — Inbound (World → Uganda remittances)
  Part B — Outbound (Uganda → World trade payments)
  Part C — Universal system architecture
  Part D — Complete database schema
  Part E — All pages to build
  Part F — Build order

Uganda imports $32.82 billion annually from 50+ countries.
Uganda receives $2.5 billion in diaspora remittances.
Both flows have the same problem: expensive, slow, broken.
AfricaTeamPay fixes both. In one platform.

════════════════════════════════════════════════════════════
PART A — THE TRUST ARCHITECTURE (applies to everything)
════════════════════════════════════════════════════════════

Current system fatal flaw: single point of failure.
"Trust Coach personally via WhatsApp." Nothing else.

Replace with 4-layer trust system:

Layer 1 — BLOCKCHAIN ESCROW
  All USDT transactions detected on-chain automatically.
  No human confirmation needed to verify receipt.
  Show users: "Your USDT arrived. TX: [hash]. View →"
  Blockchain is the receipt. Immutable. Undeniable.
  Use Trongrid API / BSCScan API / Polygonscan API.
  Poll monitored addresses every 60 seconds.

Layer 2 — SOCIAL PROOF
  Show: "50,000+ Africa Team members trust this"
  Show: Live transaction counter (e.g. "5,231 completed")
  Show: Total volume processed ("$1.2M sent")
  Show: Average rating ("4.9/5 from 412 reviews")
  Show: Real testimonials with Telegram usernames

Layer 3 — SMART ORDER SYSTEM
  Every order: unique reference ATP-YYYYMMDD-XXXX
  Real-time tracking at /track/[reference]
  Status updates automatically from blockchain
  Email + Telegram at every status change
  No need to WhatsApp Coach to check progress

Layer 4 — DISPUTE RESOLUTION
  /dispute page — TX hash + issue description
  48-hour resolution SLA shown publicly
  Creates accountability. Builds trust.

════════════════════════════════════════════════════════════
PART B — MULTI-CHANNEL CONTACT (never force WhatsApp)
════════════════════════════════════════════════════════════

NEVER force any single channel. Offer all of these:

Channel 1: WhatsApp — wa.me/256784277664 (primary)
Channel 2: Telegram — @AfricaTeamBot (automated + live)
Channel 3: Email — pay@africateampay.com (business)
Channel 4: Web form at /contact (async, no app needed)
Channel 5: Self-service order form at /send (no contact)

THE SELF-SERVICE ORDER FORM (/send) — CRITICAL:
Users must be able to place complete orders WITHOUT
contacting Coach at all. Form collects everything:
  - Transfer direction (sending from or to Uganda)
  - Amount + currency
  - Sending chain (multi-chain selector)
  - Their wallet / payment details
  - Recipient details + settlement preference
  - Email for updates
  - Optional: Telegram username

After submitting:
  - Unique reference generated: ATP-XXXX
  - System shows wallet address to send to
  - Email confirmation with all details
  - Coach gets Telegram notification instantly
  - User tracks at /track/ATP-XXXX

A user with no WhatsApp can complete a transfer
using only their email and a web browser.

════════════════════════════════════════════════════════════
PART C — MULTI-CHAIN SUPPORT (any blockchain accepted)
════════════════════════════════════════════════════════════

Accept every major chain. Show on order confirmation:

PREFERRED (cheapest):
  TRC20 (Tron USDT) — $0.01 fee — RECOMMENDED
  BEP20 (BSC USDT) — ~$0.05 fee
  Polygon (USDT) — ~$0.01 fee

ALSO ACCEPTED:
  ERC20 (Ethereum) — $3–15 fee — avoid if possible
  Solana (USDT) — ~$0.001 fee
  Base (USDC) — ~$0.001 fee

ALSO ACCEPT:
  USDC (same as USDT, 1:1 — accepted on all chains above)
  BTC (converted at market rate, noted in order)
  ETH (converted at market rate, noted in order)

Chain selector UI on order form:
  User selects chain → system shows correct wallet address
  System notes estimated fee for each chain
  User makes informed choice

Coach manages multiple wallets in Binance.
Each chain has its own deposit address.
All land in same Binance account.
Wallet addresses stored in DB table wallet_addresses.
Coach enters real addresses in Vercel env vars.

════════════════════════════════════════════════════════════
PART D — RATE LOCK SYSTEM
════════════════════════════════════════════════════════════

Problem: User calculates, then rate changes before paying.
This is the #1 source of disputes and trust damage.

Solution: 30-minute rate lock on every order.

When order form submitted:
  → Record USDT/UGX rate at exact moment
  → Lock rate for 30 minutes
  → Show countdown timer on order page
  → If USDT sent within 30 mins → locked rate honoured
  → If missed → rate refreshes on next submit

Display:
  ┌────────────────────────────────────────┐
  │ Rate locked: 1 USDT = 3,751 UGX       │
  │ Valid until: 14:35 EAT ⏱ 28:42       │
  │ Send before timer expires              │
  └────────────────────────────────────────┘

Same logic for outbound: lock the UGX→USDT rate
for the duration of the order window.

════════════════════════════════════════════════════════════
PART E — SETTLEMENT OPTIONS (not just MoMo)
════════════════════════════════════════════════════════════

For INBOUND transfers (to Uganda recipients):

Option 1: MTN MoMo — UGX to mobile money
  Fee: included in 1%. Speed: 1 hour.

Option 2: Airtel Money — UGX to mobile money
  Fee: included in 1%. Speed: 1 hour.

Option 3: Uganda Bank Transfer
  Stanbic, DFCU, Centenary, Equity, Absa, etc.
  Requires: account name, number, bank, branch
  Fee: +0.5%. Speed: 1–3 business days.
  Target: businesses, salary recipients, landlords.

Option 4: USDT Delivery to recipient wallet
  Recipient keeps USDT — doesn't convert to UGX
  Requires: recipient TRC20/BEP20 wallet address
  Fee: included in 1%. Speed: 30 minutes.
  Target: crypto-savvy recipients, investors.

Option 5: Cash Pickup (Kampala agents)
  Recipient collects UGX cash from Coach/agent
  Requires: name, phone, national ID number
  Fee: +1%. Speed: same day, business hours.
  Target: elderly, rural, unbanked recipients.

For OUTBOUND transfers (Uganda → supplier/world):

Option 1: USDT to supplier wallet (any chain)
  Most common for China/UAE crypto-accepting suppliers.

Option 2: Supplier bank T/T via Coach
  Coach converts USDT to USD/CNY/AED/INR via
  Binance → withdraws → wires to supplier bank.
  Fee: 1% + $25–40 wire transfer cost.
  Speed: 3–5 business days.
  Target: suppliers who don't accept USDT.

Option 3: Platform escrow (Alibaba Trade Assurance)
  Coach facilitates payment to Alibaba escrow.
  Goods verified → payment released.
  Fee: 1.5%. Speed: per trade terms.
  Target: Alibaba platform buyers.

Option 4: Agent-facilitated payment
  Coach's trusted agent in China/India/Turkey
  collects cash locally and pays supplier.
  Fee: 2%. Speed: 24 hours.
  Target: suppliers who want local currency cash.

════════════════════════════════════════════════════════════
PART F — UNIVERSAL CALCULATOR (all currencies, both ways)
════════════════════════════════════════════════════════════

The calculator must handle every scenario:

INBOUND MODE (sending to Uganda):
  "I am in [country] and want to send [amount] [currency]"
  → Family receives: [UGX amount] via [settlement method]

  Currency dropdown (all major currencies):
  USD, GBP, EUR, SAR, AED, CAD, AUD, QAR, ZAR,
  KES, TZS, RWF, CNY, INR, TRY, JPY, KRW, MYR,
  IDR, THB, BRL, SEK, NOK, DKK, CHF, NGN, GHS,
  EGP, MAD, XOF (FCFA), ZMW, ETB, TZS, MZN

OUTBOUND MODE (sending from Uganda):
  "I want to pay my supplier [amount] in [currency]"
  → I need: [UGX amount] to convert
  → My supplier receives: [amount in their currency]

  Supplier currency dropdown:
  CNY (China), INR (India), AED (UAE), TRY (Turkey),
  USD (USA/global), GBP (UK), EUR (Europe), JPY (Japan),
  KRW (South Korea), MYR (Malaysia), IDR (Indonesia),
  THB (Thailand), VND (Vietnam), BDT (Bangladesh),
  PKR (Pakistan), ZAR (South Africa), USDT (any country)

Exchange rate API:
  Primary: exchangerate-api.com free tier (1500/month)
  Fallback: open.er-api.com (free, no key)
  Cache: 10 minutes server-side
  Never call on every keystroke — debounce 500ms

Calculation logic:
  1. Get user input amount in their currency
  2. Convert to USD via exchange rate API
  3. Convert USD to USDT (1:1)
  4. Subtract 1% Coach fee
  5. For inbound: convert USDT to UGX via CoinGecko
  6. For outbound supplier: convert USDT to supplier currency

Show comparison table on all calculator results:
  | Method | Their fee on [$X] | Time | Pain |
  | Bank wire | $X–Y | 3–5 days | SWIFT fees |
  | Western Union | $X–Y | 1–3 days | Queue |
  | MoneyGram | $X–Y | 1–2 days | Hidden FX |
  | AfricaTeamPay | 1% | 1 hour | Just send USDT |
  | You save | $[savings] | | |

════════════════════════════════════════════════════════════
PART G — INBOUND: SEND TO UGANDA (World → Uganda)
════════════════════════════════════════════════════════════

THIS IS THE LARGEST MARKET.
Uganda received $2.5 billion in remittances in 2025.
Top source countries: USA ($702M), Saudi Arabia,
UAE, UK, Canada, Australia, Germany, Qatar.

PAGE: /send-to-uganda (primary inbound hub)

Hero:
  "WHEREVER YOU ARE — SEND MONEY HOME TO UGANDA"
  "USA, Saudi Arabia, UAE, UK, Canada, Australia,
   Germany, Qatar, Sweden — if you can buy USDT,
   Coach converts it to UGX. Family gets mobile money
   within 1 hour. 1% flat fee."

Stats bar (Bank of Uganda 2025 data):
  $2.5B sent to Uganda by diaspora in 2025
  1.66 million Ugandans received remittances
  Average bank cost: 8–12% per transfer
  AfricaTeamPay cost: 1% flat

UNIVERSAL FLOW (works from ANY country):

Step 1: Buy USDT in your country
  Show exchange table by region:
  USA: Coinbase, Kraken, Gemini (all licensed)
  Saudi/UAE/Qatar: Binance, Rain.com
  UK: Coinbase UK, Binance UK (FCA regulated)
  Canada: Bitbuy, Newton, Coinbase
  Australia: CoinSpot, Swyftx, Coinbase
  Germany/EU: Bitpanda, Coinbase EU, Kraken
  South Africa: VALR, Luno, Binance
  Any other country: Binance (100+ countries)
  
  "Always use TRC20 (Tron) network when sending.
   NOT ERC20. TRC20 fee = $0.01. ERC20 = $5–20."

Step 2: Place your order at /send
  Fill the self-service form. Get wallet address.
  No WhatsApp needed.

Step 3: Send USDT to Coach wallet
  Transaction confirms on blockchain in 1–2 minutes.
  System detects automatically. Status updates.

Step 4: Family receives UGX
  Coach converts → sends to mobile money.
  Both sender and recipient notified.
  Average time: 1 hour.

TOP SOURCE COUNTRY CARDS (based on Bank of Uganda data):
  Show 8 cards: USA, Saudi Arabia, UAE, UK,
  Canada, Australia, Germany, Qatar
  Each shows: flag, "Ugandans here", typical transfer
  All link to same /send form with country pre-selected

CORRIDOR-SPECIFIC PAGES still exist (existing pages):
  /corridors/china (outbound — trader going to China)
  /corridors/uae (outbound — trader going to UAE)
  /corridors/uk (outbound — student/traveller to UK)
  /corridors/kenya (outbound — trader to Kenya)
  
  These are OUTBOUND (Uganda → away).
  /send-to-uganda is INBOUND (world → Uganda).
  Keep both. They serve different users.

INBOUND FAQ:
  Q: I've never used crypto. Can I still do this?
  A: Yes. Buying USDT on Coinbase takes 10 minutes.
     Verify ID once, then buy and send forever.
     Coach can guide you on WhatsApp first time.

  Q: Is this legal in [UK/USA/UAE/Saudi/etc]?
  A: Yes in US, UK, EU, Canada, Australia, UAE, Saudi.
     USDT is a stablecoin. You are transferring a 
     digital asset. All listed exchanges are licensed.

  Q: What does my family need?
  A: Just MTN MoMo or Airtel number. No crypto needed.
     No smartphone. No bank account.
     Coach sends UGX directly to their mobile money.

  Q: What is TRC20?
  A: Tron blockchain — cheapest USDT network.
     Sending 10,000 USDT costs $0.01.
     Select TRC20 on your exchange, never ERC20.

  Q: How fast?
  A: 1 hour after Coach receives your USDT.
     Business hours 8am–8pm EAT.
     Outside hours: fulfilled by 9am next day.

  Q: Minimum/maximum?
  A: Minimum $50 equivalent. No maximum.
     Over $5,000: WhatsApp Coach for VIP handling.

════════════════════════════════════════════════════════════
PART H — OUTBOUND: UGANDA → WORLD TRADE PAYMENTS
════════════════════════════════════════════════════════════

THIS IS THE SECOND LARGEST MARKET.
Uganda imports $32.82 billion annually.
Top suppliers: China, UAE, India, Turkey, Japan,
South Korea, Germany, USA, Malaysia, Indonesia.

Current site: 4 corridors, all assume physical travel.
New system: any country, remote or travel, any supplier.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
H1. THE GLOBAL SUPPLIER PAYMENT PAGE (/pay-supplier)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hero:
  "PAY YOUR SUPPLIER ANYWHERE IN THE WORLD"
  "China, India, Turkey, UAE, Japan, USA —
   Convert UGX to USDT. Pay any supplier.
   Remote or in-person. 1% flat fee.
   No bank. No SWIFT. No 3-5 day wait."

Two flow types:

FLOW 1 — TRAVELING TO BUY (in-person)
  "I am traveling to [country] to buy goods"
  → Convert UGX to USDT before leaving
  → Take USDT on phone
  → Pay supplier directly at market/factory
  → Current: China/UAE/UK/Kenya exist
  → New: ALL countries available

FLOW 2 — REMOTE SUPPLIER PAYMENT
  "I am ordering from a supplier remotely"
  (on Alibaba, WeChat, phone, email)
  → Three sub-options:
  
  Option A: Supplier accepts USDT
    → Give supplier Coach's wallet address
    → Send UGX to Coach
    → Coach sends USDT to supplier
    → Done in 1 hour
  
  Option B: Supplier wants bank T/T
    → Coach converts USDT to USD
    → Withdraws and wires to supplier bank
    → Provide: SWIFT/IBAN, account details
    → Fee: 1% + wire cost
    → Timeline: 3–5 business days
  
  Option C: Supplier wants local currency (CNY/INR/AED)
    → Coach converts and sends via local rails
    → China: WeChat Pay or Alipay to agent
    → India: UPI or NEFT to agent
    → UAE: local bank transfer
    → Fee: 1.5% (covers conversion + local transfer)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
H2. EXPANDED COUNTRY CORRIDORS (all countries, not 4)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Replace 4 fixed corridor pages with a DYNAMIC system.

/corridors/[country] — any country works

Countries with dedicated optimised pages (top importers):
  /corridors/china    ← existing, keep and enhance
  /corridors/india    ← NEW — 10.3% of Uganda imports
  /corridors/turkey   ← NEW — Istanbul Grand Bazaar
  /corridors/uae      ← existing, keep and enhance
  /corridors/usa      ← NEW — medical, tech equipment
  /corridors/japan    ← NEW — vehicles, electronics
  /corridors/uk       ← existing, keep and enhance
  /corridors/germany  ← NEW — industrial machinery
  /corridors/kenya    ← existing, keep and enhance
  /corridors/southkorea ← NEW — electronics, K-goods
  /corridors/malaysia ← NEW — palm oil, electronics
  /corridors/indonesia ← NEW — textiles, commodities

For ALL other countries not listed:
  /corridors/other — universal page
  "Don't see your country? We cover 50+ countries.
   WhatsApp Coach with your supplier country and details."

Country page template (same structure for all):
  - Country flag + import stats (what Uganda imports)
  - "What Ugandan traders buy here"
  - Payment options available (USDT / T/T / Local)
  - Accepted stablecoins/chains by local merchants
  - Calculator pre-set to that country currency
  - Local exchange recommendation for that country
  - Step-by-step guide (travel + remote)
  - FAQ specific to that country
  - Affiliate links to relevant exchanges

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
H3. INDIA CORRIDOR PAGE (/corridors/india)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hero: "PAYING INDIAN SUPPLIERS? UGX → USDT → INR"
Sub: "Pharmaceuticals, textiles, machinery, spices.
     India is Uganda's 3rd largest import partner.
     Pay any Indian supplier for 1% flat fee."

What Ugandans buy from India:
  Pharmaceuticals and medicines (largest category)
  Textiles and garments
  Machinery and equipment
  Rice and agricultural goods
  Electronics and components
  Steel and metal products

Payment options in India:
  Option 1: Supplier accepts USDT (growing in India)
  Option 2: T/T bank wire (most common for India)
  Option 3: UPI via India agent (cheapest for small orders)

Note: India has restricted crypto in certain contexts.
  Indian suppliers typically prefer T/T (bank wire).
  Coach converts USDT → USD → wires to Indian bank.
  Coach's network includes an India-based agent for
  UPI payments on small orders (under $1,000).

Step by step:
  1. WhatsApp Coach with supplier bank details
  2. Convert UGX to USDT equivalent + 1% fee via MoMo
  3. Coach converts USDT to USD
  4. Coach wires to Indian supplier bank via SWIFT
  5. Supplier confirms receipt in 3–5 business days
  6. Goods dispatched

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
H4. TURKEY CORRIDOR PAGE (/corridors/turkey)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hero: "BUYING FROM TURKEY? PAY IN USDT OR BANK WIRE"
Sub: "Istanbul Grand Bazaar, Merter, Laleli markets.
     Clothing, leather, textiles, electronics.
     1% fee. Remote or in-person payment."

What Ugandans buy from Turkey:
  Clothing and fashion (Laleli/Merter wholesale)
  Leather goods and bags
  Electronics and appliances
  Furniture and home goods
  Textiles and fabrics
  Steel products

Payment options in Turkey:
  Option 1: USDT (Turkey has active P2P crypto market)
  Option 2: T/T bank wire in USD or EUR
  Option 3: Western Union (common but expensive)

Note: Turkey has high crypto adoption. Many Istanbul
wholesale traders accept USDT/USDC directly.
Turkey P2P market is very liquid for TRY/USDT.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
H5. SUPPLIER PAYMENT PROTECTION (escrow concept)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Problem: Trader pays supplier. Goods never arrive.
No recourse. No protection. Trust destroyed.

Solution: STAGED PAYMENT SYSTEM

Coach holds funds in escrow between stages:

Stage payment model (for new suppliers):
  Deposit (30%): Coach sends to supplier on order confirm
  Balance (70%): Coach sends on proof of shipment
                (bill of lading uploaded to order)
  
  Trader uploads: bill of lading / shipping confirmation
  Coach verifies document → releases balance payment
  
  Fee: +0.5% for escrow service (totals 1.5%)
  
On order form, staging options:
  [Single payment] — existing supplier, trusted
  [30/70 split] — new supplier, standard protection
  [50/50 split] — custom arrangement
  [Custom stages] — WhatsApp Coach for complex deals

BILL OF LADING UPLOAD:
  On order detail page: "Upload shipping document"
  File upload → image/PDF
  Coach reviews → clicks "Release balance payment"
  Funds sent to supplier
  Trader notified

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
H6. SUPPLIER DIRECTORY (trusted supplier network)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Problem: Small traders don't know reliable suppliers.
They get scammed. They lose money. They blame the payment system.

Solution: Verified Supplier Directory at /suppliers

Structure:
  Country tabs: China | India | Turkey | UAE | Other
  
  Each supplier listing:
    - Supplier name (or alias if privacy requested)
    - Category (clothing/electronics/machinery etc.)
    - Location (Yiwu/Guangzhou/Mumbai/Istanbul etc.)
    - Accepts USDT: Yes/No
    - Minimum order: $X
    - Verified by: Community review
    - Community rating: X/5 (from Africa Team traders)
    - Contact method: WhatsApp/WeChat/Email (encrypted)
  
  How to list a supplier:
    Traders who have used a supplier can submit review.
    Coach verifies and adds to directory.
    FREE to list (builds community value).
    
Revenue model: Featured supplier slots ($50/month).
  Suppliers pay to be featured at top of directory.

This keeps traders inside the AfricaTeamPay ecosystem
instead of going to Alibaba (where they get scammed).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
H7. TRADE FINANCE CALCULATOR (/trade-calculator)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"Should I fly to China or pay my supplier remotely?"

This question kills hours of Ugandan trader planning.
Build a decision calculator:

Inputs:
  Order value (UGX or USD)
  Supplier country
  Goods category
  Number of suppliers to visit

Outputs comparison table:

| | Fly there | Pay remotely |
|---|---|---|
| Cost of flights | $[estimate] | $0 |
| Hotel (X nights) | $[estimate] | $0 |
| Meals + transport | $[estimate] | $0 |
| Payment fee | 1% | 1% |
| Wire/bank fee | $0 | +$25–40 if T/T |
| Time cost | 7–14 days | 1–3 days |
| TOTAL | $[X] | $[Y] |
| RECOMMENDATION | [which is cheaper] |

This tool is unique. No competitor offers it.
It builds trust and keeps users on the platform.
Use static estimates for flights (CheapFlights API
or hardcoded averages per country).

════════════════════════════════════════════════════════════
PART I — ONBOARDING (for non-crypto users)
════════════════════════════════════════════════════════════

45-year-old Kampala market trader has never used crypto.
He imports from China every quarter. Cash businessman.
He lands on the site. He's lost in 10 seconds. He leaves.

The onboarding guide fixes this.

PAGE: /how-to-buy-usdt

Section 1: "I've never bought crypto before"
  Plain language explanation:
  "USDT is digital dollars. $1 USDT = $1 USD. Always.
   It doesn't go up or down in value like Bitcoin.
   You buy it on an app, send it to Coach, Coach
   gives your supplier their money. Simple."

Section 2: "Pick your location" dropdown
  → Shows top 2 exchanges + step-by-step guide
  → Regulatory status: "Is this legal here?" Yes/No

  USA: Coinbase — 5 minute signup guide
  UK: Coinbase UK — FCA regulated badge
  Saudi/UAE: Binance — Arabic language support
  Uganda: Binance P2P — buy USDT with MTN MoMo
  Any: Binance — 100+ countries

Section 3: "I have Bitcoin/ETH, not USDT"
  → "Swap function on Binance converts in 30 seconds"
  → Screenshot guide

Section 4: "I have UGX and want to buy USDT"
  → Binance P2P guide — buy USDT using MTN MoMo
  → This is the Uganda-local on-ramp
  → Step by step with screenshots

Section 5: Video guide embed
  → YouTube: "How to send money to China from Uganda"
  → This becomes Africa Team Trading channel content
  → Coach records once, evergreen content forever

AFFILIATE REVENUE:
  Every exchange link is an affiliate link.
  Coinbase: $10 per verified signup.
  Binance: 20–40% of all trading fees from referrals.
  This page EARNS while it TEACHES.

════════════════════════════════════════════════════════════
PART J — RECURRING TRANSFERS & SAVED TEMPLATES
════════════════════════════════════════════════════════════

92% of inbound remittances are regular (monthly).
Many outbound orders are quarterly from same supplier.
Currently: WhatsApp Coach from scratch each time.
That is friction. Friction = churn.

SAVED TRANSFER TEMPLATES:

After order completes, show:
  "Save this transfer for next time?
   One click to repeat next month."

Free account: email + password (Firebase auth).
Saved templates store:
  - Transfer direction (in/out)
  - Recipient/supplier name
  - Contact details (MoMo/bank/wallet)
  - Settlement method
  - Typical amount
  - Sending chain preference
  - Template name: "Mum's allowance" / "China supplier"

Next time: login → click template → form pre-filled
→ send USDT → done in 3 minutes.

MONTHLY REMINDER (opt-in):
  @AfricaTeamBot sends WhatsApp/Telegram message:
  "Hi John, time for Mum's monthly allowance.
   Ready: africateampay.vercel.app/send/t/abc123"
  User clicks → pre-filled → sends → done.

════════════════════════════════════════════════════════════
PART K — REAL-TIME BLOCKCHAIN TRACKING
════════════════════════════════════════════════════════════

PAGE: /track/[reference] — full upgrade

Visual timeline:
  ✅ Order created — 14:05 EAT — [reference]
  ✅ Awaiting USDT payment
     Chain: [selected chain]
     Send to: [wallet address] [copy button]
     Expected: [X USDT]
  ⏳ Blockchain monitoring active...
     Checking every 60 seconds
     [Live spinner]
  ⏸ USDT received on chain — [TX hash] [Tronscan →]
     Amount: [X USDT] ✓
     Confirmed at: [timestamp]
  ⏸ Converting USDT to UGX...
  ⏸ Sending to recipient
     Method: [settlement method]
     Details: [masked recipient info]
  ⏸ COMPLETED ✓
     [Download PDF Receipt]
     [Share receipt link]

Blockchain monitoring implementation:
  Tron: api.trongrid.io/v1/accounts/{address}/transactions
  BSC: api.bscscan.com/api?module=account&action=tokentx
  Polygon: api.polygonscan.com (same structure)
  Ethereum: api.etherscan.io (same structure)
  Solana: api.mainnet-beta.solana.com (different)
  
  Poll each relevant address every 60 seconds.
  Match by: expected amount ± 0.5% tolerance.
  When found: auto-update order status → notify both parties.
  
  Free API tiers (no cost):
    Trongrid: 10,000 calls/day free
    BSCScan: 100,000 calls/day free  
    Polygonscan: 100,000 calls/day free
    Etherscan: 100,000 calls/day free

PAGE AUTO-REFRESHES every 30 seconds when pending.
Show: "Last checked: 23 seconds ago"
No manual refresh needed.

════════════════════════════════════════════════════════════
PART L — RECEIPT & INVOICE SYSTEM
════════════════════════════════════════════════════════════

Every completed transfer auto-generates PDF:

RECEIPT (for inbound/remittances):
  Header: AfricaTeamPay | Transaction Receipt
  Reference: ATP-20260520-4821
  Date: 20 May 2026, 14:35 EAT
  Sender: John Doe | Location: United Kingdom
  Amount sent: £500 GBP
  USDT converted: $633.08 USDT
  TX Hash: [hash] | Network: Tron (TRC20)
  Coach fee: $6.33 (1%)
  Recipient: Jane Doe
  Settlement: MTN MoMo 0700xxxxxxx
  UGX delivered: 2,373,000 UGX
  Status: COMPLETED ✓
  Verify: tronscan.org/#/transaction/[hash]

SUPPLIER INVOICE (for outbound/trade payments):
  Header: AfricaTeamPay | Supplier Payment Confirmation
  Reference: ATP-20260520-9823
  Date/Time
  Buyer: [trader name] | Kampala, Uganda
  Supplier: [name] | [country]
  Goods description: [from order form]
  Order value: [USD/CNY/INR amount]
  UGX equivalent: [amount]
  Payment method: USDT (TRC20) / Bank T/T
  TX Hash or SWIFT reference
  Proof of payment: CONFIRMED ✓
  
  "This document serves as proof of international
   payment for customs clearance purposes."

Useful for:
  URA customs declarations (UGX value of import)
  UK/US/EU tax records for diaspora senders
  Visa applications (proof of financial support)
  Business accounting and bookkeeping

Auto-email on completion. Also downloadable from
/track/[reference] at any time after completion.

════════════════════════════════════════════════════════════
PART M — MULTILINGUAL SUPPORT
════════════════════════════════════════════════════════════

Ugandans abroad speak many languages.
Priority:

Language 1: English (default) — done
Language 2: Arabic — Saudi/UAE/Qatar senders
  RTL layout required. Right-to-left text.
Language 3: French — Belgium, France, Canada senders
Language 4: German — Germany, Austria, Switzerland
Language 5: Luganda — LOCAL Uganda audience
  "Wano tusobola okukuyamba okutuma ssente"
  Speaking Luganda = massive community trust signal

Implementation:
  Use next-intl library.
  Auto-detect via navigator.language.
  Language switcher in navbar (flag icons).
  Translation files: /messages/en.json, /messages/ar.json,
  /messages/fr.json, /messages/de.json, /messages/lg.json
  
  Use Claude API to generate initial translations.
  Store static for now. Community corrects errors.

Priority pages first:
  1. /send-to-uganda
  2. /how-to-buy-usdt  
  3. /track
  4. Homepage
  5. /send order form

════════════════════════════════════════════════════════════
PART N — LARGE AMOUNTS & BUSINESS TRANSFERS
════════════════════════════════════════════════════════════

For amounts over $5,000 (inbound or outbound):
  Show VIP handling option:
  "Large transfer? Get personal service."
  WhatsApp + Telegram links. Rate negotiation offered.
  Dedicated handling by Coach.

BUSINESS BULK PAYMENT PAGE (/business):
  "Paying multiple suppliers or staff in Uganda?"
  "Upload a CSV. We handle all payments in one batch."

CSV format (outbound — multiple suppliers):
  supplier_name, country, payment_method, amount_usd, 
  bank_details_or_wallet, goods_description

CSV format (inbound — payroll to Uganda staff):
  recipient_name, momo_number, network, amount_ugx, notes

Pricing: 0.8% for bulk (discount from 1%)
Minimum batch: 3 recipients/suppliers
Maximum: 200 per batch (matches WorldFirst capability)

KYC for large amounts:
  Over $3,000 equivalent: request ID verification
  Upload: passport or national ID photo
  Store: encrypted in Railway DB (hashed reference)
  Protects Coach legally.
  
  Build simple upload UI.
  Admin reviews via /admin KYC tab.

════════════════════════════════════════════════════════════
PART O — SERVICE LEVEL AGREEMENT (operational trust)
════════════════════════════════════════════════════════════

Show publicly on homepage and order pages:

Service Level Commitments:
  ✓ Business hours: 8am–8pm EAT, 7 days/week
  ✓ Average processing time: under 1 hour
  ✓ Out-of-hours orders: processed by 9am EAT
  ✓ WhatsApp response: within 30 minutes (business hrs)
  ✓ Disputes: 48-hour resolution guarantee
  ✓ Failed transfers: full refund within 24 hours

For 24/7 coverage (Phase 2):
  Recruit 2 trusted desk partners from community.
  Partners handle out-of-hours settlements.
  Earn 0.3% of each transaction they handle.
  Coach reviews all transactions daily.
  
For Phase 1 (now):
  Show clear business hours.
  Out-of-hours: auto-message explains next morning.
  Expectation set = no trust broken.

════════════════════════════════════════════════════════════
PART P — DISPUTE RESOLUTION
════════════════════════════════════════════════════════════

PAGE: /dispute

Form fields:
  Order reference (required)
  TX hash of payment sent (required)
  Issue type: [wrong amount / not received /
               supplier not paid / other]
  Expected amount vs received amount
  Additional details
  Contact email
  [Submit Dispute]

On submission:
  → Coach notified on Telegram immediately
  → Auto-email to submitter: "Received. 48hr resolution."
  → Case logged in DB disputes table
  → Admin /disputes tab shows all open cases

Resolution options for Coach:
  Confirm and refund (button)
  Confirm and top up (button)
  Request more info (message field)
  Mark resolved (button)

Show on homepage: "Dispute? We resolve in 48 hours."
This turns a scary promise into a trust signal.

════════════════════════════════════════════════════════════
PART Q — WHAT IF COACH IS UNAVAILABLE
════════════════════════════════════════════════════════════

Current risk: Coach sick/traveling/offline = orders stuck.
This is catastrophic for trust and reputation.

Solution A (Phase 1 — now):
  Clear business hours posted everywhere.
  Auto-response on new orders outside hours:
  "Order received ✓. Coach will process by 9am EAT.
   Your rate is locked until [time + 30 mins tomorrow]."
  
  Rate lock extends for out-of-hours orders:
  If order at 11pm → rate locked until 9:30am next day.
  User sees timer counting down to when Coach will process.

Solution B (Phase 2):
  Recruit desk partners. Each partner gets:
  - Their own login to /admin with limited permissions
  - Can mark orders complete but not create orders
  - Coach sees audit log of all partner actions
  - Partners are trusted community members (vetted)

════════════════════════════════════════════════════════════
PART R — DATABASE SCHEMA (COMPLETE)
════════════════════════════════════════════════════════════

Run all of this when Railway DB is available.
Currently using SQLite fallback — same schema applies.

-- CORRIDORS
CREATE TABLE corridors (
  id VARCHAR(30) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  flag VARCHAR(10),
  direction VARCHAR(10) DEFAULT 'outbound',
  -- 'outbound' = Uganda→country, 'inbound' = country→Uganda
  fee_percent DECIMAL(5,2) DEFAULT 1.00,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  primary_currency VARCHAR(10),
  notes TEXT
);

INSERT INTO corridors VALUES
  ('china',    'China',          '🇨🇳','outbound',1.00,true,1,'CNY',NULL),
  ('india',    'India',          '🇮🇳','outbound',1.00,true,2,'INR',NULL),
  ('turkey',   'Turkey',         '🇹🇷','outbound',1.00,true,3,'TRY',NULL),
  ('uae',      'United Arab Emirates','🇦🇪','both',1.00,true,4,'AED',NULL),
  ('uk',       'United Kingdom', '🇬🇧','both',1.00,true,5,'GBP',NULL),
  ('usa',      'United States',  '🇺🇸','both',1.00,true,6,'USD',NULL),
  ('kenya',    'Kenya',          '🇰🇪','both',1.00,true,7,'KES',NULL),
  ('germany',  'Germany',        '🇩🇪','both',1.00,true,8,'EUR',NULL),
  ('japan',    'Japan',          '🇯🇵','outbound',1.00,true,9,'JPY',NULL),
  ('southkorea','South Korea',   '🇰🇷','outbound',1.00,true,10,'KRW',NULL),
  ('malaysia', 'Malaysia',       '🇲🇾','outbound',1.00,true,11,'MYR',NULL),
  ('canada',   'Canada',         '🇨🇦','inbound',1.00,true,12,'CAD',NULL),
  ('australia','Australia',      '🇦🇺','inbound',1.00,true,13,'AUD',NULL),
  ('saudi',    'Saudi Arabia',   '🇸🇦','inbound',1.00,true,14,'SAR',NULL),
  ('qatar',    'Qatar',          '🇶🇦','inbound',1.00,true,15,'QAR',NULL);

-- ORDERS (expanded)
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference VARCHAR(25) UNIQUE NOT NULL,
  -- Direction: 'inbound'=world→Uganda, 'outbound'=Uganda→world
  direction VARCHAR(10) NOT NULL DEFAULT 'outbound',
  
  -- Sender info
  sender_name VARCHAR(255),
  sender_email VARCHAR(255),
  sender_whatsapp VARCHAR(50),
  sender_telegram VARCHAR(100),
  sender_country VARCHAR(100),
  sender_currency VARCHAR(10) DEFAULT 'UGX',
  sender_amount DECIMAL(18,2),
  
  -- Transfer details
  corridor_id VARCHAR(30) REFERENCES corridors(id),
  amount_ugx BIGINT,
  amount_usdt DECIMAL(18,6),
  fee_ugx BIGINT,
  fee_usdt DECIMAL(18,6),
  usdt_rate DECIMAL(18,2),
  rate_lock_expires_at TIMESTAMP,
  rate_honoured BOOLEAN DEFAULT false,
  
  -- Sending chain
  sending_chain VARCHAR(20) DEFAULT 'trc20',
  -- trc20|bep20|polygon|erc20|solana|base
  
  -- Outbound supplier details
  supplier_name VARCHAR(255),
  supplier_country VARCHAR(100),
  supplier_payment_method VARCHAR(30),
  -- usdt_wallet|bank_tt|local_agent|platform_escrow
  supplier_wallet VARCHAR(255),
  supplier_bank_name VARCHAR(100),
  supplier_bank_account VARCHAR(100),
  supplier_bank_swift VARCHAR(50),
  supplier_bank_iban VARCHAR(100),
  supplier_currency VARCHAR(10),
  supplier_amount DECIMAL(18,2),
  goods_description TEXT,
  
  -- Staging/escrow
  payment_type VARCHAR(20) DEFAULT 'single',
  -- single|staged_30_70|staged_50_50|custom
  deposit_percent INTEGER DEFAULT 100,
  deposit_paid BOOLEAN DEFAULT false,
  balance_paid BOOLEAN DEFAULT false,
  shipping_doc_url VARCHAR(500),
  shipping_doc_verified BOOLEAN DEFAULT false,
  
  -- Inbound recipient details
  recipient_name VARCHAR(255),
  recipient_whatsapp VARCHAR(50),
  settlement_method VARCHAR(20) DEFAULT 'mtn_momo',
  -- mtn_momo|airtel|bank_transfer|usdt_wallet|cash_pickup
  recipient_momo_number VARCHAR(50),
  recipient_momo_network VARCHAR(20),
  recipient_bank_name VARCHAR(100),
  recipient_bank_account VARCHAR(50),
  recipient_bank_branch VARCHAR(100),
  recipient_wallet_address VARCHAR(255),
  recipient_id_for_cash VARCHAR(50),
  
  -- Blockchain
  blockchain_tx_hash VARCHAR(255),
  blockchain_detected_at TIMESTAMP,
  blockchain_amount_received DECIMAL(18,6),
  
  -- Admin
  admin_notes TEXT,
  processed_by VARCHAR(100) DEFAULT 'coach',
  
  -- Status
  status VARCHAR(30) DEFAULT 'pending',
  -- pending|rate_locked|payment_received|converting|
  -- sending|completed|failed|refunded|disputed
  
  -- KYC (for large amounts)
  kyc_required BOOLEAN DEFAULT false,
  kyc_doc_url VARCHAR(500),
  kyc_verified BOOLEAN DEFAULT false,
  
  -- Receipts
  receipt_sent BOOLEAN DEFAULT false,
  receipt_pdf_url VARCHAR(500),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  rate_locked_at TIMESTAMP,
  payment_confirmed_at TIMESTAMP,
  usdt_sent_at TIMESTAMP,
  completed_at TIMESTAMP
);

-- RATE LOCKS
CREATE TABLE rate_locks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  usdt_ugx_rate DECIMAL(18,2) NOT NULL,
  locked_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL,
  is_honoured BOOLEAN DEFAULT false
);

-- WALLET ADDRESSES (Coach configures)
CREATE TABLE wallet_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chain VARCHAR(20) NOT NULL,
  token VARCHAR(10) DEFAULT 'USDT',
  address VARCHAR(255) NOT NULL,
  network_fee_usd DECIMAL(10,4),
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  label VARCHAR(50)
);

INSERT INTO wallet_addresses 
  (chain, token, address, network_fee_usd, display_order, label)
VALUES
  ('trc20','USDT','PLACEHOLDER_TRC20',0.01,1,'Tron (TRC20) — Recommended'),
  ('bep20','USDT','PLACEHOLDER_BEP20',0.05,2,'BNB Smart Chain (BEP20)'),
  ('polygon','USDT','PLACEHOLDER_POLYGON',0.01,3,'Polygon'),
  ('solana','USDT','PLACEHOLDER_SOLANA',0.001,4,'Solana'),
  ('erc20','USDT','PLACEHOLDER_ERC20',8.00,5,'Ethereum (ERC20) — High fees'),
  ('base','USDC','PLACEHOLDER_BASE',0.001,6,'Base (USDC)');

-- BLOCKCHAIN MONITORING
CREATE TABLE monitored_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  chain VARCHAR(20) NOT NULL,
  wallet_address VARCHAR(255) NOT NULL,
  expected_amount_usdt DECIMAL(18,6),
  tolerance_percent DECIMAL(5,2) DEFAULT 0.5,
  detected_tx_hash VARCHAR(255),
  detected_amount DECIMAL(18,6),
  detected_at TIMESTAMP,
  is_monitoring BOOLEAN DEFAULT true,
  last_checked_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- SAVED TEMPLATES
CREATE TABLE transfer_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email VARCHAR(255) NOT NULL,
  user_password_hash VARCHAR(255),
  template_name VARCHAR(100),
  direction VARCHAR(10),
  corridor_id VARCHAR(30),
  recipient_name VARCHAR(255),
  recipient_contact VARCHAR(100),
  settlement_method VARCHAR(20),
  supplier_name VARCHAR(255),
  supplier_country VARCHAR(100),
  supplier_payment_method VARCHAR(30),
  typical_amount_usdt DECIMAL(18,6),
  sending_chain VARCHAR(20) DEFAULT 'trc20',
  goods_description TEXT,
  is_active BOOLEAN DEFAULT true,
  reminder_enabled BOOLEAN DEFAULT false,
  reminder_day INTEGER, -- day of month
  created_at TIMESTAMP DEFAULT NOW()
);

-- DISPUTES
CREATE TABLE disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_reference VARCHAR(25),
  tx_hash VARCHAR(255),
  submitter_email VARCHAR(255),
  submitter_whatsapp VARCHAR(50),
  issue_type VARCHAR(50),
  expected_amount DECIMAL(18,6),
  received_amount DECIMAL(18,6),
  description TEXT,
  status VARCHAR(20) DEFAULT 'open',
  admin_response TEXT,
  resolved_at TIMESTAMP,
  refund_amount DECIMAL(18,6),
  created_at TIMESTAMP DEFAULT NOW()
);

-- SUPPLIER DIRECTORY
CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255),
  category VARCHAR(100),
  country VARCHAR(100),
  city VARCHAR(100),
  market_location VARCHAR(255),
  accepts_usdt BOOLEAN DEFAULT false,
  accepts_tt BOOLEAN DEFAULT true,
  min_order_usd DECIMAL(10,2),
  contact_method VARCHAR(50),
  contact_encrypted TEXT,
  community_rating DECIMAL(3,2),
  review_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  featured_expires_at TIMESTAMP,
  is_verified BOOLEAN DEFAULT false,
  submitted_by VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- RATES LOG
CREATE TABLE rates_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usdt_ugx DECIMAL(18,2),
  usdt_usd DECIMAL(18,6),
  rates_json JSONB,
  source VARCHAR(50),
  fetched_at TIMESTAMP DEFAULT NOW()
);

-- INDEXES
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_reference ON orders(reference);
CREATE INDEX idx_orders_direction ON orders(direction);
CREATE INDEX idx_orders_corridor ON orders(corridor_id);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_orders_sender_email ON orders(sender_email);
CREATE INDEX idx_monitored_active ON monitored_transactions(is_monitoring);
CREATE INDEX idx_templates_email ON transfer_templates(user_email);
CREATE INDEX idx_disputes_status ON disputes(status);
CREATE INDEX idx_suppliers_country ON suppliers(country);
CREATE INDEX idx_suppliers_category ON suppliers(category);

-- AUTO-UPDATE updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

════════════════════════════════════════════════════════════
PART S — ENVIRONMENT VARIABLES (complete list)
════════════════════════════════════════════════════════════

# ── DATABASE ──────────────────────────────────────────
DATABASE_URL=                      # Railway PostgreSQL

# ── APP ───────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=https://africateampay.vercel.app
ADMIN_PASSWORD=                    # /admin page access
ADMIN_TOKEN=                       # API admin header

# ── COACH CONTACT ─────────────────────────────────────
COACH_WHATSAPP=256784277664
NEXT_PUBLIC_COACH_WHATSAPP=256784277664
COACH_MOMO_NUMBER=                 # MTN MoMo number
NEXT_PUBLIC_COACH_EMAIL=pay@africateampay.com

# ── TELEGRAM ──────────────────────────────────────────
TELEGRAM_BOT_TOKEN=7542027045:AAE2K9csPylsHlgj42TlC79RwlUFD1Kq6bg
TELEGRAM_ADMIN_CHAT_ID=378061184

# ── WALLET ADDRESSES (Coach fills these) ──────────────
WALLET_TRC20=                      # Tron USDT address
WALLET_BEP20=                      # BSC USDT address
WALLET_POLYGON=                    # Polygon USDT address
WALLET_ERC20=                      # Ethereum USDT address
WALLET_SOLANA=                     # Solana USDT address
WALLET_BASE=                       # Base USDC address

# ── RATES APIs (all free) ─────────────────────────────
COINGECKO_BASE_URL=https://api.coingecko.com/api/v3
EXCHANGERATE_API_KEY=              # exchangerate-api.com free
RATES_CACHE_MINUTES=10

# ── BLOCKCHAIN MONITORING (all free) ──────────────────
TRONGRID_API_KEY=                  # trongrid.io
BSCSCAN_API_KEY=                   # bscscan.com
POLYGONSCAN_API_KEY=               # polygonscan.com
ETHERSCAN_API_KEY=                 # etherscan.io
BLOCKCHAIN_POLL_INTERVAL=60000     # ms (60 seconds)

# ── EMAIL ─────────────────────────────────────────────
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=                        # Gmail address
EMAIL_PASS=                        # Gmail App Password
EMAIL_FROM=AfricaTeamPay <pay@africateampay.com>

════════════════════════════════════════════════════════════
PART T — ALL PAGES TO BUILD (complete list)
════════════════════════════════════════════════════════════

── EXISTING (fix and enhance) ──────────────────────────

/ (homepage)
  FIX: NaN rate bug — move to server-side /api/rates
  FIX: MY_MOMO_NUMBER placeholder
  ADD: Direction toggle (sending from / sending to Uganda)
  ADD: Social proof bar (transaction counter, volume, rating)
  ADD: Quick links to /send and /send-to-uganda
  ADD: SLA commitment bar ("1hr processing, 48hr disputes")
  KEEP: 4 outbound corridor cards (enhance with more)
  ADD: 4 inbound corridor cards (USA, Saudi, UAE, UK)
  ADD: Link to /pay-supplier for outbound
  ADD: Trust signals (blockchain receipts, community)

/corridors/china — keep, enhance with remote payment option
/corridors/uae — keep, enhance both directions
/corridors/uk — keep, enhance both directions
/corridors/kenya — keep, enhance both directions

/calculate — enhance
  ADD: Direction toggle (sending from/to Uganda)
  ADD: Full currency dropdown (30+ currencies)
  ADD: Supplier currency mode for outbound
  FIX: Rate fetched from /api/rates server-side

/track/[reference] — major upgrade
  ADD: Visual timeline
  ADD: Blockchain auto-detection
  ADD: Auto-refresh every 30 seconds
  ADD: PDF receipt download button
  ADD: Share receipt link

/admin — enhance
  ADD: KYC review tab
  ADD: Disputes management tab
  ADD: Blockchain monitoring status
  ADD: Supplier directory management
  ADD: Bulk export orders as CSV
  ADD: Revenue summary (total fees earned)

── NEW PAGES ───────────────────────────────────────────

/send (PRIORITY #1 — most important new page)
  Universal self-service order form.
  No WhatsApp needed. Complete transfer without contact.
  Fields:
    Direction toggle: [Sending FROM Uganda] [Sending TO Uganda]
    
    IF OUTBOUND (from Uganda):
      Are you: [Traveling in person] [Paying supplier remotely]
      Destination country (dropdown — 15+ countries + "Other")
      Amount in UGX
      Supplier accepts: [USDT] [Bank T/T] [Local agent]
      Sending chain (if USDT)
      Supplier details (name, wallet/bank)
      Goods description
      Payment type: [Single] [30/70 deposit] [50/50]
      
    IF INBOUND (to Uganda):
      Amount in [currency dropdown — 30+ currencies]
      Sending from country
      Sending chain
      Recipient name
      Settlement: [MTN MoMo] [Airtel] [Bank] [USDT] [Cash]
      Recipient details per settlement method
      
    Both:
      Your name
      Your email (required)
      Your WhatsApp (optional)
      Your Telegram (optional)
      Notes for Coach
      [Calculate & Place Order →]
    
  On submit:
    → Generate reference ATP-YYYYMMDD-XXXX
    → Lock rate for 30 minutes
    → Show wallet address to send USDT to
    → Show countdown timer
    → Send email confirmation
    → Notify Coach on Telegram
    → Redirect to /track/[reference]

/send-to-uganda (PRIORITY #2)
  Global inbound hub page.
  Works from any country on earth.
  Top 8 source country cards.
  Universal flow explanation.
  Full FAQ for international senders.
  Embedded calculator.
  All languages eventually.

/pay-supplier (PRIORITY #3)
  Outbound global supplier payment hub.
  Two modes: traveling vs remote.
  Country selector → loads corridor content dynamically.
  Payment option selector (USDT/T/T/agent).
  Embedded calculator.

/how-to-buy-usdt
  Country selector → exchange recommendations.
  Step-by-step guides.
  "I have BTC/ETH not USDT" section.
  "I have UGX and want to buy USDT" (Binance P2P Uganda).
  Affiliate links to exchanges.
  Video embed.

/corridors/india (NEW)
  India corridor full page. Template from China page.
  Uganda imports $1.25B/year from India.
  Pharma, textiles, machinery focus.
  T/T bank wire as primary method.

/corridors/turkey (NEW)
  Turkey corridor. Istanbul, Laleli, Merter markets.
  Clothing, leather, electronics focus.
  USDT + T/T options.

/corridors/usa (NEW)
  USA corridor. Medical equipment, tech, machinery.
  T/T primary. Large order focus.

/corridors/germany (NEW)
  Germany/EU corridor. Industrial machinery.
  EUR payments. T/T primary.

/corridors/japan (NEW)
  Japan/South Korea. Electronics, vehicles.
  JPY/KRW. T/T primary.

/trade-calculator
  "Should I fly or pay remotely?" decision tool.
  Inputs: order value, country, goods type.
  Output: total cost comparison fly vs remote.

/suppliers
  Community supplier directory.
  Tabs: China | India | Turkey | UAE | Other
  Filterable by category, USDT acceptance, min order.
  Star ratings from community.
  Submit a supplier form.

/business
  Bulk payment page.
  CSV upload for multiple suppliers/recipients.
  0.8% bulk pricing.
  Invoice generation.

/dispute
  Dispute submission form.
  TX hash + order reference + issue description.
  48-hour resolution SLA shown.
  Auto-notify Coach.

/contact
  All contact channels listed.
  WhatsApp, Telegram, Email, web form.
  Business hours.
  Expected response times.

── EXISTING API ROUTES ──────────────────────────────────

/api/rates — FIX server-side CoinGecko + exchangerate-api
/api/orders — POST (enhanced with all new fields)
/api/orders/[id] — GET + PATCH (enhanced)
/api/admin/login — keep

── NEW API ROUTES ───────────────────────────────────────

/api/orders/[id]/shipping — POST (upload shipping doc)
/api/orders/[id]/release-balance — POST (admin: release 70%)
/api/blockchain/monitor — GET (poll all chains for incoming)
/api/blockchain/status/[txhash] — GET (check specific tx)
/api/disputes — POST (submit dispute)
/api/suppliers — GET (list) + POST (submit new)
/api/suppliers/[id]/review — POST (submit rating)
/api/templates — GET + POST + DELETE (saved templates)
/api/receipts/[reference] — GET (generate/fetch PDF)
/api/telegram-setup — GET (returns chat ID for setup)
/api/rates/multi — GET (all currencies in one call)

════════════════════════════════════════════════════════════
PART U — BUILD ORDER (exact sequence)
════════════════════════════════════════════════════════════

SESSION 1 — Fix critical live bugs (do first):
  1. Fix NaN rate — server-side /api/rates with fallback 3750
  2. Fix MY_MOMO_NUMBER — replace with WhatsApp CTA
  3. Run DB migration — add all new columns to orders table
  4. Add wallet_addresses table + seed data
  5. Update admin panel to show new order fields

SESSION 2 — Self-service core (most important):
  6. Build /send universal order form (full spec above)
  7. Build /api/orders (enhanced for all new fields)
  8. Build rate lock system + countdown timer
  9. Build order confirmation page (wallet address display,
     multi-chain selector, countdown)
  10. Telegram notification to Coach on new order

SESSION 3 — Inbound hub:
  11. Build /send-to-uganda page (full spec above)
  12. Build multi-currency calculator (/api/rates/multi)
  13. Update /calculate with direction toggle + all currencies
  14. Update homepage with direction toggle + social proof

SESSION 4 — Outbound expansion:
  15. Build /pay-supplier page
  16. Build /corridors/india
  17. Build /corridors/turkey
  18. Build /corridors/usa
  19. Build /corridors/germany + /corridors/japan
  20. Build dynamic /corridors/[country] fallback

SESSION 5 — Trust & tracking:
  21. Upgrade /track with visual timeline + auto-refresh
  22. Implement blockchain monitoring APIs (Tron first)
  23. Build /dispute page + DB table
  24. Build PDF receipt generation
  25. Auto-email receipt on completion

SESSION 6 — Onboarding & suppliers:
  26. Build /how-to-buy-usdt with country selector
  27. Build /suppliers directory
  28. Build /trade-calculator (fly vs remote tool)
  29. Build /business bulk payment page

SESSION 7 — Advanced features:
  30. User accounts + saved templates (/templates)
  31. Staging/escrow (30/70 split) + shipping doc upload
  32. KYC flow for amounts over $3,000
  33. Multilingual support (French + Arabic first)
  34. Monthly reminder via @AfricaTeamBot

════════════════════════════════════════════════════════════
PART V — DESIGN SYSTEM (unchanged, mandatory)
════════════════════════════════════════════════════════════

AFRICAN GOLD STANDARD — every pixel follows this.

Colors:
  Background:   #0A0A0A
  Surface:      #111111
  Surface 2:    #1A1A1A
  Gold:         #D4A017
  Gold muted:   rgba(212,160,23,0.15)
  Border:       rgba(255,255,255,0.08)
  Border gold:  rgba(212,160,23,0.3)
  Text primary: #F5F5F5
  Text muted:   #999999
  Success:      #4CAF50
  Warning:      #FF9800
  Error:        #F44336

Fonts (Google Fonts):
  Bebas Neue → headlines, hero, stats, counters
  Sora → body text, UI, buttons, forms
  JetBrains Mono → rates, amounts, references, hashes

Key UI patterns:
  Card: background:#111; border:1px solid rgba(255,255,255,0.07); border-radius:12px
  Gold card: border-color:rgba(212,160,23,0.3); background:linear-gradient(135deg,#111,rgba(212,160,23,0.04))
  Primary btn: background:#D4A017; color:#000; font-weight:700; border-radius:8px
  Section label: font-family:JetBrains Mono; font-size:11px; color:#D4A017; letter-spacing:0.15em; text-transform:uppercase
  Hero glow: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,160,23,0.12), transparent 70%)
  Gold divider: height:1px; background:linear-gradient(to right, transparent, rgba(212,160,23,0.2), transparent)

Mobile: responsive at 375px minimum width.
All forms work on mobile. Tap targets min 44px.

════════════════════════════════════════════════════════════
PART W — QUALITY GATES (check before every deploy)
════════════════════════════════════════════════════════════

CRITICAL (live bugs — fix in Session 1):
  [ ] Rate shows real number, not NaN, on homepage
  [ ] COACH_MOMO_NUMBER placeholder removed everywhere
  [ ] /api/rates returns from server, not client-side

SESSION 1 GATES:
  [ ] /send form submits and creates order in DB
  [ ] Order reference generated: ATP-YYYYMMDD-XXXX
  [ ] Rate locked for 30 minutes after order creation
  [ ] Wallet address displayed for correct chain selection
  [ ] Email confirmation sent on order creation
  [ ] Telegram notification fires to Chat ID 378061184

SESSION 2 GATES:
  [ ] /send-to-uganda loads all 8 country cards
  [ ] Calculator handles 20+ input currencies
  [ ] Comparison table shows correct savings
  [ ] /calculate direction toggle works
  [ ] Homepage shows social proof bar

SESSION 3 GATES:
  [ ] /track shows visual timeline
  [ ] Status updates without page refresh (30s poll)
  [ ] Blockchain monitoring polls Tron address
  [ ] When TX detected: order status auto-updates
  [ ] PDF receipt downloads correctly
  [ ] /dispute form submits and notifies Coach

SESSION 4 GATES:
  [ ] /corridors/india full page loads
  [ ] /corridors/turkey full page loads
  [ ] /pay-supplier both modes work (travel + remote)
  [ ] B2B payment selection (USDT/T/T/agent) functional
  [ ] Staging option shows 30/70 split UI

GENERAL GATES (every deploy):
  [ ] Mobile responsive at 375px
  [ ] All fonts loading (Bebas Neue + Sora + JetBrains Mono)
  [ ] African Gold Standard design consistent
  [ ] /admin password protected
  [ ] API routes return proper error messages
  [ ] .env.example updated with all variables
  [ ] CLAUDE.md updated with current state

════════════════════════════════════════════════════════════
PART X — WHAT FULL SUCCESS LOOKS LIKE
════════════════════════════════════════════════════════════

EVERY USER TYPE HANDLED:

User with no WhatsApp?
  → Places order at /send using email only.
  → Gets confirmation email. Tracks at /track.
  → Never needs WhatsApp.

User who doesn't trust Coach personally?
  → Sees 5,231 completed transactions counter.
  → Sees total $1.2M processed.
  → Gets blockchain TX receipt for their transfer.
  → Rate is locked. No surprises.
  → /dispute page exists if anything goes wrong.

User importing from India (not just China)?
  → /corridors/india full page.
  → T/T bank wire option clearly explained.
  → Coach wires to Indian bank after USDT received.

User importing from Turkey?
  → /corridors/turkey full page.
  → Istanbul Laleli market guidance.
  → USDT + T/T options both available.

Supplier doesn't accept USDT — wants T/T?
  → Outbound order form: selects "Bank T/T"
  → Enters SWIFT/IBAN/account details
  → Coach converts and wires after USDT received.

User wants 30/70 staged payment for new supplier?
  → Order form: selects "30/70 deposit"
  → Pays 30% to Coach → Coach sends to supplier
  → Uploads bill of lading when goods ship
  → Coach releases 70% balance → supplier ships

User prefers ETH not USDT?
  → Order confirmation shows ETH → USDT swap guide.
  → OR: /how-to-buy-usdt shows conversion steps.
  → Chain selector includes ERC20 option with warning.

User wants to send to family and pay supplier monthly?
  → Creates account → saves both as templates.
  → Monthly reminder from @AfricaTeamBot.
  → One click each month. Done.

User sends $8,000 (large amount)?
  → KYC prompt: upload ID photo.
  → /business page: negotiated rate 0.8%.
  → VIP WhatsApp handling by Coach.
  → PDF invoice for URA customs clearance.

Family in Uganda has no mobile money (only bank)?
  → Sender selects "Bank Transfer" at order form.
  → Enters Stanbic/DFCU account number.
  → Recipient gets UGX in bank. Takes 1–3 days.

User speaks French (lives in Belgium)?
  → Browser language detected → site switches to French.
  → Or: language selector in navbar.

Coach is asleep at midnight?
  → Order created successfully.
  → Auto-message: "Processed by 9am EAT."
  → Rate locked until 9:30am tomorrow.
  → No trust broken. Expectation set.

Ugandan trader in Kampala who has never used crypto?
  → /how-to-buy-usdt walks through everything.
  → Binance P2P: buy USDT with MTN MoMo.
  → Video guide embedded.
  → WhatsApp Coach for first-time hand-holding.

════════════════════════════════════════════════════════════
PART Y — IMPORTANT CONSTRAINTS (never forget)
════════════════════════════════════════════════════════════

1. P2P DESK IS MANUAL. You are building the front-end
   and order management system. Coach handles all
   actual USDT transactions manually via Binance/wallet.
   Smart contract automation is Phase 4.

2. NO PAYSTACK on this product. Payments are made
   directly to Coach's MTN MoMo (UGX) or USDT wallet.
   System records orders. Coach confirms manually.

3. SEPARATE VERCEL PROJECT. This is NOT africateam-hub.
   Repo: github.com/divinedestinyman/africateampay
   URL: africateampay.vercel.app (already live)
   Keep the 12-function limit of africateam-hub separate.

4. CHINA PAGE IS STILL PRIORITY #1 for outbound.
   It is the single largest corridor by transaction value.
   Always keep it the most detailed and polished page.

5. SESSION 1 FIXES FIRST. The live site has NaN and
   a placeholder visible. Fix these before building
   anything new. A broken live site loses customers.

6. WALLET ADDRESSES ARE PLACEHOLDERS until Coach fills
   them in Vercel dashboard. Never hardcode real addresses
   in source code. Always from environment variables.

7. BUILD IN SEQUENCE. Don't start Session 3 without
   completing Session 2. Each session gates the next.

════════════════════════════════════════════════════════════

REPO: github.com/divinedestinyman/africateampay
LIVE: https://africateampay.vercel.app
TEAM: team_4bKz3xeGa7EkGoU9SXrcrQxl
TELEGRAM ADMIN CHAT ID: 378061184
COACH WHATSAPP: 256784277664

════════════════════════════════════════════════════════════
START WITH SESSION 1. FIX THE NaN BUG FIRST.
THEN BUILD /send. THAT IS THE MOST IMPORTANT PAGE.
EVERY OTHER PAGE FLOWS FROM /send.
════════════════════════════════════════════════════════════

Brief v2.0 | May 2026 | Claude Chat
This is a real financial product.
Every broken feature costs a customer real money.
Test everything. Deploy nothing broken.
