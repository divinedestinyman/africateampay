import Link from 'next/link';
import Calculator from '@/components/Calculator';

export const metadata = {
  title: 'Uganda → China USDT Corridor | AfricaTeamPay',
  description: 'Convert UGX to USDT before flying to Guangzhou or Yiwu. Pay suppliers directly. 1% flat fee.',
};

const WA = process.env.NEXT_PUBLIC_COACH_WHATSAPP || '256784277664';

export default function ChinaPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 60px' }}>
        <div className="hero-glow" />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <span style={{ fontSize: 56 }}>🇨🇳</span>
          <p className="label" style={{ margin: '16px 0 12px' }}>Uganda → China Corridor</p>
          <h1
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(36px, 7vw, 68px)',
              lineHeight: 1.0,
              letterSpacing: '0.03em',
              marginBottom: 20,
            }}
          >
            UGANDAN TRADERS —<br />
            <span style={{ color: '#D4A017' }}>BEAT THE BANK IN CHINA</span>
          </h1>
          <p style={{ color: '#aaa', fontSize: 16, lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
            Convert your UGX to USDT before you fly. Spend directly at Yiwu and Guangzhou markets.
            Pay suppliers instantly. No wire transfer. No delays.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#calculator" className="btn-gold">Calculate My Transfer →</a>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" className="btn-outline">
              WhatsApp Coach
            </a>
          </div>
        </div>
      </section>

      {/* ── Problem table ─────────────────────────────────────── */}
      <section style={{ padding: '0 24px 64px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p className="label" style={{ marginBottom: 12 }}>What Ugandan Traders Are Paying Today</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '0.03em',
              marginBottom: 24,
            }}
          >
            THE REAL COST OF MOVING MONEY TO CHINA
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  {['Method', 'Fee on $10,000', 'Time', 'Risk'].map(h => (
                    <th
                      key={h}
                      style={{
                        padding: '10px 16px',
                        textAlign: 'left',
                        color: '#555',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        letterSpacing: '0.1em',
                        fontWeight: 400,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { method: 'Bank Wire', fee: '$800–1,200', time: '3–5 days', risk: 'Account freezes', bad: true },
                  { method: 'Western Union', fee: '$500–800', time: '1–2 days', risk: 'Cash handling', bad: true },
                  { method: 'Forex Bureau', fee: '$400–600', time: 'Same day', risk: 'Rate manipulation', bad: true },
                  { method: 'AfricaTeamPay USDT', fee: '$100 (1%)', time: '1 hour', risk: 'None', good: true },
                ].map(row => (
                  <tr
                    key={row.method}
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      background: row.good ? 'rgba(76,175,80,0.05)' : 'transparent',
                    }}
                  >
                    <td
                      style={{
                        padding: '14px 16px',
                        color: row.good ? '#F5F5F5' : '#888',
                        fontWeight: row.good ? 600 : 400,
                      }}
                    >
                      {row.good && <span style={{ color: '#4CAF50', marginRight: 8 }}>✓</span>}
                      {row.method}
                    </td>
                    <td
                      style={{
                        padding: '14px 16px',
                        fontFamily: 'var(--font-mono)',
                        color: row.good ? '#4CAF50' : '#ef4444',
                      }}
                    >
                      {row.fee}
                    </td>
                    <td style={{ padding: '14px 16px', color: row.good ? '#D4A017' : '#888' }}>{row.time}</td>
                    <td style={{ padding: '14px 16px', color: '#888' }}>{row.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── USDT in China ─────────────────────────────────────── */}
      <section style={{ padding: '48px 24px', background: 'rgba(17,17,17,0.8)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p className="label" style={{ marginBottom: 12 }}>How it works in China</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '0.03em',
              marginBottom: 20,
            }}
          >
            USDT IS ACCEPTED IN YIWU & GUANGZHOU
          </h2>
          <p style={{ color: '#aaa', lineHeight: 1.8, marginBottom: 16, maxWidth: 680 }}>
            Merchants in Yiwu and Guangzhou accept USDT directly. Over 3,000 merchants in Yiwu
            processed $1B+ in USDT monthly. Your wallet works like cash — scan, pay, done.
          </p>
          <div className="card" style={{ padding: 20, marginTop: 24 }}>
            <p className="label" style={{ marginBottom: 10 }}>Can't find a USDT merchant?</p>
            <p style={{ color: '#aaa', fontSize: 14, lineHeight: 1.7 }}>
              Sell your USDT on <strong style={{ color: '#F5F5F5' }}>Binance P2P</strong> in China.
              Receive CNY in your WeChat Pay or Alipay within 30 minutes.
            </p>
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
            HOW MUCH USDT WILL YOU GET?
          </h2>
          <div className="card" style={{ padding: 32 }}>
            <Calculator defaultCorridor="china" />
          </div>
        </div>
      </section>

      {/* ── Step by step ──────────────────────────────────────── */}
      <section style={{ padding: '0 24px 64px' }}>
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
            STEP BY STEP — BEFORE & DURING YOUR TRIP
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <StepGroup
              title="Before You Fly"
              steps={[
                `DM Coach on WhatsApp: wa.me/${WA}`,
                'Share how much UGX you want to convert',
                'Receive your order number and MoMo payment instructions',
                'Send UGX via MTN MoMo to Coach',
                'Coach sends USDT to your Trust Wallet / Binance',
                'WhatsApp confirmation sent to you',
              ]}
            />
            <div>
              <StepGroup
                title="At Yiwu / Guangzhou Market"
                steps={[
                  'Open Trust Wallet or Binance',
                  "Scan merchant's USDT QR code",
                  'Enter amount and confirm',
                  'Merchant sees payment instantly',
                  'Buy your goods',
                ]}
              />
              <StepGroup
                title="If Merchant Doesn't Accept USDT"
                steps={[
                  'Open Binance P2P',
                  'Post USDT sell order',
                  'Chinese buyer sends CNY to your WeChat/Alipay',
                  'Takes 20–40 minutes',
                ]}
                style={{ marginTop: 16 }}
              />
            </div>
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
            COMMON QUESTIONS
          </h2>
          {[
            {
              q: 'Is USDT legal in Uganda?',
              a: 'Uganda has no specific crypto law. USDT conversion is currently unrestricted. We operate transparently.',
            },
            {
              q: 'Is USDT accepted in China?',
              a: 'Yes. Thousands of Yiwu and Guangzhou merchants accept it. Those that don\'t: Binance P2P converts to CNY in under an hour.',
            },
            {
              q: 'What if I have USDT left after shopping?',
              a: 'Bring it back. Coach buys your remaining USDT at 0.5% below market rate. You receive UGX via mobile money same day.',
            },
            {
              q: 'What is Tron (TRC20)?',
              a: 'The cheapest USDT network. Sending 10,000 USDT costs $0.01. Always use TRC20 — not ERC20 (Ethereum) which costs $5–20.',
            },
            {
              q: 'How long does conversion take?',
              a: 'UGX received → USDT sent within 1 hour during business hours. Urgent transfers: WhatsApp Coach directly.',
            },
            {
              q: 'What is the minimum transfer?',
              a: 'Minimum 500,000 UGX (~$135). No maximum.',
            },
            {
              q: 'What wallet do I need?',
              a: 'Trust Wallet (recommended, free) or Binance app. Coach can help you set it up before you travel.',
            },
          ].map(({ q, a }) => (
            <div
              key={q}
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                padding: '20px 0',
              }}
            >
              <p style={{ fontWeight: 600, marginBottom: 8, color: '#F5F5F5' }}>{q}</p>
              <p style={{ color: '#888', lineHeight: 1.7, fontSize: 14 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section style={{ padding: '64px 24px', textAlign: 'center' }}>
        <div className="card-gold" style={{ maxWidth: 600, margin: '0 auto', padding: 40 }}>
          <p
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 36,
              letterSpacing: '0.04em',
              marginBottom: 8,
            }}
          >
            READY TO TRAVEL SMARTER?
          </p>
          <p style={{ color: '#aaa', marginBottom: 28 }}>
            WhatsApp Coach now to start your transfer.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={`https://wa.me/${WA}`}
              target="_blank"
              rel="noreferrer"
              className="btn-gold"
            >
              WhatsApp Coach →
            </a>
            <a href="#calculator" className="btn-outline">
              Calculate Transfer →
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
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: '#D4A017',
              minWidth: 20,
              marginTop: 2,
            }}
          >
            {i + 1}.
          </span>
          <span style={{ fontSize: 13, color: '#aaa', lineHeight: 1.5 }}>{step}</span>
        </div>
      ))}
    </div>
  );
}
