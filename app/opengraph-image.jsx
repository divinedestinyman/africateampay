import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'AfricaTeamPay — Uganda USDT Corridor Network';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 1200,
        height: 630,
        backgroundColor: '#0A0A0A',
        padding: 64,
      }}
    >
      {/* Top gold accent bar */}
      <div style={{ display: 'flex', marginBottom: 48 }}>
        <div style={{ width: 72, height: 4, backgroundColor: '#D4A017', borderRadius: 2 }} />
      </div>

      {/* Logo row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 52 }}>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 14,
            backgroundColor: '#D4A017',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            fontWeight: 900,
            color: '#000',
            fontFamily: 'monospace',
            letterSpacing: '-1px',
          }}
        >
          ATP
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span
            style={{
              color: '#F5F5F5',
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: '0.06em',
              fontFamily: 'sans-serif',
            }}
          >
            AFRICATEAMPAY
          </span>
          <span
            style={{
              color: '#555',
              fontSize: 13,
              letterSpacing: '0.14em',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
            }}
          >
            USDT Corridor Network
          </span>
        </div>
      </div>

      {/* Main headline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 36 }}>
        <span
          style={{
            fontSize: 76,
            fontWeight: 900,
            color: '#F5F5F5',
            lineHeight: 1,
            fontFamily: 'sans-serif',
            letterSpacing: '-1px',
          }}
        >
          Send Money Across Africa
        </span>
        <span
          style={{
            fontSize: 76,
            fontWeight: 900,
            color: '#D4A017',
            lineHeight: 1,
            fontFamily: 'sans-serif',
            letterSpacing: '-1px',
          }}
        >
          10x Cheaper.
        </span>
      </div>

      {/* Badges */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 'auto' }}>
        {['1% Flat Fee', '15 Countries', 'TRC20 $0.01', '50K+ Community'].map((item) => (
          <div
            key={item}
            style={{
              padding: '10px 22px',
              border: '1px solid rgba(212,160,23,0.35)',
              borderRadius: 8,
              color: '#D4A017',
              fontSize: 17,
              fontFamily: 'sans-serif',
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.07)',
          marginTop: 40,
        }}
      >
        <span style={{ color: '#444', fontSize: 18, fontFamily: 'monospace' }}>
          africateampay.vercel.app
        </span>
        <span style={{ color: '#333', fontSize: 17, fontFamily: 'sans-serif' }}>
          Uganda → World · World → Uganda
        </span>
      </div>
    </div>
  );
}
