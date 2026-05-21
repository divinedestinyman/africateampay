'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FromSaudiPage() {
  const [amount, setAmount] = useState('');
  const [ugxRate, setUgxRate] = useState(null);
  const [sarRate, setSarRate] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch('/api/rates/multi').then(r => r.json()).then(d => {
      if (d.rates?.UGX && d.rates?.SAR) {
        setUgxRate(d.rates.UGX);
        setSarRate(d.rates.SAR);
      }
    }).catch(() => {});
  }, []);

  function calculate() {
    const sar = parseFloat(amount);
    if (!sar || !ugxRate || !sarRate) return;
    const usd = sar / sarRate;
    const usdt = usd * 0.99;
    const ugx = usdt * (ugxRate / 1);
    setResult({ sar, usdt, ugx });
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>
      <p className="label" style={{ marginBottom: 8 }}>🇸🇦 Saudi Arabia → 🇺🇬 Uganda</p>
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px,6vw,72px)', letterSpacing: '0.03em', marginBottom: 16 }}>
        SEND FROM SAUDI<br /><span style={{ color: '#D4A017' }}>HOME TO UGANDA</span>
      </h1>
      <p style={{ fontSize: 18, color: '#aaa', marginBottom: 48, maxWidth: 600 }}>
        Ugandans working in Saudi Arabia — domestic workers, professionals — send UGX home safely, quickly and affordably.
      </p>

      <div className="card" style={{ padding: 32, marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, marginBottom: 24 }}>HOW IT WORKS</h2>
        {[
          { n: '01', title: 'Buy USDT in Saudi Arabia', desc: 'Use Binance, Rain (Bahrain-based, widely used in KSA), or OKX. Purchase USDT with SAR. SAMA-compliant exchanges.' },
          { n: '02', title: 'Place your order', desc: 'Use our Send form to create an order. Enter SAR or UGX amount. Your rate is locked for 30 minutes.' },
          { n: '03', title: 'Send USDT (TRC20)', desc: 'Transfer USDT from your exchange to our wallet address. Takes under 3 minutes. Fee: ~SAR 0.04.' },
          { n: '04', title: 'Family gets UGX', desc: 'MTN MoMo or Airtel delivery to Uganda within 2 hours. Bank transfer available.' },
        ].map(s => (
          <div key={s.n} style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, color: '#D4A017', flexShrink: 0, width: 40 }}>{s.n}</div>
            <div>
              <p style={{ fontWeight: 600, marginBottom: 4 }}>{s.title}</p>
              <p style={{ color: '#888', fontSize: 14 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 32, marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, marginBottom: 20 }}>WHERE TO BUY USDT IN SAUDI</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
          {[
            { name: 'Binance', note: 'Most popular globally, SAR pairs' },
            { name: 'Rain', note: 'Gulf-native, Arabic support' },
            { name: 'OKX', note: 'Low fees, fast withdrawal' },
            { name: 'HuobiPro', note: 'Large liquidity, SAR deposit' },
          ].map(e => (
            <div key={e.name} style={{ background: 'rgba(212,160,23,0.05)', border: '1px solid rgba(212,160,23,0.15)', borderRadius: 8, padding: 16 }}>
              <p style={{ fontWeight: 700, marginBottom: 4 }}>{e.name}</p>
              <p style={{ fontSize: 13, color: '#888' }}>{e.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card-gold" style={{ padding: 32, marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, marginBottom: 20 }}>CALCULATOR</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
          <input className="input" type="number" placeholder="SAR amount e.g. 500" value={amount} onChange={e => setAmount(e.target.value)} style={{ flex: 1, minWidth: 200 }} />
          <button className="btn-gold" onClick={calculate} style={{ padding: '12px 24px' }}>Calculate</button>
        </div>
        {result && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            <div><p className="label" style={{ marginBottom: 4 }}>You send (SAR)</p><p style={{ fontFamily: 'var(--font-mono)', fontSize: 20 }}>SAR {result.sar.toFixed(2)}</p></div>
            <div><p className="label" style={{ marginBottom: 4 }}>USDT to transfer</p><p style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color: '#D4A017' }}>{result.usdt.toFixed(2)}</p></div>
            <div><p className="label" style={{ marginBottom: 4 }}>Recipient gets (UGX)</p><p style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color: '#4CAF50' }}>≈ {Math.round(result.ugx).toLocaleString()}</p></div>
          </div>
        )}
      </div>

      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, marginBottom: 20 }}>FAQ</h2>
        {[
          { q: 'Is crypto allowed in Saudi Arabia?', a: 'Using licensed exchanges for personal remittance is widely practised. Always use SAMA-compliant platforms like Rain.' },
          { q: 'What if my employer blocks apps?', a: 'Use WiFi on days off. Exchanges work on any network. Transfers are quick — under 10 minutes start to finish.' },
          { q: 'Minimum amount?', a: 'Minimum 10 USDT (~$10). No maximum.' },
          { q: 'Is my family\'s number safe?', a: 'We only share recipient details with Coach who processes the payment. We do not sell or share personal data.' },
        ].map(f => (
          <div key={f.q} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 0' }}>
            <p style={{ fontWeight: 600, marginBottom: 6 }}>{f.q}</p>
            <p style={{ color: '#888', fontSize: 14 }}>{f.a}</p>
          </div>
        ))}
      </div>

      <Link href="/send" className="btn-gold" style={{ display: 'inline-block', padding: '16px 40px', fontSize: 16 }}>Send Money Home Now →</Link>
    </div>
  );
}
