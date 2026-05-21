'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FromUKPage() {
  const [amount, setAmount] = useState('');
  const [ugxRate, setUgxRate] = useState(null);
  const [gbpRate, setGbpRate] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch('/api/rates/multi').then(r => r.json()).then(d => {
      if (d.rates?.UGX && d.rates?.GBP) {
        setUgxRate(d.rates.UGX);
        setGbpRate(d.rates.GBP);
      }
    }).catch(() => {});
  }, []);

  function calculate() {
    const gbp = parseFloat(amount);
    if (!gbp || !ugxRate || !gbpRate) return;
    const usd = gbp / gbpRate;
    const usdt = usd * 0.99;
    const ugx = usdt * (ugxRate / 1);
    setResult({ gbp, usdt, ugx });
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>
      <p className="label" style={{ marginBottom: 8 }}>🇬🇧 UK → 🇺🇬 Uganda</p>
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px,6vw,72px)', letterSpacing: '0.03em', marginBottom: 16 }}>
        SEND FROM THE UK<br /><span style={{ color: '#D4A017' }}>HOME TO UGANDA</span>
      </h1>
      <p style={{ fontSize: 18, color: '#aaa', marginBottom: 48, maxWidth: 600 }}>
        Ugandans in the UK — send UGX home in hours. Better rates than Western Union. No hidden fees.
      </p>

      <div className="card" style={{ padding: 32, marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, marginBottom: 24 }}>HOW IT WORKS</h2>
        {[
          { n: '01', title: 'Buy USDT in the UK', desc: 'Use Coinbase UK, Kraken, or Binance UK (KYC verified). Buy USDT with your GBP debit card or bank transfer.' },
          { n: '02', title: 'Place your order', desc: 'Fill the send form — enter UGX amount needed or GBP you want to send. Get wallet + locked rate.' },
          { n: '03', title: 'Send USDT via TRC20', desc: 'Send from your exchange to our wallet. TRC20 costs £0.01 and takes under 3 minutes.' },
          { n: '04', title: 'Recipient gets UGX', desc: 'MTN MoMo, Airtel Money, or bank transfer within 2 hours. Cash pickup in Kampala available.' },
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
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, marginBottom: 20 }}>WHERE TO BUY USDT IN THE UK</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
          {[
            { name: 'Coinbase UK', note: 'FCA registered, GBP support' },
            { name: 'Kraken', note: 'Low fees, UK bank transfer' },
            { name: 'Binance UK', note: 'Large limits, Faster Payments' },
            { name: 'CoinJar', note: 'UK licensed, easy app' },
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
          <input className="input" type="number" placeholder="GBP amount e.g. 200" value={amount} onChange={e => setAmount(e.target.value)} style={{ flex: 1, minWidth: 200 }} />
          <button className="btn-gold" onClick={calculate} style={{ padding: '12px 24px' }}>Calculate</button>
        </div>
        {result && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            <div><p className="label" style={{ marginBottom: 4 }}>You send (GBP)</p><p style={{ fontFamily: 'var(--font-mono)', fontSize: 20 }}>£{result.gbp.toFixed(2)}</p></div>
            <div><p className="label" style={{ marginBottom: 4 }}>USDT to transfer</p><p style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color: '#D4A017' }}>{result.usdt.toFixed(2)}</p></div>
            <div><p className="label" style={{ marginBottom: 4 }}>Recipient gets (UGX)</p><p style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color: '#4CAF50' }}>≈ {Math.round(result.ugx).toLocaleString()}</p></div>
          </div>
        )}
      </div>

      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, marginBottom: 20 }}>FAQ</h2>
        {[
          { q: 'Is it safe?', a: 'Yes. We use FCA-regulated exchanges for your USDT purchase. Your funds are in your control until you send.' },
          { q: 'What are the fees?', a: '1% service fee — included in the rate shown. No hidden charges.' },
          { q: 'How fast?', a: 'TRC20 confirms in 1–3 minutes. MoMo payout within 2 hours of confirmation.' },
          { q: 'Can I send to a Uganda bank account?', a: 'Yes — Stanbic, Centenary, DFCU, Equity supported. Allow 1–3 business days.' },
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
