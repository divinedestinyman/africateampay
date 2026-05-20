import Link from 'next/link';

const CARDS = {
  china: {
    flag: '🇨🇳',
    name: 'China',
    bestFor: 'Traders buying goods in Guangzhou & Yiwu',
    example: 'Send 75M UGX → receive ~$19,800 USDT',
    useIt: 'Pay suppliers directly, spend in markets',
    href: '/corridors/china',
  },
  uae: {
    flag: '🇦🇪',
    name: 'UAE',
    bestFor: 'Workers sending remittances home',
    example: 'Send $500 → family receives UGX in minutes',
    useIt: 'Cheaper than Western Union by 80%',
    href: '/corridors/uae',
  },
  uk: {
    flag: '🇬🇧',
    name: 'United Kingdom',
    bestFor: 'Ugandan diaspora sending money home',
    example: 'Send £500 → family receives UGX same day',
    useIt: 'Bank transfer costs £35. We charge £5 flat.',
    href: '/corridors/uk',
  },
  kenya: {
    flag: '🇰🇪',
    name: 'Kenya',
    bestFor: 'Cross-border traders and families',
    example: 'Send KES 50,000 → Uganda mobile money',
    useIt: 'Instant settlement via USDT rail',
    href: '/corridors/kenya',
  },
};

export default function CorridorCard({ corridorId, rate }) {
  const c = CARDS[corridorId];
  if (!c) return null;

  return (
    <div className="card-gold" style={{ padding: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <span style={{ fontSize: 32 }}>{c.flag}</span>
        <div>
          <p className="label">From Uganda</p>
          <p
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 24,
              letterSpacing: '0.04em',
              lineHeight: 1.1,
            }}
          >
            {c.name}
          </p>
        </div>
      </div>

      {rate && (
        <div
          style={{
            background: 'rgba(212,160,23,0.08)',
            border: '1px solid rgba(212,160,23,0.15)',
            borderRadius: 6,
            padding: '8px 12px',
            marginBottom: 16,
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#D4A017' }}>
            1 USDT = UGX {rate.toLocaleString()}
          </span>
        </div>
      )}

      <div style={{ marginBottom: 16 }}>
        <p style={{ color: '#666', fontSize: 12, marginBottom: 6 }}>Best for:</p>
        <p style={{ color: '#ccc', fontSize: 14 }}>{c.bestFor}</p>
      </div>

      <div style={{ marginBottom: 6 }}>
        <p style={{ color: '#666', fontSize: 12, marginBottom: 4 }}>Typical:</p>
        <p style={{ color: '#aaa', fontSize: 13, fontFamily: 'var(--font-mono)' }}>{c.example}</p>
      </div>

      <div style={{ marginBottom: 20 }}>
        <p style={{ color: '#666', fontSize: 12, marginBottom: 4 }}>Use it:</p>
        <p style={{ color: '#aaa', fontSize: 13 }}>{c.useIt}</p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 16,
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <span style={{ color: '#555', fontSize: 12 }}>Flat 1% fee</span>
        <Link href={c.href} className="btn-gold" style={{ padding: '10px 20px', fontSize: 13 }}>
          Start Transfer →
        </Link>
      </div>
    </div>
  );
}
