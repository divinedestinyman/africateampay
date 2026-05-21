'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FromUAEPage() {
  const [amount, setAmount] = useState('');
  const [ugxRate, setUgxRate] = useState(null);
  const [aedRate, setAedRate] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch('/api/rates/multi').then(r => r.json()).then(d => {
      if (d.rates?.UGX && d.rates?.AED) {
        setUgxRate(d.rates.UGX);
        setAedRate(d.rates.AED);
      }
    }).catch(() => {});
  }, []);

  function calculate() {
    const aed = parseFloat(amount);
    if (!aed || !ugxRate || !aedRate) return;
    const usd = aed / aedRate;
    const usdt = usd * 0.99;
    const ugx = usdt * (ugxRate / 1);
    setResult({ aed, usdt, ugx });
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>
      <p className="label" style={{ marginBottom: 8 }}>🇦🇪 UAE → 🇺🇬 Uganda</p>
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px,6vw,72px)', letterSpacing: '0.03em', marginBottom: 16 }}>
        SEND FROM DUBAI<br /><span style={{ color: '#D4A017' }}>HOME TO UGANDA</span>
      </h1>
      <p style={{ fontSize: 18, color: '#aaa', marginBottom: 48, maxWidth: 600 }}>
        Ugandans in the UAE — doctors, nurses, engineers — send UGX home faster than any bank. USDT bridges the gap.
      </p>

      <div className="card" style={{ padding: 32, marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, marginBottom: 24 }}>HOW IT WORKS</h2>
        {[
          { n: '01', title: 'Buy USDT in Dubai/Abu Dhabi', desc: 'Use Binance, Rain.bh, or OKX — all licensed in the UAE. Buy USDT with your UAE bank account or debit card. Zero ID hassle if already verified.' },
          { n: '02', title: 'Place your order', desc: 'Enter the amount on our Send form. We lock your rate for 30 minutes.' },
          { n: '03', title: 'Send USDT (TRC20)', desc: 'From your exchange wallet, send USDT on Tron network to our address. Fee is just AED 0.04.' },
          { n: '04', title: 'Family gets UGX', desc: 'MTN MoMo or Airtel payment within hours. Cash pickup Kampala available.' },
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
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, marginBottom: 20 }}>WHERE TO BUY USDT IN THE UAE</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
          {[
            { name: 'Binance UAE', note: 'VARA licensed, instant purchase' },
            { name: 'Rain.bh', note: 'Gulf-based, Arabic support' },
            { name: 'OKX', note: 'Low fees, fast AED deposit' },
            { name: 'BitOasis', note: 'MENA focused, regulated' },
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
          <input className="input" type="number" placeholder="AED amount e.g. 1000" value={amount} onChange={e => setAmount(e.target.value)} style={{ flex: 1, minWidth: 200 }} />
          <button className="btn-gold" onClick={calculate} style={{ padding: '12px 24px' }}>Calculate</button>
        </div>
        {result && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            <div><p className="label" style={{ marginBottom: 4 }}>You send (AED)</p><p style={{ fontFamily: 'var(--font-mono)', fontSize: 20 }}>AED {result.aed.toFixed(2)}</p></div>
            <div><p className="label" style={{ marginBottom: 4 }}>USDT to transfer</p><p style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color: '#D4A017' }}>{result.usdt.toFixed(2)}</p></div>
            <div><p className="label" style={{ marginBottom: 4 }}>Recipient gets (UGX)</p><p style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color: '#4CAF50' }}>≈ {Math.round(result.ugx).toLocaleString()}</p></div>
          </div>
        )}
      </div>

      <Link href="/send" className="btn-gold" style={{ display: 'inline-block', padding: '16px 40px', fontSize: 16 }}>Send Money Home Now →</Link>
    </div>
  );
}
