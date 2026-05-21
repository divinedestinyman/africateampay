import Link from 'next/link';
import CorridorCard from '@/components/CorridorCard';
import { getRates } from '@/lib/rates';

export const revalidate = 300; // revalidate every 5 minutes

const WA = process.env.NEXT_PUBLIC_COACH_WHATSAPP || '256784277664';

export default async function HomePage() {
  let rates = null;
  try { rates = await getRates(); } catch {}

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 60px' }}>
        <div className="hero-glow" />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          <p className="label" style={{ marginBottom: 20 }}>Uganda's USDT Corridor Network</p>
          <h1
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(44px, 8vw, 80px)',
              lineHeight: 1.0,
              letterSpacing: '0.03em',
              marginBottom: 12,
            }}
          >
            UGANDA'S USDT CORRIDOR NETWORK<br />
            <span style={{ color: '#D4A017' }}>SEND & RECEIVE IN 15 COUNTRIES</span>
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(22px, 4vw, 38px)',
              color: '#666',
              letterSpacing: '0.05em',
              marginBottom: 24,
            }}
          >
            80% CHEAPER THAN YOUR BANK — FLAT 1% FEE
          </p>
          <p style={{ color: '#999', fontSize: 16, lineHeight: 1.7, maxWidth: 560, margin: '0 auto 36px' }}>
            AfricaTeam's trusted USDT rails. Pay suppliers in China, India, Turkey &amp; beyond.
            Diaspora in UK, UAE, USA &amp; Saudi? Send money home to Uganda instantly.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/pay-supplier" className="btn-gold">Pay Your Supplier →</Link>
            <Link href="/send-to-uganda" className="btn-outline">Send Money Home →</Link>
          </div>
          {rates && !rates.is_fallback && (
            <p style={{ color: '#444', fontSize: 12, marginTop: 20, fontFamily: 'var(--font-mono)' }}>
              Live rate: 1 USDT = UGX {Number(rates.usdt_ugx).toLocaleString()}
            </p>
          )}
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 48px' }}>
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 20,
            justifyContent: 'center',
          }}
        >
          {[
            '✓ Live USDT corridors — 15 countries',
            '✓ 50,000+ Africa Team community members',
            '✓ Every transaction confirmed via WhatsApp',
            '✓ TRC20 network — $0.01 transfer fee',
            '✓ Flat 1% — no hidden charges',
          ].map(t => (
            <span key={t} style={{ fontSize: 13, color: '#666' }}>{t}</span>
          ))}
        </div>
      </section>

      <div className="divider" style={{ maxWidth: 1200, margin: '0 auto' }} />

      {/* ── Corridor cards ───────────────────────────────────────────── */}
      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p className="label" style={{ textAlign: 'center', marginBottom: 12 }}>Choose Your Corridor</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(32px, 5vw, 52px)',
              textAlign: 'center',
              letterSpacing: '0.03em',
              marginBottom: 16,
            }}
          >
            WHERE ARE YOU SENDING?
          </h2>
          <p style={{ textAlign: 'center', color: '#666', fontSize: 14, marginBottom: 48 }}>
            Outbound (Uganda → world) and inbound (diaspora → Uganda) both supported
          </p>

          {/* Priority outbound corridors */}
          <p style={{ color: '#444', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
            Outbound — Uganda to the world
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
              marginBottom: 40,
            }}
          >
            {['china', 'uae', 'uk', 'kenya'].map(id => (
              <CorridorCard key={id} corridorId={id} rate={rates?.usdt_ugx} />
            ))}
          </div>

          {/* Inbound banner */}
          <div
            style={{
              background: 'rgba(212,160,23,0.06)',
              border: '1px solid rgba(212,160,23,0.15)',
              borderRadius: 12,
              padding: '28px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 20,
            }}
          >
            <div>
              <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 22, letterSpacing: '0.04em', marginBottom: 6 }}>
                🌍 DIASPORA? SEND MONEY HOME TO UGANDA
              </p>
              <p style={{ color: '#888', fontSize: 14 }}>
                USA · UAE · UK · Saudi Arabia · Canada · Australia · Germany · Qatar · Kenya
              </p>
            </div>
            <Link href="/send-to-uganda" className="btn-gold" style={{ whiteSpace: 'nowrap' }}>
              Send Money Home →
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section id="how-it-works" style={{ padding: '64px 24px', background: 'rgba(17,17,17,0.6)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p className="label" style={{ textAlign: 'center', marginBottom: 12 }}>Simple process</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(32px, 5vw, 52px)',
              textAlign: 'center',
              letterSpacing: '0.03em',
              marginBottom: 48,
            }}
          >
            HOW IT WORKS
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 24,
            }}
          >
            {[
              {
                step: '01',
                title: 'Calculate',
                body: 'Enter how much you want to send. See exactly what your recipient gets. No hidden fees. No surprises.',
              },
              {
                step: '02',
                title: 'WhatsApp Coach',
                body: 'Share your order reference on WhatsApp. Pay UGX via MTN MoMo or Airtel Money using your reference. Coach confirms receipt.',
              },
              {
                step: '03',
                title: 'USDT Delivered',
                body: 'Coach sends USDT to your wallet within 1 hour. You spend it, send it, or convert it. WhatsApp confirmation both sides.',
              },
            ].map(s => (
              <div key={s.step} className="card" style={{ padding: 28 }}>
                <p
                  style={{
                    fontFamily: 'var(--font-bebas)',
                    fontSize: 48,
                    color: 'rgba(212,160,23,0.25)',
                    lineHeight: 1,
                    marginBottom: 12,
                  }}
                >
                  {s.step}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-bebas)',
                    fontSize: 24,
                    letterSpacing: '0.04em',
                    marginBottom: 10,
                  }}
                >
                  {s.title}
                </p>
                <p style={{ color: '#888', fontSize: 14, lineHeight: 1.7 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section style={{ padding: '64px 24px', textAlign: 'center' }}>
        <p className="label" style={{ marginBottom: 16 }}>Ready to start?</p>
        <h2
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(32px, 6vw, 60px)',
            letterSpacing: '0.03em',
            marginBottom: 24,
          }}
        >
          YOUR MONEY SHOULD WORK <span style={{ color: '#D4A017' }}>HARDER</span>
        </h2>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/calculate" className="btn-gold">Calculate My Transfer →</Link>
          <a
            href={`https://wa.me/${WA}`}
            target="_blank"
            rel="noreferrer"
            className="btn-outline"
          >
            WhatsApp Coach
          </a>
        </div>
      </section>
    </>
  );
}
