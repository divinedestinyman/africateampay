// Rate fetcher: CoinGecko (USDT/UGX) + exchangerate-api (multi-currency fiat)
// In-process cache. Falls back to hardcoded rates on any failure.

let coingeckoCache = { data: null, cachedAt: 0 };
let fiatCache      = { data: null, cachedAt: 0 };

const FALLBACK_USDT = {
  usdt_ugx: 3750,
  usdt_usd: 1.00,
  usdt_gbp: 0.79,
  usdt_aed: 3.67,
  usdt_kes: 129,
  is_fallback: true,
};

// Fiat rates relative to USD (static fallback)
const FALLBACK_FIAT = {
  USD: 1,     GBP: 0.79,  EUR: 0.92,  AED: 3.67,  SAR: 3.75,
  CAD: 1.36,  AUD: 1.53,  QAR: 3.64,  KES: 129,   TZS: 2580,
  CNY: 7.24,  INR: 83.2,  TRY: 32.1,  JPY: 149,   KRW: 1325,
  MYR: 4.72,  IDR: 15800, THB: 35.1,  SGD: 1.34,  NGN: 1560,
  GHS: 12.3,  ZAR: 18.7,  EGP: 30.9,  MAD: 10.0,  ZMW: 26.8,
  ETB: 56.5,  RWF: 1280,  XOF: 603,   SEK: 10.4,  NOK: 10.6,
  DKK: 6.88,  CHF: 0.90,  BRL: 4.97,  VND: 24900, BDT: 110,
  PKR: 278,   MZN: 63.8,
};

function isValidNumber(v) {
  return typeof v === 'number' && !isNaN(v) && isFinite(v) && v > 0;
}

// ── CoinGecko: USDT/UGX + a handful of majors ────────────────────────────────
export async function getRates() {
  const cacheMins = parseInt(process.env.RATES_CACHE_MINUTES) || 10;
  const cacheDuration = cacheMins * 60 * 1000;
  const now = Date.now();

  if (coingeckoCache.data && now - coingeckoCache.cachedAt < cacheDuration) {
    return coingeckoCache.data;
  }

  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=ugx,usd,gbp,aed,kes',
      { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(8000) }
    );

    if (!res.ok) throw new Error(`CoinGecko ${res.status}`);

    const json = await res.json();
    const t = json?.tether;

    if (!t) throw new Error('CoinGecko: empty tether object');

    const ugx = t.ugx;
    const usd = t.usd;

    // Reject if primary UGX rate is invalid
    if (!isValidNumber(ugx)) throw new Error(`CoinGecko: invalid ugx rate: ${ugx}`);

    const rates = {
      usdt_ugx: ugx,
      usdt_usd: isValidNumber(usd) ? usd : 1.00,
      usdt_gbp: isValidNumber(t.gbp) ? t.gbp : 0.79,
      usdt_aed: isValidNumber(t.aed) ? t.aed : 3.67,
      usdt_kes: isValidNumber(t.kes) ? t.kes : 129,
      cached_at: new Date().toISOString(),
      is_fallback: false,
    };

    coingeckoCache = { data: rates, cachedAt: now };

    // Log to DB — fire and forget
    import('./db.js')
      .then(({ logRate }) => logRate({ usdt_ugx: rates.usdt_ugx, usdt_usd: rates.usdt_usd }))
      .catch(() => {});

    return rates;
  } catch (err) {
    console.error('[rates] CoinGecko error:', err?.message);
    if (coingeckoCache.data) return { ...coingeckoCache.data, is_stale: true };
    return { ...FALLBACK_USDT, cached_at: new Date().toISOString() };
  }
}

// ── Multi-currency fiat rates (USD as pivot) ──────────────────────────────────
export async function getMultiRates() {
  const cacheMins = parseInt(process.env.RATES_CACHE_MINUTES) || 10;
  const cacheDuration = cacheMins * 60 * 1000;
  const now = Date.now();

  if (fiatCache.data && now - fiatCache.cachedAt < cacheDuration) {
    return fiatCache.data;
  }

  // Get USDT/UGX base
  const usdt = await getRates();
  const ugxPerUsd = usdt.usdt_ugx; // since 1 USDT ≈ 1 USD

  try {
    // Try exchangerate-api.com free tier (no key needed)
    const res = await fetch(
      'https://open.er-api.com/v6/latest/USD',
      { signal: AbortSignal.timeout(8000) }
    );

    if (!res.ok) throw new Error(`exchangerate-api ${res.status}`);

    const json = await res.json();
    const rates = json?.rates;
    if (!rates || typeof rates !== 'object') throw new Error('No rates object');

    const result = {
      base: 'USD',
      ugx_per_usd: ugxPerUsd,
      rates: {},
      cached_at: new Date().toISOString(),
      is_fallback: false,
    };

    // Build rates map — each entry is how many of that currency = 1 USD
    for (const [cur, val] of Object.entries(rates)) {
      if (isValidNumber(val)) result.rates[cur] = val;
    }

    // Always ensure UGX is included from CoinGecko (more accurate)
    result.rates.UGX = ugxPerUsd;

    fiatCache = { data: result, cachedAt: now };
    return result;
  } catch (err) {
    console.error('[rates] fiat error:', err?.message);

    // Fallback: use static rates
    const fallback = {
      base: 'USD',
      ugx_per_usd: ugxPerUsd,
      rates: { ...FALLBACK_FIAT, UGX: ugxPerUsd },
      cached_at: new Date().toISOString(),
      is_fallback: true,
    };

    if (fiatCache.data) return { ...fiatCache.data, is_stale: true };
    return fallback;
  }
}

// Convenience: convert amount in currencyFrom to UGX
export async function convertToUGX(amount, currencyFrom) {
  if (currencyFrom === 'UGX') return amount;
  const multi = await getMultiRates();
  const rateToUsd = multi.rates[currencyFrom.toUpperCase()];
  if (!rateToUsd) return null;
  const amountUsd = amount / rateToUsd;
  return Math.round(amountUsd * multi.ugx_per_usd);
}
