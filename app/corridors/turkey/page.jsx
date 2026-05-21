import Calculator from '@/components/Calculator';

export const metadata = {
  title: 'Uganda → Turkey Corridor | Istanbul Laleli & Merter | AfricaTeamPay',
  description: 'Pay Turkish suppliers in Istanbul Laleli, Merter, Grand Bazaar. USDT or bank T/T. Clothing, leather, electronics. 1% flat fee.',
};

const WA = process.env.NEXT_PUBLIC_COACH_WHATSAPP || '256784277664';

export default function TurkeyPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 60px' }}>
        <div className="hero-glow" />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <span style={{ fontSize: 56 }}>🇹🇷</span>
          <p className="label" style={{ margin: '16px 0 12px' }}>Uganda → Turkey Corridor</p>
          <h1
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(36px, 7vw, 68px)',
              lineHeight: 1.0,
              letterSpacing: '0.03em',
              marginBottom: 20,
            }}
          >
            ISTANBUL SUPPLIERS?<br />
            <span style={{ color: '#D4A017' }}>PAY IN USDT OR BANK WIRE</span>
          </h1>
          <p style={{ color: '#aaa', fontSize: 16, lineHeight: 1.7, maxWidth: 620, marginBottom: 32 }}>
            Istanbul&apos;s Laleli and Merter wholesale markets are the biggest African trader destinations in Turkey.
            Clothing, leather goods, electronics — USDT is widely accepted. 1% flat fee. Remote or in-person.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#calculator" className="btn-gold">Calculate My Transfer →</a>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" className="btn-outline">
              WhatsApp Coach
            </a>
          </div>
        </div>
      </section>

      {/* ── Markets guide ─────────────────────────────────────── */}
      <section style={{ padding: '0 24px 64px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p className="label" style={{ marginBottom: 12 }}>Istanbul wholesale markets</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '0.03em',
              marginBottom: 28,
            }}
          >
            WHERE UGANDAN TRADERS BUY IN TURKEY
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {[
              {
                market: 'Laleli District',
                icon: '🏪',
                area: 'Fatih, Istanbul',
                speciality: 'Clothing, leather, bags, shoes',
                note: 'Most African traders start here. High USDT adoption. Hundreds of shops accept crypto directly.',
                usdt: true,
              },
              {
                market: 'Merter Textile Center',
                icon: '🧵',
                area: 'Güngören, Istanbul',
                speciality: 'Wholesale fabrics, garments, uniforms',
                note: 'Largest textile wholesale hub in Turkey. Factory-direct pricing. Many shops accept USDT on TRC20.',
                usdt: true,
              },
              {
                market: 'Grand Bazaar (Kapalıçarşı)',
                icon: '🏛️',
                area: 'Beyazıt, Istanbul',
                speciality: 'Jewelry, leather, crafts, souvenirs',
                note: 'Mostly cash (TRY) or card. Coach can facilitate wire payment to registered bazaar merchants.',
                usdt: false,
              },
              {
                market: 'Mahmutpaşa Bazaar',
                icon: '📦',
                area: 'Eminönü, Istanbul',
                speciality: 'Fabrics, notions, wholesale accessories',
                note: 'Budget-friendly wholesale. Mix of USDT and T/T. Ideal for accessories and smaller items.',
                usdt: true,
              },
            ].map(({ market, icon, area, speciality, note, usdt }) => (
              <div key={market} className="card" style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <span style={{ fontSize: 28 }}>{icon}</span>
                  <span style={{
                    fontSize: 10, fontFamily: 'var(--font-mono)',
                    color: usdt ? '#4CAF50' : '#888',
                    border: `1px solid ${usdt ? '#4CAF50' : '#333'}`,
                    padding: '2px 8px', borderRadius: 4,
                  }}>
                    {usdt ? 'USDT ✓' : 'T/T Only'}
                  </span>
                </div>
                <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{market}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#D4A017', marginBottom: 8 }}>{area}</p>
                <p style={{ color: '#aaa', fontSize: 12, marginBottom: 8, fontWeight: 500 }}>{speciality}</p>
                <p style={{ color: '#666', fontSize: 12, lineHeight: 1.6 }}>{note}</p>
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
            WHY USDT BEATS BANK WIRE IN TURKEY
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  {['Method', 'Fee on $5,000', 'Time', 'Risk'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: '#555', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', fontWeight: 400 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { method: 'Bank Wire to Turkey', fee: '$300–500', time: '3–5 days', risk: 'SWIFT delays common', bad: true },
                  { method: 'Western Union', fee: '$200–350', time: '1–2 days', risk: 'Cash handling, limits', bad: true },
                  { method: 'Carry cash (TRY)', fee: '$150–250 forex', time: 'Immediate', risk: 'Airport cash seizure risk', bad: true },
                  { method: 'AfricaTeamPay USDT', fee: '$50 (1%)', time: '1 hour', risk: 'None', good: true },
                ].map(row => (
                  <tr key={row.method} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: row.good ? 'rgba(76,175,80,0.05)' : 'transparent' }}>
                    <td style={{ padding: '14px 16px', color: row.good ? '#F5F5F5' : '#888', fontWeight: row.good ? 600 : 400 }}>
                      {row.good && <span style={{ color: '#4CAF50', marginRight: 8 }}>✓</span>}
                      {row.method}
                    </td>
                    <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', color: row.good ? '#4CAF50' : '#ef4444' }}>{row.fee}</td>
                    <td style={{ padding: '14px 16px', color: row.good ? '#D4A017' : '#888' }}>{row.time}</td>
                    <td style={{ padding: '14px 16px', color: '#888' }}>{row.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── What Ugandans buy ─────────────────────────────────── */}
      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p className="label" style={{ marginBottom: 12 }}>Top import categories</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '0.03em',
              marginBottom: 28,
            }}
          >
            WHAT UGANDAN TRADERS BUY FROM TURKEY
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[
              { icon: '👗', cat: 'Fashion & Clothing', note: 'Laleli/Merter wholesale, high quality' },
              { icon: '👜', cat: 'Leather Goods', note: 'Bags, shoes, belts — well-made' },
              { icon: '📱', cat: 'Electronics', note: 'Appliances, accessories, small devices' },
              { icon: '🛋️', cat: 'Furniture', note: 'Home goods, office furniture' },
              { icon: '🧶', cat: 'Textiles & Fabrics', note: 'Cotton, synthetic, woven fabrics' },
              { icon: '🔧', cat: 'Steel Products', note: 'Construction materials, hardware' },
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
            HOW MUCH TRY WILL YOUR SUPPLIER RECEIVE?
          </h2>
          <div className="card" style={{ padding: 32 }}>
            <Calculator defaultCorridor="turkey" />
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
            TRAVEL TO ISTANBUL OR PAY REMOTELY
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <StepGroup
              title="Traveling to Istanbul"
              steps={[
                `WhatsApp Coach: wa.me/${WA}`,
                'Share how much UGX you want to convert',
                'Receive wallet address + MoMo payment instructions',
                'Send UGX via MTN MoMo to Coach',
                'Coach sends USDT to your Trust Wallet / Binance',
                'At Laleli/Merter: scan supplier USDT QR, pay instantly',
              ]}
            />
            <StepGroup
              title="Paying Remotely (from Uganda)"
              steps={[
                'Share supplier name, USDT wallet or bank details',
                'Coach gives exact UGX amount including fee',
                'Send UGX via MTN MoMo',
                'Coach converts and sends USDT or T/T in USD/EUR',
                'Supplier confirms receipt',
                'Supplier ships goods to Uganda',
              ]}
            />
          </div>
          <div className="card" style={{ padding: 20, marginTop: 24 }}>
            <p className="label" style={{ marginBottom: 8 }}>Turkey crypto market tip</p>
            <p style={{ color: '#aaa', fontSize: 13, lineHeight: 1.7 }}>
              Turkey has one of the highest crypto adoption rates in the world — driven by high inflation in the lira (TRY).
              Many Istanbul merchants actively seek USDT because it protects them from currency loss.
              TRC20 (Tron) is the preferred network — $0.01 fee vs $5–20 on Ethereum.
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
            TURKEY CORRIDOR QUESTIONS
          </h2>
          {[
            {
              q: 'Do Istanbul traders really accept USDT?',
              a: 'Yes. Turkey has one of the world\'s highest P2P crypto volumes. Laleli and Merter traders actively prefer USDT to protect against lira inflation. Hundreds of merchants scan USDT QR codes daily.',
            },
            {
              q: 'What if my Turkish supplier wants bank T/T in EUR?',
              a: 'Coach handles this. Convert UGX → USDT → USD/EUR, then wire to Turkish bank. SWIFT to Turkey typically takes 2–4 days. Fee: 1% + $30 wire cost.',
            },
            {
              q: 'Is USDT legal in Turkey?',
              a: 'Yes. Turkey does not restrict crypto ownership or transfers. However, USDT cannot be used for direct Turkish lira payments — Coach uses it as an intermediate step.',
            },
            {
              q: 'Can I carry USDT on my phone to Istanbul?',
              a: 'Yes. Your USDT wallet is on your phone. Arriving with USDT is no different from arriving with digital cash. Pay suppliers directly at market.',
            },
            {
              q: 'What about Turkish customs and import?',
              a: 'Coach provides payment confirmation for URA customs declarations. Turkey goods typically enter Uganda as consumer goods — verify current tariff codes with your clearing agent.',
            },
            {
              q: 'Minimum transfer to Turkey?',
              a: 'Minimum $200 equivalent. No maximum. Groups traveling together can combine orders for better rates.',
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
            FLYING TO ISTANBUL?
          </p>
          <p style={{ color: '#aaa', marginBottom: 28 }}>
            Convert your UGX to USDT before you fly. Pay at Laleli and Merter. 1% flat fee.
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
