'use client';

import { useState, useMemo } from 'react';

export const metadata = undefined; // client component — use head.jsx for metadata if needed

const COUNTRIES = [
  { slug: 'china',      name: 'China',          flag: '🇨🇳', flight: 950,  hotel: 80,  meals: 30, visa: 125, stay: 10 },
  { slug: 'india',      name: 'India',          flag: '🇮🇳', flight: 650,  hotel: 60,  meals: 20, visa: 90,  stay: 7  },
  { slug: 'turkey',     name: 'Turkey',         flag: '🇹🇷', flight: 750,  hotel: 70,  meals: 25, visa: 75,  stay: 7  },
  { slug: 'uae',        name: 'UAE (Dubai)',    flag: '🇦🇪', flight: 550,  hotel: 110, meals: 45, visa: 125, stay: 5  },
  { slug: 'uk',         name: 'United Kingdom', flag: '🇬🇧', flight: 900,  hotel: 120, meals: 60, visa: 175, stay: 5  },
  { slug: 'usa',        name: 'United States',  flag: '🇺🇸', flight: 1150, hotel: 140, meals: 75, visa: 185, stay: 7  },
  { slug: 'germany',    name: 'Germany',        flag: '🇩🇪', flight: 900,  hotel: 100, meals: 55, visa: 125, stay: 5  },
  { slug: 'japan',      name: 'Japan',          flag: '🇯🇵', flight: 1050, hotel: 90,  meals: 45, visa: 75,  stay: 7  },
  { slug: 'southkorea', name: 'South Korea',    flag: '🇰🇷', flight: 1000, hotel: 80,  meals: 35, visa: 50,  stay: 7  },
  { slug: 'kenya',      name: 'Kenya',          flag: '🇰🇪', flight: 300,  hotel: 60,  meals: 25, visa: 50,  stay: 4  },
  { slug: 'malaysia',   name: 'Malaysia',       flag: '🇲🇾', flight: 750,  hotel: 50,  meals: 20, visa: 30,  stay: 5  },
  { slug: 'other',      name: 'Other country',  flag: '🌍', flight: 800,  hotel: 80,  meals: 35, visa: 100, stay: 7  },
];

const WA = '256784277664';

function fmt(n) {
  return '$' + Math.round(n).toLocaleString();
}

export default function TradeCalculatorPage() {
  const [orderValue, setOrderValue] = useState(5000);
  const [countrySlug, setCountrySlug] = useState('china');
  const [suppliers, setSuppliers] = useState(2);
  const [stayDays, setStayDays] = useState(10);
  const [paymentType, setPaymentType] = useState('usdt'); // 'usdt' or 'wire'

  const country = COUNTRIES.find(c => c.slug === countrySlug) || COUNTRIES[0];

  const calc = useMemo(() => {
    // ── Flying costs ──────────────────────────────────────────
    const flight       = country.flight;
    const hotel        = country.hotel * stayDays;
    const meals        = country.meals * stayDays;
    const visa         = country.visa;
    const localTransport = 50 * stayDays;
    const misc         = 200; // sundry expenses
    const flyTotal     = flight + hotel + meals + visa + localTransport + misc;

    // Advantage: multiple suppliers in one trip — trips saved
    const tripsWithout = suppliers; // you'd need `suppliers` trips if remote didn't exist
    const tripSavings  = suppliers > 1 ? `Covers all ${suppliers} suppliers in 1 trip` : null;

    // ── Remote costs ──────────────────────────────────────────
    const atp_fee   = orderValue * 0.01;
    const wire_fee  = paymentType === 'wire' ? 35 : 0;
    const remoteTotal = atp_fee + wire_fee;

    // ── Break-even ────────────────────────────────────────────
    // flyTotal = orderValue * 0.01 + wire_fee  →  breakEven = (flyTotal - wire_fee) / 0.01
    const breakEven = (flyTotal - wire_fee) / 0.01;

    const verdict = orderValue > breakEven
      ? 'remote_wins'
      : orderValue < breakEven * 0.5
      ? 'fly_wins'
      : 'close_call';

    return { flight, hotel, meals, visa, localTransport, misc, flyTotal, atp_fee, wire_fee, remoteTotal, breakEven, verdict, tripSavings };
  }, [orderValue, country, stayDays, suppliers, paymentType]);

  const verdictConfig = {
    remote_wins: { label: 'Remote payment wins', color: '#4CAF50', icon: '✓' },
    fly_wins:    { label: 'Flying may be worth it', color: '#D4A017', icon: '→' },
    close_call:  { label: 'Close call — consider other factors', color: '#888', icon: '~' },
  }[calc.verdict];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 60px' }}>
        <div className="hero-glow" />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <p className="label" style={{ margin: '0 0 12px' }}>Trade Decision Tool</p>
          <h1
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(36px, 7vw, 68px)',
              lineHeight: 1.0,
              letterSpacing: '0.03em',
              marginBottom: 20,
            }}
          >
            FLY TO YOUR SUPPLIER<br />
            <span style={{ color: '#D4A017' }}>OR PAY REMOTELY?</span>
          </h1>
          <p style={{ color: '#aaa', fontSize: 16, lineHeight: 1.7, maxWidth: 620, marginBottom: 0 }}>
            Enter your order details. We calculate the real cost of flying vs. using AfricaTeamPay —
            flight, hotel, meals, visa, and ground transport vs. 1% fee.
          </p>
        </div>
      </section>

      {/* ── Calculator ────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 64px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>

          {/* ── Inputs ── */}
          <div>
            <div className="card" style={{ padding: 28 }}>
              <p className="label" style={{ marginBottom: 20 }}>Your trade details</p>

              {/* Order value */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ color: '#888', fontSize: 12, fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 8 }}>
                  TOTAL ORDER VALUE (USD)
                </label>
                <input
                  type="number"
                  className="input"
                  value={orderValue}
                  onChange={e => setOrderValue(Math.max(100, Number(e.target.value)))}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                  min="100"
                  step="500"
                />
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={orderValue}
                  onChange={e => setOrderValue(Number(e.target.value))}
                  style={{ width: '100%', marginTop: 8, accentColor: '#D4A017' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#555', marginTop: 2 }}>
                  <span>$500</span><span>$100,000</span>
                </div>
              </div>

              {/* Country */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ color: '#888', fontSize: 12, fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 8 }}>
                  SUPPLIER COUNTRY
                </label>
                <select
                  className="input"
                  value={countrySlug}
                  onChange={e => {
                    setCountrySlug(e.target.value);
                    const c = COUNTRIES.find(x => x.slug === e.target.value);
                    if (c) setStayDays(c.stay);
                  }}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                >
                  {COUNTRIES.map(c => (
                    <option key={c.slug} value={c.slug}>{c.flag} {c.name}</option>
                  ))}
                </select>
              </div>

              {/* Stay duration */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ color: '#888', fontSize: 12, fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 8 }}>
                  TRIP DURATION (DAYS)
                </label>
                <select
                  className="input"
                  value={stayDays}
                  onChange={e => setStayDays(Number(e.target.value))}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                >
                  {[3,4,5,6,7,8,10,12,14,21].map(d => (
                    <option key={d} value={d}>{d} days</option>
                  ))}
                </select>
              </div>

              {/* Number of suppliers */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ color: '#888', fontSize: 12, fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 8 }}>
                  NUMBER OF SUPPLIERS TO VISIT
                </label>
                <select
                  className="input"
                  value={suppliers}
                  onChange={e => setSuppliers(Number(e.target.value))}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                >
                  {[1,2,3,4,5,6,8,10].map(n => (
                    <option key={n} value={n}>{n} supplier{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              {/* Payment type */}
              <div>
                <label style={{ color: '#888', fontSize: 12, fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 8 }}>
                  REMOTE PAYMENT METHOD
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[
                    { val: 'usdt', label: 'USDT direct', sub: '1% only' },
                    { val: 'wire', label: 'Bank wire', sub: '1% + $35' },
                  ].map(opt => (
                    <button
                      key={opt.val}
                      onClick={() => setPaymentType(opt.val)}
                      style={{
                        flex: 1, padding: '10px 8px', border: `1px solid ${paymentType === opt.val ? '#D4A017' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: 8, background: paymentType === opt.val ? 'rgba(212,160,23,0.1)' : '#0A0A0A',
                        color: paymentType === opt.val ? '#D4A017' : '#888', cursor: 'pointer', textAlign: 'center',
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{opt.label}</div>
                      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', marginTop: 2 }}>{opt.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Results ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Verdict banner */}
            <div style={{
              padding: '20px 24px',
              border: `1px solid ${verdictConfig.color}`,
              borderRadius: 12,
              background: `${verdictConfig.color}10`,
            }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: verdictConfig.color, marginBottom: 4 }}>
                RECOMMENDATION
              </p>
              <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, color: verdictConfig.color, letterSpacing: '0.04em' }}>
                {verdictConfig.icon} {verdictConfig.label}
              </p>
              <p style={{ color: '#888', fontSize: 13, marginTop: 4 }}>
                Break-even: orders above {fmt(calc.breakEven)} — remote wins. Below — consider flying.
              </p>
              {calc.tripSavings && (
                <p style={{ color: '#aaa', fontSize: 12, marginTop: 4, fontStyle: 'italic' }}>
                  + {calc.tripSavings} in one trip
                </p>
              )}
            </div>

            {/* Comparison table */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: '#555', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 400 }}>EXPENSE</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#D4A017', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 400 }}>FLY THERE</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', color: '#4CAF50', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 400 }}>REMOTE</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Flight (round trip)', fly: calc.flight, remote: 0 },
                    { label: `Hotel (${stayDays} nights)`, fly: calc.hotel, remote: 0 },
                    { label: `Meals (${stayDays} days)`, fly: calc.meals, remote: 0 },
                    { label: 'Visa + entry', fly: calc.visa, remote: 0 },
                    { label: `Ground transport (${stayDays}d)`, fly: calc.localTransport, remote: 0 },
                    { label: 'Misc expenses', fly: calc.misc, remote: 0 },
                    { label: 'AfricaTeamPay 1% fee', fly: 0, remote: calc.atp_fee },
                    ...(calc.wire_fee > 0 ? [{ label: 'Bank wire fee', fly: 0, remote: calc.wire_fee }] : []),
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '10px 16px', color: '#888' }}>{row.label}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'right', fontFamily: 'var(--font-mono)', color: row.fly > 0 ? '#ef4444' : '#333' }}>
                        {row.fly > 0 ? fmt(row.fly) : '—'}
                      </td>
                      <td style={{ padding: '10px 16px', textAlign: 'right', fontFamily: 'var(--font-mono)', color: row.remote > 0 ? '#4CAF50' : '#333' }}>
                        {row.remote > 0 ? fmt(row.remote) : '—'}
                      </td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: '2px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#F5F5F5' }}>TOTAL COST</td>
                    <td style={{ padding: '14px 16px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#D4A017', fontSize: 15 }}>
                      {fmt(calc.flyTotal)}
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#4CAF50', fontSize: 15 }}>
                      {fmt(calc.remoteTotal)}
                    </td>
                  </tr>
                  <tr style={{ background: 'rgba(76,175,80,0.05)' }}>
                    <td style={{ padding: '10px 16px', color: '#4CAF50', fontSize: 12 }}>You save</td>
                    <td></td>
                    <td style={{ padding: '10px 16px', textAlign: 'right', fontFamily: 'var(--font-mono)', color: '#4CAF50', fontSize: 13, fontWeight: 600 }}>
                      {fmt(Math.max(0, calc.flyTotal - calc.remoteTotal))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Notes */}
            <div className="card" style={{ padding: 16 }}>
              <p className="label" style={{ marginBottom: 8 }}>Assumptions</p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  `${country.flag} ${country.name}: return flight from Entebbe (EBB)`,
                  `Hotel estimate: ${fmt(country.hotel)}/night (3-star, city centre)`,
                  `Meals: ${fmt(country.meals)}/day local average`,
                  `Ground transport: $50/day (taxi, metro, samples)`,
                  'Visa: typical tourist/business visa fee',
                  'Remote: 1% AfricaTeamPay fee' + (paymentType === 'wire' ? ' + $35 wire fee' : ', USDT direct'),
                ].map((note, i) => (
                  <li key={i} style={{ fontSize: 11, color: '#666', display: 'flex', gap: 6 }}>
                    <span style={{ color: '#D4A017' }}>·</span> {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── When should you fly? ──────────────────────────────── */}
      <section style={{ padding: '48px 24px 64px', background: 'rgba(17,17,17,0.6)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p className="label" style={{ marginBottom: 12 }}>Decision guide</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '0.03em',
              marginBottom: 28,
            }}
          >
            WHEN TO FLY VS. WHEN TO PAY REMOTELY
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div className="card" style={{ padding: 24, borderColor: 'rgba(212,160,23,0.3)' }}>
              <p style={{ color: '#D4A017', fontFamily: 'var(--font-mono)', fontSize: 11, marginBottom: 12 }}>FLY WHEN...</p>
              {[
                'First time with a supplier — build trust in person',
                'Negotiating a large annual contract (>$50K)',
                'Product inspection is critical (garments, machinery)',
                'You\'re visiting 5+ suppliers in one trip',
                'The market has untapped suppliers you haven\'t found online',
                'Order value is low but you need samples first',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <span style={{ color: '#D4A017', fontSize: 14, marginTop: 1 }}>✈</span>
                  <span style={{ fontSize: 13, color: '#aaa', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 24, borderColor: 'rgba(76,175,80,0.3)' }}>
              <p style={{ color: '#4CAF50', fontFamily: 'var(--font-mono)', fontSize: 11, marginBottom: 12 }}>PAY REMOTELY WHEN...</p>
              {[
                'Established supplier relationship — you\'ve visited before',
                'Repeat order of the same goods at known quality',
                'Order value is above your break-even (see calculator)',
                'Speed is critical — no time to fly',
                'Supplier has USDT wallet — zero wire delay',
                'You\'re paying a Japanese auction invoice on a deadline',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <span style={{ color: '#4CAF50', fontSize: 14, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 13, color: '#aaa', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section style={{ padding: '64px 24px', textAlign: 'center' }}>
        <div className="card-gold" style={{ maxWidth: 600, margin: '0 auto', padding: 40 }}>
          <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 36, letterSpacing: '0.04em', marginBottom: 8 }}>
            READY TO PAY REMOTELY?
          </p>
          <p style={{ color: '#aaa', marginBottom: 28 }}>
            WhatsApp Coach with your supplier details. 1% fee. Done in 24–72 hours.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" className="btn-gold">
              WhatsApp Coach →
            </a>
            <a href="/send" className="btn-outline">
              Place Order Online →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
