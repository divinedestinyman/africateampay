'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { STATUS_LABELS, CHAINS, formatDate } from '@/lib/utils';

const TIMELINE = [
  {
    key: 'rate_locked',
    label: 'Rate Locked',
    desc: 'Your rate is locked for 30 minutes. Send USDT to the wallet address below.',
  },
  {
    key: 'payment_received',
    label: 'Payment Confirmed',
    desc: 'Coach has confirmed receipt of your payment.',
  },
  {
    key: 'converting',
    label: 'Processing',
    desc: 'Your transfer is being processed.',
  },
  {
    key: 'sending',
    label: 'Sending',
    desc: 'Funds are on their way to the recipient.',
  },
  {
    key: 'completed',
    label: 'Completed',
    desc: 'Transfer complete.',
  },
];

const STEP_ORDER = { rate_locked: 0, payment_received: 1, converting: 2, sending: 3, completed: 4 };

function getStepIndex(status) {
  if (status === 'pending') return 0;
  return STEP_ORDER[status] ?? -1;
}

const TERMINAL_STATES = new Set(['cancelled', 'failed', 'refunded', 'disputed']);

function useCountdown(expiresAt) {
  const [secs, setSecs] = useState(null);

  useEffect(() => {
    if (!expiresAt) return;
    const tick = () => {
      const diff = Math.floor((new Date(expiresAt) - Date.now()) / 1000);
      setSecs(diff);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [expiresAt]);

  return secs;
}

function formatCountdown(secs) {
  if (secs === null) return null;
  if (secs <= 0) return null;
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function TrackReferencePage({ params }) {
  const { reference } = params;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [sinceRefresh, setSinceRefresh] = useState(0);
  const refreshRef = useRef(null);
  const sinceRef = useRef(null);
  const secsRemaining = useCountdown(order?.rate_lock_expires_at);

  const fetchOrder = useCallback(async () => {
    try {
      const res = await fetch(`/api/orders?ref=${encodeURIComponent(reference)}`);
      const data = await res.json();
      if (data.orders?.length) {
        setOrder(data.orders[0]);
        setError('');
      } else {
        setError('Order not found.');
      }
    } catch {
      setError('Unable to load order. Check your connection.');
    } finally {
      setLoading(false);
      setSinceRefresh(0);
    }
  }, [reference]);

  useEffect(() => {
    fetchOrder();
    refreshRef.current = setInterval(fetchOrder, 30000);
    sinceRef.current = setInterval(() => setSinceRefresh(s => s + 1), 1000);
    return () => {
      clearInterval(refreshRef.current);
      clearInterval(sinceRef.current);
    };
  }, [fetchOrder]);

  async function copyWallet() {
    const addr = order?.wallet_address;
    if (!addr) return;
    try {
      await navigator.clipboard.writeText(addr);
    } catch {
      const el = document.createElement('textarea');
      el.value = addr;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const isTerminal = order && TERMINAL_STATES.has(order.status);
  const needsPayment = order && (order.status === 'rate_locked' || order.status === 'pending');
  const isCompleted = order?.status === 'completed';
  const currentStep = order ? getStepIndex(order.status) : -1;
  const isInbound = order?.direction === 'inbound';
  const countdownExpired = secsRemaining !== null && secsRemaining <= 0;

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '60px 24px' }}>
      {/* Header */}
      <p className="label" style={{ marginBottom: 12 }}>Order Tracking</p>
      <h1
        style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(36px,6vw,56px)',
          letterSpacing: '0.03em',
          marginBottom: 8,
        }}
      >
        {reference}
      </h1>

      {/* Refresh indicator */}
      {!loading && (
        <p style={{ fontSize: 12, color: '#555', marginBottom: 32 }}>
          Last checked {sinceRefresh === 0 ? 'just now' : `${sinceRefresh}s ago`} · auto-refreshes every 30s
          <button
            onClick={fetchOrder}
            style={{
              marginLeft: 10,
              background: 'none',
              border: 'none',
              color: '#D4A017',
              cursor: 'pointer',
              fontSize: 12,
              padding: 0,
            }}
          >
            Refresh now
          </button>
        </p>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#555' }}>
          Loading order…
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div
          style={{
            padding: 16,
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: 8,
            color: '#ef4444',
            fontSize: 14,
            marginBottom: 24,
          }}
        >
          {error}
          <br />
          <Link href="/track" style={{ color: '#D4A017', fontSize: 13 }}>
            ← Try a different reference
          </Link>
        </div>
      )}

      {/* Order loaded */}
      {order && !loading && (
        <>
          {/* Status badge */}
          <div style={{ marginBottom: 28 }}>
            {(() => {
              const s = STATUS_LABELS[order.status] || { label: order.status, color: '#888' };
              return (
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 600,
                    background: `${s.color}22`,
                    color: s.color,
                    border: `1px solid ${s.color}44`,
                  }}
                >
                  {s.label}
                </span>
              );
            })()}
          </div>

          {/* Amount summary card */}
          <div
            className="card"
            style={{
              padding: 20,
              marginBottom: 24,
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <p className="label" style={{ marginBottom: 4 }}>
                {isInbound ? 'You sent' : 'You paid'}
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 18 }}>
                {isInbound
                  ? `${Number(order.sender_amount).toLocaleString()} ${order.sender_currency}`
                  : `UGX ${Number(order.amount_ugx).toLocaleString()}`}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className="label" style={{ marginBottom: 4 }}>USDT amount</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: '#D4A017' }}>
                {Number(order.amount_usdt).toFixed(2)} USDT
              </p>
              <p style={{ fontSize: 12, color: '#555' }}>
                via {CHAINS[order.sending_chain]?.label || order.sending_chain || 'TRC20'}
              </p>
            </div>
          </div>

          {/* Rate lock / wallet section (shown only when payment is pending) */}
          {needsPayment && (
            <div
              className="card-gold"
              style={{ padding: 20, marginBottom: 24 }}
            >
              <p className="label" style={{ marginBottom: 12 }}>
                {isInbound ? 'Send USDT to this address' : 'Await payment confirmation'}
              </p>

              {order.wallet_address && (
                <>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid rgba(212,160,23,0.2)',
                      borderRadius: 8,
                      padding: '12px 16px',
                      marginBottom: 10,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 13,
                        flex: 1,
                        wordBreak: 'break-all',
                        color: '#F5F5F5',
                      }}
                    >
                      {order.wallet_address}
                    </p>
                    <button
                      onClick={copyWallet}
                      className="btn-gold"
                      style={{ padding: '6px 14px', fontSize: 13, flexShrink: 0 }}
                    >
                      {copied ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>

                  <p style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>
                    Send exactly{' '}
                    <strong style={{ color: '#D4A017', fontFamily: 'var(--font-mono)' }}>
                      {Number(order.amount_usdt).toFixed(2)} USDT
                    </strong>{' '}
                    on{' '}
                    <strong style={{ color: '#F5F5F5' }}>
                      {CHAINS[order.sending_chain]?.label || order.sending_chain}
                    </strong>{' '}
                    using reference <strong style={{ fontFamily: 'var(--font-mono)', color: '#D4A017' }}>{order.reference}</strong> in memo if supported.
                  </p>
                </>
              )}

              {/* Countdown */}
              {order.rate_lock_expires_at && (
                <div
                  style={{
                    padding: '10px 16px',
                    borderRadius: 8,
                    background: countdownExpired
                      ? 'rgba(239,68,68,0.1)'
                      : 'rgba(212,160,23,0.08)',
                    border: `1px solid ${countdownExpired ? 'rgba(239,68,68,0.3)' : 'rgba(212,160,23,0.2)'}`,
                  }}
                >
                  {countdownExpired ? (
                    <p style={{ fontSize: 13, color: '#ef4444' }}>
                      ⚠ Rate lock expired. Contact Coach on WhatsApp for a refreshed rate.
                    </p>
                  ) : (
                    <p style={{ fontSize: 13, color: '#888' }}>
                      Rate locked for{' '}
                      <strong
                        style={{
                          fontFamily: 'var(--font-mono)',
                          color: secsRemaining !== null && secsRemaining < 300 ? '#ef4444' : '#D4A017',
                          fontSize: 15,
                        }}
                      >
                        {formatCountdown(secsRemaining) ?? '—'}
                      </strong>
                      {' '}· locked until {formatDate(order.rate_lock_expires_at)}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TX hash + confirmation status */}
          {order.blockchain_tx_hash && (
            <TxStatusCard hash={order.blockchain_tx_hash} chain={order.sending_chain || 'trc20'} reference={order.reference} />
          )}

          {/* Terminal state notice */}
          {isTerminal && (
            <div
              style={{
                padding: 16,
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: 8,
                marginBottom: 24,
                fontSize: 14,
                color: '#ef4444',
              }}
            >
              This order has been marked as{' '}
              <strong>{STATUS_LABELS[order.status]?.label || order.status}</strong>. Contact Coach
              on WhatsApp to resolve.
            </div>
          )}

          {/* Status timeline */}
          {!isTerminal && (
            <div className="card" style={{ padding: 20, marginBottom: 24 }}>
              <p className="label" style={{ marginBottom: 20 }}>Progress</p>
              {TIMELINE.map((step, i) => {
                const done = i <= currentStep;
                const active = i === currentStep;
                return (
                  <div key={step.key} style={{ display: 'flex', gap: 16, marginBottom: i < TIMELINE.length - 1 ? 20 : 0 }}>
                    {/* Connector */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          background: done ? '#D4A017' : 'var(--surface-2, #1A1A1A)',
                          border: `2px solid ${done ? '#D4A017' : 'rgba(255,255,255,0.08)'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 11,
                          fontWeight: 700,
                          color: done ? '#000' : '#444',
                        }}
                      >
                        {done && !active ? '✓' : i + 1}
                      </div>
                      {i < TIMELINE.length - 1 && (
                        <div
                          style={{
                            width: 2,
                            flex: 1,
                            minHeight: 20,
                            background: i < currentStep ? '#D4A017' : 'rgba(255,255,255,0.05)',
                            marginTop: 4,
                          }}
                        />
                      )}
                    </div>
                    {/* Text */}
                    <div style={{ paddingTop: 4 }}>
                      <p
                        style={{
                          fontSize: 14,
                          fontWeight: active ? 600 : 400,
                          color: done ? '#F5F5F5' : '#444',
                          marginBottom: active ? 4 : 0,
                        }}
                      >
                        {step.label}
                      </p>
                      {active && (
                        <p style={{ fontSize: 13, color: '#777' }}>{step.desc}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Completed celebration */}
          {isCompleted && (
            <div
              className="card-gold"
              style={{ padding: 20, marginBottom: 24, textAlign: 'center' }}
            >
              <p style={{ fontSize: 28, marginBottom: 8 }}>✅</p>
              <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>Transfer Complete</p>
              <p style={{ fontSize: 13, color: '#888' }}>
                {isInbound
                  ? 'Funds have been delivered to the recipient in Uganda.'
                  : 'USDT has been sent to your wallet.'}
              </p>
            </div>
          )}

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            {process.env.NEXT_PUBLIC_COACH_WHATSAPP && (
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_COACH_WHATSAPP}?text=Hi Coach, my order ref is ${order.reference}`}
                target="_blank"
                rel="noreferrer"
                className="btn-gold"
                style={{ flex: 1, textAlign: 'center', padding: '12px 16px' }}
              >
                WhatsApp Coach
              </a>
            )}
            <Link href="/send" className="btn-outline" style={{ flex: 1, textAlign: 'center', padding: '12px 16px' }}>
              New Order
            </Link>
          </div>

          <p style={{ fontSize: 12, color: '#444', textAlign: 'center' }}>
            Created {formatDate(order.created_at)}
          </p>
        </>
      )}
    </div>
  );
}
