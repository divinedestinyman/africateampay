'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(''); setLoading(true);
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    });
    setLoading(false);
    if (res.ok) { router.push('/admin'); router.refresh(); }
    else setErr('Invalid password.');
  }

  return (
    <div style={{ maxWidth: 400, margin: '120px auto', padding: '0 24px' }}>
      <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, letterSpacing: '0.04em', marginBottom: 4 }}>
        AFRICA<span style={{ color: '#D4A017' }}>TEAM</span>PAY
      </p>
      <p className="label" style={{ marginBottom: 28 }}>Admin Access</p>
      <form onSubmit={handleSubmit} className="card" style={{ padding: 28 }}>
        <label className="label" style={{ display: 'block', marginBottom: 8 }}>Password</label>
        <input
          className="input"
          type="password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          placeholder="Enter admin password"
          style={{ marginBottom: 16 }}
          autoFocus
        />
        {err && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{err}</p>}
        <button type="submit" className="btn-gold" style={{ width: '100%' }} disabled={loading}>
          {loading ? 'Checking...' : 'Sign In →'}
        </button>
      </form>
    </div>
  );
}
