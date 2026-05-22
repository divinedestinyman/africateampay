'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';

const CSV_TEMPLATE = `recipient_name,contact,amount_ugx,network,settlement_method
John Katende,0771234567,500000,mtn,mtn_momo
Sarah Nabwire,0701234567,750000,airtel,airtel_momo
Peter Okello,0781234567,600000,mtn,mtn_momo`;

function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    const vals = line.split(',').map(v => v.trim());
    return Object.fromEntries(headers.map((h, i) => [h, vals[i] || '']));
  }).filter(r => r.recipient_name && r.amount_ugx);
}

export default function BusinessPage() {
  const [recipients, setRecipients] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '' });
  const [dragOver, setDragOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef();

  function handleFile(file) {
    const reader = new FileReader();
    reader.onload = e => setRecipients(parseCSV(e.target.result));
    reader.readAsText(file);
  }

  function handleDrop(e) {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (recipients.length < 3) { setError('Upload a CSV with at least 3 recipients'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/business/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipients,
          submitter_name: form.name,
          submitter_email: form.email,
          submitter_whatsapp: form.whatsapp,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Submission failed'); return; }
      setResult(data);
      setSubmitted(true);
    } catch { setError('Network error — please try again'); }
    finally { setLoading(false); }
  }

  if (submitted && result) {
    return (
      <div style={{ maxWidth: 600, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 40, marginBottom: 16 }}>✅</p>
        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 42, letterSpacing: '0.03em', marginBottom: 12 }}>ORDER RECEIVED</h1>
        <p style={{ color: '#999', marginBottom: 8 }}>{result.orders} transfer orders created.</p>
        <p style={{ color: '#666', fontSize: 14, marginBottom: 32 }}>
          Coach has been notified via Telegram. You'll receive instructions to send USDT to:<br />
          <span style={{ fontFamily: 'var(--font-mono)', color: '#D4A017', wordBreak: 'break-all' }}>{result.wallet_address}</span><br />
          on <strong>{result.chain?.toUpperCase()}</strong> network.
        </p>
        <Link href="/" className="btn-gold">Back to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 80px' }}>
      <p className="label" style={{ marginBottom: 12 }}>For Importers & Employers</p>
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px,6vw,60px)', letterSpacing: '0.03em', marginBottom: 8 }}>
        BULK PAYMENTS
      </h1>
      <p style={{ color: '#999', fontSize: 15, marginBottom: 8 }}>
        Paying multiple suppliers, staff, or recipients? Upload a CSV — we handle the rest.
      </p>

      {/* Pricing */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 40, flexWrap: 'wrap' }}>
        <div className="card" style={{ flex: 1, minWidth: 180, padding: '16px 20px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, color: '#D4A017' }}>0.8%</p>
          <p style={{ fontSize: 12, color: '#666' }}>Bulk rate (3+ recipients)</p>
        </div>
        <div className="card" style={{ flex: 1, minWidth: 180, padding: '16px 20px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, color: '#888', textDecoration: 'line-through' }}>1.0%</p>
          <p style={{ fontSize: 12, color: '#666' }}>Standard rate</p>
        </div>
        <div className="card" style={{ flex: 1, minWidth: 180, padding: '16px 20px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, color: '#4ade80' }}>Min 3</p>
          <p style={{ fontSize: 12, color: '#666' }}>Minimum recipients</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Contact info */}
        <div className="card" style={{ padding: '24px', marginBottom: 24 }}>
          <p className="label" style={{ marginBottom: 16 }}>Your Contact Info</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label className="label" style={{ display: 'block', marginBottom: 6 }}>Name</label>
              <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required style={{ width: '100%' }} />
            </div>
            <div>
              <label className="label" style={{ display: 'block', marginBottom: 6 }}>Email</label>
              <input className="input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required style={{ width: '100%' }} />
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <label className="label" style={{ display: 'block', marginBottom: 6 }}>WhatsApp</label>
              <input className="input" value={form.whatsapp} onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))} style={{ width: '100%' }} />
            </div>
          </div>
        </div>

        {/* CSV Upload */}
        <div className="card" style={{ padding: '24px', marginBottom: 24 }}>
          <p className="label" style={{ marginBottom: 8 }}>Upload CSV File</p>
          <p style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>
            Required columns: <code style={{ color: '#D4A017' }}>recipient_name, contact, amount_ugx, network</code>
          </p>
          <div
            onDrop={handleDrop}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => fileRef.current?.click()}
            style={{
              border: `2px dashed ${dragOver ? '#D4A017' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 12,
              padding: '32px 24px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
              marginBottom: 16,
            }}
          >
            <p style={{ fontSize: 14, color: '#666' }}>Drag & drop CSV here, or <span style={{ color: '#D4A017' }}>click to browse</span></p>
            <input ref={fileRef} type="file" accept=".csv,.txt" style={{ display: 'none' }}
              onChange={e => { if (e.target.files[0]) handleFile(e.target.files[0]); }} />
          </div>

          <details style={{ marginBottom: 0 }}>
            <summary style={{ cursor: 'pointer', fontSize: 13, color: '#D4A017', marginBottom: 8 }}>Show CSV template</summary>
            <pre style={{ background: '#111', padding: 12, borderRadius: 8, fontSize: 12, color: '#aaa', overflow: 'auto' }}>
              {CSV_TEMPLATE}
            </pre>
          </details>
        </div>

        {/* Preview */}
        {recipients.length > 0 && (
          <div className="card" style={{ padding: '24px', marginBottom: 24 }}>
            <p className="label" style={{ marginBottom: 16 }}>Preview — {recipients.length} recipients</p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #222' }}>
                    {['#', 'Name', 'Contact', 'Amount (UGX)', 'Network'].map(h => (
                      <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: '#666', fontWeight: 400 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recipients.map((r, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #111' }}>
                      <td style={{ padding: '8px 12px', color: '#555' }}>{i + 1}</td>
                      <td style={{ padding: '8px 12px', color: '#ccc' }}>{r.recipient_name}</td>
                      <td style={{ padding: '8px 12px', color: '#888', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{r.contact}</td>
                      <td style={{ padding: '8px 12px', color: '#D4A017', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{Number(r.amount_ugx).toLocaleString()}</td>
                      <td style={{ padding: '8px 12px', color: '#888' }}>{r.network || 'mtn'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: 12, fontSize: 13, color: '#555' }}>
              Total: UGX {recipients.reduce((s, r) => s + Number(r.amount_ugx || 0), 0).toLocaleString()}
            </p>
          </div>
        )}

        {error && (
          <p style={{ color: '#ff6b6b', fontSize: 14, padding: '10px 14px', background: 'rgba(255,107,107,0.08)', borderRadius: 8, marginBottom: 16 }}>
            {error}
          </p>
        )}

        <button className="btn-gold" type="submit" disabled={loading || recipients.length < 3} style={{ width: '100%', padding: 16 }}>
          {loading ? 'Submitting…' : `Submit ${recipients.length >= 3 ? recipients.length + ' orders' : '(min 3 recipients)'} →`}
        </button>
      </form>
    </div>
  );
}
