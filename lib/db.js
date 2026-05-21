// Database abstraction: in-memory store (local dev) ↔ PostgreSQL (production).
// Switch: DATABASE_URL env var present = PostgreSQL.

const IS_PG = !!process.env.DATABASE_URL;

// ── In-memory store ───────────────────────────────────────────────────────────
const mem = {
  corridors: [
    { id: 'china',      name: 'China',                flag: '🇨🇳', direction: 'outbound', fee_percent: '1.00', is_active: true, sort_order: 1,  primary_currency: 'CNY' },
    { id: 'india',      name: 'India',                flag: '🇮🇳', direction: 'outbound', fee_percent: '1.00', is_active: true, sort_order: 2,  primary_currency: 'INR' },
    { id: 'turkey',     name: 'Turkey',               flag: '🇹🇷', direction: 'outbound', fee_percent: '1.00', is_active: true, sort_order: 3,  primary_currency: 'TRY' },
    { id: 'uae',        name: 'UAE',                  flag: '🇦🇪', direction: 'both',     fee_percent: '1.00', is_active: true, sort_order: 4,  primary_currency: 'AED' },
    { id: 'uk',         name: 'United Kingdom',       flag: '🇬🇧', direction: 'both',     fee_percent: '1.00', is_active: true, sort_order: 5,  primary_currency: 'GBP' },
    { id: 'usa',        name: 'United States',        flag: '🇺🇸', direction: 'both',     fee_percent: '1.00', is_active: true, sort_order: 6,  primary_currency: 'USD' },
    { id: 'kenya',      name: 'Kenya',               flag: '🇰🇪', direction: 'both',     fee_percent: '1.00', is_active: true, sort_order: 7,  primary_currency: 'KES' },
    { id: 'germany',    name: 'Germany',              flag: '🇩🇪', direction: 'both',     fee_percent: '1.00', is_active: true, sort_order: 8,  primary_currency: 'EUR' },
    { id: 'japan',      name: 'Japan',               flag: '🇯🇵', direction: 'outbound', fee_percent: '1.00', is_active: true, sort_order: 9,  primary_currency: 'JPY' },
    { id: 'southkorea', name: 'South Korea',         flag: '🇰🇷', direction: 'outbound', fee_percent: '1.00', is_active: true, sort_order: 10, primary_currency: 'KRW' },
    { id: 'malaysia',   name: 'Malaysia',            flag: '🇲🇾', direction: 'outbound', fee_percent: '1.00', is_active: true, sort_order: 11, primary_currency: 'MYR' },
    { id: 'canada',     name: 'Canada',              flag: '🇨🇦', direction: 'inbound',  fee_percent: '1.00', is_active: true, sort_order: 12, primary_currency: 'CAD' },
    { id: 'australia',  name: 'Australia',           flag: '🇦🇺', direction: 'inbound',  fee_percent: '1.00', is_active: true, sort_order: 13, primary_currency: 'AUD' },
    { id: 'saudi',      name: 'Saudi Arabia',        flag: '🇸🇦', direction: 'inbound',  fee_percent: '1.00', is_active: true, sort_order: 14, primary_currency: 'SAR' },
    { id: 'qatar',      name: 'Qatar',               flag: '🇶🇦', direction: 'inbound',  fee_percent: '1.00', is_active: true, sort_order: 15, primary_currency: 'QAR' },
  ],
  orders: [],
  wallet_addresses: [
    { id: '1', chain: 'trc20',   token: 'USDT', address: process.env.WALLET_TRC20    || 'PLACEHOLDER_TRC20',    network_fee_usd: 0.01,   is_active: true, display_order: 1, label: 'Tron (TRC20) — Recommended' },
    { id: '2', chain: 'bep20',   token: 'USDT', address: process.env.WALLET_BEP20   || 'PLACEHOLDER_BEP20',    network_fee_usd: 0.05,   is_active: true, display_order: 2, label: 'BNB Smart Chain (BEP20)' },
    { id: '3', chain: 'polygon', token: 'USDT', address: process.env.WALLET_POLYGON || 'PLACEHOLDER_POLYGON',  network_fee_usd: 0.01,   is_active: true, display_order: 3, label: 'Polygon' },
    { id: '4', chain: 'solana',  token: 'USDT', address: process.env.WALLET_SOLANA  || 'PLACEHOLDER_SOLANA',   network_fee_usd: 0.001,  is_active: true, display_order: 4, label: 'Solana' },
    { id: '5', chain: 'erc20',   token: 'USDT', address: process.env.WALLET_ERC20   || 'PLACEHOLDER_ERC20',    network_fee_usd: 8.00,   is_active: true, display_order: 5, label: 'Ethereum (ERC20) — High fees' },
    { id: '6', chain: 'base',    token: 'USDC', address: process.env.WALLET_BASE    || 'PLACEHOLDER_BASE',     network_fee_usd: 0.001,  is_active: true, display_order: 6, label: 'Base (USDC)' },
  ],
  disputes: [],
  suppliers: [],
  rates_log: [],
};

// ── PostgreSQL ─────────────────────────────────────────────────────────────────
let _pool = null;
function getPool() {
  if (!_pool) {
    const { Pool } = require('pg');
    _pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
  }
  return _pool;
}

async function pgQuery(sql, params = []) {
  const { rows } = await getPool().query(sql, params);
  return rows;
}

// ── Corridors ─────────────────────────────────────────────────────────────────
export async function getCorridors({ direction } = {}) {
  if (IS_PG) {
    if (direction) {
      return pgQuery(
        "SELECT * FROM corridors WHERE is_active = true AND (direction = $1 OR direction = 'both') ORDER BY sort_order",
        [direction]
      );
    }
    return pgQuery('SELECT * FROM corridors WHERE is_active = true ORDER BY sort_order');
  }
  let list = mem.corridors.filter(c => c.is_active);
  if (direction) list = list.filter(c => c.direction === direction || c.direction === 'both');
  return list.sort((a, b) => a.sort_order - b.sort_order);
}

export async function getCorridorById(id) {
  if (IS_PG) {
    const rows = await pgQuery('SELECT * FROM corridors WHERE id = $1', [id]);
    return rows[0] || null;
  }
  return mem.corridors.find(c => c.id === id) || null;
}

// ── Wallet addresses ──────────────────────────────────────────────────────────
export async function getWalletAddresses({ chain } = {}) {
  if (IS_PG) {
    // Prefer env-var addresses over DB placeholders
    const rows = await pgQuery(
      'SELECT * FROM wallet_addresses WHERE is_active = true ORDER BY display_order'
    );
    return rows.map(w => ({
      ...w,
      address: getWalletFromEnv(w.chain) || w.address,
    }));
  }
  let list = mem.wallet_addresses.filter(w => w.is_active);
  if (chain) list = list.filter(w => w.chain === chain);
  return list;
}

export async function getWalletForChain(chain) {
  const envAddr = getWalletFromEnv(chain);
  if (envAddr) return envAddr;
  const wallets = await getWalletAddresses({ chain });
  return wallets[0]?.address || null;
}

function getWalletFromEnv(chain) {
  const map = {
    trc20:   process.env.WALLET_TRC20,
    bep20:   process.env.WALLET_BEP20,
    polygon: process.env.WALLET_POLYGON,
    erc20:   process.env.WALLET_ERC20,
    solana:  process.env.WALLET_SOLANA,
    base:    process.env.WALLET_BASE,
  };
  const addr = map[chain];
  return addr && !addr.startsWith('PLACEHOLDER') ? addr : null;
}

// ── Orders ────────────────────────────────────────────────────────────────────
export async function getOrders({ status, direction, limit = 100 } = {}) {
  if (IS_PG) {
    const conditions = ['1=1'];
    const params = [];
    if (status) { params.push(status); conditions.push(`status = $${params.length}`); }
    if (direction) { params.push(direction); conditions.push(`direction = $${params.length}`); }
    params.push(limit);
    return pgQuery(
      `SELECT * FROM orders WHERE ${conditions.join(' AND ')} ORDER BY created_at DESC LIMIT $${params.length}`,
      params
    );
  }
  let orders = [...mem.orders];
  if (status) orders = orders.filter(o => o.status === status);
  if (direction) orders = orders.filter(o => o.direction === direction);
  return orders.slice(0, limit);
}

export async function getOrderById(id) {
  if (IS_PG) {
    const rows = await pgQuery('SELECT * FROM orders WHERE id = $1', [id]);
    return rows[0] || null;
  }
  return mem.orders.find(o => o.id === id) || null;
}

export async function getOrderByReference(reference) {
  if (IS_PG) {
    const rows = await pgQuery('SELECT * FROM orders WHERE reference = $1', [reference]);
    return rows[0] || null;
  }
  return mem.orders.find(o => o.reference === reference) || null;
}

export async function createOrder(data) {
  const now = new Date().toISOString();
  const { status: providedStatus, ...fields } = data;
  const status = providedStatus || 'pending';

  if (IS_PG) {
    const cols = Object.keys(fields);
    const placeholders = cols.map((_, i) => `$${i + 1}`);
    const vals = cols.map(k => fields[k]);
    const rows = await pgQuery(
      `INSERT INTO orders (${cols.join(', ')}, status, created_at, updated_at)
       VALUES (${placeholders.join(', ')}, $${cols.length + 1}, NOW(), NOW())
       RETURNING *`,
      [...vals, status]
    );
    return rows[0];
  }
  const order = { ...fields, status, created_at: now, updated_at: now };
  mem.orders.unshift(order);
  return order;
}

export async function updateOrder(id, updates) {
  const now = new Date().toISOString();
  if (IS_PG) {
    const fields = Object.keys(updates);
    if (fields.length === 0) return getOrderById(id);
    const setClauses = fields.map((f, i) => `${f} = $${i + 1}`);
    setClauses.push(`updated_at = $${fields.length + 1}`);
    const values = [...Object.values(updates), now, id];
    const rows = await pgQuery(
      `UPDATE orders SET ${setClauses.join(', ')} WHERE id = $${fields.length + 2} RETURNING *`,
      values
    );
    return rows[0] || null;
  }
  const idx = mem.orders.findIndex(o => o.id === id);
  if (idx === -1) return null;
  mem.orders[idx] = { ...mem.orders[idx], ...updates, updated_at: now };
  return mem.orders[idx];
}

// ── Disputes ──────────────────────────────────────────────────────────────────
export async function createDispute(data) {
  if (IS_PG) {
    const cols = Object.keys(data);
    const placeholders = cols.map((_, i) => `$${i + 1}`);
    const rows = await pgQuery(
      `INSERT INTO disputes (${cols.join(', ')}, status, created_at)
       VALUES (${placeholders.join(', ')}, 'open', NOW()) RETURNING *`,
      cols.map(k => data[k])
    );
    return rows[0];
  }
  const dispute = { ...data, id: crypto.randomUUID(), status: 'open', created_at: new Date().toISOString() };
  mem.disputes.unshift(dispute);
  return dispute;
}

export async function getDisputes({ status } = {}) {
  if (IS_PG) {
    if (status) return pgQuery('SELECT * FROM disputes WHERE status = $1 ORDER BY created_at DESC', [status]);
    return pgQuery('SELECT * FROM disputes ORDER BY created_at DESC');
  }
  let list = [...mem.disputes];
  if (status) list = list.filter(d => d.status === status);
  return list;
}

// ── Suppliers ─────────────────────────────────────────────────────────────────
export async function getSuppliers({ country, category, limit = 50 } = {}) {
  if (IS_PG) {
    const conditions = ['is_active = true'];
    const params = [];
    if (country)  { params.push(country);  conditions.push(`country = $${params.length}`); }
    if (category) { params.push(category); conditions.push(`category = $${params.length}`); }
    params.push(limit);
    return pgQuery(
      `SELECT * FROM suppliers WHERE ${conditions.join(' AND ')} ORDER BY is_featured DESC, community_rating DESC NULLS LAST LIMIT $${params.length}`,
      params
    );
  }
  let list = mem.suppliers.filter(s => s.is_active);
  if (country)  list = list.filter(s => s.country === country);
  if (category) list = list.filter(s => s.category === category);
  return list.slice(0, limit);
}

// ── Rates log ─────────────────────────────────────────────────────────────────
export async function logRate(data) {
  if (IS_PG) {
    await pgQuery(
      'INSERT INTO rates_log (usdt_ugx, usdt_usd, source) VALUES ($1, $2, $3)',
      [data.usdt_ugx, data.usdt_usd, data.source || 'coingecko']
    );
    return;
  }
  mem.rates_log.unshift({ ...data, fetched_at: new Date().toISOString() });
  if (mem.rates_log.length > 200) mem.rates_log.pop();
}
