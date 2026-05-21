'use client';
export const dynamic = 'force-dynamic';
import { useState } from 'react';
import OrderStatus from '@/components/OrderStatus';

export default function TrackPage() {
  const [ref, setRef] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleTrack(e) {
    e.preventDefault();
    setError(''); setOrder(null); setLoading(true);
    try {
      const res = await fetch(`/api/orders?ref=${encodeURIComponent(ref.trim())}`);
      const data = await res.json();
      if (data.orders?.length) {
        setOrder(data.orders[0]);
      } else {
        setError('Order not found. Check your reference number and try again.');
      }
    } catch {
      setError('Unable to look up order. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '60px 24px' }}>
      <p className="label" style={{ marginBottom: 12 }}>Order Tracking</p>
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px,6vw,56px)', letterSpacing: '0.03em', marginBottom: 32 }}>
        TRACK YOUR ORDER
      </h1>

      <form onSubmit={handleTrack} style={{ marginBottom: 32 }}>
        <label className="label" style={{ display: 'block', marginBottom: 8 }}>
          Enter your reference number
        </label>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            className="input"
            placeholder="ATP-20260520-1234"
            value={ref}
            onChange={e => setRef(e.target.value.toUpperCase())}
            style={{ fontFamily: 'var(--font-mono)', flex: 1 }}
          />
          <button type="submit" className="btn-gold" disabled={!ref.trim() || loading}>
            {loading ? '...' : 'Track'}
          </button>
        </div>
      </form>

      {error && (
        <div style={{ padding: 16, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, color: '#ef4444', fontSize: 14 }}>
          {error}
        </div>
      )}

      {order && <OrderStatus order={order} />}
    </div>
  );
}
