import Calculator from '@/components/Calculator';

export const metadata = {
  title: 'Uganda → India Corridor | Pay Indian Suppliers | AfricaTeamPay',
  description: 'Pay Indian pharma, textile and machinery suppliers from Uganda. UGX → USDT → INR. Bank T/T or USDT. 1% flat fee.',
};

const WA = process.env.NEXT_PUBLIC_COACH_WHATSAPP || '256784277664';

export default function IndiaPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 60px' }}>
        <div className="hero-glow" />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <span style={{ fontSize: 56 }}>🇮🇳</span>
          <p className="label" style={{ margin: '16px 0 12px' }}>Uganda → India Corridor</p>
          <h1
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(36px, 7vw, 68px)',
              lineHeight: 1.0,
              letterSpacing: '0.03em',
              marginBottom: 20,
            }}
          >
            PAYING INDIAN SUPPLIERS?<br />
            <span style={{ color: '#D4A017' }}>UGX → USDT → INR. 1% FEE.</span>
          </h1>
          <p style={{ color: '#aaa', fontSize: 16, lineHeight: 1.7, maxWidth: 620, marginBottom: 32 }}>
            India is Uganda&apos;s 3rd largest import partner — $1.25B/year in pharma, textiles, machinery, and rice.
            Coach converts your UGX to USDT, then wires USD directly to your Indian supplier&apos;s bank.
            No SWIFT headaches. 1% flat fee.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#calculator" className="btn-gold">Calculate My Transfer →</a>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" className="btn-outline">
              WhatsApp Coach
            </a>
          </div>
        </div>
      </section>

      {/* ── What Ugandans buy ─────────────────────────────────── */}
      <section style={{ padding: '0 24px 64px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p className="label" style={{ marginBottom: 12 }}>Uganda → India Import Categories</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '0.03em',
              marginBottom: 28,
            }}
          >
            WHAT UGANDAN TRADERS BUY FROM INDIA
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { icon: '💊', cat: 'Pharmaceuticals', note: 'Largest category — generic medicines, antibiotics, medical supplies' },
              { icon: '👕', cat: 'Textiles & Garments', note: 'Cotton fabrics, ready-made clothing, uniforms' },
              { icon: '⚙️', cat: 'Machinery', note: 'Agricultural equipment, industrial machinery, pumps' },
              { icon: '🌾', cat: 'Rice & Agri-goods', note: 'Basmati and long-grain rice, spices, pulses' },
              { icon: '💡', cat: 'Electronics', note: 'Components, solar equipment, LED lighting' },
              { icon: '🔩', cat: 'Steel & Metal', note: 'Construction steel, pipes, fittings' },
            ].map(({ icon, cat, note }) => (
              <div key={cat} className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
                <p style={{ fontWeight: 600, marginBottom: 6, fontSize: 14 }}>{cat}</p>
                <p style={{ color: '#888', fontSize: 12, lineHeight: 1.6 }}>{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cost comparison ───────────────────────────────────── */}
      <section style={{ padding: '48px 24px 64px', background: 'rgba(17,17,17,0.8)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p className="label" style={{ marginBottom: 12 }}>Cost comparison</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '0.03em',
              marginBottom: 24,
            }}
          >
            THE REAL COST OF PAYING AN INDIAN SUPPLIER
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  {['Method', 'Fee on $5,000', 'Time', 'Pain'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: '#555', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', fontWeight: 400 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { method: 'Ugandan Bank Wire', fee: '$400–600', time: '5–7 days', pain: 'SWIFT fees + freezes', bad: true },
                  { method: 'Western Union', fee: '$250–400', time: '2–3 days', pain: 'Cash limit restrictions', bad: true },
                  { method: 'Forex + Western Union', fee: '$350–500', time: '2–4 days', pain: 'Double conversion loss', bad: true },
                  { method: 'AfricaTeamPay', fee: '$50 (1%)', time: '3–5 days T/T', pain: 'None', good: true },
                ].map(row => (
                  <tr key={row.method} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: row.good ? 'rgba(76,175,80,0.05)' : 'transparent' }}>
                    <td style={{ padding: '14px 16px', color: row.good ? '#F5F5F5' : '#888', fontWeight: row.good ? 600 : 400 }}>
                      {row.good && <span style={{ color: '#4CAF50', marginRight: 8 }}>✓</span>}
                      {row.method}
                    </td>
                    <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', color: row.good ? '#4CAF50' : '#ef4444' }}>{row.fee}</td>
                    <td style={{ padding: '14px 16px', color: row.good ? '#D4A017' : '#888' }}>{row.time}</td>
                    <td style={{ padding: '14px 16px', color: '#888' }}>{row.pain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Payment options ───────────────────────────────────── */}
      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p className="label" style={{ marginBottom: 12 }}>How Coach pays your supplier</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '0.03em',
              marginBottom: 28,
            }}
          >
            THREE WAYS TO PAY ANY INDIAN SUPPLIER
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {[
              {
                title: 'Bank T/T (Wire)',
                badge: 'Most Common',
                badgeColor: '#D4A017',
                desc: 'Coach converts USDT → USD, then wires directly to your supplier\'s Indian bank account via SWIFT. Best for orders above $1,000.',
                time: '3–5 business days',
                fee: '1% + $30 wire cost',
                need: 'Supplier SWIFT/IBAN + bank account details',
              },
              {
                title: 'USDT Direct',
                badge: 'Fastest',
                badgeColor: '#4CAF50',
                desc: 'Growing number of Indian suppliers, especially in Mumbai and Surat textile districts, now accept USDT directly on TRC20.',
                time: '1–2 hours',
                fee: '1% flat',
                need: 'Supplier USDT wallet address (TRC20/BEP20)',
              },
              {
                title: 'UPI via Agent',
                badge: 'Small Orders',
                badgeColor: '#888',
                desc: 'Coach\'s India-based agent receives USDT and pays supplier via UPI or NEFT in INR. Best for orders under $1,000.',
                time: '4–8 hours',
                fee: '1.5% (covers agent)',
                need: 'Supplier UPI ID or bank account',
              },
            ].map(opt => (
              <div key={opt.title} className="card-gold" style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <p style={{ fontWeight: 700, fontSize: 16 }}>{opt.title}</p>
                  <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: opt.badgeColor, border: `1px solid ${opt.badgeColor}`, padding: '2px 8px', borderRadius: 4 }}>
                    {opt.badge}
                  </span>
                </div>
                <p style={{ color: '#aaa', fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>{opt.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#555', fontSize: 12 }}>Time</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#D4A017' }}>{opt.time}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#555', fontSize: 12 }}>Fee</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#4CAF50' }}>{opt.fee}</span>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8, marginTop: 4 }}>
                    <span style={{ color: '#555', fontSize: 11 }}>Need: </span>
                    <span style={{ color: '#888', fontSize: 11 }}>{opt.need}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calculator ────────────────────────────────────────── */}
      <section id="calculator" style={{ padding: '0 24px 64px', background: 'rgba(17,17,17,0.6)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', paddingTop: 64 }}>
          <p className="label" style={{ textAlign: 'center', marginBottom: 12 }}>Calculate now</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '0.03em',
              textAlign: 'center',
              marginBottom: 32,
            }}
          >
            HOW MUCH INR WILL YOUR SUPPLIER RECEIVE?
          </h2>
          <div className="card" style={{ padding: 32 }}>
            <Calculator defaultCorridor="india" />
          </div>
        </div>
      </section>

      {/* ── Step by step ──────────────────────────────────────── */}
      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p className="label" style={{ marginBottom: 12 }}>Complete process</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '0.03em',
              marginBottom: 32,
            }}
          >
            STEP BY STEP — PAY YOUR INDIAN SUPPLIER REMOTELY
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <StepGroup
              title="You Do (Uganda)"
              steps={[
                `WhatsApp Coach: wa.me/${WA}`,
                'Share supplier name, bank details (SWIFT + account), amount in USD',
                'Coach gives you UGX amount + MoMo payment instructions',
                'Send UGX via MTN MoMo to Coach',
                'Coach confirms receipt and starts conversion',
              ]}
            />
            <StepGroup
              title="Coach Does (For You)"
              steps={[
                'Converts your UGX to USDT on Binance',
                'Converts USDT to USD',
                'Wires USD to your Indian supplier\'s bank via SWIFT',
                'Sends you wire confirmation number',
                'Supplier confirms receipt in 3–5 business days',
                'Goods dispatched to Uganda',
              ]}
            />
          </div>
          <div className="card" style={{ padding: 20, marginTop: 24 }}>
            <p className="label" style={{ marginBottom: 8 }}>Important: India crypto regulations</p>
            <p style={{ color: '#aaa', fontSize: 13, lineHeight: 1.7 }}>
              Indian suppliers typically prefer bank T/T (wire transfer) over USDT. India has applied a 30% tax on crypto gains
              which has slowed direct adoption. Coach handles the USDT-to-USD conversion on your behalf — your supplier
              receives clean USD or INR bank transfer, not crypto.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 64px', background: 'rgba(17,17,17,0.6)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', paddingTop: 48 }}>
          <p className="label" style={{ marginBottom: 12 }}>FAQ</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '0.03em',
              marginBottom: 32,
            }}
          >
            INDIA CORRIDOR QUESTIONS
          </h2>
          {[
            {
              q: 'Do Indian suppliers accept USDT?',
              a: 'Some do, especially in Mumbai and Surat. Most established suppliers still prefer bank T/T. Coach wires USD to any Indian bank — supplier receives clean bank transfer.',
            },
            {
              q: 'What bank details do I need from my supplier?',
              a: 'For SWIFT wire: Bank name, account number, SWIFT code, IFSC code, and beneficiary name/address. WhatsApp Coach with these details to get started.',
            },
            {
              q: 'How long does the wire transfer take?',
              a: '3–5 business days for SWIFT to India. Some banks process faster. Coach provides the SWIFT reference number so you can track with your supplier.',
            },
            {
              q: 'What is the minimum amount?',
              a: 'Minimum $200 equivalent. Bank wire has a fixed cost of ~$30 so it works best on orders above $500. For smaller orders, use the UPI agent option.',
            },
            {
              q: 'Can I pay multiple Indian suppliers at once?',
              a: 'Yes. WhatsApp Coach with a list. Bulk orders (3+ suppliers) qualify for 0.8% rate instead of 1%.',
            },
            {
              q: 'What about customs and import duties?',
              a: 'Separate from our service. Uganda Revenue Authority (URA) taxes apply on import. Coach can provide a payment confirmation document for customs clearance.',
            },
          ].map(({ q, a }) => (
            <div key={q} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '20px 0' }}>
              <p style={{ fontWeight: 600, marginBottom: 8, color: '#F5F5F5' }}>{q}</p>
              <p style={{ color: '#888', lineHeight: 1.7, fontSize: 14 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section style={{ padding: '64px 24px', textAlign: 'center' }}>
        <div className="card-gold" style={{ maxWidth: 600, margin: '0 auto', padding: 40 }}>
          <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 36, letterSpacing: '0.04em', marginBottom: 8 }}>
            READY TO PAY YOUR INDIAN SUPPLIER?
          </p>
          <p style={{ color: '#aaa', marginBottom: 28 }}>
            Share your supplier&apos;s bank details with Coach. Get it done today.
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

function StepGroup({ title, steps, style }) {
  return (
    <div className="card" style={{ padding: 20, ...style }}>
      <p className="label" style={{ marginBottom: 12 }}>{title}</p>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#D4A017', minWidth: 20, marginTop: 2 }}>
            {i + 1}.
          </span>
          <span style={{ fontSize: 13, color: '#aaa', lineHeight: 1.5 }}>{step}</span>
        </div>
      ))}
    </div>
  );
}
