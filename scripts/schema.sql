-- AfricaTeamPay — PostgreSQL schema (Railway)
-- Run this once when DATABASE_URL is available

CREATE TABLE IF NOT EXISTS corridors (
  id          VARCHAR(20) PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  flag        VARCHAR(10),
  fee_percent DECIMAL(5,2) DEFAULT 1.00,
  is_active   BOOLEAN DEFAULT true,
  sort_order  INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS orders (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference            VARCHAR(20) UNIQUE NOT NULL,
  customer_name        VARCHAR(255),
  customer_whatsapp    VARCHAR(50),
  customer_wallet      VARCHAR(255),
  corridor_id          VARCHAR(20) REFERENCES corridors(id),
  amount_ugx           BIGINT NOT NULL,
  amount_usdt          DECIMAL(18,6),
  fee_ugx              BIGINT,
  usdt_rate            DECIMAL(18,2),
  tron_tx_hash         VARCHAR(255),
  status               VARCHAR(30) DEFAULT 'pending',
  notes                TEXT,
  created_at           TIMESTAMP DEFAULT NOW(),
  updated_at           TIMESTAMP DEFAULT NOW(),
  payment_confirmed_at TIMESTAMP,
  usdt_sent_at         TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rates_log (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usdt_ugx   DECIMAL(18,2),
  usdt_usd   DECIMAL(18,6),
  source     VARCHAR(50),
  fetched_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_status    ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_reference ON orders(reference);
CREATE INDEX IF NOT EXISTS idx_orders_created   ON orders(created_at DESC);

INSERT INTO corridors (id, name, flag, fee_percent, is_active, sort_order) VALUES
  ('china', 'China',          '🇨🇳', 1.00, true, 1),
  ('uae',   'UAE',            '🇦🇪', 1.00, true, 2),
  ('uk',    'United Kingdom', '🇬🇧', 1.00, true, 3),
  ('kenya', 'Kenya',          '🇰🇪', 1.00, true, 4)
ON CONFLICT (id) DO NOTHING;
