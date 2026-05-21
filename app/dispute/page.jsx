'use client';

import { useState } from 'react';

const ISSUE_TYPES = [
  { val: 'not_received',      label: 'Supplier not received payment' },
  { val: 'wrong_amount',      label: 'Wrong amount received by supplier' },
  { val: 'supplier_not_paid', label: 'Supplier claims not paid' },
  { val: 'delayed',           label: 'Payment significantly delayed' },
  { val: 'other',             label: 'Other issue' },
];

const WA = '256784277664';

export default function DisputePage() {
  const [form, setForm] = useState({
    reference: '',
    tx_hash: '',
    issue_type: '',
    expected_amount: '',
    received_amount: '',
    details: '',
    contact_email: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  function set(field) {
    return e => setForm(prev => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.reference || !form.issue_type || !form.contact_email) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/disputes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Submission failed');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  }

  if (status === 'success') {
    return (
      <section style={{ padding: '80px 24px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card-gold" style={{ maxWidth: 560, width: '100%', padding: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
          <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 32, letterSpacing: '0.04em', marginBottom: 12 }}>
            DISPUTE RECEIVED
          </p>
          <p style={{ color: '#aaa', lineHeight: 1.7, marginBottom: 24 }}>
            Coach has been notified immediately via Telegram. We will review your case and
            respond to <strong>{form.contact_email}</strong> within <strong>48 hours</strong>.
          </p>
          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: '12px 20px', marginBottom: 24, display: 'inline-block' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#D4A017', margin: 0 }}>
              Reference: {form.reference}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" className="btn-gold">
              WhatsApp Coach Now →
            </a>
            <a href="/" className="btn-outline">Back to Home</a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 60px' }}>
        <div className="hero-glow" />
        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
          <p className="label" style={{ margin: '0 0 12px' }}>Dispute Resolution</p>
          <h1
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(36px, 7vw, 60px)',
              lineHeight: 1.0,
              letterSpacing: '0.03em',
              marginBottom: 20,
            }}
          >
            PAYMENT ISSUE?<br />
            <span style={{ color: '#D4A017' }}>WE RESOLVE IN 48 HOURS.</span>
          </h1>
          <p style={{ color: '#aaa', fontSize: 16, lineHeight: 1.7, maxWidth: 560 }}>
            File a dispute below. Coach is notified immediately via Telegram. All disputes
            are resolved within 48 hours — refunded or corrected.
          </p>
        </div>
      </section>

      {/* ── SLA Banner ────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 32px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {[
              { icon: '⚡', title: 'Instant notification', desc: 'Coach alerted immediately via Telegram' },
              { icon: '⏱', title: '48-hour SLA', desc: 'Every dispute resolved within 48 hours' },
              { icon: '💰', title: 'Full refund option', desc: 'Refunded in UGX if not resolved' },
            ].map(item => (
              <div key={item.title} className="card" style={{ padding: '16px 20px', display: 'flex', gap: 12 }}>
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{item.title}</p>
                  <p style={{ color: '#666', fontSize: 12, lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form ─────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32, alignItems: 'start' }}>

          <form onSubmit={handleSubmit}>
            <div className="card" style={{ padding: 32 }}>
              <p className="label" style={{ marginBottom: 24 }}>Dispute details</p>

              {/* Reference */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ color: '#888', fontSize: 12, fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 8 }}>
                  ORDER REFERENCE *
                </label>
                <input
                  type="text"
                  className="input"
                  value={form.reference}
                  onChange={set('reference')}
                  placeholder="ATP-20260521-XXXX"
                  required
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
                <p style={{ color: '#555', fontSize: 11, marginTop: 4 }}>
                  Find this on your confirmation page or /track
                </p>
              </div>

              {/* TX hash */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ color: '#888', fontSize: 12, fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 8 }}>
                  BLOCKCHAIN TX HASH (if applicable)
                </label>
                <input
                  type="text"
                  className="input"
                  value={form.tx_hash}
                  onChange={set('tx_hash')}
                  placeholder="0x... or TxID from TRC20/BEP20..."
                  style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-mono)', fontSize: 12 }}
                />
              </div>

              {/* Issue type */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ color: '#888', fontSize: 12, fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 8 }}>
                  ISSUE TYPE *
                </label>
                <select
                  className="input"
                  value={form.issue_type}
                  onChange={set('issue_type')}
                  required
                  style={{ width: '100%', boxSizing: 'border-box' }}
                >
                  <option value="">Select issue type...</option>
                  {ISSUE_TYPES.map(t => (
                    <option key={t.val} value={t.val}>{t.label}</option>
                  ))}
                </select>
              </div>

              {/* Amounts */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={{ color: '#888', fontSize: 12, fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 8 }}>
                    EXPECTED AMOUNT
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={form.expected_amount}
                    onChange={set('expected_amount')}
                    placeholder="e.g. $500 or ¥50,000"
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ color: '#888', fontSize: 12, fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 8 }}>
                    RECEIVED AMOUNT
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={form.received_amount}
                    onChange={set('received_amount')}
                    placeholder="e.g. $450 or ¥45,000"
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Details */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ color: '#888', fontSize: 12, fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 8 }}>
                  ADDITIONAL DETAILS
                </label>
                <textarea
                  className="input"
                  value={form.details}
                  onChange={set('details')}
                  placeholder="Describe the issue in detail. Include supplier name, dates, and any communication..."
                  rows={4}
                  style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical', lineHeight: 1.6 }}
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ color: '#888', fontSize: 12, fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 8 }}>
                  YOUR EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  className="input"
                  value={form.contact_email}
                  onChange={set('contact_email')}
                  placeholder="you@example.com"
                  required
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              {status === 'error' && (
                <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '12px 16px', marginBottom: 20 }}>
                  <p style={{ color: '#ef4444', fontSize: 13 }}>⚠ {errorMsg || 'Submission failed. Please try WhatsApp instead.'}</p>
                </div>
              )}

              <button
                type="submit"
                className="btn-gold"
                disabled={status === 'loading'}
                style={{ width: '100%', opacity: status === 'loading' ? 0.6 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}
              >
                {status === 'loading' ? 'Submitting…' : 'Submit Dispute →'}
              </button>
            </div>
          </form>

          {/* ── Sidebar ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card-gold" style={{ padding: 24 }}>
              <p style={{ fontWeight: 700, marginBottom: 16 }}>Prefer WhatsApp?</p>
              <p style={{ color: '#aaa', fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                Fastest resolution — WhatsApp Coach directly with your reference and issue.
              </p>
              <a
                href={`https://wa.me/${WA}`}
                target="_blank"
                rel="noreferrer"
                className="btn-gold"
                style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
              >
                WhatsApp Coach →
              </a>
            </div>

            <div className="card" style={{ padding: 20 }}>
              <p className="label" style={{ marginBottom: 12 }}>Resolution outcomes</p>
              {[
                { icon: '✓', color: '#4CAF50', title: 'Payment corrected', desc: 'Coach sends the difference to supplier' },
                { icon: '↩', color: '#D4A017', title: 'Full refund', desc: 'UGX refunded via MTN MoMo' },
                { icon: '🔍', color: '#888',    title: 'Investigation', desc: 'Blockchain trace and supplier confirmation' },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                  <span style={{ color: item.color, fontSize: 14, marginTop: 2 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{item.title}</p>
                    <p style={{ color: '#666', fontSize: 12 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="card" style={{ padding: 20 }}>
              <p className="label" style={{ marginBottom: 8 }}>Find your reference</p>
              <p style={{ color: '#888', fontSize: 12, lineHeight: 1.6, marginBottom: 12 }}>
                Your reference number starts with <span style={{ fontFamily: 'var(--font-mono)', color: '#D4A017' }}>ATP-</span> and was shown when you placed your order.
              </p>
              <a href="/track" className="btn-outline" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', fontSize: 13, padding: '8px 16px' }}>
                Look Up My Order →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
