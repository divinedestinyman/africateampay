import SendForm from '@/components/SendForm';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export const metadata = {
  title: 'Send Money Home to Uganda from USA UK UAE Saudi | AfricaTeamPay',
  description:
    'Send money home to Uganda from USA, UK, UAE, Saudi Arabia, Canada & Australia. Family receives MTN MoMo or Airtel Money within 1 hour. Flat 1% fee, USDT-powered.',
  openGraph: {
    title: 'Send Money to Uganda | AfricaTeamPay',
    description: 'Diaspora-to-Uganda transfers. MTN MoMo, Airtel Money. Flat 1% fee.',
    url: 'https://africateampay.vercel.app/send-to-uganda',
    siteName: 'AfricaTeamPay',
  },
  alternates: { canonical: 'https://africateampay.vercel.app/send-to-uganda' },
};

const DIASPORA_COUNTRIES = [
  { flag: '🇺🇸', name: 'USA' },
  { flag: '🇬🇧', name: 'UK' },
  { flag: '🇦🇪', name: 'UAE' },
  { flag: '🇸🇦', name: 'Saudi Arabia' },
  { flag: '🇨🇦', name: 'Canada' },
  { flag: '🇦🇺', name: 'Australia' },
  { flag: '🇩🇪', name: 'Germany' },
  { flag: '🇶🇦', name: 'Qatar' },
  { flag: '🇰🇪', name: 'Kenya' },
];

export default async function SendToUgandaPage() {
  const t = await getTranslations('send_uganda');
  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 56px' }}>
        <div className="hero-glow" />
        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
          <p className="label" style={{ marginBottom: 16 }}>{t('badge')}</p>
          <h1
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(40px, 7vw, 72px)',
              lineHeight: 1.0,
              letterSpacing: '0.03em',
              marginBottom: 16,
            }}
          >
            {t('heading')}{' '}
            <span style={{ color: '#D4A017' }}>{t('heading_ug')}</span>
          </h1>
          <p style={{ color: '#999', fontSize: 16, lineHeight: 1.7, maxWidth: 520, marginBottom: 28 }}>
            {t('body')}
          </p>

          {/* Country chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
            {DIASPORA_COUNTRIES.map(c => (
              <span
                key={c.name}
                style={{
                  padding: '6px 14px',
                  borderRadius: 20,
                  fontSize: 13,
                  background: 'rgba(212,160,23,0.08)',
                  border: '1px solid rgba(212,160,23,0.2)',
                  color: '#D4A017',
                }}
              >
                {c.flag} {c.name}
              </span>
            ))}
          </div>

          {/* Trust signals */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            {[
              '✓ 1% flat fee — no hidden charges',
              '✓ MTN MoMo delivered in 1 hour',
              '✓ TRC20 — $0.01 network fee',
              '✓ 5 settlement options',
              '✓ 33 sending currencies',
            ].map(t => (
              <span key={t} style={{ fontSize: 13, color: '#555' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works for inbound */}
      <section style={{ padding: '0 24px 56px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16,
              marginBottom: 40,
            }}
          >
            {[
              { step: '01', title: 'Fill the form', body: 'Enter the amount in your currency. Add recipient MTN MoMo number. Takes 2 minutes.' },
              { step: '02', title: 'Send USDT', body: 'You get a wallet address. Buy USDT on Binance and send it. Rate locked for 30 minutes.' },
              { step: '03', title: 'Family gets paid', body: 'Coach confirms receipt and sends UGX to recipient\'s mobile money within 1 hour.' },
            ].map(s => (
              <div key={s.step} className="card" style={{ padding: 20 }}>
                <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 36, color: 'rgba(212,160,23,0.2)', lineHeight: 1, marginBottom: 8 }}>
                  {s.step}
                </p>
                <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 20, letterSpacing: '0.04em', marginBottom: 6 }}>{s.title}</p>
                <p style={{ color: '#777', fontSize: 13, lineHeight: 1.6 }}>{s.body}</p>
              </div>
            ))}
          </div>

          {/* Don't have USDT? */}
          <div
            style={{
              padding: '16px 20px',
              background: 'rgba(212,160,23,0.04)',
              border: '1px solid rgba(212,160,23,0.15)',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <p style={{ fontSize: 14, color: '#888' }}>
              Don't have USDT yet? It takes 10 minutes to set up on Binance.
            </p>
            <Link
              href="/how-to-buy-usdt"
              style={{ fontSize: 13, color: '#D4A017', whiteSpace: 'nowrap' }}
            >
              How to buy USDT →
            </Link>
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: 1200, margin: '0 auto 0' }} />

      {/* Form */}
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <SendForm defaultDirection="inbound" />
      </div>
    </>
  );
}
