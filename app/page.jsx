import Link from 'next/link';
import CorridorCard from '@/components/CorridorCard';
import InboundCalculator from '@/components/InboundCalculator';
import { getRates } from '@/lib/rates';
import { getTranslations } from 'next-intl/server';

export const revalidate = 300;

const WA = process.env.NEXT_PUBLIC_COACH_WHATSAPP || '256784277664';

export const metadata = {
  title: 'Send Money to Uganda | AfricaTeamPay — 1% Flat Fee',
  description:
    "Uganda's USDT Corridor Network. Pay suppliers in China, India, Turkey & UAE. Diaspora? Send money home to Uganda instantly. Flat 1% fee — 80% cheaper than your bank.",
  openGraph: {
    title: 'Send Money to Uganda | AfricaTeamPay — 1% Flat Fee',
    description: '80% cheaper than your bank. Flat 1% fee. 15 countries.',
    url: 'https://africateampay.vercel.app',
    siteName: 'AfricaTeamPay',
    type: 'website',
  },
  alternates: { canonical: 'https://africateampay.vercel.app' },
};

export default async function HomePage() {
  const t = await getTranslations('home');
  let rates = null;
  try { rates = await getRates(); } catch {}

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 60px' }}>
        <div className="hero-glow" />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          <p className="label" style={{ marginBottom: 20 }}>{t('badge')}</p>
          <h1
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(44px, 8vw, 80px)',
              lineHeight: 1.0,
              letterSpacing: '0.03em',
              marginBottom: 12,
            }}
          >
            {t('heading1')}<br />
            <span style={{ color: '#D4A017' }}>{t('heading2')}</span>
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
            {t('tagline')}
          </p>
          <p style={{ color: '#999', fontSize: 16, lineHeight: 1.7, maxWidth: 560, margin: '0 auto 36px' }}>
            {t('body')}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/pay-supplier" className="btn-gold">{t('cta_supplier')}</Link>
            <Link href="/send-to-uganda" className="btn-outline">{t('cta_send_home')}</Link>
          </div>
          {rates && !rates.is_fallback && (
            <p style={{ color: '#444', fontSize: 12, marginTop: 20, fontFamily: 'var(--font-mono)' }}>
              {t('live_rate', { rate: Number(rates.usdt_ugx).toLocaleString() })}
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
          ].map(trust => (
            <span key={trust} style={{ fontSize: 13, color: '#666' }}>{trust}</span>
          ))}
        </div>
      </section>

      <div className="divider" style={{ maxWidth: 1200, margin: '0 auto' }} />

      {/* ── Corridor cards ───────────────────────────────────────────── */}
      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p className="label" style={{ textAlign: 'center', marginBottom: 12 }}>{t('section_where_badge')}</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(32px, 5vw, 52px)',
              textAlign: 'center',
              letterSpacing: '0.03em',
              marginBottom: 16,
            }}
          >
            {t('section_where')}
          </h2>
          <p style={{ textAlign: 'center', color: '#666', fontSize: 14, marginBottom: 48 }}>
            {t('section_where_body')}
          </p>

          <p style={{ color: '#444', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
            {t('outbound_label')}
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

          {/* Inbound banner + live calculator */}
          <div
            style={{
              background: 'rgba(212,160,23,0.06)',
              border: '1px solid rgba(212,160,23,0.15)',
              borderRadius: 12,
              padding: '28px 32px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 4 }}>
              <div>
                <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 22, letterSpacing: '0.04em', marginBottom: 6 }}>
                  🌍 {t('diaspora_title')}
                </p>
                <p style={{ color: '#888', fontSize: 14 }}>{t('diaspora_countries')}</p>
              </div>
              <Link href="/send-to-uganda" className="btn-gold" style={{ whiteSpace: 'nowrap' }}>
                {t('send_home_cta')}
              </Link>
            </div>
            <InboundCalculator />
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section id="how-it-works" style={{ padding: '64px 24px', background: 'rgba(17,17,17,0.6)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p className="label" style={{ textAlign: 'center', marginBottom: 12 }}>{t('how_badge')}</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(32px, 5vw, 52px)',
              textAlign: 'center',
              letterSpacing: '0.03em',
              marginBottom: 48,
            }}
          >
            {t('how_title')}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {[
              { num: t('step1_num'), title: t('step1_title'), body: t('step1_body') },
              { num: t('step2_num'), title: t('step2_title'), body: t('step2_body') },
              { num: t('step3_num'), title: t('step3_title'), body: t('step3_body') },
            ].map(s => (
              <div key={s.num} className="card" style={{ padding: 28 }}>
                <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 48, color: 'rgba(212,160,23,0.25)', lineHeight: 1, marginBottom: 12 }}>
                  {s.num}
                </p>
                <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 24, letterSpacing: '0.04em', marginBottom: 10 }}>
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
        <p className="label" style={{ marginBottom: 16 }}>{t('cta_badge')}</p>
        <h2
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(32px, 6vw, 60px)',
            letterSpacing: '0.03em',
            marginBottom: 24,
          }}
        >
          {t('cta_title')} <span style={{ color: '#D4A017' }}>{t('cta_title_gold')}</span>
        </h2>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/calculate" className="btn-gold">{t('cta_btn1')}</Link>
          <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" className="btn-outline">
            {t('cta_btn2')}
          </a>
        </div>
      </section>
    </>
  );
}
