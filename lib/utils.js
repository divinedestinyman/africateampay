export function generateReference() {
  const d = new Date();
  const date = d.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `ACT-${date}-${rand}`;
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
  china: { name: 'China', flag: '🇨🇳' },
  uae: { name: 'UAE', flag: '🇦🇪' },
  uk: { name: 'United Kingdom', flag: '🇬🇧' },
  kenya: { name: 'Kenya', flag: '🇰🇪' },
};

export const STATUS_LABELS = {
  pending: { label: 'Pending', color: 'text-yellow-400' },
  payment_received: { label: 'Payment Received', color: 'text-blue-400' },
  usdt_sent: { label: 'USDT Sent', color: 'text-green-400' },
  completed: { label: 'Completed', color: 'text-green-500' },
  cancelled: { label: 'Cancelled', color: 'text-red-400' },
};
