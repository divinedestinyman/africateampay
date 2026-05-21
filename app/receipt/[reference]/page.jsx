import { getOrderByReference } from '@/lib/db';
import { getExplorerUrl } from '@/lib/blockchain';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

function fmtDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleString('en-UG', { dateStyle: 'long', timeStyle: 'short' });
}

export default async function ReceiptPage({ params }) {
  const order = await getOrderByReference(params.reference);
  if (!order) notFound();

  const txHash = order.blockchain_tx_hash || order.tron_tx_hash;
  const explorerUrl = txHash ? getExplorerUrl(txHash, order.sending_chain || 'trc20') : null;
  const isInbound = order.direction === 'inbound';

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          .receipt { box-shadow: none !important; border: 1px solid #ccc !important; }
        }
        body { background: #0A0A0A; }
      `}</style>

      {/* Print button */}
      <div className="no-print" style={{ padding: '20px 24px', display: 'flex', gap: 12 }}>
        <button onClick={() => window.print()}
          style={{ padding: '10px 24px', background: '#D4A017', color: '#000', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 700 }}>
          Print / Save as PDF
        </button>
        <a href={`/track/${order.reference}`}
          style={{ padding: '10px 24px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, color: '#aaa', textDecoration: 'none' }}>
          ← Back to Tracking
        </a>
      </div>

      <div className="receipt" style={{
        maxWidth: 640, margin: '0 auto 60px', padding: 40,
        background: '#fff', color: '#111',
        borderRadius: 12, fontFamily: 'Georgia, serif',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 32, borderBottom: '2px solid #D4A017', paddingBottom: 20 }}>
          <div>
            <p style={{ fontSize: 22, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>
              AFRICA<span style={{ color: '#D4A017' }}>TEAM</span>PAY
            </p>
            <p style={{ fontSize: 12, color: '#888' }}>africateampay.vercel.app</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>TRANSFER RECEIPT</p>
            <p style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: '#D4A017' }}>{order.reference}</p>
            <p style={{ fontSize: 12, color: '#888', marginTop: 4 }}>{fmtDate(order.created_at)}</p>
          </div>
        </div>

        {/* Status */}
        <div style={{ marginBottom: 24, padding: '8px 14px', background: order.status === 'completed' ? '#e8f5e9' : '#fff3e0', borderRadius: 6, display: 'inline-block' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: order.status === 'completed' ? '#2e7d32' : '#e65100' }}>
            Status: {order.status?.toUpperCase().replace(/_/g, ' ')}
          </p>
        </div>

        {/* Transfer details */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28, fontSize: 14 }}>
          <tbody>
            {[
              { label: 'Direction', value: isInbound ? 'Inbound (abroad → Uganda)' : 'Outbound (Uganda → abroad)' },
              isInbound
                ? { label: 'Sender amount', value: `${Number(order.sender_amount).toLocaleString()} ${order.sender_currency}` }
                : { label: 'Amount paid (UGX)', value: `UGX ${Number(order.amount_ugx).toLocaleString()}` },
              { label: 'USDT amount', value: `${Number(order.amount_usdt).toFixed(2)} USDT` },
              { label: 'Network', value: (order.sending_chain || 'TRC20').toUpperCase() },
              order.usdt_rate ? { label: 'Rate (UGX/USDT)', value: Number(order.usdt_rate).toLocaleString() } : null,
              isInbound
                ? { label: 'Recipient', value: order.recipient_name || '—' }
                : { label: 'Sender', value: order.sender_name || order.customer_name || '—' },
              isInbound && order.settlement_method ? { label: 'Payout method', value: order.settlement_method.replace(/_/g, ' ') } : null,
              order.completed_at ? { label: 'Completed at', value: fmtDate(order.completed_at) } : null,
            ].filter(Boolean).map(row => (
              <tr key={row.label} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px 0', color: '#666', width: '40%' }}>{row.label}</td>
                <td style={{ padding: '10px 0', fontWeight: 600, fontFamily: 'monospace' }}>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TX hash */}
        {txHash && (
          <div style={{ background: '#f9f9f9', border: '1px solid #eee', borderRadius: 8, padding: 16, marginBottom: 24 }}>
            <p style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>BLOCKCHAIN TRANSACTION</p>
            <p style={{ fontFamily: 'monospace', fontSize: 11, wordBreak: 'break-all', marginBottom: 8 }}>{txHash}</p>
            {explorerUrl && (
              <p style={{ fontSize: 12 }}>
                Verify: <span style={{ color: '#1565C0' }}>{explorerUrl}</span>
              </p>
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{ borderTop: '1px solid #eee', paddingTop: 20, marginTop: 8, fontSize: 12, color: '#999', textAlign: 'center' }}>
          <p>This receipt is auto-generated by AfricaTeamPay. For disputes: africateampay.vercel.app/dispute</p>
          <p style={{ marginTop: 6 }}>Reference: {order.reference} | Generated: {new Date().toLocaleString('en-UG')}</p>
        </div>
      </div>
    </>
  );
}
