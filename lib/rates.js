// CoinGecko rate fetcher with in-process 5-minute cache.
// Falls back to hardcoded rates if CoinGecko is unreachable.

let cache = { data: null, cachedAt: 0 };

const FALLBACK = {
  usdt_ugx: 3750,
  usdt_usd: 1.00,
  usdt_gbp: 0.79,
  usdt_aed: 3.67,
  usdt_kes: 129,
  is_fallback: true,
};

export async function getRates() {
  const cacheMins = parseInt(process.env.RATES_CACHE_MINUTES) || 5;
  const cacheDuration = cacheMins * 60 * 1000;
  const now = Date.now();

  if (cache.data && now - cache.cachedAt < cacheDuration) {
    return cache.data;
  }

  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=ugx,usd,gbp,aed,kes',
      {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(8000),
      }
    );

    if (!res.ok) throw new Error(`CoinGecko ${res.status}`);

    const json = await res.json();
    const rates = {
      usdt_ugx: json.tether.ugx,
      usdt_usd: json.tether.usd,
      usdt_gbp: json.tether.gbp,
      usdt_aed: json.tether.aed,
      usdt_kes: json.tether.kes,
      cached_at: new Date().toISOString(),
      is_fallback: false,
    };

    cache = { data: rates, cachedAt: now };

    // Log to DB — fire and forget
    import('./db.js')
      .then(({ logRate }) => logRate({ usdt_ugx: rates.usdt_ugx, usdt_usd: rates.usdt_usd }))
      .catch(() => {});

    return rates;
  } catch {
    // Return stale cache if available, otherwise fallback
    if (cache.data) return { ...cache.data, is_stale: true };
    return { ...FALLBACK, cached_at: new Date().toISOString() };
  }
}
