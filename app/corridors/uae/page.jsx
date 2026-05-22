import Calculator from '@/components/Calculator';
import Link from 'next/link';

export const metadata = { title: 'Uganda → UAE USDT Corridor | AfricaTeamPay' };
const WA = process.env.NEXT_PUBLIC_COACH_WHATSAPP || '256784277664';

export default function UAEPage() {
  return (
    <>
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 60px' }}>
        <div className="hero-glow" />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <span style={{ fontSize: 56 }}>🇦🇪</span>
          <p className="label" style={{ margin: '16px 0 12px' }}>Uganda → UAE Corridor</p>
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px,7vw,68px)', lineHeight: 1.0, letterSpacing: '0.03em', marginBottom: 20 }}>
            SEND MONEY TO UAE<br /><span style={{ color: '#D4A017' }}>80% CHEAPER THAN WESTERN UNION</span>
          </h1>
          <p style={{ color: '#aaa', fontSize: 16, lineHeight: 1.7, maxWidth: 580, marginBottom: 32 }}>
            Convert UGX to USDT and send to family in the UAE instantly. Convert to AED via local exchange or mobile money. No bank delays.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#calculator" className="btn-gold">Calculate My Transfer →</a>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" className="btn-outline">WhatsApp Coach</a>
          </div>
        </div>
      </section>

      <section id="calculator" style={{ padding: '48px 24px 64px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="card" style={{ padding: 32 }}>
            <Calculator defaultCorridor="uae" />
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 32px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ background: 'rgba(212,160,23,0.06)', border: '1px solid rgba(212,160,23,0.2)', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Need USDT before you fly?</p>
              <p style={{ fontSize: 13, color: '#888' }}>Buy in Uganda first with MTN MoMo — minutes, no Binance needed.</p>
            </div>
            <a href="https://africateam-hub.vercel.app/p2p" target="_blank" rel="noreferrer" className="btn-gold" style={{ whiteSpace: 'nowrap', fontSize: 13 }}>
              Africa Team P2P Desk →
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 64px', background: 'rgba(17,17,17,0.6)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', paddingTop: 48 }}>
          <p className="label" style={{ marginBottom: 12 }}>FAQ</p>
          {[
            { q: 'How does the recipient get AED?', a: 'They sell USDT via a local UAE exchange or Binance P2P. CNY equivalent arrives in their local account within 30–60 minutes.' },
            { q: 'Is this faster than a bank wire?', a: 'Yes. Bank wires to UAE take 2–5 business days. USDT transfers complete in under 1 hour.' },
            { q: 'What wallet does the recipient need?', a: 'Trust Wallet or Binance. Both are free and supported across the UAE.' },
            { q: 'What is the minimum?', a: 'Minimum 500,000 UGX (~$135). No maximum.' },
          ].map(({ q, a }) => (
            <div key={q} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '20px 0' }}>
              <p style={{ fontWeight: 600, marginBottom: 8 }}>{q}</p>
              <p style={{ color: '#888', lineHeight: 1.7, fontSize: 14 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '64px 24px', textAlign: 'center' }}>
        <div className="card-gold" style={{ maxWidth: 500, margin: '0 auto', padding: 36 }}>
          <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 32, letterSpacing: '0.04em', marginBottom: 8 }}>START YOUR TRANSFER</p>
          <p style={{ color: '#aaa', marginBottom: 24 }}>WhatsApp Coach to begin.</p>
          <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" className="btn-gold">WhatsApp Coach →</a>
        </div>
      </section>
    </>
  );
}
