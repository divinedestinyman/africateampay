import Calculator from '@/components/Calculator';

export const metadata = {
  title: 'Uganda → USA Corridor | Pay US Suppliers | AfricaTeamPay',
  description: 'Pay American medical equipment, tech and machinery suppliers from Uganda. UGX → USDT → USD wire. 1% flat fee.',
};

const WA = process.env.NEXT_PUBLIC_COACH_WHATSAPP || '256784277664';

export default function USAPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 60px' }}>
        <div className="hero-glow" />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <span style={{ fontSize: 56 }}>🇺🇸</span>
          <p className="label" style={{ margin: '16px 0 12px' }}>Uganda → USA Corridor</p>
          <h1
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(36px, 7vw, 68px)',
              lineHeight: 1.0,
              letterSpacing: '0.03em',
              marginBottom: 20,
            }}
          >
            PAYING US SUPPLIERS?<br />
            <span style={{ color: '#D4A017' }}>WIRE USD IN 3–5 DAYS. 1% FEE.</span>
          </h1>
          <p style={{ color: '#aaa', fontSize: 16, lineHeight: 1.7, maxWidth: 620, marginBottom: 32 }}>
            Medical equipment, tech hardware, spare parts, Amazon Business orders.
            Coach converts your UGX to USD and wires directly to any US supplier, distributor, or Amazon Business account.
            No bank account needed. 1% flat fee.
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
          <p className="label" style={{ marginBottom: 12 }}>Uganda → USA Import Categories</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '0.03em',
              marginBottom: 28,
            }}
          >
            WHAT UGANDANS BUY FROM THE USA
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { icon: '🏥', cat: 'Medical Equipment', note: 'Ultrasound machines, diagnostic devices, surgical tools, hospital beds' },
              { icon: '💻', cat: 'Tech Hardware', note: 'Laptops, servers, networking equipment, tech accessories' },
              { icon: '🔧', cat: 'Spare Parts', note: 'Automotive, industrial, agricultural machinery parts' },
              { icon: '📦', cat: 'Amazon Business', note: 'Bulk orders from Amazon US — Coach handles payment' },
              { icon: '🌱', cat: 'Agricultural Inputs', note: 'Irrigation systems, tools, fertilizers, seeds' },
              { icon: '🏗️', cat: 'Construction', note: 'Specialized construction equipment and materials' },
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

      {/* ── Amazon Business guide ─────────────────────────────── */}
      <section style={{ padding: '48px 24px 64px', background: 'rgba(17,17,17,0.8)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p className="label" style={{ marginBottom: 12 }}>Amazon Business Guide</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '0.03em',
              marginBottom: 20,
            }}
          >
            BUYING FROM AMAZON US — HOW IT WORKS
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <p style={{ color: '#aaa', lineHeight: 1.8, fontSize: 14, marginBottom: 16 }}>
                Amazon requires a US-issued credit card or bank account. Most Ugandan banks don&apos;t work.
                Coach has a US-registered payment method — you pay Coach in UGX, Coach buys from Amazon
                and ships to your freight forwarder in the USA.
              </p>
              <div className="card" style={{ padding: 16 }}>
                <p className="label" style={{ marginBottom: 8 }}>How to order from Amazon</p>
                {[
                  'Send Coach your Amazon product links',
                  'Coach confirms availability and total USD price',
                  'You pay UGX equivalent + 1% fee via MTN MoMo',
                  'Coach purchases and ships to US freight forwarder',
                  'Freight forwarder ships to Uganda',
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#D4A017', minWidth: 18 }}>{i + 1}.</span>
                    <span style={{ fontSize: 13, color: '#aaa' }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-gold" style={{ padding: 24 }}>
              <p style={{ fontWeight: 700, marginBottom: 16 }}>Amazon via Coach — What You Need</p>
              {[
                { label: 'Product links', value: 'Amazon.com URLs' },
                { label: 'Shipping address', value: 'US freight forwarder address' },
                { label: 'Budget', value: 'Total USD amount' },
                { label: 'Fee', value: '1% of order value' },
                { label: 'Timeline', value: 'Amazon delivery + shipping to Uganda (3–6 weeks)' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '10px 0' }}>
                  <span style={{ color: '#666', fontSize: 13 }}>{label}</span>
                  <span style={{ color: '#aaa', fontSize: 13, textAlign: 'right', maxWidth: '60%' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Cost comparison ───────────────────────────────────── */}
      <section style={{ padding: '64px 24px' }}>
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
            THE COST OF PAYING A US SUPPLIER TODAY
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  {['Method', 'Fee on $10,000', 'Time', 'Problems'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: '#555', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', fontWeight: 400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { method: 'Ugandan Bank Wire (USD)', fee: '$800–1,200', time: '5–7 days', prob: 'Account freezes, compliance blocks', bad: true },
                  { method: 'WorldRemit / Transfer', fee: '$300–500', time: '1–3 days', prob: 'Limited to personal, not business', bad: true },
                  { method: 'Correspondent bank fees', fee: '$600–900', time: '3–5 days', prob: 'Multiple SWIFT hops', bad: true },
                  { method: 'AfricaTeamPay', fee: '$100 (1%)', time: '3–5 days', prob: 'None', good: true },
                ].map(row => (
                  <tr key={row.method} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: row.good ? 'rgba(76,175,80,0.05)' : 'transparent' }}>
                    <td style={{ padding: '14px 16px', color: row.good ? '#F5F5F5' : '#888', fontWeight: row.good ? 600 : 400 }}>
                      {row.good && <span style={{ color: '#4CAF50', marginRight: 8 }}>✓</span>}
                      {row.method}
                    </td>
                    <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', color: row.good ? '#4CAF50' : '#ef4444' }}>{row.fee}</td>
                    <td style={{ padding: '14px 16px', color: row.good ? '#D4A017' : '#888' }}>{row.time}</td>
                    <td style={{ padding: '14px 16px', color: '#888' }}>{row.prob}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            HOW MUCH USD WILL YOUR SUPPLIER RECEIVE?
          </h2>
          <div className="card" style={{ padding: 32 }}>
            <Calculator defaultCorridor="usa" />
          </div>
        </div>
      </section>

      {/* ── Step by step ──────────────────────────────────────── */}
      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p className="label" style={{ marginBottom: 12 }}>Complete process</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '0.03em',
              marginBottom: 32,
            }}
          >
            HOW TO PAY A US SUPPLIER IN 5 STEPS
          </h2>
          <StepGroup
            title="Remote Payment to US Supplier"
            steps={[
              `WhatsApp Coach: wa.me/${WA} with supplier details`,
              'Share: supplier name, bank name, routing/account number, amount in USD',
              'Coach confirms UGX equivalent + fee and sends MoMo instructions',
              'Send UGX via MTN MoMo to Coach',
              'Coach converts USDT → USD and wires to US supplier account',
              'SWIFT confirmation sent to you within 24 hours',
              'Supplier receives payment in 3–5 business days',
            ]}
          />
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
            USA CORRIDOR QUESTIONS
          </h2>
          {[
            {
              q: 'What bank details do I need from my US supplier?',
              a: 'For domestic US wire: Bank name, routing number (ABA), account number, beneficiary name, and address. For international wire from Uganda, same plus SWIFT code if applicable.',
            },
            {
              q: 'Can Coach buy from Amazon.com for me?',
              a: 'Yes. Send Coach the product links, shipping address (your US freight forwarder), and pay UGX equivalent + 1%. Coach handles purchase and ships to your forwarder.',
            },
            {
              q: 'How long does US wire transfer take?',
              a: 'Domestic US wire typically clears same day or next day. SWIFT from Coach\'s account arrives within 3–5 business days. Large amounts may require additional compliance.',
            },
            {
              q: 'What is the minimum for US transfers?',
              a: 'Minimum $500 equivalent — US wire has higher fixed costs. For amounts below $500, consider Wise or similar (Coach can advise based on your supplier).',
            },
            {
              q: 'Do US suppliers accept USDT?',
              a: 'Medical and industrial suppliers generally do not. US companies prefer ACH or wire transfer. Coach converts USDT to USD and wires — supplier receives clean USD.',
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
            READY TO PAY YOUR US SUPPLIER?
          </p>
          <p style={{ color: '#aaa', marginBottom: 28 }}>
            Share their bank details with Coach. USD wire sent within 24 hours.
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
