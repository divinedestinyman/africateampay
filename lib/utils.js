export function generateReference() {
  const d = new Date();
  const date = d.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `ATP-${date}-${rand}`;
}

export function generateId() {
  return crypto.randomUUID();
}

export function formatUGX(amount) {
  if (!amount && amount !== 0) return '—';
  return `UGX ${Number(amount).toLocaleString('en-UG')}`;
}

export function formatUSDT(amount) {
  if (!amount && amount !== 0) return '—';
  return `${Number(amount).toFixed(2)} USDT`;
}

export function formatNumber(num, decimals = 2) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('en-UG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export const CORRIDORS = {
  china:       { name: 'China',                flag: '🇨🇳', direction: 'outbound', currency: 'CNY' },
  india:       { name: 'India',                flag: '🇮🇳', direction: 'outbound', currency: 'INR' },
  turkey:      { name: 'Turkey',               flag: '🇹🇷', direction: 'outbound', currency: 'TRY' },
  uae:         { name: 'UAE',                  flag: '🇦🇪', direction: 'both',     currency: 'AED' },
  uk:          { name: 'United Kingdom',       flag: '🇬🇧', direction: 'both',     currency: 'GBP' },
  usa:         { name: 'United States',        flag: '🇺🇸', direction: 'both',     currency: 'USD' },
  kenya:       { name: 'Kenya',               flag: '🇰🇪', direction: 'both',     currency: 'KES' },
  germany:     { name: 'Germany',              flag: '🇩🇪', direction: 'both',     currency: 'EUR' },
  japan:       { name: 'Japan',               flag: '🇯🇵', direction: 'outbound', currency: 'JPY' },
  southkorea:  { name: 'South Korea',         flag: '🇰🇷', direction: 'outbound', currency: 'KRW' },
  malaysia:    { name: 'Malaysia',            flag: '🇲🇾', direction: 'outbound', currency: 'MYR' },
  canada:      { name: 'Canada',              flag: '🇨🇦', direction: 'inbound',  currency: 'CAD' },
  australia:   { name: 'Australia',           flag: '🇦🇺', direction: 'inbound',  currency: 'AUD' },
  saudi:       { name: 'Saudi Arabia',        flag: '🇸🇦', direction: 'inbound',  currency: 'SAR' },
  qatar:       { name: 'Qatar',               flag: '🇶🇦', direction: 'inbound',  currency: 'QAR' },
};

export const STATUS_LABELS = {
  pending:           { label: 'Pending',           color: '#FF9800' },
  rate_locked:       { label: 'Rate Locked',        color: '#2196F3' },
  payment_received:  { label: 'Payment Received',   color: '#2196F3' },
  converting:        { label: 'Converting',         color: '#9C27B0' },
  sending:           { label: 'Sending',            color: '#9C27B0' },
  completed:         { label: 'Completed',          color: '#4CAF50' },
  failed:            { label: 'Failed',             color: '#F44336' },
  refunded:          { label: 'Refunded',           color: '#F44336' },
  disputed:          { label: 'Disputed',           color: '#F44336' },
  cancelled:         { label: 'Cancelled',          color: '#666666' },
  // legacy (kept for backward compat)
  usdt_sent:         { label: 'USDT Sent',          color: '#4CAF50' },
};

export const CHAINS = {
  trc20:   { label: 'Tron (TRC20)',              fee: '$0.01',   recommended: true },
  bep20:   { label: 'BNB Smart Chain (BEP20)',   fee: '~$0.05',  recommended: false },
  polygon: { label: 'Polygon',                   fee: '~$0.01',  recommended: false },
  solana:  { label: 'Solana',                    fee: '~$0.001', recommended: false },
  erc20:   { label: 'Ethereum (ERC20)',           fee: '$3–15',   recommended: false },
  base:    { label: 'Base (USDC)',                fee: '~$0.001', recommended: false },
};

export const SETTLEMENT_METHODS = {
  mtn_momo:      { label: 'MTN MoMo',           fee: 'included', speed: '1 hour' },
  airtel:        { label: 'Airtel Money',        fee: 'included', speed: '1 hour' },
  bank_transfer: { label: 'Bank Transfer (UGX)', fee: '+0.5%',    speed: '1–3 days' },
  usdt_wallet:   { label: 'USDT to Wallet',      fee: 'included', speed: '30 min' },
  cash_pickup:   { label: 'Cash Pickup (KLA)',    fee: '+1%',      speed: 'same day' },
};
