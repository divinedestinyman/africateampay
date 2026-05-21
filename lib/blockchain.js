// Blockchain TX status checker — server-side only (called from API routes).
// TRC20: TronGrid free API, no key needed.
// Other chains: returns explorer link only.

const EXPLORER_URLS = {
  trc20:   hash => `https://tronscan.org/#/transaction/${hash}`,
  bep20:   hash => `https://bscscan.com/tx/${hash}`,
  polygon: hash => `https://polygonscan.com/tx/${hash}`,
  erc20:   hash => `https://etherscan.io/tx/${hash}`,
  solana:  hash => `https://solscan.io/tx/${hash}`,
  base:    hash => `https://basescan.org/tx/${hash}`,
};

export function getExplorerUrl(hash, chain = 'trc20') {
  const fn = EXPLORER_URLS[chain] || EXPLORER_URLS.trc20;
  return fn(hash);
}

export async function checkTronTx(hash) {
  if (!hash) return null;
  try {
    const res = await fetch(
      `https://api.trongrid.io/v1/transactions/${hash}`,
      {
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 30 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const tx = data.data?.[0];
    if (!tx) return null;

    const confirmed = tx.ret?.[0]?.contractRet === 'SUCCESS';
    const blockNumber = tx.blockNumber;
    const timestamp = tx.block_timestamp;

    // Count confirmations by getting latest block number
    let confirmations = null;
    try {
      const blockRes = await fetch('https://api.trongrid.io/v1/blocks?limit=1&order_by=block_header.raw_data.number,desc', {
        headers: { 'Accept': 'application/json' },
      });
      if (blockRes.ok) {
        const blockData = await blockRes.json();
        const latestBlock = blockData.data?.[0]?.block_header?.raw_data?.number;
        if (latestBlock && blockNumber) {
          confirmations = latestBlock - blockNumber;
        }
      }
    } catch {}

    return {
      found: true,
      confirmed,
      blockNumber,
      confirmations,
      timestamp: timestamp ? new Date(timestamp).toISOString() : null,
      explorerUrl: getExplorerUrl(hash, 'trc20'),
    };
  } catch {
    return null;
  }
}

export async function checkTxStatus(hash, chain = 'trc20') {
  if (!hash) return { found: false, explorerUrl: null };

  const explorerUrl = getExplorerUrl(hash, chain);

  if (chain === 'trc20') {
    const result = await checkTronTx(hash);
    if (result) return result;
  }

  // For all other chains, return explorer link only
  return {
    found: true,
    confirmed: null,
    confirmations: null,
    timestamp: null,
    explorerUrl,
    manualVerifyRequired: true,
  };
}
