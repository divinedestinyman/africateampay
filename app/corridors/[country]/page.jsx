import Link from 'next/link';
import Calculator from '@/components/Calculator';

export async function generateMetadata({ params }) {
  const country = params.country;
  const name = country.charAt(0).toUpperCase() + country.slice(1);
  return {
    title: `Uganda → ${name} Corridor | AfricaTeamPay`,
    description: `Pay ${name} suppliers from Uganda. UGX → USDT → bank wire or direct payment. 1% flat fee. WhatsApp Coach.`,
  };
}

const WA = process.env.NEXT_PUBLIC_COACH_WHATSAPP || '256784277664';

const KNOWN_CORRIDORS = {
  china: { name: 'China', flag: '🇨🇳', currency: 'CNY' },
  india: { name: 'India', flag: '🇮🇳', currency: 'INR' },
  turkey: { name: 'Turkey', flag: '🇹🇷', currency: 'TRY' },
  uae: { name: 'UAE', flag: '🇦🇪', currency: 'AED' },
  uk: { name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP' },
  usa: { name: 'United States', flag: '🇺🇸', currency: 'USD' },
  kenya: { name: 'Kenya', flag: '🇰🇪', currency: 'KES' },
  germany: { name: 'Germany', flag: '🇩🇪', currency: 'EUR' },
  japan: { name: 'Japan', flag: '🇯🇵', currency: 'JPY' },
  southkorea: { name: 'South Korea', flag: '🇰🇷', currency: 'KRW' },
  malaysia: { name: 'Malaysia', flag: '🇲🇾', currency: 'MYR' },
  indonesia: { name: 'Indonesia', flag: '🇮🇩', currency: 'IDR' },
  thailand: { name: 'Thailand', flag: '🇹🇭', currency: 'THB' },
  vietnam: { name: 'Vietnam', flag: '🇻🇳', currency: 'VND' },
  pakistan: { name: 'Pakistan', flag: '🇵🇰', currency: 'PKR' },
  bangladesh: { name: 'Bangladesh', flag: '🇧🇩', currency: 'BDT' },
  france: { name: 'France', flag: '🇫🇷', currency: 'EUR' },
  netherlands: { name: 'Netherlands', flag: '🇳🇱', currency: 'EUR' },
  italy: { name: 'Italy', flag: '🇮🇹', currency: 'EUR' },
  spain: { name: 'Spain', flag: '🇪🇸', currency: 'EUR' },
  southafrica: { name: 'South Africa', flag: '🇿🇦', currency: 'ZAR' },
  egypt: { name: 'Egypt', flag: '🇪🇬', currency: 'EGP' },
  nigeria: { name: 'Nigeria', flag: '🇳🇬', currency: 'NGN' },
  ethiopia: { name: 'Ethiopia', flag: '🇪🇹', currency: 'ETB' },
  canada: { name: 'Canada', flag: '🇨🇦', currency: 'CAD' },
  australia: { name: 'Australia', flag: '🇦🇺', currency: 'AUD' },
  sweden: { name: 'Sweden', flag: '🇸🇪', currency: 'SEK' },
  switzerland: { name: 'Switzerland', flag: '🇨🇭', currency: 'CHF' },
  brazil: { name: 'Brazil', flag: '🇧🇷', currency: 'BRL' },
  singapore: { name: 'Singapore', flag: '🇸🇬', currency: 'SGD' },
  hongkong: { name: 'Hong Kong', flag: '🇭🇰', currency: 'HKD' },
};

export default function DynamicCorridorPage({ params }) {
  const slug = params.country.toLowerCase();
  const info = KNOWN_CORRIDORS[slug] || {
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    flag: '🌍',
    currency: 'USD',
  };

  const dedicatedPages = ['china', 'india', 'turkey', 'uae', 'uk', 'usa', 'kenya', 'germany', 'japan'];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 60px' }}>
        <div className="hero-glow" />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <span style={{ fontSize: 56 }}>{info.flag}</span>
          <p className="label" style={{ margin: '16px 0 12px' }}>Uganda → {info.name} Corridor</p>
          <h1
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(36px, 7vw, 68px)',
              lineHeight: 1.0,
              letterSpacing: '0.03em',
              marginBottom: 20,
            }}
          >
            PAYING A {info.name.toUpperCase()} SUPPLIER?<br />
            <span style={{ color: '#D4A017' }}>WE COVER 50+ COUNTRIES. 1% FEE.</span>
          </h1>
          <p style={{ color: '#aaa', fontSize: 16, lineHeight: 1.7, maxWidth: 620, marginBottom: 32 }}>
            AfricaTeamPay covers any country on earth. Convert UGX to USDT, then Coach wires
            USD, {info.currency}, or local currency directly to your supplier.
            WhatsApp Coach with your supplier details — done in 24–72 hours.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#calculator" className="btn-gold">Calculate My Transfer →</a>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" className="btn-outline">
              WhatsApp Coach
            </a>
          </div>
        </div>
      </section>

      {/* ── Universal payment options ─────────────────────────── */}
      <section style={{ padding: '0 24px 64px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p className="label" style={{ marginBottom: 12 }}>How Coach pays your {info.name} supplier</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '0.03em',
              marginBottom: 28,
            }}
          >
            THREE WAYS TO PAY ANY SUPPLIER WORLDWIDE
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {[
              {
                title: 'USDT Direct',
                badge: 'Fastest — 1 hour',
                badgeColor: '#4CAF50',
                desc: `If your ${info.name} supplier has a USDT wallet, Coach sends directly. No conversion loss. Instant settlement.`,
                fee: '1% flat',
                need: 'Supplier USDT wallet address (any chain)',
              },
              {
                title: 'USD Bank Wire',
                badge: 'Most Universal',
                badgeColor: '#D4A017',
                desc: 'Coach converts USDT to USD and wires via SWIFT to your supplier\'s bank. Works for any country, any bank.',
                fee: '1% + $25–40 wire',
                need: 'SWIFT/IBAN + account number + bank name',
              },
              {
                title: `${info.currency} Local Transfer`,
                badge: 'Best for local suppliers',
                badgeColor: '#888',
                desc: `Coach converts to ${info.currency} via local agent network and pays supplier in their home currency. Avoids exchange rate surprises.`,
                fee: '1.5% (covers conversion)',
                need: 'Local bank account or payment details',
              },
            ].map(opt => (
              <div key={opt.title} className="card-gold" style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <p style={{ fontWeight: 700, fontSize: 16 }}>{opt.title}</p>
                  <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: opt.badgeColor, border: `1px solid ${opt.badgeColor}`, padding: '2px 8px', borderRadius: 4 }}>
                    {opt.badge}
                  </span>
                </div>
                <p style={{ color: '#aaa', fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>{opt.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#555', fontSize: 12 }}>Fee</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#4CAF50' }}>{opt.fee}</span>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8, marginTop: 4 }}>
                    <span style={{ color: '#555', fontSize: 11 }}>Need: </span>
                    <span style={{ color: '#888', fontSize: 11 }}>{opt.need}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calculator ────────────────────────────────────────── */}
      <section id="calculator" style={{ padding: '48px 24px 64px', background: 'rgba(17,17,17,0.6)' }}>
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
            HOW MUCH DOES YOUR TRANSFER COST?
          </h2>
          <div className="card" style={{ padding: 32 }}>
            <Calculator />
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
            HOW TO PAY YOUR {info.name.toUpperCase()} SUPPLIER
          </h2>
          <div className="card" style={{ padding: 24 }}>
            {[
              `WhatsApp Coach: wa.me/${WA}`,
              `Share supplier details: name, country (${info.name}), payment method (USDT/bank), amount in USD or ${info.currency}`,
              'Coach confirms UGX equivalent including 1% fee and gives MoMo instructions',
              'Send UGX via MTN MoMo to Coach',
              `Coach converts USDT and pays your ${info.name} supplier`,
              'Supplier confirms receipt — goods dispatched',
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 12, color: '#000',
                  background: '#D4A017', borderRadius: '50%', width: 22, height: 22,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 1, fontWeight: 700,
                }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: 14, color: '#aaa', lineHeight: 1.6 }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other corridors ───────────────────────────────────── */}
      <section style={{ padding: '0 24px 64px', background: 'rgba(17,17,17,0.6)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', paddingTop: 48 }}>
          <p className="label" style={{ marginBottom: 12 }}>Also available</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '0.03em',
              marginBottom: 28,
            }}
          >
            POPULAR CORRIDORS WITH FULL GUIDES
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
            {[
              { slug: 'china', name: 'China', flag: '🇨🇳' },
              { slug: 'india', name: 'India', flag: '🇮🇳' },
              { slug: 'turkey', name: 'Turkey', flag: '🇹🇷' },
              { slug: 'uae', name: 'UAE', flag: '🇦🇪' },
              { slug: 'uk', name: 'UK', flag: '🇬🇧' },
              { slug: 'usa', name: 'USA', flag: '🇺🇸' },
              { slug: 'germany', name: 'Germany', flag: '🇩🇪' },
              { slug: 'japan', name: 'Japan', flag: '🇯🇵' },
              { slug: 'kenya', name: 'Kenya', flag: '🇰🇪' },
            ].filter(c => c.slug !== slug).map(c => (
              <Link
                key={c.slug}
                href={`/corridors/${c.slug}`}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: 8, padding: '16px 8px', background: '#111',
                  border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10,
                  textDecoration: 'none', color: '#aaa', fontSize: 13,
                  transition: 'border-color 0.2s',
                }}
              >
                <span style={{ fontSize: 28 }}>{c.flag}</span>
                <span>{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section style={{ padding: '64px 24px', textAlign: 'center' }}>
        <div className="card-gold" style={{ maxWidth: 600, margin: '0 auto', padding: 40 }}>
          <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 36, letterSpacing: '0.04em', marginBottom: 8 }}>
            DON&apos;T SEE YOUR COUNTRY?
          </p>
          <p style={{ color: '#aaa', marginBottom: 8 }}>
            We cover 50+ countries. WhatsApp Coach with your supplier details.
          </p>
          <p style={{ color: '#555', fontSize: 13, marginBottom: 28 }}>
            No country is off-limits. If your supplier has a bank account or USDT wallet, Coach can pay them.
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
