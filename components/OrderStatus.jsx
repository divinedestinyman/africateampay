import { formatDate } from '@/lib/utils';

const STEPS = [
  { key: 'pending', label: 'Order Received', desc: 'Your order has been logged in our system.' },
  { key: 'payment_received', label: 'Payment Confirmed', desc: 'Coach has confirmed your UGX payment.' },
  { key: 'usdt_sent', label: 'USDT Sent', desc: 'USDT has been sent to your wallet.' },
  { key: 'completed', label: 'Completed', desc: 'Transfer complete. Enjoy!' },
];

const ORDER_INDEX = { pending: 0, payment_received: 1, usdt_sent: 2, completed: 3 };

export default function OrderStatus({ order }) {
  const current = ORDER_INDEX[order.status] ?? 0;

  return (
    <div>
      {/* Header */}
      <div className="card-gold" style={{ padding: 20, marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p className="label" style={{ marginBottom: 4 }}>Reference</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color: '#D4A017' }}>
              {order.reference}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p className="label" style={{ marginBottom: 4 }}>Amount</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 16 }}>
              UGX {Number(order.amount_ugx).toLocaleString()}
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#D4A017' }}>
              → {Number(order.amount_usdt).toFixed(2)} USDT
            </p>
          </div>
        </div>
      </div>

      {/* Steps */}
      {STEPS.map((step, i) => {
        const done = i <= current;
        const active = i === current;
        return (
          <div key={step.key} style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
            {/* Dot */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: done ? '#D4A017' : 'var(--surface-2)',
                  border: `2px solid ${done ? '#D4A017' : 'rgba(255,255,255,0.1)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  color: done ? '#000' : '#555',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {done && !active ? '✓' : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    width: 2,
                    flex: 1,
                    minHeight: 24,
                    background: i < current ? '#D4A017' : 'rgba(255,255,255,0.06)',
                    marginTop: 4,
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div style={{ paddingTop: 4 }}>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                  color: done ? '#F5F5F5' : '#555',
                  marginBottom: 2,
                }}
              >
                {step.label}
              </p>
              {active && (
                <p style={{ fontSize: 13, color: '#888' }}>{step.desc}</p>
              )}
              {step.key === 'usdt_sent' && order.tron_tx_hash && (
                <a
                  href={`https://tronscan.org/#/transaction/${order.tron_tx_hash}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 12, color: '#D4A017', fontFamily: 'var(--font-mono)' }}
                >
                  View on TronScan →
                </a>
              )}
              {step.key === 'payment_received' && order.payment_confirmed_at && (
                <p style={{ fontSize: 12, color: '#555' }}>{formatDate(order.payment_confirmed_at)}</p>
              )}
              {step.key === 'usdt_sent' && order.usdt_sent_at && (
                <p style={{ fontSize: 12, color: '#555' }}>{formatDate(order.usdt_sent_at)}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
