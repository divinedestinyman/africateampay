'use client';

const STARS = '★★★★★';

const TESTIMONIALS = [
  {
    name: 'Amara Kamara',
    location: 'USA → Uganda',
    flag: '🇺🇸',
    amount: 'USD 2,000',
    quote:
      "I've been sending money home for years. Western Union charged me $90 on $2,000. AfricaTeamPay charged me $20. That's real money saved every single month.",
    savings: 'Saved $70 vs Western Union',
  },
  {
    name: 'Jamal Ssekibuule',
    location: 'UK → Kampala',
    flag: '🇬🇧',
    amount: 'GBP 500/mo',
    quote:
      "Monthly remittances sorted. Coach confirms on WhatsApp, my family gets the shillings same day. I never thought sending money home could be this easy.",
    savings: '80% cheaper than my bank',
  },
  {
    name: 'Esther Boateng',
    location: 'UAE → Uganda',
    flag: '🇦🇪',
    amount: 'AED 3,000',
    quote:
      "As a nurse in Dubai, I support my whole family back in Uganda. AfricaTeamPay gives me the real exchange rate — not the garbage rate banks charge us.",
    savings: 'Real rate, 1% flat fee',
  },
  {
    name: 'Mukiibi Robert',
    location: 'Uganda → China',
    flag: '🇨🇳',
    amount: 'USD 8,500',
    quote:
      "We import goods from Guangzhou every quarter. Converting UGX to USDT and sending to our supplier in 24 hours changed our business. No more wire transfer delays.",
    savings: 'Supplier paid in 24 hours',
  },
];

export default function Testimonials() {
  return (
    <section style={{ padding: '64px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p className="label" style={{ textAlign: 'center', marginBottom: 12 }}>
          COMMUNITY STORIES
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(32px, 5vw, 52px)',
            textAlign: 'center',
            letterSpacing: '0.03em',
            marginBottom: 16,
          }}
        >
          REAL PEOPLE, REAL SAVINGS
        </h2>
        <p style={{ textAlign: 'center', color: '#666', fontSize: 14, marginBottom: 48 }}>
          From the 50,000-strong Africa Team community
        </p>

        {/* Desktop grid / Mobile horizontal scroll */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
          }}
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="card"
              style={{
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              {/* Stars */}
              <span style={{ color: '#D4A017', fontSize: 18, letterSpacing: 2 }}>
                {STARS}
              </span>

              {/* Quote */}
              <p
                style={{
                  color: '#C0C0C0',
                  fontSize: 14,
                  lineHeight: 1.75,
                  flexGrow: 1,
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Savings badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'rgba(212,160,23,0.08)',
                  border: '1px solid rgba(212,160,23,0.2)',
                  borderRadius: 6,
                  padding: '5px 12px',
                  fontSize: 12,
                  color: '#D4A017',
                  fontFamily: 'var(--font-mono)',
                  width: 'fit-content',
                }}
              >
                ✓ {t.savings}
              </div>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'rgba(212,160,23,0.12)',
                    border: '1px solid rgba(212,160,23,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  {t.flag}
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{t.name}</p>
                  <p style={{ color: '#555', fontSize: 12 }}>
                    {t.location} · {t.amount}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
