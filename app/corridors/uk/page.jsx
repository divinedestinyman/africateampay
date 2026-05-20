import Calculator from '@/components/Calculator';

export const metadata = { title: 'Uganda → UK USDT Corridor | AfricaTeamPay' };
const WA = process.env.NEXT_PUBLIC_COACH_WHATSAPP || '256784277664';

export default function UKPage() {
  return (
    <>
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 60px' }}>
        <div className="hero-glow" />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <span style={{ fontSize: 56 }}>🇬🇧</span>
          <p className="label" style={{ margin: '16px 0 12px' }}>Uganda → UK Corridor</p>
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px,7vw,68px)', lineHeight: 1.0, letterSpacing: '0.03em', marginBottom: 20 }}>
            UGANDAN DIASPORA IN THE UK<br /><span style={{ color: '#D4A017' }}>SEND MONEY HOME FOR £5 NOT £35</span>
          </h1>
          <p style={{ color: '#aaa', fontSize: 16, lineHeight: 1.7, maxWidth: 580, marginBottom: 32 }}>
            Bank transfer costs £35. We charge 1% flat. Your family in Uganda receives UGX via MTN MoMo or Airtel same day.
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
            <Calculator defaultCorridor="uk" />
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 64px', background: 'rgba(17,17,17,0.6)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', paddingTop: 48 }}>
          <p className="label" style={{ marginBottom: 12 }}>FAQ</p>
          {[
            { q: 'How do I send GBP to Uganda?', a: 'Buy USDT on Binance or Coinbase with your GBP, then send to Coach. Coach converts to UGX and sends to your family\'s mobile money.' },
            { q: 'How long does it take?', a: 'Once USDT is received by Coach, UGX reaches mobile money within 1 hour during business hours.' },
            { q: 'What is the minimum?', a: 'Minimum 500,000 UGX equivalent (~£105). No maximum.' },
            { q: 'Is this legal in the UK?', a: 'Yes. Buying and sending USDT is legal in the UK. Use a licensed exchange like Coinbase or Binance UK.' },
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
