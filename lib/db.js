// Database abstraction: in-memory store for local dev, PostgreSQL for production.
// All functions return plain objects (no class instances).

const IS_PG = !!process.env.DATABASE_URL;

// ── In-memory store (local dev only) ─────────────────────────────────────────
const mem = {
  corridors: [
    { id: 'china',  name: 'China',          flag: '🇨🇳', fee_percent: '1.00', is_active: true, sort_order: 1 },
    { id: 'uae',   name: 'UAE',            flag: '🇦🇪', fee_percent: '1.00', is_active: true, sort_order: 2 },
    { id: 'uk',    name: 'United Kingdom', flag: '🇬🇧', fee_percent: '1.00', is_active: true, sort_order: 3 },
    { id: 'kenya', name: 'Kenya',          flag: '🇰🇪', fee_percent: '1.00', is_active: true, sort_order: 4 },
  ],
  orders: [],
  rates_log: [],
};

// ── PostgreSQL pool (production only) ─────────────────────────────────────────
let _pool = null;
function getPool() {
  if (!_pool) {
    // Dynamic require avoids bundling pg in edge runtimes
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
export async function getCorridors() {
  if (IS_PG) {
    return pgQuery('SELECT * FROM corridors WHERE is_active = true ORDER BY sort_order');
  }
  return mem.corridors.filter(c => c.is_active).sort((a, b) => a.sort_order - b.sort_order);
}

export async function getCorridorById(id) {
  if (IS_PG) {
    const rows = await pgQuery('SELECT * FROM corridors WHERE id = $1', [id]);
    return rows[0] || null;
  }
  return mem.corridors.find(c => c.id === id) || null;
}

// ── Orders ────────────────────────────────────────────────────────────────────
export async function getOrders({ status, limit = 100 } = {}) {
  if (IS_PG) {
    if (status) {
      return pgQuery(
        'SELECT * FROM orders WHERE status = $1 ORDER BY created_at DESC LIMIT $2',
        [status, limit]
      );
    }
    return pgQuery('SELECT * FROM orders ORDER BY created_at DESC LIMIT $1', [limit]);
  }
  let orders = [...mem.orders];
  if (status) orders = orders.filter(o => o.status === status);
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
  if (IS_PG) {
    const rows = await pgQuery(
      `INSERT INTO orders
         (id, reference, customer_name, customer_whatsapp, customer_wallet,
          corridor_id, amount_ugx, amount_usdt, fee_ugx, usdt_rate, notes,
          status, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'pending',NOW(),NOW())
       RETURNING *`,
      [
        data.id, data.reference, data.customer_name, data.customer_whatsapp,
        data.customer_wallet, data.corridor_id, data.amount_ugx, data.amount_usdt,
        data.fee_ugx, data.usdt_rate, data.notes || null,
      ]
    );
    return rows[0];
  }
  const order = { ...data, status: 'pending', created_at: now, updated_at: now };
  mem.orders.unshift(order);
  return order;
}

export async function updateOrder(id, updates) {
  const now = new Date().toISOString();
  if (IS_PG) {
    const fields = Object.keys(updates);
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
