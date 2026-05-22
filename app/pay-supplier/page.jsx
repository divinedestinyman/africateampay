import SendForm from '@/components/SendForm';
import Link from 'next/link';

export const metadata = {
  title: 'Pay International Suppliers from Uganda via USDT | AfricaTeamPay',
  description:
    'Pay suppliers in China, India, Turkey, UAE & 11 more countries via USDT. 80% cheaper than bank wire. Flat 1% fee. Uganda-based P2P desk.',
  openGraph: {
    title: 'Pay International Suppliers from Uganda via USDT | AfricaTeamPay',
    description: 'Pay suppliers in China, India, Turkey, UAE via USDT. Flat 1% fee.',
    url: 'https://africateampay.vercel.app/pay-supplier',
    siteName: 'AfricaTeamPay',
  },
  alternates: { canonical: 'https://africateampay.vercel.app/pay-supplier' },
};

const CORRIDORS_FEATURED = [
  { flag: '🇨🇳', name: 'China', note: 'Guangzhou, Yiwu, Canton' },
  { flag: '🇮🇳', name: 'India', note: 'Textiles, tech, pharmaceuticals' },
  { flag: '🇹🇷', name: 'Turkey', note: 'Clothing, leather, furniture' },
  { flag: '🇦🇪', name: 'UAE', note: 'Electronics, gold, re-exports' },
  { flag: '🇬🇧', name: 'UK', note: 'Professional services, goods' },
  { flag: '🇩🇪', name: 'Germany', note: 'Machinery, auto parts' },
];

export default function PaySupplierPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 56px' }}>
        <div className="hero-glow" />
        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
          <p className="label" style={{ marginBottom: 16 }}>Uganda → World</p>
          <h1
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(40px, 7vw, 72px)',
              lineHeight: 1.0,
              letterSpacing: '0.03em',
              marginBottom: 16,
            }}
          >
            PAY YOUR{' '}
            <span style={{ color: '#D4A017' }}>SUPPLIER</span>
            <br />WITHOUT THE BANK
          </h1>
          <p style={{ color: '#999', fontSize: 16, lineHeight: 1.7, maxWidth: 520, marginBottom: 28 }}>
            Send UGX, we convert to USDT, supplier gets paid. No forex paperwork,
            no correspondent bank delays. Done in hours, not days.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
            {[
              '✓ 80% cheaper than bank wire',
              '✓ Flat 1% fee',
              '✓ 11 outbound corridors',
              '✓ USDT or bank TT',
              '✓ 30/70 staged payment support',
            ].map(t => (
              <span
                key={t}
                style={{
                  padding: '6px 14px',
                  borderRadius: 20,
                  fontSize: 13,
                  background: 'rgba(212,160,23,0.08)',
                  border: '1px solid rgba(212,160,23,0.2)',
                  color: '#D4A017',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Corridor grid */}
      <section style={{ padding: '0 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p className="label" style={{ marginBottom: 16 }}>Active corridors</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 32 }}>
            {CORRIDORS_FEATURED.map(c => (
              <div key={c.name} className="card" style={{ padding: '16px 18px' }}>
                <p style={{ fontSize: 22, marginBottom: 6 }}>{c.flag}</p>
                <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 3 }}>{c.name}</p>
                <p style={{ fontSize: 12, color: '#555' }}>{c.note}</p>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: '14px 20px',
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
              Need to understand how USDT supplier payment works?
            </p>
            <Link href="/how-to-buy-usdt" style={{ fontSize: 13, color: '#D4A017', whiteSpace: 'nowrap' }}>
              How USDT works →
            </Link>
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: 1200, margin: '0 auto' }} />

      {/* Form */}
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <SendForm defaultDirection="outbound" />
      </div>
    </>
  );
}
