'use client';
import { useState, useEffect, useCallback } from 'react';

const WA = process.env.NEXT_PUBLIC_COACH_WHATSAPP || '256784277664';

const CORRIDORS = [
  { id: 'china', label: '🇨🇳 China', currency: 'CNY' },
  { id: 'uae', label: '🇦🇪 UAE', currency: 'AED' },
  { id: 'uk', label: '🇬🇧 United Kingdom', currency: 'GBP' },
  { id: 'kenya', label: '🇰🇪 Kenya', currency: 'KES' },
];

const CONTEXT = {
  china: (u) => `~${Math.round(u * 6.9).toLocaleString()} CNY for Yiwu shopping`,
  uae: (u) => `~${(u * 3.67).toFixed(0)} AED via local exchange`,
  uk: (u) => `~£${(u * 0.79).toFixed(0)} GBP via Binance`,
  kenya: (u) => `~KES ${(u * 129).toFixed(0)} via M-Pesa`,
};

const COMPARE = [
  { method: 'Bank Wire', pct: '8–12%', color: '#ef4444' },
  { method: 'Western Union', pct: '5–8%', color: '#f97316' },
  { method: 'Forex Bureau', pct: '4–6%', color: '#eab308' },
  { method: 'AfricaTeamPay', pct: '1% flat', color: '#4CAF50', highlight: true },
];

export default function Calculator({ defaultCorridor = 'china' }) {
  const [ugx, setUgx] = useState('');
  const [corridor, setCorridor] = useState(defaultCorridor);
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/rates')
      .then(r => r.json())
      .then(d => { setRates(d); setLoading(false); })
      .catch(() => { setRates({ usdt_ugx: 3750, is_fallback: true }); setLoading(false); });
  }, []);

  const amount = parseFloat(ugx.replace(/,/g, '')) || 0;
  const rate = rates?.usdt_ugx || 3750;
  const feeUgx = Math.round(amount * 0.01);
  const netUgx = amount - feeUgx;
  const usdt = rate > 0 ? netUgx / rate : 0;
  const valid = amount >= 500000;

  const waMsg = encodeURIComponent(
    `Hi Coach, I want to transfer ${amount.toLocaleString()} UGX to ${CORRIDORS.find(c => c.id === corridor)?.label?.split(' ')[1] || corridor}.\nOrder ref: ACT-${Date.now()}\nI will share my USDT wallet address.`
  );

  return (
    <div>
      {/* Rate display */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div
          style={{
            background: 'rgba(212,160,23,0.08)',
            border: '1px solid rgba(212,160,23,0.2)',
            borderRadius: 8,
            padding: '8px 14px',
            flex: 1,
          }}
        >
          <p className="label" style={{ marginBottom: 2 }}>Live Rate</p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: '#D4A017' }}>
            {loading ? '...' : `1 USDT = UGX ${rate.toLocaleString()}`}
          </p>
        </div>
        {rates?.is_fallback && (
          <span style={{ fontSize: 11, color: '#666' }}>using estimate</span>
        )}
      </div>

      {/* Inputs */}
      <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
        <div>
          <label className="label" style={{ display: 'block', marginBottom: 8 }}>
            I want to send (UGX)
          </label>
          <input
            className="input"
            type="text"
            placeholder="e.g. 75,000,000"
            value={ugx}
            onChange={e => {
              const raw = e.target.value.replace(/[^0-9]/g, '');
              setUgx(raw ? Number(raw).toLocaleString() : '');
            }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: 18 }}
          />
          {amount > 0 && amount < 500000 && (
            <p style={{ color: '#ef4444', fontSize: 12, marginTop: 6 }}>
              Minimum transfer: UGX 500,000
            </p>
          )}
        </div>

        <div>
          <label className="label" style={{ display: 'block', marginBottom: 8 }}>
            I am going to
          </label>
          <select
            className="input"
            value={corridor}
            onChange={e => setCorridor(e.target.value)}
            style={{ cursor: 'pointer' }}
          >
            {CORRIDORS.map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Calculation breakdown */}
      {amount >= 500000 && (
        <div className="card" style={{ padding: 20, marginBottom: 20 }}>
          <p className="label" style={{ marginBottom: 14 }}>Breakdown</p>
          <Row label="You send" value={`UGX ${amount.toLocaleString()}`} />
          <Row label={`Coach fee (1%)`} value={`− UGX ${feeUgx.toLocaleString()}`} muted />
          <Row label="Net after fee" value={`UGX ${netUgx.toLocaleString()}`} muted />
          <Row label={`Rate`} value={`÷ ${rate.toLocaleString()} UGX/USDT`} muted />
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '12px 0' }} />
          <Row
            label="You receive"
            value={`${usdt.toFixed(2)} USDT`}
            gold
          />
          <Row label="Tron network fee" value="$0.01 (TRC20)" muted />
          <div
            style={{
              marginTop: 12,
              padding: '10px 12px',
              background: 'rgba(76,175,80,0.08)',
              border: '1px solid rgba(76,175,80,0.2)',
              borderRadius: 6,
            }}
          >
            <p style={{ fontSize: 13, color: '#4CAF50' }}>
              {CONTEXT[corridor]?.(usdt) || `${usdt.toFixed(2)} USDT to recipient`}
            </p>
          </div>
        </div>
      )}

      {/* CTA */}
      <a
        href={valid ? `https://wa.me/${WA}?text=${waMsg}` : '#'}
        target="_blank"
        rel="noreferrer"
        className="btn-gold"
        style={{
          display: 'block',
          textAlign: 'center',
          width: '100%',
          opacity: valid ? 1 : 0.4,
          pointerEvents: valid ? 'auto' : 'none',
        }}
      >
        WhatsApp Coach to Start →
      </a>

      {valid && (
        <p style={{ textAlign: 'center', color: '#555', fontSize: 12, marginTop: 10 }}>
          Message pre-filled with your transfer details
        </p>
      )}

      {/* Comparison */}
      <div style={{ marginTop: 32 }}>
        <p className="label" style={{ marginBottom: 14 }}>Fee comparison</p>
        {COMPARE.map(row => {
          const loss = amount > 0 && !row.highlight
            ? Math.round(amount * parseFloat(row.pct) / 100)
            : null;
          return (
            <div
              key={row.method}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 14px',
                borderRadius: 6,
                marginBottom: 6,
                background: row.highlight ? 'rgba(76,175,80,0.07)' : 'transparent',
                border: row.highlight ? '1px solid rgba(76,175,80,0.2)' : '1px solid transparent',
              }}
            >
              <span style={{ fontSize: 14, color: row.highlight ? '#F5F5F5' : '#888' }}>
                {row.method}
              </span>
              <div style={{ textAlign: 'right' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    color: row.color,
                  }}
                >
                  {row.pct}
                </span>
                {loss && amount > 0 && (
                  <p style={{ fontSize: 11, color: '#555', marginTop: 2 }}>
                    costs UGX {loss.toLocaleString()}
                  </p>
                )}
                {row.highlight && amount >= 500000 && (
                  <p style={{ fontSize: 11, color: '#4CAF50', marginTop: 2 }}>
                    you pay UGX {feeUgx.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Row({ label, value, muted, gold }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
      <span style={{ fontSize: 13, color: muted ? '#666' : '#aaa' }}>{label}</span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 14,
          color: gold ? '#D4A017' : muted ? '#777' : '#F5F5F5',
          fontWeight: gold ? 700 : 400,
        }}
      >
        {value}
      </span>
    </div>
  );
}
