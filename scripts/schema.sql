-- AfricaTeamPay — Full PostgreSQL Schema v2.0 (Railway)
-- Run once when DATABASE_URL is available:
--   psql $DATABASE_URL -f scripts/schema.sql

-- ── CORRIDORS ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS corridors (
  id               VARCHAR(30)    PRIMARY KEY,
  name             VARCHAR(100)   NOT NULL,
  flag             VARCHAR(10),
  direction        VARCHAR(10)    DEFAULT 'outbound',
  fee_percent      DECIMAL(5,2)   DEFAULT 1.00,
  is_active        BOOLEAN        DEFAULT true,
  sort_order       INTEGER        DEFAULT 0,
  primary_currency VARCHAR(10),
  notes            TEXT
);

INSERT INTO corridors (id, name, flag, direction, fee_percent, is_active, sort_order, primary_currency) VALUES
  ('china',      'China',                '🇨🇳', 'outbound', 1.00, true,  1,  'CNY'),
  ('india',      'India',                '🇮🇳', 'outbound', 1.00, true,  2,  'INR'),
  ('turkey',     'Turkey',               '🇹🇷', 'outbound', 1.00, true,  3,  'TRY'),
  ('uae',        'United Arab Emirates', '🇦🇪', 'both',     1.00, true,  4,  'AED'),
  ('uk',         'United Kingdom',       '🇬🇧', 'both',     1.00, true,  5,  'GBP'),
  ('usa',        'United States',        '🇺🇸', 'both',     1.00, true,  6,  'USD'),
  ('kenya',      'Kenya',                '🇰🇪', 'both',     1.00, true,  7,  'KES'),
  ('germany',    'Germany',              '🇩🇪', 'both',     1.00, true,  8,  'EUR'),
  ('japan',      'Japan',                '🇯🇵', 'outbound', 1.00, true,  9,  'JPY'),
  ('southkorea', 'South Korea',          '🇰🇷', 'outbound', 1.00, true,  10, 'KRW'),
  ('malaysia',   'Malaysia',             '🇲🇾', 'outbound', 1.00, true,  11, 'MYR'),
  ('canada',     'Canada',               '🇨🇦', 'inbound',  1.00, true,  12, 'CAD'),
  ('australia',  'Australia',            '🇦🇺', 'inbound',  1.00, true,  13, 'AUD'),
  ('saudi',      'Saudi Arabia',         '🇸🇦', 'inbound',  1.00, true,  14, 'SAR'),
  ('qatar',      'Qatar',                '🇶🇦', 'inbound',  1.00, true,  15, 'QAR')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  flag = EXCLUDED.flag,
  direction = EXCLUDED.direction,
  sort_order = EXCLUDED.sort_order,
  primary_currency = EXCLUDED.primary_currency;

-- ── ORDERS (full expanded schema) ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id                      UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  reference               VARCHAR(25)   UNIQUE NOT NULL,
  direction               VARCHAR(10)   NOT NULL DEFAULT 'outbound',

  -- Sender
  sender_name             VARCHAR(255),
  sender_email            VARCHAR(255),
  sender_whatsapp         VARCHAR(50),
  sender_telegram         VARCHAR(100),
  sender_country          VARCHAR(100),
  sender_currency         VARCHAR(10)   DEFAULT 'UGX',
  sender_amount           DECIMAL(18,2),

  -- Legacy compat (maps to sender_name/sender_whatsapp)
  customer_name           VARCHAR(255),
  customer_whatsapp       VARCHAR(50),
  customer_wallet         VARCHAR(255),

  -- Transfer core
  corridor_id             VARCHAR(30)   REFERENCES corridors(id),
  amount_ugx              BIGINT,
  amount_usdt             DECIMAL(18,6),
  fee_ugx                 BIGINT,
  fee_usdt                DECIMAL(18,6),
  usdt_rate               DECIMAL(18,2),
  rate_lock_expires_at    TIMESTAMP,
  rate_honoured           BOOLEAN       DEFAULT false,

  -- Sending chain
  sending_chain           VARCHAR(20)   DEFAULT 'trc20',

  -- Outbound supplier
  supplier_name           VARCHAR(255),
  supplier_country        VARCHAR(100),
  supplier_payment_method VARCHAR(30),
  supplier_wallet         VARCHAR(255),
  supplier_bank_name      VARCHAR(100),
  supplier_bank_account   VARCHAR(100),
  supplier_bank_swift     VARCHAR(50),
  supplier_bank_iban      VARCHAR(100),
  supplier_currency       VARCHAR(10),
  supplier_amount         DECIMAL(18,2),
  goods_description       TEXT,

  -- Staging / escrow
  payment_type            VARCHAR(20)   DEFAULT 'single',
  deposit_percent         INTEGER       DEFAULT 100,
  deposit_paid            BOOLEAN       DEFAULT false,
  balance_paid            BOOLEAN       DEFAULT false,
  shipping_doc_url        VARCHAR(500),
  shipping_doc_verified   BOOLEAN       DEFAULT false,

  -- Inbound recipient
  recipient_name          VARCHAR(255),
  recipient_whatsapp      VARCHAR(50),
  settlement_method       VARCHAR(20)   DEFAULT 'mtn_momo',
  recipient_momo_number   VARCHAR(50),
  recipient_momo_network  VARCHAR(20),
  recipient_bank_name     VARCHAR(100),
  recipient_bank_account  VARCHAR(50),
  recipient_bank_branch   VARCHAR(100),
  recipient_wallet_address VARCHAR(255),
  recipient_id_for_cash   VARCHAR(50),

  -- Blockchain
  blockchain_tx_hash      VARCHAR(255),
  tron_tx_hash            VARCHAR(255), -- legacy alias
  blockchain_detected_at  TIMESTAMP,
  blockchain_amount_received DECIMAL(18,6),

  -- Admin
  admin_notes             TEXT,
  notes                   TEXT,         -- legacy alias
  processed_by            VARCHAR(100)  DEFAULT 'coach',

  -- Status
  status                  VARCHAR(30)   DEFAULT 'pending',

  -- KYC
  kyc_required            BOOLEAN       DEFAULT false,
  kyc_doc_url             VARCHAR(500),
  kyc_verified            BOOLEAN       DEFAULT false,

  -- Receipts
  receipt_sent            BOOLEAN       DEFAULT false,
  receipt_pdf_url         VARCHAR(500),

  -- Timestamps
  created_at              TIMESTAMP     DEFAULT NOW(),
  updated_at              TIMESTAMP     DEFAULT NOW(),
  rate_locked_at          TIMESTAMP,
  payment_confirmed_at    TIMESTAMP,
  usdt_sent_at            TIMESTAMP,
  completed_at            TIMESTAMP
);

-- ── WALLET ADDRESSES ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS wallet_addresses (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  chain           VARCHAR(20)   NOT NULL,
  token           VARCHAR(10)   DEFAULT 'USDT',
  address         VARCHAR(255)  NOT NULL,
  network_fee_usd DECIMAL(10,4),
  is_active       BOOLEAN       DEFAULT true,
  display_order   INTEGER       DEFAULT 0,
  label           VARCHAR(100)
);

INSERT INTO wallet_addresses (chain, token, address, network_fee_usd, display_order, label) VALUES
  ('trc20',   'USDT', 'PLACEHOLDER_TRC20',    0.0100, 1, 'Tron (TRC20) — Recommended'),
  ('bep20',   'USDT', 'PLACEHOLDER_BEP20',    0.0500, 2, 'BNB Smart Chain (BEP20)'),
  ('polygon', 'USDT', 'PLACEHOLDER_POLYGON',  0.0100, 3, 'Polygon'),
  ('solana',  'USDT', 'PLACEHOLDER_SOLANA',   0.0010, 4, 'Solana'),
  ('erc20',   'USDT', 'PLACEHOLDER_ERC20',    8.0000, 5, 'Ethereum (ERC20) — High fees'),
  ('base',    'USDC', 'PLACEHOLDER_BASE',     0.0010, 6, 'Base (USDC)')
ON CONFLICT DO NOTHING;

-- ── RATE LOCKS ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS rate_locks (
  id          UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    UUID          REFERENCES orders(id),
  usdt_ugx_rate DECIMAL(18,2) NOT NULL,
  locked_at   TIMESTAMP     DEFAULT NOW(),
  expires_at  TIMESTAMP     NOT NULL,
  is_honoured BOOLEAN       DEFAULT false
);

-- ── BLOCKCHAIN MONITORING ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS monitored_transactions (
  id                      UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id                UUID          REFERENCES orders(id),
  chain                   VARCHAR(20)   NOT NULL,
  wallet_address          VARCHAR(255)  NOT NULL,
  expected_amount_usdt    DECIMAL(18,6),
  tolerance_percent       DECIMAL(5,2)  DEFAULT 0.5,
  detected_tx_hash        VARCHAR(255),
  detected_amount         DECIMAL(18,6),
  detected_at             TIMESTAMP,
  is_monitoring           BOOLEAN       DEFAULT true,
  last_checked_at         TIMESTAMP,
  created_at              TIMESTAMP     DEFAULT NOW()
);

-- ── SAVED TEMPLATES ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS transfer_templates (
  id                      UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email              VARCHAR(255)  NOT NULL,
  user_password_hash      VARCHAR(255),
  template_name           VARCHAR(100),
  direction               VARCHAR(10),
  corridor_id             VARCHAR(30),
  recipient_name          VARCHAR(255),
  recipient_contact       VARCHAR(100),
  settlement_method       VARCHAR(20),
  supplier_name           VARCHAR(255),
  supplier_country        VARCHAR(100),
  supplier_payment_method VARCHAR(30),
  typical_amount_usdt     DECIMAL(18,6),
  sending_chain           VARCHAR(20)   DEFAULT 'trc20',
  goods_description       TEXT,
  is_active               BOOLEAN       DEFAULT true,
  reminder_enabled        BOOLEAN       DEFAULT false,
  reminder_day            INTEGER,
  created_at              TIMESTAMP     DEFAULT NOW()
);

-- ── DISPUTES ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS disputes (
  id                UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  order_reference   VARCHAR(25),
  tx_hash           VARCHAR(255),
  submitter_email   VARCHAR(255),
  submitter_whatsapp VARCHAR(50),
  issue_type        VARCHAR(50),
  expected_amount   DECIMAL(18,6),
  received_amount   DECIMAL(18,6),
  description       TEXT,
  status            VARCHAR(20)   DEFAULT 'open',
  admin_response    TEXT,
  resolved_at       TIMESTAMP,
  refund_amount     DECIMAL(18,6),
  created_at        TIMESTAMP     DEFAULT NOW()
);

-- ── SUPPLIER DIRECTORY ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS suppliers (
  id                  UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  name                VARCHAR(255),
  category            VARCHAR(100),
  country             VARCHAR(100),
  city                VARCHAR(100),
  market_location     VARCHAR(255),
  accepts_usdt        BOOLEAN       DEFAULT false,
  accepts_tt          BOOLEAN       DEFAULT true,
  min_order_usd       DECIMAL(10,2),
  contact_method      VARCHAR(50),
  contact_encrypted   TEXT,
  community_rating    DECIMAL(3,2),
  review_count        INTEGER       DEFAULT 0,
  is_featured         BOOLEAN       DEFAULT false,
  featured_expires_at TIMESTAMP,
  is_verified         BOOLEAN       DEFAULT false,
  submitted_by        VARCHAR(255),
  is_active           BOOLEAN       DEFAULT true,
  created_at          TIMESTAMP     DEFAULT NOW()
);

-- ── RATES LOG ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS rates_log (
  id         UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  usdt_ugx   DECIMAL(18,2),
  usdt_usd   DECIMAL(18,6),
  rates_json JSONB,
  source     VARCHAR(50),
  fetched_at TIMESTAMP     DEFAULT NOW()
);

-- ── INDEXES ───────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_orders_status       ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_reference    ON orders(reference);
CREATE INDEX IF NOT EXISTS idx_orders_direction    ON orders(direction);
CREATE INDEX IF NOT EXISTS idx_orders_corridor     ON orders(corridor_id);
CREATE INDEX IF NOT EXISTS idx_orders_created      ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_sender_email ON orders(sender_email);
CREATE INDEX IF NOT EXISTS idx_monitored_active    ON monitored_transactions(is_monitoring);
CREATE INDEX IF NOT EXISTS idx_templates_email     ON transfer_templates(user_email);
CREATE INDEX IF NOT EXISTS idx_disputes_status     ON disputes(status);
CREATE INDEX IF NOT EXISTS idx_suppliers_country   ON suppliers(country);
CREATE INDEX IF NOT EXISTS idx_suppliers_category  ON suppliers(category);

-- ── AUTO-UPDATE updated_at ────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS orders_updated ON orders;
CREATE TRIGGER orders_updated
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── MIGRATION: add new columns to existing orders table ───────────────────────
-- Safe to run on existing DB — all use IF NOT EXISTS or ADD COLUMN IF NOT EXISTS
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='direction') THEN
    ALTER TABLE orders ADD COLUMN direction VARCHAR(10) DEFAULT 'outbound';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='sender_name') THEN
    ALTER TABLE orders ADD COLUMN sender_name VARCHAR(255);
    ALTER TABLE orders ADD COLUMN sender_email VARCHAR(255);
    ALTER TABLE orders ADD COLUMN sender_whatsapp VARCHAR(50);
    ALTER TABLE orders ADD COLUMN sender_telegram VARCHAR(100);
    ALTER TABLE orders ADD COLUMN sender_country VARCHAR(100);
    ALTER TABLE orders ADD COLUMN sender_currency VARCHAR(10) DEFAULT 'UGX';
    ALTER TABLE orders ADD COLUMN sender_amount DECIMAL(18,2);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='sending_chain') THEN
    ALTER TABLE orders ADD COLUMN sending_chain VARCHAR(20) DEFAULT 'trc20';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='rate_lock_expires_at') THEN
    ALTER TABLE orders ADD COLUMN rate_lock_expires_at TIMESTAMP;
    ALTER TABLE orders ADD COLUMN rate_honoured BOOLEAN DEFAULT false;
    ALTER TABLE orders ADD COLUMN rate_locked_at TIMESTAMP;
    ALTER TABLE orders ADD COLUMN completed_at TIMESTAMP;
    ALTER TABLE orders ADD COLUMN fee_usdt DECIMAL(18,6);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='settlement_method') THEN
    ALTER TABLE orders ADD COLUMN settlement_method VARCHAR(20) DEFAULT 'mtn_momo';
    ALTER TABLE orders ADD COLUMN recipient_name VARCHAR(255);
    ALTER TABLE orders ADD COLUMN recipient_whatsapp VARCHAR(50);
    ALTER TABLE orders ADD COLUMN recipient_momo_number VARCHAR(50);
    ALTER TABLE orders ADD COLUMN recipient_momo_network VARCHAR(20);
    ALTER TABLE orders ADD COLUMN recipient_bank_name VARCHAR(100);
    ALTER TABLE orders ADD COLUMN recipient_bank_account VARCHAR(50);
    ALTER TABLE orders ADD COLUMN recipient_bank_branch VARCHAR(100);
    ALTER TABLE orders ADD COLUMN recipient_wallet_address VARCHAR(255);
    ALTER TABLE orders ADD COLUMN recipient_id_for_cash VARCHAR(50);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='supplier_name') THEN
    ALTER TABLE orders ADD COLUMN supplier_name VARCHAR(255);
    ALTER TABLE orders ADD COLUMN supplier_country VARCHAR(100);
    ALTER TABLE orders ADD COLUMN supplier_payment_method VARCHAR(30);
    ALTER TABLE orders ADD COLUMN supplier_wallet VARCHAR(255);
    ALTER TABLE orders ADD COLUMN supplier_bank_name VARCHAR(100);
    ALTER TABLE orders ADD COLUMN supplier_bank_account VARCHAR(100);
    ALTER TABLE orders ADD COLUMN supplier_bank_swift VARCHAR(50);
    ALTER TABLE orders ADD COLUMN supplier_bank_iban VARCHAR(100);
    ALTER TABLE orders ADD COLUMN supplier_currency VARCHAR(10);
    ALTER TABLE orders ADD COLUMN supplier_amount DECIMAL(18,2);
    ALTER TABLE orders ADD COLUMN goods_description TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='payment_type') THEN
    ALTER TABLE orders ADD COLUMN payment_type VARCHAR(20) DEFAULT 'single';
    ALTER TABLE orders ADD COLUMN deposit_percent INTEGER DEFAULT 100;
    ALTER TABLE orders ADD COLUMN deposit_paid BOOLEAN DEFAULT false;
    ALTER TABLE orders ADD COLUMN balance_paid BOOLEAN DEFAULT false;
    ALTER TABLE orders ADD COLUMN shipping_doc_url VARCHAR(500);
    ALTER TABLE orders ADD COLUMN shipping_doc_verified BOOLEAN DEFAULT false;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='blockchain_tx_hash') THEN
    ALTER TABLE orders ADD COLUMN blockchain_tx_hash VARCHAR(255);
    ALTER TABLE orders ADD COLUMN blockchain_detected_at TIMESTAMP;
    ALTER TABLE orders ADD COLUMN blockchain_amount_received DECIMAL(18,6);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='kyc_required') THEN
    ALTER TABLE orders ADD COLUMN kyc_required BOOLEAN DEFAULT false;
    ALTER TABLE orders ADD COLUMN kyc_doc_url VARCHAR(500);
    ALTER TABLE orders ADD COLUMN kyc_verified BOOLEAN DEFAULT false;
    ALTER TABLE orders ADD COLUMN receipt_sent BOOLEAN DEFAULT false;
    ALTER TABLE orders ADD COLUMN receipt_pdf_url VARCHAR(500);
    ALTER TABLE orders ADD COLUMN processed_by VARCHAR(100) DEFAULT 'coach';
    ALTER TABLE orders ADD COLUMN admin_notes TEXT;
  END IF;
  -- Expand corridors id column if needed
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='corridor_id' AND character_maximum_length < 30) THEN
    ALTER TABLE orders ALTER COLUMN corridor_id TYPE VARCHAR(30);
  END IF;
END $$;
