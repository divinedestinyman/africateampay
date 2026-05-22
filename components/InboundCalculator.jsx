'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const INBOUND_CURRENCIES = [
  { code: 'USD', flag: '🇺🇸', label: 'US Dollar' },
  { code: 'GBP', flag: '🇬🇧', label: 'British Pound' },
  { code: 'AED', flag: '🇦🇪', label: 'UAE Dirham' },
  { code: 'SAR', flag: '🇸🇦', label: 'Saudi Riyal' },
  { code: 'CAD', flag: '🇨🇦', label: 'Canadian Dollar' },
  { code: 'AUD', flag: '🇦🇺', label: 'Australian Dollar' },
  { code: 'EUR', flag: '🇩🇪', label: 'Euro' },
  { code: 'QAR', flag: '🇶🇦', label: 'Qatari Riyal' },
  { code: 'KES', flag: '🇰🇪', label: 'Kenyan Shilling' },
];

export default function InboundCalculator() {
  const [currency, setCurrency] = useState('USD');
  const [amount, setAmount] = useState('100');
  const [rates, setRates] = useState(null);

  useEffect(() => {
    fetch('/api/rates/multi')
      .then(r => r.json())
      .then(d => setRates(d.rates || d))
      .catch(() => {});
  }, []);

  const cur = INBOUND_CURRENCIES.find(c => c.code === currency);
  const ugxRate = rates?.ugx;
  const fiatRate = rates?.[currency.toLowerCase()];
  let ugxAmount = null;
  if (ugxRate && fiatRate && amount && !isNaN(Number(amount))) {
    // fiat → USD → UGX
    const usd = Number(amount) / fiatRate;
    const gross = usd * ugxRate;
    ugxAmount = gross * 0.99; // after 1% fee
  }

  return (
    <div style={{ marginTop: 20, background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: '20px 24px' }}>
      <p style={{ fontSize: 12, color: '#888', marginBottom: 12, letterSpacing: '0.08em' }}>QUICK ESTIMATE</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <select
          value={currency}
          onChange={e => setCurrency(e.target.value)}
          style={{
            background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', color: '#fff',
            borderRadius: 6, padding: '8px 10px', fontSize: 14, cursor: 'pointer',
          }}
        >
          {INBOUND_CURRENCIES.map(c => (
            <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
          ))}
        </select>

        <input
          type="number"
          value={amount}
          min="1"
          onChange={e => setAmount(e.target.value)}
          style={{
            background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff', borderRadius: 6, padding: '8px 12px', fontSize: 14,
            width: 110, outline: 'none',
          }}
        />

        <span style={{ color: '#555', fontSize: 14 }}>→</span>

        <div style={{ minWidth: 160 }}>
          {ugxAmount != null ? (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: '#D4A017', fontWeight: 700 }}>
              UGX {Math.round(ugxAmount).toLocaleString()}
            </span>
          ) : (
            <span style={{ color: '#444', fontSize: 14 }}>
              {rates ? '—' : 'Loading...'}
            </span>
          )}
          {ugxAmount && <span style={{ fontSize: 11, color: '#555', marginLeft: 8 }}>after 1% fee</span>}
        </div>
      </div>

      <Link
        href="/send-to-uganda"
        style={{ display: 'inline-block', marginTop: 14, fontSize: 13, color: '#D4A017', textDecoration: 'none' }}
      >
        Send money home →
      </Link>
    </div>
  );
}
