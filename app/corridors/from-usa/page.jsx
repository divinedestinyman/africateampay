'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FromUSAPage() {
  const [amount, setAmount] = useState('');
  const [ugxRate, setUgxRate] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch('/api/rates/multi').then(r => r.json()).then(d => {
      if (d.rates?.UGX && d.rates?.USD) {
        setUgxRate(d.rates.UGX / d.rates.USD);
      }
    }).catch(() => {});
  }, []);

  function calculate() {
    const usd = parseFloat(amount);
    if (!usd || !ugxRate) return;
    const usdt = usd * 0.99;
    const ugx = usdt * ugxRate;
    setResult({ usd, usdt, ugx });
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>
      <p className="label" style={{ marginBottom: 8 }}>🇺🇸 USA → 🇺🇬 Uganda</p>
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px,6vw,72px)', letterSpacing: '0.03em', marginBottom: 16 }}>
        SEND MONEY HOME<br /><span style={{ color: '#D4A017' }}>FROM AMERICA</span>
      </h1>
      <p style={{ fontSize: 18, color: '#aaa', marginBottom: 48, maxWidth: 600 }}>
        Ugandans in the USA — send UGX home via USDT. Faster and cheaper than wire transfers. No bank account needed on the Uganda side.
      </p>

      {/* Steps */}
      <div className="card" style={{ padding: 32, marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, marginBottom: 24 }}>HOW TO SEND</h2>
        {[
          { n: '01', title: 'Buy USDT in the USA', desc: 'Use Coinbase, Kraken, or Crypto.com. Verify your ID (KYC) to buy USDT. Takes 2–5 minutes with a debit card.' },
          { n: '02', title: 'Place your order here', desc: 'Click "Send Money Home" — enter the UGX amount your recipient needs. Get our USDT wallet address + locked rate.' },
          { n: '03', title: 'Send USDT to our wallet', desc: 'From your Coinbase/Kraken app, send USDT (TRC20 recommended — $0.01 fee) to the wallet address shown. Paste your order reference in memo.' },
          { n: '04', title: 'Recipient gets UGX', desc: 'Coach confirms your USDT and pays UGX to your recipient via MTN MoMo, Airtel Money, or bank. Usually within 1–2 hours.' },
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

      {/* Where to buy USDT */}
      <div className="card" style={{ padding: 32, marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, marginBottom: 20 }}>WHERE TO BUY USDT IN THE USA</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
          {[
            { name: 'Coinbase', note: 'Most popular, easy app', type: 'Regulated exchange' },
            { name: 'Kraken', note: 'Low fees, fast', type: 'Regulated exchange' },
            { name: 'Crypto.com', note: 'Instant with card', type: 'Licensed platform' },
            { name: 'Gemini', note: 'New York regulated', type: 'Regulated exchange' },
          ].map(e => (
            <div key={e.name} style={{ background: 'rgba(212,160,23,0.05)', border: '1px solid rgba(212,160,23,0.15)', borderRadius: 8, padding: 16 }}>
              <p style={{ fontWeight: 700, marginBottom: 4 }}>{e.name}</p>
              <p style={{ fontSize: 12, color: '#D4A017', marginBottom: 4 }}>{e.type}</p>
              <p style={{ fontSize: 13, color: '#888' }}>{e.note}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: '#555', marginTop: 16 }}>Always withdraw via TRC20 — cheapest at $0.01 per transfer.</p>
      </div>

      {/* Calculator */}
      <div className="card-gold" style={{ padding: 32, marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, marginBottom: 20 }}>CALCULATOR</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
          <input className="input" type="number" placeholder="USD amount e.g. 500" value={amount} onChange={e => setAmount(e.target.value)} style={{ flex: 1, minWidth: 200 }} />
          <button className="btn-gold" onClick={calculate} style={{ padding: '12px 24px' }}>Calculate</button>
        </div>
        {result && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            <div><p className="label" style={{ marginBottom: 4 }}>You send (USD)</p><p style={{ fontFamily: 'var(--font-mono)', fontSize: 20 }}>${result.usd.toFixed(2)}</p></div>
            <div><p className="label" style={{ marginBottom: 4 }}>USDT to transfer</p><p style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color: '#D4A017' }}>{result.usdt.toFixed(2)}</p></div>
            <div><p className="label" style={{ marginBottom: 4 }}>Recipient gets (UGX)</p><p style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color: '#4CAF50' }}>≈ {Math.round(result.ugx).toLocaleString()}</p></div>
          </div>
        )}
      </div>

      {/* FAQ */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, marginBottom: 20 }}>FAQ</h2>
        {[
          { q: 'Is this legal?', a: 'Yes. You are purchasing USDT from a licensed US exchange, then sending it to a Ugandan USDT broker who pays UGX locally. This is legal remittance.' },
          { q: 'How long does it take?', a: 'TRC20 USDT transfers confirm in 1–3 minutes. UGX payout via MoMo happens within 1–2 hours during business hours.' },
          { q: 'What is your fee?', a: '1% of the transaction. The exchange rate shown already includes our fee.' },
          { q: 'What if I send the wrong amount?', a: 'Contact Coach on WhatsApp immediately with your reference number. We will adjust or refund within 24 hours.' },
          { q: 'Can the recipient get cash in Kampala?', a: 'Yes — choose "Cash Pickup (KLA)" when placing the order. An additional 1% applies.' },
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
