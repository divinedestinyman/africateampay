import Link from 'next/link';

const WA = process.env.NEXT_PUBLIC_COACH_WHATSAPP || '256784277664';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '48px 24px 32px',
        marginTop: 80,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 40,
            marginBottom: 40,
          }}
        >
          {/* Brand */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 20,
                letterSpacing: '0.06em',
                marginBottom: 12,
              }}
            >
              AFRICA<span style={{ color: '#D4A017' }}>TEAM</span>PAY
            </p>
            <p style={{ color: '#666', fontSize: 13, lineHeight: 1.6, maxWidth: 220 }}>
              Uganda's trusted USDT corridor network. Flat 1% fee. Every transaction confirmed.
            </p>
          </div>

          {/* Corridors */}
          <div>
            <p className="label" style={{ marginBottom: 16 }}>Corridors</p>
            {[
              { href: '/corridors/china', label: '🇨🇳 Uganda → China' },
              { href: '/corridors/uae', label: '🇦🇪 Uganda → UAE' },
              { href: '/corridors/uk', label: '🇬🇧 Uganda → UK' },
              { href: '/corridors/kenya', label: '🇰🇪 Uganda → Kenya' },
            ].map(l => (
              <Link
                key={l.href}
                href={l.href}
                style={{ display: 'block', color: '#777', fontSize: 13, marginBottom: 8, textDecoration: 'none' }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Tools */}
          <div>
            <p className="label" style={{ marginBottom: 16 }}>Tools</p>
            {[
              { href: '/calculate', label: 'Calculator' },
              { href: '/track', label: 'Track Order' },
            ].map(l => (
              <Link
                key={l.href}
                href={l.href}
                style={{ display: 'block', color: '#777', fontSize: 13, marginBottom: 8, textDecoration: 'none' }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Africa Team */}
          <div>
            <p className="label" style={{ marginBottom: 16 }}>Africa Team</p>
            <a href="https://africateam-hub.vercel.app/p2p" target="_blank" rel="noreferrer"
              style={{ display: 'block', color: '#D4A017', fontSize: 13, marginBottom: 8, textDecoration: 'none' }}>
              Buy USDT in Uganda →
            </a>
            <p style={{ color: '#444', fontSize: 12 }}>africateam-hub.vercel.app/p2p</p>
          </div>

          {/* Contact */}
          <div>
            <p className="label" style={{ marginBottom: 16 }}>Contact Coach</p>
            <a
              href={`https://wa.me/${WA}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: '#D4A017', fontSize: 13, textDecoration: 'none' }}
            >
              WhatsApp →
            </a>
            <p style={{ color: '#555', fontSize: 12, marginTop: 12 }}>
              Business hours: 8am–8pm EAT
            </p>
          </div>
        </div>

        <div className="divider" style={{ marginBottom: 24 }} />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ color: '#444', fontSize: 12 }}>
            © {new Date().getFullYear()} AfricaTeamPay. Part of the Africa Team community.
          </p>
          <p style={{ color: '#333', fontSize: 12 }}>
            USDT transfers via Tron (TRC20) network.
          </p>
        </div>
      </div>
    </footer>
  );
}
