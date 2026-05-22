'use client';
import { useState, useEffect } from 'react';

const COUNTRIES = ['China', 'India', 'Turkey', 'UAE', 'Other'];
const CATEGORIES = ['Electronics', 'Textiles', 'Machinery', 'Pharma', 'Food', 'Construction', 'Cosmetics', 'General'];

function StarWidget({ supplierId, currentRating, reviewCount, onRated }) {
  const [hovered, setHovered] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function rate(stars) {
    if (submitting || done) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/suppliers/${supplierId}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: stars }),
      });
      if (res.ok) {
        const data = await res.json();
        setDone(true);
        onRated(data.community_rating, data.review_count);
      }
    } finally { setSubmitting(false); }
  }

  const display = hovered || Math.round(currentRating || 0);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
      {[1,2,3,4,5].map(n => (
        <button key={n}
          onMouseEnter={() => !done && setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => rate(n)}
          disabled={submitting || done}
          style={{ background: 'none', border: 'none', cursor: done ? 'default' : 'pointer', padding: 2, fontSize: 16, color: n <= display ? '#D4A017' : '#333', transition: 'color 0.1s' }}
        >★</button>
      ))}
      {currentRating
        ? <span style={{ fontSize: 12, color: '#666' }}>{Number(currentRating).toFixed(1)} ({reviewCount || 0})</span>
        : <span style={{ fontSize: 11, color: '#444' }}>Rate this supplier</span>}
      {done && <span style={{ fontSize: 11, color: '#4CAF50' }}>✓ Rated</span>}
    </div>
  );
}

function SupplierCard({ supplier: s, onRated }) {
  return (
    <div className={s.is_featured ? 'card-gold' : 'card'} style={{ padding: 24 }}>
      {s.is_featured && <p style={{ fontSize: 11, color: '#D4A017', marginBottom: 8 }}>⭐ FEATURED</p>}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
        <div>
          <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{s.name}</p>
          <p style={{ fontSize: 12, color: '#D4A017' }}>{s.category}</p>
        </div>
        {s.is_verified && (
          <span style={{ fontSize: 11, padding: '2px 8px', background: 'rgba(76,175,80,0.2)', color: '#4CAF50', borderRadius: 4 }}>✓ Verified</span>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#888' }}>
        {s.city && <p>📍 {s.city}{s.market_location ? ` — ${s.market_location}` : ''}</p>}
        {s.min_order_usd && <p>💵 Min order: ${Number(s.min_order_usd).toLocaleString()}</p>}
        <p>{s.accepts_usdt ? '✅ Accepts USDT' : '💱 T/T wire only'}</p>
      </div>
      <StarWidget
        supplierId={s.id}
        currentRating={s.community_rating}
        reviewCount={s.review_count}
        onRated={onRated}
      />
    </div>
  );
}

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('China');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', category: 'General', country: 'China', city: '',
    market_location: '', accepts_usdt: false, min_order_usd: '',
    submitted_by: '',
  });

  useEffect(() => {
    const country = tab === 'Other' ? '' : tab;
    setLoading(true);
    fetch(`/api/suppliers${country ? `?country=${encodeURIComponent(country)}` : ''}`)
      .then(r => r.json())
      .then(d => { setSuppliers(d.suppliers || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [tab]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, min_order_usd: form.min_order_usd ? Number(form.min_order_usd) : null }),
      });
      if (res.ok) {
        setSubmitted(true);
        setShowForm(false);
        setForm({ name: '', category: 'General', country: 'China', city: '', market_location: '', accepts_usdt: false, min_order_usd: '', submitted_by: '' });
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }}>
      <p className="label" style={{ marginBottom: 8 }}>Community Directory</p>
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px,6vw,64px)', letterSpacing: '0.03em', marginBottom: 12 }}>
        SUPPLIER DIRECTORY
      </h1>
      <p style={{ color: '#888', fontSize: 16, marginBottom: 40, maxWidth: 600 }}>
        Vetted suppliers trusted by Ugandan importers. Community-sourced. Accepts USDT payments.
      </p>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
        {COUNTRIES.map(c => (
          <button key={c} onClick={() => setTab(c)}
            style={{
              padding: '8px 20px', fontSize: 13, borderRadius: 6, cursor: 'pointer',
              border: `1px solid ${tab === c ? '#D4A017' : 'rgba(255,255,255,0.1)'}`,
              background: tab === c ? 'rgba(212,160,23,0.1)' : 'transparent',
              color: tab === c ? '#D4A017' : '#888',
            }}>
            {c === 'China' ? '🇨🇳' : c === 'India' ? '🇮🇳' : c === 'Turkey' ? '🇹🇷' : c === 'UAE' ? '🇦🇪' : '🌍'} {c}
          </button>
        ))}
        <button className="btn-gold" onClick={() => setShowForm(true)} style={{ marginLeft: 'auto', padding: '8px 20px', fontSize: 13 }}>
          + Submit Supplier
        </button>
      </div>

      {submitted && (
        <div style={{ padding: 16, background: 'rgba(76,175,80,0.1)', border: '1px solid rgba(76,175,80,0.3)', borderRadius: 8, marginBottom: 24, color: '#4CAF50' }}>
          ✓ Supplier submitted for review. Thank you for contributing!
        </div>
      )}

      {/* Suppliers grid */}
      {loading ? (
        <p style={{ color: '#555' }}>Loading suppliers...</p>
      ) : suppliers.length === 0 ? (
        <div className="card" style={{ padding: 48, textAlign: 'center' }}>
          <p style={{ color: '#555', marginBottom: 16 }}>No suppliers listed for {tab} yet.</p>
          <p style={{ color: '#888', fontSize: 14 }}>Know a great supplier? Submit them to the directory.</p>
          <button className="btn-gold" onClick={() => setShowForm(true)} style={{ marginTop: 16 }}>Submit First Supplier</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 20 }}>
          {suppliers.map(s => (
            <SupplierCard key={s.id} supplier={s} onRated={(rating, count) =>
              setSuppliers(prev => prev.map(x => x.id === s.id ? { ...x, community_rating: rating, review_count: count } : x))
            } />
          ))}
        </div>
      )}

      {/* Submit form modal */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          onClick={() => setShowForm(false)}>
          <div className="card" style={{ padding: 32, maxWidth: 480, width: '100%', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 24, marginBottom: 20 }}>SUBMIT A SUPPLIER</p>
            <form onSubmit={handleSubmit}>
              {[
                { label: 'Supplier Name *', key: 'name', placeholder: 'Guangzhou Electronics Ltd', required: true },
                { label: 'City', key: 'city', placeholder: 'Guangzhou' },
                { label: 'Market / Location', key: 'market_location', placeholder: 'Canton Fair Hall 1, Stand B23' },
                { label: 'Min Order (USD)', key: 'min_order_usd', placeholder: '500', type: 'number' },
                { label: 'Your contact (optional)', key: 'submitted_by', placeholder: 'WhatsApp or email' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 12 }}>
                  <label className="label" style={{ display: 'block', marginBottom: 6 }}>{f.label}</label>
                  <input className="input" type={f.type || 'text'} placeholder={f.placeholder} required={f.required}
                    value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} />
                </div>
              ))}
              <div style={{ marginBottom: 12 }}>
                <label className="label" style={{ display: 'block', marginBottom: 6 }}>Country</label>
                <select className="input" value={form.country} onChange={e => setForm(p => ({ ...p, country: e.target.value }))}>
                  {COUNTRIES.filter(c => c !== 'Other').map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label className="label" style={{ display: 'block', marginBottom: 6 }}>Category</label>
                <select className="input" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14 }}>
                  <input type="checkbox" checked={form.accepts_usdt} onChange={e => setForm(p => ({ ...p, accepts_usdt: e.target.checked }))} />
                  Accepts USDT directly
                </label>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="submit" className="btn-gold" disabled={submitting || !form.name}>{submitting ? 'Submitting...' : 'Submit'}</button>
                <button type="button" className="btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
