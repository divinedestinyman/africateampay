import Calculator from '@/components/Calculator';

export const metadata = {
  title: 'Uganda → Japan & South Korea Corridor | Vehicles, Electronics | AfricaTeamPay',
  description: 'Pay Japanese and Korean vehicle dealers, electronics suppliers from Uganda. UGX → USDT → JPY/KRW bank wire. 1% flat fee.',
};

const WA = process.env.NEXT_PUBLIC_COACH_WHATSAPP || '256784277664';

export default function JapanPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 60px' }}>
        <div className="hero-glow" />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 48 }}>🇯🇵</span>
            <span style={{ fontSize: 48 }}>🇰🇷</span>
          </div>
          <p className="label" style={{ margin: '0 0 12px' }}>Uganda → Japan & South Korea Corridor</p>
          <h1
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(36px, 7vw, 68px)',
              lineHeight: 1.0,
              letterSpacing: '0.03em',
              marginBottom: 20,
            }}
          >
            JAPANESE VEHICLES & KOREAN ELECTRONICS?<br />
            <span style={{ color: '#D4A017' }}>WIRE JPY OR KRW. 1% FEE.</span>
          </h1>
          <p style={{ color: '#aaa', fontSize: 16, lineHeight: 1.7, maxWidth: 620, marginBottom: 32 }}>
            Uganda imports heavily from Japan — used vehicles, spare parts, electronics, and machinery.
            South Korea supplies consumer electronics, K-goods, and industrial parts.
            Coach wires JPY or KRW to any dealer, auction house, or supplier. 1% flat fee.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#calculator" className="btn-gold">Calculate My Transfer →</a>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" className="btn-outline">
              WhatsApp Coach
            </a>
          </div>
        </div>
      </section>

      {/* ── Japan categories ──────────────────────────────────── */}
      <section style={{ padding: '0 24px 64px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p className="label" style={{ marginBottom: 12 }}>Import categories — Japan</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '0.03em',
              marginBottom: 28,
            }}
          >
            WHAT UGANDAN TRADERS BUY FROM JAPAN
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
            {[
              { icon: '🚗', cat: 'Used Vehicles', note: 'Toyota, Nissan, Isuzu from Japanese auctions (USS, TAA, JAA)' },
              { icon: '🔧', cat: 'Spare Parts', note: 'Japanese vehicle parts — OEM quality, reliable' },
              { icon: '📱', cat: 'Electronics', note: 'Used phones, laptops, cameras — Japanese quality' },
              { icon: '🚜', cat: 'Heavy Machinery', note: 'Komatsu, Hitachi construction and mining equipment' },
              { icon: '🏗️', cat: 'Industrial Tools', note: 'High-precision tools, equipment, specialized machinery' },
              { icon: '🍱', cat: 'Packaged Goods', note: 'Premium food items, health products, specialty goods' },
            ].map(({ icon, cat, note }) => (
              <div key={cat} className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
                <p style={{ fontWeight: 600, marginBottom: 6, fontSize: 14 }}>{cat}</p>
                <p style={{ color: '#888', fontSize: 12, lineHeight: 1.6 }}>{note}</p>
              </div>
            ))}
          </div>

          <p className="label" style={{ marginBottom: 12 }}>Import categories — South Korea</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { icon: '📺', cat: 'Electronics', note: 'Samsung, LG consumer electronics, appliances' },
              { icon: '💄', cat: 'K-Beauty & Goods', note: 'Korean cosmetics, health products, K-pop merchandise' },
              { icon: '🚗', cat: 'Vehicle Parts', note: 'Hyundai, Kia OEM and aftermarket parts' },
              { icon: '🏗️', cat: 'Construction Materials', note: 'Korean steel, building supplies, infrastructure' },
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

      {/* ── Japan vehicle auction guide ───────────────────────── */}
      <section style={{ padding: '48px 24px 64px', background: 'rgba(17,17,17,0.8)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p className="label" style={{ marginBottom: 12 }}>Japan vehicle auctions</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '0.03em',
              marginBottom: 20,
            }}
          >
            BUYING FROM JAPANESE AUCTIONS — PAYMENT FLOW
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <p style={{ color: '#aaa', lineHeight: 1.8, fontSize: 14, marginBottom: 16 }}>
                Japanese auto dealers and auctions (USS, TAA, JU, BayAuc) require payment
                in JPY within 3–5 days of auction win. Most Ugandan banks cannot wire JPY.
                Coach holds JPY reserves and can pay your auction house directly.
              </p>
              <div className="card" style={{ padding: 16 }}>
                <p className="label" style={{ marginBottom: 8 }}>Standard Japanese auction flow</p>
                {[
                  'Your dealer/agent wins the vehicle at auction',
                  'Auction house sends JPY invoice (typically ¥500K–¥3M)',
                  'WhatsApp Coach with invoice amount and payment details',
                  'Pay UGX equivalent + 1% fee to Coach via MoMo',
                  'Coach wires JPY to auction house within 24 hours',
                  'Vehicle released for shipping to Uganda',
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#D4A017', minWidth: 18 }}>{i + 1}.</span>
                    <span style={{ fontSize: 13, color: '#aaa' }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-gold" style={{ padding: 24 }}>
              <p style={{ fontWeight: 700, marginBottom: 16 }}>Japan payment details needed</p>
              {[
                { label: 'Bank name', value: 'Japanese bank name (e.g., MUFG, SMBC)' },
                { label: 'Account number', value: 'Account + branch code' },
                { label: 'Beneficiary', value: 'Auction house / dealer name (Japanese)' },
                { label: 'Amount', value: 'JPY (Japanese Yen)' },
                { label: 'Reference', value: 'Invoice/auction number' },
                { label: 'Fee', value: '1% + ¥3,000 wire' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '10px 0' }}>
                  <span style={{ color: '#666', fontSize: 13 }}>{label}</span>
                  <span style={{ color: '#aaa', fontSize: 12, textAlign: 'right', maxWidth: '60%' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Calculator ────────────────────────────────────────── */}
      <section id="calculator" style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
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
            HOW MUCH JPY WILL YOUR DEALER RECEIVE?
          </h2>
          <div className="card" style={{ padding: 32 }}>
            <Calculator defaultCorridor="japan" />
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
            JAPAN & KOREA CORRIDOR QUESTIONS
          </h2>
          {[
            {
              q: 'Can you pay a Japanese auction house directly?',
              a: 'Yes. USS, TAA, JU, BayAuc, and most Japanese auction houses. Your agent provides the bank details and invoice. Coach wires JPY within 24 hours.',
            },
            {
              q: 'What bank details do I need for Japan?',
              a: 'Bank name, branch name, branch code, account type (futsu/touza), account number, and beneficiary name in Japanese (Coach can help with translation).',
            },
            {
              q: 'Can you also pay South Korean suppliers?',
              a: 'Yes. Samsung distributors, Hyundai parts dealers, Korean electronics wholesalers. Coach wires KRW to Korean banks. Same 1% + wire fee.',
            },
            {
              q: 'How long does JPY wire take?',
              a: 'SWIFT to Japan: 1–3 business days. Japanese banks are fast at processing inbound wires. Critical for auction payments with tight deadlines — WhatsApp Coach immediately after winning.',
            },
            {
              q: 'Minimum for Japan transfers?',
              a: 'Minimum ¥100,000 equivalent (~$700). Vehicle auction payments typically run ¥500,000–¥3,000,000 — well above minimum.',
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
            WON A JAPANESE AUCTION?
          </p>
          <p style={{ color: '#aaa', marginBottom: 28 }}>
            WhatsApp Coach with the invoice. JPY wired within 24 hours. Vehicle released.
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
