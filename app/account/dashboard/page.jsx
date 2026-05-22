'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { STATUS_LABELS, formatDate } from '@/lib/utils';

const STATUS_COLORS = {
  pending: '#888',
  rate_locked: '#D4A017',
  payment_received: '#3b9eff',
  converting: '#a78bfa',
  sending: '#60a5fa',
  completed: '#4ade80',
  cancelled: '#ff6b6b',
  failed: '#ff6b6b',
  disputed: '#f97316',
  refunded: '#94a3b8',
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [tab, setTab] = useState('orders');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data?.user) { router.push('/account/login'); return; }
        setUser(data.user);
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => router.push('/account/login'));
  }, [router]);

  useEffect(() => {
    if (tab === 'templates' && user) {
      fetch('/api/account/templates')
        .then(r => r.json())
        .then(d => setTemplates(d.templates || []));
    }
  }, [tab, user]);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  }

  async function deleteTemplate(id) {
    await fetch(`/api/account/templates/${id}`, { method: 'DELETE' });
    setTemplates(ts => ts.filter(t => t.id !== id));
  }

  if (loading) {
    return (
      <div style={{ maxWidth: 900, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
        <p style={{ color: '#666' }}>Loading your account…</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px 80px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <p className="label" style={{ marginBottom: 8 }}>My Account</p>
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(28px,4vw,42px)', letterSpacing: '0.03em', margin: 0 }}>
            {user.name.toUpperCase()}
          </h1>
          <p style={{ color: '#666', fontSize: 13, marginTop: 4 }}>{user.email}</p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/send" className="btn-gold" style={{ padding: '10px 20px', fontSize: 14 }}>
            + New Transfer
          </Link>
          <button onClick={handleLogout} className="btn-outline" style={{ padding: '10px 20px', fontSize: 14 }}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #222', marginBottom: 32, gap: 0 }}>
        {['orders', 'templates'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '12px 24px', fontSize: 14,
              color: tab === t ? '#D4A017' : '#666',
              borderBottom: tab === t ? '2px solid #D4A017' : '2px solid transparent',
              fontFamily: 'var(--font-sora)',
              textTransform: 'capitalize',
              transition: 'color 0.15s',
            }}
          >
            {t === 'orders' ? `Orders (${orders.length})` : `Templates (${templates.length || '…'})`}
          </button>
        ))}
      </div>

      {/* Orders Tab */}
      {tab === 'orders' && (
        orders.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 48 }}>
            <p style={{ color: '#555', marginBottom: 16 }}>No orders yet.</p>
            <Link href="/send" className="btn-gold">Place your first transfer →</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {orders.map(order => (
              <div key={order.id} className="card" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#D4A017', marginBottom: 4 }}>
                    {order.reference}
                  </p>
                  <p style={{ fontSize: 14, color: '#ccc', margin: 0 }}>
                    {order.corridor_id?.toUpperCase()} · {order.amount_usdt} USDT
                    {order.direction === 'inbound' && ` · ${order.sender_amount} ${order.sender_currency}`}
                  </p>
                  <p style={{ fontSize: 12, color: '#555', margin: '4px 0 0' }}>{formatDate(order.created_at)}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{
                    fontSize: 12, padding: '4px 10px', borderRadius: 20,
                    background: `${STATUS_COLORS[order.status] || '#888'}20`,
                    color: STATUS_COLORS[order.status] || '#888',
                    border: `1px solid ${STATUS_COLORS[order.status] || '#888'}40`,
                  }}>
                    {STATUS_LABELS[order.status] || order.status}
                  </span>
                  <Link href={`/track/${order.reference}`} style={{ color: '#D4A017', fontSize: 13, textDecoration: 'none' }}>
                    Track →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Templates Tab */}
      {tab === 'templates' && (
        templates.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 48 }}>
            <p style={{ color: '#555', marginBottom: 8 }}>No saved templates yet.</p>
            <p style={{ color: '#444', fontSize: 13, marginBottom: 24 }}>
              After tracking an order, click "Save as Template" to repeat transfers faster.
            </p>
            <Link href="/send" className="btn-gold">Start a transfer →</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {templates.map(tmpl => (
              <div key={tmpl.id} className="card" style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <p style={{ fontSize: 15, color: '#F5F5F5', marginBottom: 4, fontWeight: 500 }}>{tmpl.template_name}</p>
                    <p style={{ fontSize: 13, color: '#999', margin: 0 }}>
                      {tmpl.direction === 'outbound' ? '🚀 Outbound' : '📥 Inbound'} ·{' '}
                      {tmpl.corridor_id?.toUpperCase()} ·{' '}
                      {tmpl.typical_amount_usdt ? `~${tmpl.typical_amount_usdt} USDT` : 'No typical amount'}
                    </p>
                    {tmpl.reminder_enabled && (
                      <p style={{ fontSize: 12, color: '#D4A017', marginTop: 4 }}>
                        🔔 Monthly reminder: day {tmpl.reminder_day}
                      </p>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <Link
                      href={`/send?template=${tmpl.id}`}
                      className="btn-gold"
                      style={{ padding: '8px 16px', fontSize: 13 }}
                    >
                      Repeat Transfer →
                    </Link>
                    <button
                      onClick={() => deleteTemplate(tmpl.id)}
                      className="btn-outline"
                      style={{ padding: '8px 14px', fontSize: 13, color: '#ff6b6b', borderColor: '#ff6b6b33' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
