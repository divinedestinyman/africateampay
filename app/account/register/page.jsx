'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Registration failed'); return; }
      router.push('/account/dashboard');
    } catch {
      setError('Network error — please try again');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: '60px auto', padding: '0 24px 80px' }}>
      <p className="label" style={{ marginBottom: 12 }}>Create Account</p>
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(32px,5vw,48px)', letterSpacing: '0.03em', marginBottom: 8 }}>
        JOIN AFRICATEAMPAY
      </h1>
      <p style={{ color: '#999', fontSize: 14, marginBottom: 32 }}>
        Save transfer templates and track all your orders in one place.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label className="label" style={{ display: 'block', marginBottom: 6 }}>Full Name</label>
          <input
            className="input"
            type="text"
            placeholder="John Katende"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label className="label" style={{ display: 'block', marginBottom: 6 }}>Email Address</label>
          <input
            className="input"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label className="label" style={{ display: 'block', marginBottom: 6 }}>Password</label>
          <input
            className="input"
            type="password"
            placeholder="Min 8 characters"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required
            minLength={8}
            style={{ width: '100%' }}
          />
        </div>

        {error && (
          <p style={{ color: '#ff6b6b', fontSize: 14, padding: '10px 14px', background: 'rgba(255,107,107,0.08)', borderRadius: 8 }}>
            {error}
          </p>
        )}

        <button className="btn-gold" type="submit" disabled={loading} style={{ marginTop: 8 }}>
          {loading ? 'Creating account…' : 'Create Account →'}
        </button>
      </form>

      <p style={{ color: '#666', fontSize: 14, marginTop: 24, textAlign: 'center' }}>
        Already have an account?{' '}
        <Link href="/account/login" style={{ color: '#D4A017', textDecoration: 'none' }}>Sign in</Link>
      </p>
    </div>
  );
}
