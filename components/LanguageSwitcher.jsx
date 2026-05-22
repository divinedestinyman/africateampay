'use client';
import { useEffect, useState } from 'react';

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    const match = document.cookie.split(';').find(c => c.trim().startsWith('locale='));
    if (match) {
      setLocale(match.split('=')[1].trim());
    } else {
      // Auto-detect from browser on first visit
      const lang = navigator.language || '';
      if (lang.toLowerCase().startsWith('fr')) {
        switchLocale('fr');
      }
    }
  }, []);

  function switchLocale(next) {
    document.cookie = `locale=${next}; path=/; max-age=${365 * 24 * 60 * 60}; samesite=lax`;
    window.location.reload();
  }

  return (
    <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      {[
        { code: 'en', label: 'EN', flag: '🇬🇧' },
        { code: 'fr', label: 'FR', flag: '🇫🇷' },
      ].map(({ code, label, flag }) => {
        const active = locale === code;
        return (
          <button
            key={code}
            onClick={() => !active && switchLocale(code)}
            style={{
              padding: '3px 7px',
              borderRadius: 4,
              border: `1px solid ${active ? '#D4A017' : 'rgba(255,255,255,0.1)'}`,
              background: active ? 'rgba(212,160,23,0.15)' : 'transparent',
              color: active ? '#D4A017' : '#555',
              fontSize: 11,
              cursor: active ? 'default' : 'pointer',
              fontFamily: 'var(--font-sora)',
              letterSpacing: '0.05em',
              transition: 'all 0.15s',
            }}
            title={code === 'en' ? 'English' : 'Français'}
          >
            {flag} {label}
          </button>
        );
      })}
    </div>
  );
}
