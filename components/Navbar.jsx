'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav
      style={{
        background: 'rgba(10,10,10,0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 22,
              letterSpacing: '0.06em',
              color: '#F5F5F5',
            }}
          >
            AFRICA<span style={{ color: '#D4A017' }}>TEAM</span>PAY
          </span>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <NavLink href="/corridors/china">China</NavLink>
          <NavLink href="/corridors/uae">UAE</NavLink>
          <NavLink href="/corridors/uk">UK</NavLink>
          <NavLink href="/corridors/kenya">Kenya</NavLink>
          <NavLink href="/track">Track</NavLink>
          <Link
            href="/calculate"
            className="btn-gold"
            style={{ padding: '9px 20px', fontSize: 14 }}
          >
            Calculate →
          </Link>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      style={{
        color: '#999',
        textDecoration: 'none',
        fontSize: 14,
        padding: '8px 12px',
        borderRadius: 6,
        transition: 'color 0.15s',
        fontFamily: 'var(--font-sora)',
      }}
      onMouseEnter={e => (e.target.style.color = '#F5F5F5')}
      onMouseLeave={e => (e.target.style.color = '#999')}
    >
      {children}
    </Link>
  );
}
