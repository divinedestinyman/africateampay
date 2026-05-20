'use client';
import { useState, useEffect, useCallback } from 'react';
import { formatDate, formatUGX, STATUS_LABELS, CORRIDORS } from '@/lib/utils';

const TOKEN = typeof window !== 'undefined' ? document.cookie.match(/admin_auth=([^;]+)/)?.[1] : '';

function authHeader() {
  const m = document.cookie.match(/admin_auth=([^;]+)/);
  return m ? { 'x-admin-token': m[1] } : {};
}

export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // { type, order }
  const [txHash, setTxHash] = useState('');
  const [newOrder, setNewOrder] = useState(null);
  const [form, setForm] = useState({ customer_name:'', customer_whatsapp:'', customer_wallet:'', corridor_id:'china', amount_ugx:'', notes:'' });

  const load = useCallback(async () => {
    const res = await fetch('/api/orders');
    const data = await res.json();
    setOrders(data.orders || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function updateStatus(orderId, status, extra = {}) {
    await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify({ status, ...extra }),
    });
    setModal(null); setTxHash('');
    load();
  }

  async function createOrder(e) {
    e.preventDefault();
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, amount_ugx: parseInt(form.amount_ugx.replace(/,/g,'')) }),
    });
    const data = await res.json();
    setNewOrder(data.order);
    setForm({ customer_name:'', customer_whatsapp:'', customer_wallet:'', corridor_id:'china', amount_ugx:'', notes:'' });
    load();
  }

  // Stats
  const thisMonth = orders.filter(o => new Date(o.created_at).getMonth() === new Date().getMonth());
  const totalUgx = thisMonth.reduce((s, o) => s + (Number(o.amount_ugx)||0), 0);
  const totalUsdt = orders.filter(o => o.status === 'usdt_sent' || o.status === 'completed').reduce((s, o) => s + (Number(o.amount_usdt)||0), 0);
  const totalFees = thisMonth.reduce((s, o) => s + (Number(o.fee_ugx)||0), 0);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <p className="label" style={{ marginBottom: 4 }}>Coach Dashboard</p>
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 36, letterSpacing: '0.04em' }}>
            AFRICA<span style={{ color: '#D4A017' }}>TEAM</span>PAY ADMIN
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-gold" style={{ padding: '10px 18px', fontSize: 13 }} onClick={() => setModal({ type: 'new' })}>
            + New Order
          </button>
          <button className="btn-outline" style={{ padding: '10px 18px', fontSize: 13 }} onClick={async () => { await fetch('/api/admin/login', { method: 'DELETE' }); location.href = '/admin/login'; }}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Orders This Month', value: thisMonth.length },
          { label: 'UGX Processed', value: `UGX ${totalUgx.toLocaleString()}`, mono: true },
          { label: 'USDT Sent (All)', value: `${totalUsdt.toFixed(2)} USDT`, mono: true },
          { label: 'Fees Earned', value: `UGX ${totalFees.toLocaleString()}`, mono: true, gold: true },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: 20 }}>
            <p className="label" style={{ marginBottom: 8 }}>{s.label}</p>
            <p style={{ fontFamily: s.mono ? 'var(--font-mono)' : 'var(--font-bebas)', fontSize: s.mono ? 16 : 28, color: s.gold ? '#D4A017' : '#F5F5F5' }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Orders table */}
      {loading ? (
        <p style={{ color: '#555' }}>Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="card" style={{ padding: 40, textAlign: 'center' }}>
          <p style={{ color: '#555' }}>No orders yet. Create the first one above.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {['Reference','Customer','Amount','USDT','Corridor','Status','Created','Actions'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#555', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 400 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(o => {
                const sl = STATUS_LABELS[o.status] || { label: o.status, color: '#888' };
                const cor = CORRIDORS[o.corridor_id] || { flag: '?', name: o.corridor_id };
                return (
                  <tr key={o.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', color: '#D4A017' }}>{o.reference}</td>
                    <td style={{ padding: '12px' }}>
                      <div>{o.customer_name || '—'}</div>
                      {o.customer_whatsapp && <a href={`https://wa.me/${o.customer_whatsapp?.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: '#4CAF50' }}>WA ↗</a>}
                    </td>
                    <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: 12 }}>UGX {Number(o.amount_ugx).toLocaleString()}</td>
                    <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#D4A017' }}>{Number(o.amount_usdt).toFixed(2)}</td>
                    <td style={{ padding: '12px' }}>{cor.flag} {cor.name}</td>
                    <td style={{ padding: '12px' }}><span className={sl.color} style={{ fontSize: 12 }}>{sl.label}</span></td>
                    <td style={{ padding: '12px', color: '#555', fontSize: 11 }}>{formatDate(o.created_at)}</td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {o.status === 'pending' && (
                          <button className="btn-gold" style={{ padding: '6px 12px', fontSize: 11 }} onClick={() => updateStatus(o.id, 'payment_received')}>
                            ✓ Payment
                          </button>
                        )}
                        {o.status === 'payment_received' && (
                          <button className="btn-gold" style={{ padding: '6px 12px', fontSize: 11 }} onClick={() => { setModal({ type: 'usdt', order: o }); setTxHash(''); }}>
                            Send USDT
                          </button>
                        )}
                        {o.tron_tx_hash && (
                          <a href={`https://tronscan.org/#/transaction/${o.tron_tx_hash}`} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: '#D4A017', padding: '6px 0' }}>TX ↗</a>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal: USDT sent */}
      {modal?.type === 'usdt' && (
        <ModalOverlay onClose={() => setModal(null)}>
          <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 24, marginBottom: 4 }}>MARK USDT SENT</p>
          <p style={{ color: '#888', fontSize: 13, marginBottom: 20 }}>
            Order: {modal.order.reference} — {Number(modal.order.amount_usdt).toFixed(2)} USDT
          </p>
          <label className="label" style={{ display: 'block', marginBottom: 8 }}>Tron TX Hash</label>
          <input className="input" placeholder="Paste TronScan TX hash" value={txHash} onChange={e => setTxHash(e.target.value)} style={{ marginBottom: 16, fontFamily: 'var(--font-mono)', fontSize: 13 }} />
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn-gold" disabled={!txHash.trim()} onClick={() => updateStatus(modal.order.id, 'usdt_sent', { tron_tx_hash: txHash.trim() })}>
              Confirm Sent
            </button>
            <button className="btn-outline" onClick={() => setModal(null)}>Cancel</button>
          </div>
        </ModalOverlay>
      )}

      {/* Modal: New order */}
      {modal?.type === 'new' && (
        <ModalOverlay onClose={() => { setModal(null); setNewOrder(null); }}>
          {newOrder ? (
            <div>
              <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 24, marginBottom: 4, color: '#4CAF50' }}>ORDER CREATED ✓</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color: '#D4A017', marginBottom: 8 }}>{newOrder.reference}</p>
              <p style={{ color: '#aaa', fontSize: 13, marginBottom: 4 }}>USDT: {Number(newOrder.amount_usdt).toFixed(2)}</p>
              <p style={{ color: '#aaa', fontSize: 13, marginBottom: 20 }}>Pay to: {newOrder.pay_to}</p>
              <button className="btn-gold" onClick={() => { setModal(null); setNewOrder(null); }}>Done</button>
            </div>
          ) : (
            <form onSubmit={createOrder}>
              <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 24, marginBottom: 20 }}>NEW ORDER</p>
              {[
                { label: 'Customer Name', key: 'customer_name', placeholder: 'John Mukisa' },
                { label: 'WhatsApp', key: 'customer_whatsapp', placeholder: '+256700123456' },
                { label: 'USDT Wallet (TRC20)', key: 'customer_wallet', placeholder: 'TXxxx...' },
                { label: 'Amount UGX', key: 'amount_ugx', placeholder: '75,000,000' },
                { label: 'Notes', key: 'notes', placeholder: 'Traveling to Yiwu June 1st' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 12 }}>
                  <label className="label" style={{ display: 'block', marginBottom: 6 }}>{f.label}</label>
                  <input className="input" placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} />
                </div>
              ))}
              <div style={{ marginBottom: 16 }}>
                <label className="label" style={{ display: 'block', marginBottom: 6 }}>Corridor</label>
                <select className="input" value={form.corridor_id} onChange={e => setForm(p => ({ ...p, corridor_id: e.target.value }))}>
                  {Object.entries(CORRIDORS).map(([id, c]) => <option key={id} value={id}>{c.flag} {c.name}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="submit" className="btn-gold" disabled={!form.amount_ugx}>Create Order</button>
                <button type="button" className="btn-outline" onClick={() => setModal(null)}>Cancel</button>
              </div>
            </form>
          )}
        </ModalOverlay>
      )}
    </div>
  );
}

function ModalOverlay({ children, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={onClose}>
      <div className="card" style={{ padding: 32, maxWidth: 500, width: '100%', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
