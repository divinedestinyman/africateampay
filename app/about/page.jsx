import Link from 'next/link';

export const metadata = {
  title: 'About AfricaTeamPay — Uganda USDT Corridor Network',
  description:
    "AfricaTeamPay is part of the Africa Team ecosystem — Uganda's cross-border payment platform making transfers 10x cheaper for importers and diaspora.",
  openGraph: {
    title: 'About AfricaTeamPay — Uganda USDT Corridor Network',
    description: 'Our mission: make cross-border payments 10x cheaper for every African.',
    url: 'https://africateampay.vercel.app/about',
    siteName: 'AfricaTeamPay',
    type: 'website',
    images: [
      {
        url: 'https://africateampay.vercel.app/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'AfricaTeamPay',
      },
    ],
  },
  alternates: { canonical: 'https://africateampay.vercel.app/about' },
};

const WA = process.env.NEXT_PUBLIC_COACH_WHATSAPP || '256784277664';

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 60px' }}>
        <div className="hero-glow" />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <p className="label" style={{ marginBottom: 16 }}>ABOUT US</p>
          <h1
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(44px, 8vw, 80px)',
              lineHeight: 1.0,
              letterSpacing: '0.03em',
              marginBottom: 20,
            }}
          >
            BUILT IN KAMPALA.
            <br />
            <span style={{ color: '#D4A017' }}>BUILT FOR AFRICA.</span>
          </h1>
          <p style={{ color: '#999', fontSize: 17, lineHeight: 1.8, maxWidth: 600 }}>
            AfricaTeamPay is Uganda&apos;s USDT corridor network — a two-sided platform
            connecting importers paying suppliers abroad with diaspora sending money home.
            Same infrastructure. Flat 1% fee. No hidden charges.
          </p>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: 1200, margin: '0 auto' }} />

      {/* Part of Africa Team */}
      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
          <div>
            <p className="label" style={{ marginBottom: 16 }}>THE ECOSYSTEM</p>
            <h2
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(32px, 5vw, 48px)',
                letterSpacing: '0.03em',
                marginBottom: 20,
              }}
            >
              PART OF THE{' '}
              <span style={{ color: '#D4A017' }}>AFRICA TEAM</span>
            </h2>
            <p style={{ color: '#888', fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
              Africa Team is a 50,000-member community of East African entrepreneurs, traders,
              and professionals. We share business intelligence, supplier contacts, market
              prices, and hard-won lessons about cross-border trade.
            </p>
            <p style={{ color: '#888', fontSize: 15, lineHeight: 1.8 }}>
              AfricaTeamPay is the financial infrastructure arm — the payment rails that
              actually move value across our corridors. When you use AfricaTeamPay, you&apos;re
              plugging into a network that has been operating and growing since 2022.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { num: '50,000+', label: 'Active Community Members' },
              { num: '15', label: 'Trade Corridors Active' },
              { num: '2026', label: 'Payment Platform Launched' },
              { num: '1%', label: 'Flat Fee — No Exceptions' },
            ].map((s) => (
              <div
                key={s.label}
                className="card"
                style={{
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-bebas)',
                    fontSize: 36,
                    color: '#D4A017',
                    minWidth: 80,
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </span>
                <span style={{ color: '#999', fontSize: 14 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: 1200, margin: '0 auto' }} />

      {/* Coach's story */}
      <section style={{ padding: '64px 24px', background: 'rgba(17,17,17,0.6)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p className="label" style={{ marginBottom: 16 }}>THE STORY</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(32px, 5vw, 48px)',
              letterSpacing: '0.03em',
              marginBottom: 28,
            }}
          >
            WHY WE BUILT THIS
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ color: '#AAA', fontSize: 16, lineHeight: 1.85 }}>
              In 2022, a Uganda-based trader wanted to pay a supplier in Guangzhou, China.
              The bank wanted 4–7 business days and a 4% spread. Western Union didn&apos;t even
              offer the route. The only option was flying there with cash — a $1,200 round trip
              for a $5,000 order.
            </p>
            <p style={{ color: '#AAA', fontSize: 16, lineHeight: 1.85 }}>
              That problem didn&apos;t need a fintech company. It needed someone who already held
              USDT, had a Binance account, and understood both ends of the corridor. The
              Africa Team community became that someone — peer-to-peer, human-to-human,
              with WhatsApp as the confirmation layer.
            </p>
            <p style={{ color: '#AAA', fontSize: 16, lineHeight: 1.85 }}>
              AfricaTeamPay is the formalization of what already worked organically: a
              transparent desk with live rates, locked pricing, blockchain proof, and a
              reference number every customer can track. The Coach handles every transaction
              personally. That&apos;s the guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p className="label" style={{ textAlign: 'center', marginBottom: 16 }}>OUR MISSION</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(32px, 6vw, 64px)',
              textAlign: 'center',
              letterSpacing: '0.03em',
              marginBottom: 24,
              lineHeight: 1.0,
            }}
          >
            MAKE CROSS-BORDER PAYMENTS
            <br />
            <span style={{ color: '#D4A017' }}>10X CHEAPER FOR AFRICANS.</span>
          </h2>
          <p
            style={{
              color: '#888',
              fontSize: 16,
              lineHeight: 1.8,
              textAlign: 'center',
              maxWidth: 600,
              margin: '0 auto 48px',
            }}
          >
            Banks and legacy remittance services extract billions per year from African
            families and traders through hidden fees and bad exchange rates. We think
            that&apos;s wrong. USDT on TRC20 makes it unnecessary.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 20,
            }}
          >
            {[
              {
                icon: '🔍',
                title: 'Radical Transparency',
                body: 'Live rates from CoinGecko, locked for 30 minutes when you place an order. No surprises at checkout.',
              },
              {
                icon: '⚡',
                title: 'Same-Day Settlement',
                body: 'USDT on TRC20 settles in minutes. Your supplier gets paid. Your family receives shillings. Today.',
              },
              {
                icon: '🤝',
                title: 'Human Accountability',
                body: "Every transaction confirmed via WhatsApp. Coach's name is behind every transfer. That's the level of accountability.",
              },
              {
                icon: '🌍',
                title: 'African-First Design',
                body: 'Built for the corridors that matter: Kampala → Guangzhou, Dubai → Kampala, London → Kampala. Real routes for real traders.',
              },
            ].map((v) => (
              <div key={v.title} className="card" style={{ padding: '28px 24px' }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{v.icon}</div>
                <p
                  style={{
                    fontFamily: 'var(--font-bebas)',
                    fontSize: 20,
                    letterSpacing: '0.04em',
                    marginBottom: 10,
                  }}
                >
                  {v.title}
                </p>
                <p style={{ color: '#777', fontSize: 14, lineHeight: 1.7 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: 1200, margin: '0 auto' }} />

      {/* Trust + CTA */}
      <section style={{ padding: '64px 24px', textAlign: 'center' }}>
        <p className="label" style={{ marginBottom: 16 }}>JOIN THE NETWORK</p>
        <h2
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(32px, 5vw, 52px)',
            letterSpacing: '0.03em',
            marginBottom: 16,
          }}
        >
          KAMPALA, UGANDA — LAUNCHED 2026
        </h2>
        <p style={{ color: '#666', fontSize: 15, marginBottom: 36, maxWidth: 500, margin: '0 auto 36px' }}>
          50,000 community members strong. Every transfer backed by a person, not a bot.
          Join the Africa Team Telegram to follow live rates, market updates, and community insights.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/send" className="btn-gold">Start a Transfer</Link>
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
