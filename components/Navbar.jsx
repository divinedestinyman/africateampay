'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => (r.ok ? r.json() : null))
      .then(data => { if (data?.user) setUser(data.user); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'DELETE' });
    setUser(null);
    setShowDropdown(false);
    window.location.href = '/';
  }

  const initial = user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?';

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

          <LanguageSwitcher />

          {/* Account */}
          {user ? (
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setShowDropdown(v => !v)}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: 'rgba(212,160,23,0.15)',
                  border: '1px solid rgba(212,160,23,0.4)',
                  color: '#D4A017',
                  fontFamily: 'var(--font-bebas)',
                  fontSize: 16,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 4,
                }}
                title={user.email}
              >
                {initial}
              </button>
              {showDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 42,
                    background: '#1a1a1a',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8,
                    padding: '8px 0',
                    minWidth: 160,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                    zIndex: 200,
                  }}
                >
                  <p style={{ padding: '6px 16px', fontSize: 11, color: '#555', fontFamily: 'var(--font-sora)' }}>
                    {user.email}
                  </p>
                  <Link
                    href="/account/dashboard"
                    onClick={() => setShowDropdown(false)}
                    style={{
                      display: 'block',
                      padding: '8px 16px',
                      color: '#ccc',
                      textDecoration: 'none',
                      fontSize: 13,
                      fontFamily: 'var(--font-sora)',
                    }}
                  >
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 16px',
                      color: '#888',
                      background: 'none',
                      border: 'none',
                      fontSize: 13,
                      cursor: 'pointer',
                      fontFamily: 'var(--font-sora)',
                    }}
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink href="/account/login">Sign In</NavLink>
          )}

          <Link
            href="/calculate"
            className="btn-gold"
            style={{ padding: '9px 20px', fontSize: 14, marginLeft: 4 }}
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
