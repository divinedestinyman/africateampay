import Calculator from '@/components/Calculator';

export const metadata = {
  title: 'Calculate Your Transfer | AfricaTeamPay',
  description: 'Calculate exactly how much USDT you receive for your UGX. Live rates, 1% flat fee.',
};

export default function CalculatePage() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '60px 24px' }}>
      <p className="label" style={{ marginBottom: 12 }}>Universal Calculator</p>
      <h1
        style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(36px, 6vw, 60px)',
          letterSpacing: '0.03em',
          marginBottom: 8,
        }}
      >
        CALCULATE YOUR TRANSFER
      </h1>
      <p style={{ color: '#888', marginBottom: 40 }}>
        Live USDT rate. 1% Coach fee. No surprises.
      </p>
      <div className="card" style={{ padding: 32 }}>
        <Calculator />
      </div>
    </div>
  );
}
