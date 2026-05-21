'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { CORRIDORS, CHAINS, SETTLEMENT_METHODS } from '@/lib/utils';

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar 🇺🇸' },
  { code: 'GBP', name: 'British Pound 🇬🇧' },
  { code: 'EUR', name: 'Euro 🇪🇺' },
  { code: 'SAR', name: 'Saudi Riyal 🇸🇦' },
  { code: 'AED', name: 'UAE Dirham 🇦🇪' },
  { code: 'CAD', name: 'Canadian Dollar 🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar 🇦🇺' },
  { code: 'QAR', name: 'Qatari Riyal 🇶🇦' },
  { code: 'KES', name: 'Kenyan Shilling 🇰🇪' },
  { code: 'ZAR', name: 'South African Rand 🇿🇦' },
  { code: 'CNY', name: 'Chinese Yuan 🇨🇳' },
  { code: 'INR', name: 'Indian Rupee 🇮🇳' },
  { code: 'TRY', name: 'Turkish Lira 🇹🇷' },
  { code: 'JPY', name: 'Japanese Yen 🇯🇵' },
  { code: 'KRW', name: 'South Korean Won 🇰🇷' },
  { code: 'MYR', name: 'Malaysian Ringgit 🇲🇾' },
  { code: 'IDR', name: 'Indonesian Rupiah 🇮🇩' },
  { code: 'THB', name: 'Thai Baht 🇹🇭' },
  { code: 'SGD', name: 'Singapore Dollar 🇸🇬' },
  { code: 'SEK', name: 'Swedish Krona 🇸🇪' },
  { code: 'NOK', name: 'Norwegian Krone 🇳🇴' },
  { code: 'DKK', name: 'Danish Krone 🇩🇰' },
  { code: 'CHF', name: 'Swiss Franc 🇨🇭' },
  { code: 'BRL', name: 'Brazilian Real 🇧🇷' },
  { code: 'NGN', name: 'Nigerian Naira 🇳🇬' },
  { code: 'GHS', name: 'Ghanaian Cedi 🇬🇭' },
  { code: 'EGP', name: 'Egyptian Pound 🇪🇬' },
  { code: 'MAD', name: 'Moroccan Dirham 🇲🇦' },
  { code: 'XOF', name: 'West African CFA 🌍' },
  { code: 'ZMW', name: 'Zambian Kwacha 🇿🇲' },
  { code: 'ETB', name: 'Ethiopian Birr 🇪🇹' },
  { code: 'TZS', name: 'Tanzanian Shilling 🇹🇿' },
  { code: 'RWF', name: 'Rwandan Franc 🇷🇼' },
];

const outboundCorridors = Object.entries(CORRIDORS)
  .filter(([, c]) => c.direction === 'outbound' || c.direction === 'both')
  .map(([id, c]) => ({ id, ...c }))
  .sort((a, b) => a.name.localeCompare(b.name));

const S = {
  page: { maxWidth: 720, margin: '0 auto', padding: '40px 20px 80px' },
  card: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '28px 24px', marginBottom: 16 },
  cardGold: { background: 'linear-gradient(135deg,var(--surface),rgba(212,160,23,0.05))', border: '1px solid var(--gold-border)', borderRadius: 12, padding: '28px 24px', marginBottom: 16 },
  sectionLabel: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 },
  row: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  half: { flex: '1 1 200px' },
  field: { marginBottom: 16 },
  label: { display: 'block', fontSize: 13, color: '#999', marginBottom: 6 },
  hint: { fontSize: 12, color: '#555', marginTop: 4 },
  divider: { height: 1, background: 'var(--border)', margin: '20px 0' },
};

function Field({ label, hint, children }) {
  return (
    <div style={S.field}>
      <label style={S.label}>{label}</label>
      {children}
      {hint && <p style={S.hint}>{hint}</p>}
    </div>
  );
}

export default function SendForm({ defaultDirection = 'outbound' }) {
  const [direction, setDirection] = useState(defaultDirection);
  const [step, setStep] = useState(1);
  const [rates, setRates] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState('30:00');
  const [expired, setExpired] = useState(false);

  const [form, setForm] = useState({
    // Outbound
    amount_ugx: '', corridor_id: '', supplier_payment_method: 'usdt_wallet',
    payment_type: 'single', supplier_name: '', supplier_wallet: '',
    supplier_bank_name: '', supplier_bank_account: '', supplier_bank_swift: '',
    supplier_currency: '', goods_description: '',
    // Inbound
    sender_amount: '', sender_currency: 'USD', sender_country: '',
    settlement_method: 'mtn_momo', recipient_name: '', recipient_whatsapp: '',
    recipient_momo_number: '', recipient_momo_network: 'mtn',
    recipient_bank_name: '', recipient_bank_account: '', recipient_bank_branch: '',
    recipient_wallet_address: '', recipient_id_for_cash: '',
    // Both
    sending_chain: 'trc20', sender_name: '', sender_email: '',
    sender_whatsapp: '', sender_telegram: '', notes: '',
  });

  const debounceRef = useRef(null);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  useEffect(() => {
    fetch('/api/rates/multi').then(r => r.json()).then(setRates).catch(() => {});
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (!rates) return;
      if (direction === 'outbound') {
        const ugx = parseInt(form.amount_ugx);
        if (ugx >= 500000) {
          setPreview({ usdt: ((ugx * 0.99) / rates.ugx_per_usd).toFixed(2), ugx });
        } else setPreview(null);
      } else {
        const amt = parseFloat(form.sender_amount);
        const rateToUsd = rates.rates?.[form.sender_currency];
        if (amt > 0 && rateToUsd) {
          const usd = amt / rateToUsd;
          setPreview({
            usdt: usd.toFixed(2),
            ugx: Math.round(usd * 0.99 * rates.ugx_per_usd).toLocaleString(),
            currency: form.sender_currency,
          });
        } else setPreview(null);
      }
    }, 500);
  }, [form.amount_ugx, form.sender_amount, form.sender_currency, direction, rates]);

  useEffect(() => {
    if (!order?.rate_lock_expires_at) return;
    const expires = new Date(order.rate_lock_expires_at).getTime();
    const tick = () => {
      const rem = expires - Date.now();
      if (rem <= 0) { setCountdown('00:00'); setExpired(true); return; }
      const m = Math.floor(rem / 60000);
      const s = Math.floor((rem % 60000) / 1000);
      setCountdown(`${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [order?.rate_lock_expires_at]);

  function validate() {
    if (!form.sender_name.trim()) return 'Your name is required';
    if (!form.sender_email.trim()) return 'Your email address is required';
    if (direction === 'outbound') {
      if (!parseInt(form.amount_ugx) || parseInt(form.amount_ugx) < 500000)
        return 'Minimum amount is UGX 500,000';
      if (!form.corridor_id) return 'Select a destination country';
      if (form.supplier_payment_method === 'usdt_wallet' && !form.supplier_wallet)
        return "Enter your supplier's USDT wallet address";
      if (form.supplier_payment_method === 'bank_tt' && !form.supplier_bank_account)
        return "Enter your supplier's bank account number";
    } else {
      if (!parseFloat(form.sender_amount) || parseFloat(form.sender_amount) <= 0)
        return 'Enter the amount you are sending';
      if (['mtn_momo', 'airtel'].includes(form.settlement_method)) {
        if (!form.recipient_name) return "Enter the recipient's name";
        if (!form.recipient_momo_number) return "Enter the recipient's mobile money number";
      }
      if (form.settlement_method === 'bank_transfer') {
        if (!form.recipient_name) return "Enter the recipient's name";
        if (!form.recipient_bank_name) return 'Enter the bank name';
        if (!form.recipient_bank_account) return 'Enter the account number';
      }
      if (form.settlement_method === 'usdt_wallet' && !form.recipient_wallet_address)
        return "Enter the recipient's wallet address";
      if (form.settlement_method === 'cash_pickup') {
        if (!form.recipient_name) return "Enter the recipient's name";
        if (!form.recipient_id_for_cash) return "Enter the recipient's national ID number";
      }
    }
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError(''); setSubmitting(true);
    try {
      const payload = {
        direction,
        sender_name: form.sender_name,
        sender_email: form.sender_email,
        sender_whatsapp: form.sender_whatsapp || undefined,
        sender_telegram: form.sender_telegram || undefined,
        notes: form.notes || undefined,
        sending_chain: form.sending_chain,
      };
      if (direction === 'outbound') {
        Object.assign(payload, {
          amount_ugx: parseInt(form.amount_ugx),
          corridor_id: form.corridor_id,
          supplier_payment_method: form.supplier_payment_method,
          payment_type: form.payment_type,
          supplier_name: form.supplier_name || undefined,
          supplier_wallet: form.supplier_wallet || undefined,
          supplier_bank_name: form.supplier_bank_name || undefined,
          supplier_bank_account: form.supplier_bank_account || undefined,
          supplier_bank_swift: form.supplier_bank_swift || undefined,
          goods_description: form.goods_description || undefined,
        });
      } else {
        Object.assign(payload, {
          sender_amount: parseFloat(form.sender_amount),
          sender_currency: form.sender_currency,
          sender_country: form.sender_country || undefined,
          settlement_method: form.settlement_method,
          recipient_name: form.recipient_name || undefined,
          recipient_whatsapp: form.recipient_whatsapp || undefined,
          recipient_momo_number: form.recipient_momo_number || undefined,
          recipient_momo_network: form.recipient_momo_number ? form.recipient_momo_network : undefined,
          recipient_bank_name: form.recipient_bank_name || undefined,
          recipient_bank_account: form.recipient_bank_account || undefined,
          recipient_bank_branch: form.recipient_bank_branch || undefined,
          recipient_wallet_address: form.recipient_wallet_address || undefined,
          recipient_id_for_cash: form.recipient_id_for_cash || undefined,
        });
      }
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create order');
      setOrder(data.order);
      setStep(2);
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function copyWallet() {
    if (!order?.wallet_address) return;
    try {
      await navigator.clipboard.writeText(order.wallet_address);
    } catch {
      const el = document.createElement('textarea');
      el.value = order.wallet_address;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // ── Confirmation step ──────────────────────────────────────────────────────
  if (step === 2 && order) {
    const chainInfo = CHAINS[order.sending_chain] || CHAINS.trc20;
    const wa = `https://wa.me/${process.env.NEXT_PUBLIC_COACH_WHATSAPP || '256784277664'}?text=My+order+is+${order.reference}`;
    return (
      <div style={S.page}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
          <p style={S.sectionLabel}>Order Confirmed</p>
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(32px,6vw,52px)', letterSpacing: '0.03em' }}>
            YOUR ORDER IS PLACED
          </h1>
          <p style={{ color: '#999', fontSize: 15, marginTop: 8 }}>
            Rate locked for 30 minutes. Send USDT before the timer expires.
          </p>
        </div>

        <div style={S.cardGold}>
          <p style={S.sectionLabel}>Order Reference</p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 28, color: '#D4A017', letterSpacing: '0.05em' }}>
            {order.reference}
          </p>
          <p style={{ fontSize: 13, color: '#666', marginTop: 6 }}>
            Save this reference to track your order at any time.
          </p>
        </div>

        <div style={S.card}>
          <p style={S.sectionLabel}>Send Exactly This Amount</p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 32, color: '#D4A017', marginBottom: 4 }}>
            {Number(order.amount_usdt).toFixed(2)} USDT
          </p>
          <p style={{ fontSize: 13, color: '#666', marginBottom: 20 }}>
            {chainInfo.label} · Fee: {chainInfo.fee}
          </p>
          <p style={{ fontSize: 13, color: '#999', marginBottom: 8 }}>To this wallet address:</p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, background: 'var(--surface-2)',
            borderRadius: 8, padding: '12px 14px', border: '1px solid var(--border)',
          }}>
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#D4A017', flex: 1, wordBreak: 'break-all' }}>
              {order.wallet_address || 'Contact Coach for wallet address'}
            </code>
            {order.wallet_address && (
              <button
                onClick={copyWallet}
                style={{ background: copied ? '#4CAF50' : 'var(--gold)', color: '#000', border: 'none',
                  borderRadius: 6, padding: '6px 14px', fontWeight: 700, cursor: 'pointer', fontSize: 13, flexShrink: 0 }}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
        </div>

        <div style={{
          ...S.card,
          background: expired ? 'rgba(244,67,54,0.05)' : 'rgba(212,160,23,0.04)',
          borderColor: expired ? 'rgba(244,67,54,0.3)' : 'var(--gold-border)',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 13, color: '#999', marginBottom: 8 }}>
            {expired ? '⚠️ Rate expired — place a new order' : '⏱ Rate lock expires in'}
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 40, letterSpacing: '0.1em', color: expired ? '#F44336' : '#D4A017' }}>
            {countdown}
          </p>
          {!expired && (
            <p style={{ fontSize: 12, color: '#555', marginTop: 6 }}>
              1 USDT = UGX {Number(order.usdt_rate).toLocaleString()} · Send before timer reaches 00:00
            </p>
          )}
        </div>

        <div style={S.card}>
          <p style={S.sectionLabel}>What Happens Next</p>
          {[
            ['1', 'Send USDT now', `Send exactly ${Number(order.amount_usdt).toFixed(2)} USDT via ${chainInfo.label} to the address above.`],
            ['2', 'Coach confirms receipt', 'Coach monitors the wallet and confirms your payment within minutes.'],
            ['3', 'Transfer processed', direction === 'inbound'
              ? 'Recipient receives funds via your chosen settlement method within 1 hour.'
              : 'Coach converts USDT and pays your supplier within 1 hour.'],
            ['4', 'You get notified', `Email confirmation sent to ${order.sender_email}`],
          ].map(([num, title, desc]) => (
            <div key={num} style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', background: 'var(--gold)',
                color: '#000', fontWeight: 700, fontSize: 13, display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>{num}</div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{title}</p>
                <p style={{ fontSize: 13, color: '#777' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href={`/track/${order.reference}`} className="btn-gold" style={{ flex: 1, justifyContent: 'center' }}>
            Track Order →
          </Link>
          <a href={wa} target="_blank" rel="noreferrer" className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
            WhatsApp Coach
          </a>
        </div>
      </div>
    );
  }

  // ── Form step ──────────────────────────────────────────────────────────────
  const showChain = direction === 'inbound' || form.supplier_payment_method === 'usdt_wallet';

  return (
    <div style={S.page}>
      {/* Direction toggle */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 28, border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
        {[
          { key: 'outbound', emoji: '↗', label: 'I am in Uganda — sending OUT', sub: 'Pay suppliers in China, UAE, India & more' },
          { key: 'inbound',  emoji: '↙', label: 'I am abroad — sending HOME', sub: 'Family receives MTN MoMo or bank transfer' },
        ].map(({ key, emoji, label, sub }) => (
          <button
            key={key}
            type="button"
            onClick={() => setDirection(key)}
            style={{
              flex: 1, padding: '18px 16px', border: 'none', cursor: 'pointer', textAlign: 'left',
              background: direction === key ? 'rgba(212,160,23,0.08)' : 'var(--surface)',
              borderRight: key === 'outbound' ? '1px solid var(--border)' : 'none',
              borderBottom: direction === key ? '2px solid var(--gold)' : '2px solid transparent',
              transition: 'all 0.15s',
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 4 }}>{emoji}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: direction === key ? '#D4A017' : '#999', marginBottom: 2 }}>
              {label}
            </div>
            <div style={{ fontSize: 12, color: '#555' }}>{sub}</div>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Amount + destination */}
        <div style={S.card}>
          <p style={S.sectionLabel}>{direction === 'outbound' ? 'Transfer Amount' : 'Amount You Are Sending'}</p>

          {direction === 'outbound' ? (
            <>
              <Field label="Amount in UGX" hint="Minimum: UGX 500,000">
                <input
                  className="input"
                  type="number"
                  placeholder="e.g. 2000000"
                  value={form.amount_ugx}
                  onChange={e => set('amount_ugx', e.target.value)}
                  style={{ fontFamily: 'var(--font-mono)' }}
                />
              </Field>
              <Field label="Destination Country">
                <select className="input" style={{ cursor: 'pointer' }} value={form.corridor_id} onChange={e => set('corridor_id', e.target.value)}>
                  <option value="">— Select country —</option>
                  {outboundCorridors.map(c => (
                    <option key={c.id} value={c.id}>{c.flag} {c.name}</option>
                  ))}
                  <option value="other">🌍 Other country</option>
                </select>
              </Field>
            </>
          ) : (
            <div style={S.row}>
              <div style={S.half}>
                <Field label="Amount">
                  <input
                    className="input"
                    type="number"
                    placeholder="e.g. 500"
                    value={form.sender_amount}
                    onChange={e => set('sender_amount', e.target.value)}
                    style={{ fontFamily: 'var(--font-mono)' }}
                  />
                </Field>
              </div>
              <div style={S.half}>
                <Field label="Currency">
                  <select className="input" style={{ cursor: 'pointer' }} value={form.sender_currency} onChange={e => set('sender_currency', e.target.value)}>
                    {CURRENCIES.map(c => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>
          )}

          {/* Live preview */}
          {preview && (
            <div style={{ background: 'rgba(212,160,23,0.06)', border: '1px solid var(--gold-border)', borderRadius: 8, padding: '12px 16px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#D4A017', marginBottom: 2 }}>
                ≈ {preview.usdt} USDT
              </p>
              {preview.ugx && (
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#666' }}>
                  Recipient gets ≈ UGX {preview.ugx}
                </p>
              )}
              <p style={{ fontSize: 11, color: '#444', marginTop: 4 }}>
                Includes 1% Coach fee · Rate locked 30 min on submit
              </p>
            </div>
          )}
        </div>

        {/* Supplier / Recipient details */}
        <div style={S.card}>
          {direction === 'outbound' ? (
            <>
              <p style={S.sectionLabel}>Supplier Details</p>
              <Field label="How does your supplier want to be paid?">
                <select className="input" style={{ cursor: 'pointer' }} value={form.supplier_payment_method} onChange={e => set('supplier_payment_method', e.target.value)}>
                  <option value="usdt_wallet">USDT to supplier's wallet (fastest)</option>
                  <option value="bank_tt">Bank wire transfer (T/T) — 3–5 days</option>
                  <option value="local_agent">Local agent in country — 24 hrs</option>
                  <option value="platform_escrow">Alibaba Trade Assurance</option>
                </select>
              </Field>
              <Field label="Supplier Name (optional)">
                <input className="input" placeholder="Company or individual name" value={form.supplier_name} onChange={e => set('supplier_name', e.target.value)} />
              </Field>
              {form.supplier_payment_method === 'usdt_wallet' && (
                <Field label="Supplier's USDT Wallet Address" hint="TRC20, BEP20, or other — match your chosen chain below">
                  <input className="input" style={{ fontFamily: 'var(--font-mono)' }} placeholder="Wallet address" value={form.supplier_wallet} onChange={e => set('supplier_wallet', e.target.value)} />
                </Field>
              )}
              {form.supplier_payment_method === 'bank_tt' && (
                <>
                  <div style={S.row}>
                    <div style={S.half}>
                      <Field label="Bank Name">
                        <input className="input" placeholder="e.g. ICBC" value={form.supplier_bank_name} onChange={e => set('supplier_bank_name', e.target.value)} />
                      </Field>
                    </div>
                    <div style={S.half}>
                      <Field label="Account Number">
                        <input className="input" style={{ fontFamily: 'var(--font-mono)' }} placeholder="Account number" value={form.supplier_bank_account} onChange={e => set('supplier_bank_account', e.target.value)} />
                      </Field>
                    </div>
                  </div>
                  <Field label="SWIFT / BIC Code (optional)">
                    <input className="input" style={{ fontFamily: 'var(--font-mono)' }} placeholder="e.g. ICBKCNBJ" value={form.supplier_bank_swift} onChange={e => set('supplier_bank_swift', e.target.value)} />
                  </Field>
                </>
              )}
              <Field label="Goods Description (optional)">
                <input className="input" placeholder="e.g. Fabric rolls, electronics, machinery" value={form.goods_description} onChange={e => set('goods_description', e.target.value)} />
              </Field>
              <Field label="Payment Structure">
                <select className="input" style={{ cursor: 'pointer' }} value={form.payment_type} onChange={e => set('payment_type', e.target.value)}>
                  <option value="single">Single payment (trusted supplier)</option>
                  <option value="staged_30_70">30% deposit + 70% on shipment (new supplier)</option>
                  <option value="staged_50_50">50/50 split</option>
                </select>
              </Field>
            </>
          ) : (
            <>
              <p style={S.sectionLabel}>Recipient Details</p>
              <Field label="How should the recipient receive funds?">
                <select className="input" style={{ cursor: 'pointer' }} value={form.settlement_method} onChange={e => set('settlement_method', e.target.value)}>
                  <option value="mtn_momo">MTN MoMo — 1 hour</option>
                  <option value="airtel">Airtel Money — 1 hour</option>
                  <option value="bank_transfer">Uganda Bank Transfer — 1–3 days (+0.5%)</option>
                  <option value="usdt_wallet">USDT to wallet — 30 min</option>
                  <option value="cash_pickup">Cash Pickup Kampala — same day (+1%)</option>
                </select>
              </Field>
              {['mtn_momo', 'airtel', 'bank_transfer', 'cash_pickup'].includes(form.settlement_method) && (
                <Field label="Recipient Full Name">
                  <input className="input" placeholder="As on national ID" value={form.recipient_name} onChange={e => set('recipient_name', e.target.value)} />
                </Field>
              )}
              {(form.settlement_method === 'mtn_momo' || form.settlement_method === 'airtel') && (
                <div style={S.row}>
                  <div style={S.half}>
                    <Field label="Mobile Money Number" hint="Include country code: 256...">
                      <input className="input" style={{ fontFamily: 'var(--font-mono)' }} placeholder="256700000000" value={form.recipient_momo_number} onChange={e => set('recipient_momo_number', e.target.value)} />
                    </Field>
                  </div>
                  <div style={S.half}>
                    <Field label="Network">
                      <select className="input" style={{ cursor: 'pointer' }} value={form.recipient_momo_network} onChange={e => set('recipient_momo_network', e.target.value)}>
                        <option value="mtn">MTN Uganda</option>
                        <option value="airtel">Airtel Uganda</option>
                      </select>
                    </Field>
                  </div>
                </div>
              )}
              {form.settlement_method === 'bank_transfer' && (
                <>
                  <div style={S.row}>
                    <div style={S.half}>
                      <Field label="Bank Name">
                        <input className="input" placeholder="e.g. Stanbic, DFCU, Centenary" value={form.recipient_bank_name} onChange={e => set('recipient_bank_name', e.target.value)} />
                      </Field>
                    </div>
                    <div style={S.half}>
                      <Field label="Account Number">
                        <input className="input" style={{ fontFamily: 'var(--font-mono)' }} placeholder="Account number" value={form.recipient_bank_account} onChange={e => set('recipient_bank_account', e.target.value)} />
                      </Field>
                    </div>
                  </div>
                  <Field label="Branch (optional)">
                    <input className="input" placeholder="e.g. Kampala Road" value={form.recipient_bank_branch} onChange={e => set('recipient_bank_branch', e.target.value)} />
                  </Field>
                </>
              )}
              {form.settlement_method === 'usdt_wallet' && (
                <Field label="Recipient Wallet Address">
                  <input className="input" style={{ fontFamily: 'var(--font-mono)' }} placeholder="TRC20 / BEP20 wallet" value={form.recipient_wallet_address} onChange={e => set('recipient_wallet_address', e.target.value)} />
                </Field>
              )}
              {form.settlement_method === 'cash_pickup' && (
                <>
                  <Field label="National ID Number" hint="Required for cash pickup verification">
                    <input className="input" style={{ fontFamily: 'var(--font-mono)' }} placeholder="ID number" value={form.recipient_id_for_cash} onChange={e => set('recipient_id_for_cash', e.target.value)} />
                  </Field>
                  <Field label="Recipient WhatsApp (optional)">
                    <input className="input" placeholder="256700000000" value={form.recipient_whatsapp} onChange={e => set('recipient_whatsapp', e.target.value)} />
                  </Field>
                </>
              )}
            </>
          )}
        </div>

        {/* Chain selector */}
        {showChain && (
          <div style={S.card}>
            <p style={S.sectionLabel}>Sending Chain</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {Object.entries(CHAINS).map(([key, chain]) => (
                <label key={key} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                  borderRadius: 8, cursor: 'pointer',
                  background: form.sending_chain === key ? 'rgba(212,160,23,0.07)' : 'var(--surface-2)',
                  border: `1px solid ${form.sending_chain === key ? 'var(--gold-border)' : 'var(--border)'}`,
                }}>
                  <input
                    type="radio"
                    name="chain"
                    value={key}
                    checked={form.sending_chain === key}
                    onChange={() => set('sending_chain', key)}
                    style={{ accentColor: '#D4A017', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 14, fontWeight: chain.recommended ? 600 : 400 }}>
                      {chain.label}
                      {chain.recommended && (
                        <span style={{ marginLeft: 8, fontSize: 10, background: 'var(--gold)', color: '#000',
                          padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>RECOMMENDED</span>
                      )}
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#666' }}>{chain.fee}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Contact info */}
        <div style={S.card}>
          <p style={S.sectionLabel}>Your Contact Information</p>
          <div style={S.row}>
            <div style={S.half}>
              <Field label="Your Full Name *">
                <input className="input" placeholder="Your name" value={form.sender_name} onChange={e => set('sender_name', e.target.value)} />
              </Field>
            </div>
            <div style={S.half}>
              <Field label="Email Address *" hint="Order confirmation + tracking sent here">
                <input className="input" type="email" placeholder="you@email.com" value={form.sender_email} onChange={e => set('sender_email', e.target.value)} />
              </Field>
            </div>
          </div>
          <div style={S.row}>
            <div style={S.half}>
              <Field label="WhatsApp (optional)">
                <input className="input" placeholder="256700000000" value={form.sender_whatsapp} onChange={e => set('sender_whatsapp', e.target.value)} />
              </Field>
            </div>
            <div style={S.half}>
              <Field label="Telegram Username (optional)">
                <input className="input" placeholder="username (no @)" value={form.sender_telegram} onChange={e => set('sender_telegram', e.target.value.replace('@', ''))} />
              </Field>
            </div>
          </div>
          <Field label="Notes for Coach (optional)">
            <textarea
              className="input"
              placeholder="Any special instructions, supplier contact, order details..."
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
              rows={3}
              style={{ resize: 'vertical', minHeight: 80 }}
            />
          </Field>
        </div>

        {error && (
          <div style={{ padding: '12px 16px', background: 'rgba(244,67,54,0.08)', border: '1px solid rgba(244,67,54,0.2)',
            borderRadius: 8, color: '#ef4444', fontSize: 14, marginBottom: 16 }}>
            ⚠ {error}
          </div>
        )}

        <button
          type="submit"
          className="btn-gold"
          disabled={submitting}
          style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '16px' }}
        >
          {submitting ? 'Creating Order...' : 'Lock Rate & Place Order →'}
        </button>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#444', marginTop: 12 }}>
          No payment yet. You will receive a wallet address after submitting.
          Rate locked for 30 minutes.
        </p>
      </form>
    </div>
  );
}
