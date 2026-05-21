'use client';
import { useState, useEffect, useCallback } from 'react';
import { formatDate, formatUGX, STATUS_LABELS, CORRIDORS } from '@/lib/utils';

function authHeader() {
  const m = typeof document !== 'undefined' ? document.cookie.match(/admin_auth=([^;]+)/) : null;
  return m ? { 'x-admin-token': m[1] } : {};
}

const DISPUTE_STATUS_COLORS = {
  open:     '#FFA500',
  resolved: '#4CAF50',
  refunded: '#2196F3',
  need_info: '#9C27B0',
};

const ISSUE_LABELS = {
  wrong_amount:      'Wrong amount',
  not_received:      'Not received',
  supplier_not_paid: 'Supplier not paid',
  delayed:           'Delayed',
  other:             'Other',
};

const STATUS_FLOW = {
  pending:          ['payment_received', 'cancelled'],
  rate_locked:      ['payment_received', 'cancelled'],
  payment_received: ['converting', 'sending', 'completed', 'refunded'],
  converting:       ['sending', 'failed', 'refunded'],
  sending:          ['completed', 'failed'],
  completed:        [],
  failed:           ['refunded'],
  refunded:         [],
  disputed:         ['completed', 'refunded', 'cancelled'],
  cancelled:        [],
  usdt_sent:        ['completed'],
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [txHash, setTxHash] = useState('');
  const [newOrder, setNewOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [form, setForm] = useState({
    customer_name: '', customer_whatsapp: '', customer_wallet: '',
    corridor_id: 'china', direction: 'outbound', amount_ugx: '',
    sending_chain: 'trc20', settlement_method: '', notes: '',
  });

  // Disputes state
  const [disputes, setDisputes] = useState([]);
  const [disputeFilter, setDisputeFilter] = useState('open');
  const [disputeModal, setDisputeModal] = useState(null);
  const [adminResponse, setAdminResponse] = useState('');
  const [disputesLoading, setDisputesLoading] = useState(false);

  const load = useCallback(async () => {
    const url = filterStatus ? `/api/orders?status=${filterStatus}` : '/api/orders';
    const res = await fetch(url);
    const data = await res.json();
    setOrders(data.orders || []);
    setLoading(false);
  }, [filterStatus]);

  const loadDisputes = useCallback(async () => {
    setDisputesLoading(true);
    const url = disputeFilter ? `/api/disputes?status=${disputeFilter}` : '/api/disputes';
    const res = await fetch(url, { headers: authHeader() });
    const data = await res.json();
    setDisputes(data.disputes || []);
    setDisputesLoading(false);
  }, [disputeFilter]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { if (activeTab === 'disputes') loadDisputes(); }, [activeTab, loadDisputes]);

  async function updateStatus(orderId, status, extra = {}) {
    await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify({ status, ...extra }),
    });
    setModal(null);
    setTxHash('');
    load();
  }

  async function resolveDispute(id, status) {
    await fetch(`/api/disputes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify({ status, admin_response: adminResponse || undefined }),
    });
    setDisputeModal(null);
    setAdminResponse('');
    loadDisputes();
  }

  async function createOrder(e) {
    e.preventDefault();
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, amount_ugx: parseInt(form.amount_ugx.replace(/,/g, '')) }),
    });
    const data = await res.json();
    setNewOrder(data.order);
    setForm({
      customer_name: '', customer_whatsapp: '', customer_wallet: '',
      corridor_id: 'china', direction: 'outbound', amount_ugx: '',
      sending_chain: 'trc20', settlement_method: '', notes: '',
    });
    load();
  }

  // Stats
  const thisMonth = orders.filter(o => new Date(o.created_at).getMonth() === new Date().getMonth());
  const totalUgx = thisMonth.reduce((s, o) => s + (Number(o.amount_ugx) || 0), 0);
  const totalUsdt = orders
    .filter(o => o.status === 'usdt_sent' || o.status === 'completed')
    .reduce((s, o) => s + (Number(o.amount_usdt) || 0), 0);
  const totalFees = thisMonth.reduce((s, o) => s + (Number(o.fee_ugx) || 0), 0);
  const pendingCount = orders.filter(o => o.status === 'pending' || o.status === 'payment_received').length;

  return (
    <div style={{ maxWidth: 1300, margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <p className="label" style={{ marginBottom: 4 }}>Coach Dashboard</p>
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 36, letterSpacing: '0.04em' }}>
            AFRICA<span style={{ color: '#D4A017' }}>TEAM</span>PAY ADMIN
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-gold" style={{ padding: '10px 18px', fontSize: 13 }} onClick={() => { setModal({ type: 'new' }); setNewOrder(null); }}>
            + New Order
          </button>
          <button className="btn-outline" style={{ padding: '10px 18px', fontSize: 13 }} onClick={async () => {
            await fetch('/api/admin/login', { method: 'DELETE' });
            location.href = '/admin/login';
          }}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Needs Attention', value: pendingCount, gold: pendingCount > 0 },
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

      {/* Tab switcher */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 0 }}>
        {['orders', 'disputes'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 20px', fontSize: 13, cursor: 'pointer', border: 'none',
              borderBottom: activeTab === tab ? '2px solid #D4A017' : '2px solid transparent',
              background: 'transparent',
              color: activeTab === tab ? '#D4A017' : '#666',
              fontWeight: activeTab === tab ? 600 : 400,
              textTransform: 'capitalize',
              marginBottom: -1,
            }}
          >
            {tab === 'disputes' && disputes.filter(d => d.status === 'open').length > 0
              ? `Disputes (${disputes.filter(d => d.status === 'open').length})`
              : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* ── DISPUTES TAB ── */}
      {activeTab === 'disputes' && (
        <>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {[
              { v: 'open', label: 'Open' },
              { v: 'resolved', label: 'Resolved' },
              { v: 'refunded', label: 'Refunded' },
              { v: 'need_info', label: 'Need Info' },
              { v: '', label: 'All' },
            ].map(({ v, label }) => (
              <button
                key={label}
                onClick={() => setDisputeFilter(v)}
                style={{
                  padding: '6px 14px', fontSize: 12, borderRadius: 6, cursor: 'pointer',
                  border: `1px solid ${disputeFilter === v ? '#D4A017' : 'rgba(255,255,255,0.1)'}`,
                  background: disputeFilter === v ? 'rgba(212,160,23,0.1)' : 'transparent',
                  color: disputeFilter === v ? '#D4A017' : '#666',
                }}
              >
                {label}
              </button>
            ))}
            <button className="btn-outline" style={{ padding: '6px 14px', fontSize: 12, marginLeft: 'auto' }} onClick={loadDisputes}>
              Refresh
            </button>
          </div>

          {disputesLoading ? (
            <p style={{ color: '#555' }}>Loading disputes…</p>
          ) : disputes.length === 0 ? (
            <div className="card" style={{ padding: 40, textAlign: 'center' }}>
              <p style={{ color: '#555' }}>No disputes in this filter.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    {['Reference', 'Issue', 'Expected', 'Received', 'Contact', 'Filed', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#555', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 400, whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {disputes.map(d => {
                    const color = DISPUTE_STATUS_COLORS[d.status] || '#888';
                    return (
                      <tr key={d.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', color: '#D4A017', whiteSpace: 'nowrap' }}>{d.order_reference || '—'}</td>
                        <td style={{ padding: '12px', fontSize: 12 }}>{ISSUE_LABELS[d.issue_type] || d.issue_type}</td>
                        <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{d.expected_amount || '—'}</td>
                        <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{d.received_amount || '—'}</td>
                        <td style={{ padding: '12px', fontSize: 12, color: '#aaa' }}>{d.contact_email || '—'}</td>
                        <td style={{ padding: '12px', color: '#555', fontSize: 11, whiteSpace: 'nowrap' }}>{formatDate(d.created_at)}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ fontSize: 12, color, whiteSpace: 'nowrap', fontWeight: 600 }}>{d.status}</span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          {d.status === 'open' || d.status === 'need_info' ? (
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                              <button
                                className="btn-gold"
                                style={{ padding: '5px 10px', fontSize: 11, whiteSpace: 'nowrap' }}
                                onClick={() => setDisputeModal({ dispute: d, action: 'resolved' })}
                              >
                                Resolve
                              </button>
                              <button
                                className="btn-outline"
                                style={{ padding: '5px 10px', fontSize: 11, whiteSpace: 'nowrap' }}
                                onClick={() => setDisputeModal({ dispute: d, action: 'refunded' })}
                              >
                                Refund
                              </button>
                              <button
                                className="btn-outline"
                                style={{ padding: '5px 10px', fontSize: 11, whiteSpace: 'nowrap', color: '#9C27B0', borderColor: '#9C27B040' }}
                                onClick={() => resolveDispute(d.id, 'need_info')}
                              >
                                Need Info
                              </button>
                            </div>
                          ) : (
                            <span style={{ fontSize: 11, color: '#444' }}>—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Dispute resolve modal */}
          {disputeModal && (
            <ModalOverlay onClose={() => setDisputeModal(null)}>
              <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 24, marginBottom: 4 }}>
                {disputeModal.action === 'refunded' ? 'CONFIRM REFUND' : 'RESOLVE DISPUTE'}
              </p>
              <p style={{ color: '#888', fontSize: 13, marginBottom: 20 }}>
                {disputeModal.dispute.order_reference} — {ISSUE_LABELS[disputeModal.dispute.issue_type] || disputeModal.dispute.issue_type}
              </p>
              <label className="label" style={{ display: 'block', marginBottom: 8 }}>
                Admin Response (optional — sent to customer)
              </label>
              <textarea
                className="input"
                rows={3}
                placeholder="e.g. Refund of 150 USDT has been processed to your wallet."
                value={adminResponse}
                onChange={e => setAdminResponse(e.target.value)}
                style={{ marginBottom: 16, fontSize: 13, resize: 'vertical' }}
              />
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  className="btn-gold"
                  onClick={() => resolveDispute(disputeModal.dispute.id, disputeModal.action)}
                >
                  Confirm {disputeModal.action === 'refunded' ? 'Refund' : 'Resolution'}
                </button>
                <button className="btn-outline" onClick={() => setDisputeModal(null)}>Cancel</button>
              </div>
            </ModalOverlay>
          )}
        </>
      )}

      {/* ── ORDERS TAB ── */}
      {activeTab === 'orders' && (<>
      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {['', 'pending', 'payment_received', 'completed', 'cancelled'].map(s => (
          <button
            key={s || 'all'}
            onClick={() => setFilterStatus(s)}
            style={{
              padding: '6px 14px', fontSize: 12, borderRadius: 6, cursor: 'pointer',
              border: `1px solid ${filterStatus === s ? '#D4A017' : 'rgba(255,255,255,0.1)'}`,
              background: filterStatus === s ? 'rgba(212,160,23,0.1)' : 'transparent',
              color: filterStatus === s ? '#D4A017' : '#666',
            }}
          >
            {s || 'All'}
          </button>
        ))}
      </div>

      {/* Orders table */}
      {loading ? (
        <p style={{ color: '#555' }}>Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="card" style={{ padding: 40, textAlign: 'center' }}>
          <p style={{ color: '#555' }}>No orders yet.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {['Reference', 'Dir', 'Customer', 'Amount UGX', 'USDT', 'Corridor', 'Chain', 'Status', 'Created', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#555', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 400, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(o => {
                const sl = STATUS_LABELS[o.status] || { label: o.status, color: '#888' };
                const cor = CORRIDORS[o.corridor_id] || { flag: '?', name: o.corridor_id };
                const nextStatuses = STATUS_FLOW[o.status] || [];
                const txLink = o.tron_tx_hash || o.blockchain_tx_hash;
                return (
                  <tr key={o.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', color: '#D4A017', whiteSpace: 'nowrap' }}>{o.reference}</td>
                    <td style={{ padding: '12px', fontSize: 11, color: o.direction === 'inbound' ? '#4CAF50' : '#2196F3' }}>
                      {o.direction === 'inbound' ? '↓ IN' : '↑ OUT'}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ whiteSpace: 'nowrap' }}>{o.customer_name || '—'}</div>
                      {o.customer_whatsapp && (
                        <a href={`https://wa.me/${o.customer_whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: '#4CAF50' }}>WA ↗</a>
                      )}
                    </td>
                    <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: 12, whiteSpace: 'nowrap' }}>
                      {Number(o.amount_ugx).toLocaleString()}
                    </td>
                    <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#D4A017', whiteSpace: 'nowrap' }}>
                      {Number(o.amount_usdt).toFixed(2)}
                    </td>
                    <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>{cor.flag} {cor.name}</td>
                    <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#888' }}>
                      {o.sending_chain || 'trc20'}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ fontSize: 12, color: sl.color, whiteSpace: 'nowrap' }}>{sl.label}</span>
                    </td>
                    <td style={{ padding: '12px', color: '#555', fontSize: 11, whiteSpace: 'nowrap' }}>{formatDate(o.created_at)}</td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {/* Quick-action buttons for common transitions */}
                        {o.status === 'pending' && (
                          <button className="btn-gold" style={{ padding: '6px 10px', fontSize: 11, whiteSpace: 'nowrap' }} onClick={() => updateStatus(o.id, 'payment_received')}>
                            ✓ Paid
                          </button>
                        )}
                        {(o.status === 'payment_received' || o.status === 'converting') && (
                          <button className="btn-gold" style={{ padding: '6px 10px', fontSize: 11, whiteSpace: 'nowrap' }} onClick={() => { setModal({ type: 'send', order: o }); setTxHash(''); }}>
                            Send USDT
                          </button>
                        )}
                        {nextStatuses.filter(s => !['payment_received', 'completed'].includes(s) || o.status !== 'pending').length > 0 && (
                          <button className="btn-outline" style={{ padding: '6px 10px', fontSize: 11, whiteSpace: 'nowrap' }} onClick={() => setModal({ type: 'status', order: o })}>
                            Status…
                          </button>
                        )}
                        {txLink && (
                          <a href={`https://tronscan.org/#/transaction/${txLink}`} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: '#D4A017', padding: '6px 0', whiteSpace: 'nowrap' }}>
                            TX ↗
                          </a>
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

      </>)}

      {/* Modal: Send USDT */}
      {modal?.type === 'send' && (
        <ModalOverlay onClose={() => setModal(null)}>
          <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 24, marginBottom: 4 }}>SEND USDT</p>
          <p style={{ color: '#888', fontSize: 13, marginBottom: 4 }}>
            {modal.order.reference} — {Number(modal.order.amount_usdt).toFixed(2)} USDT
          </p>
          <p style={{ color: '#555', fontSize: 12, marginBottom: 20 }}>
            Chain: {modal.order.sending_chain || 'trc20'} | Wallet: {modal.order.customer_wallet || 'Not provided'}
          </p>
          <label className="label" style={{ display: 'block', marginBottom: 8 }}>Blockchain TX Hash</label>
          <input
            className="input"
            placeholder="Paste transaction hash"
            value={txHash}
            onChange={e => setTxHash(e.target.value)}
            style={{ marginBottom: 16, fontFamily: 'var(--font-mono)', fontSize: 13 }}
          />
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn-gold" disabled={!txHash.trim()} onClick={() => updateStatus(modal.order.id, 'completed', { blockchain_tx_hash: txHash.trim() })}>
              Mark Complete
            </button>
            <button className="btn-outline" disabled={!txHash.trim()} onClick={() => updateStatus(modal.order.id, 'usdt_sent', { blockchain_tx_hash: txHash.trim() })}>
              Mark Sent
            </button>
            <button className="btn-outline" onClick={() => setModal(null)}>Cancel</button>
          </div>
        </ModalOverlay>
      )}

      {/* Modal: Status change */}
      {modal?.type === 'status' && (
        <ModalOverlay onClose={() => setModal(null)}>
          <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 24, marginBottom: 4 }}>UPDATE STATUS</p>
          <p style={{ color: '#888', fontSize: 13, marginBottom: 20 }}>{modal.order.reference} — currently: {modal.order.status}</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {(STATUS_FLOW[modal.order.status] || []).map(s => {
              const sl = STATUS_LABELS[s] || { label: s, color: '#888' };
              return (
                <button key={s} onClick={() => updateStatus(modal.order.id, s)}
                  style={{ padding: '8px 16px', fontSize: 13, borderRadius: 6, border: `1px solid ${sl.color}`, background: 'transparent', color: sl.color, cursor: 'pointer' }}>
                  → {sl.label}
                </button>
              );
            })}
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
              <p style={{ color: '#aaa', fontSize: 13, marginBottom: 4 }}>Chain: {newOrder.sending_chain || 'trc20'}</p>
              {newOrder.whatsapp_coach && (
                <a href={newOrder.whatsapp_coach} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: '#4CAF50' }}>
                  Share on WhatsApp ↗
                </a>
              )}
              <div style={{ marginTop: 20 }}>
                <button className="btn-gold" onClick={() => { setModal(null); setNewOrder(null); }}>Done</button>
              </div>
            </div>
          ) : (
            <form onSubmit={createOrder}>
              <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 24, marginBottom: 20 }}>NEW ORDER</p>
              {[
                { label: 'Customer Name', key: 'customer_name', placeholder: 'John Mukisa' },
                { label: 'WhatsApp', key: 'customer_whatsapp', placeholder: '+256700123456' },
                { label: 'USDT Wallet', key: 'customer_wallet', placeholder: 'TXxxx...' },
                { label: 'Amount UGX', key: 'amount_ugx', placeholder: '75,000,000', required: true },
                { label: 'Notes', key: 'notes', placeholder: 'Traveling to Yiwu June 1st' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 12 }}>
                  <label className="label" style={{ display: 'block', marginBottom: 6 }}>{f.label}</label>
                  <input className="input" placeholder={f.placeholder} required={f.required} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} />
                </div>
              ))}
              <div style={{ marginBottom: 12 }}>
                <label className="label" style={{ display: 'block', marginBottom: 6 }}>Corridor</label>
                <select className="input" value={form.corridor_id} onChange={e => setForm(p => ({ ...p, corridor_id: e.target.value }))}>
                  {Object.entries(CORRIDORS).map(([id, c]) => (
                    <option key={id} value={id}>{c.flag} {c.name} ({c.direction})</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label className="label" style={{ display: 'block', marginBottom: 6 }}>Direction</label>
                <select className="input" value={form.direction} onChange={e => setForm(p => ({ ...p, direction: e.target.value }))}>
                  <option value="outbound">↑ Outbound (Uganda → abroad)</option>
                  <option value="inbound">↓ Inbound (abroad → Uganda)</option>
                </select>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label className="label" style={{ display: 'block', marginBottom: 6 }}>Sending Chain</label>
                <select className="input" value={form.sending_chain} onChange={e => setForm(p => ({ ...p, sending_chain: e.target.value }))}>
                  <option value="trc20">TRC20 (Tron) — $0.01 ⭐</option>
                  <option value="bep20">BEP20 (BSC) — ~$0.05</option>
                  <option value="polygon">Polygon — ~$0.01</option>
                  <option value="solana">Solana — ~$0.001</option>
                  <option value="erc20">ERC20 (Ethereum) — $3–15</option>
                  <option value="base">Base (USDC) — ~$0.001</option>
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
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={onClose}
    >
      <div className="card" style={{ padding: 32, maxWidth: 520, width: '100%', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
