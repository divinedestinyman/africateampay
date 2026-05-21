'use client';
import SendForm from '@/components/SendForm';

export default function SendPage() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '60px 20px 0' }}>
      <p className="label" style={{ marginBottom: 12 }}>Self-Service Order Form</p>
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px,6vw,56px)', letterSpacing: '0.03em', marginBottom: 8 }}>
        PLACE YOUR ORDER
      </h1>
      <p style={{ color: '#999', fontSize: 15, marginBottom: 8 }}>
        No WhatsApp needed. Fill the form — get a wallet address — send USDT.
      </p>
      <SendForm defaultDirection="outbound" />
    </div>
  );
}
