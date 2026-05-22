import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export const metadata = {
  title: 'How to Buy USDT | AfricaTeamPay',
  description:
    'Step-by-step guide: buy USDT on Binance and send it via TRC20. Takes 10 minutes. Required for paying suppliers or sending money home to Uganda.',
};

const STEPS = [
  {
    num: '01',
    title: 'Create a Binance Account',
    body: 'Go to binance.com and sign up with your email. Verify your identity (takes 5 minutes). Binance is the world\'s largest crypto exchange.',
    tip: 'Already have Binance? Skip to step 3.',
  },
  {
    num: '02',
    title: 'Buy USDT',
    body: 'Tap "Buy Crypto" → "Credit/Debit Card" or "Bank Transfer". Select USDT and enter the amount you need. Pay with your local card or bank.',
    tip: 'Buy slightly more than needed to cover the $0.01 TRC20 network fee.',
  },
  {
    num: '03',
    title: 'Go to Spot Wallet',
    body: 'After purchase, tap "Wallets" → "Spot" → find USDT. Tap "Withdraw" to send it.',
    tip: null,
  },
  {
    num: '04',
    title: 'Paste the AfricaTeamPay Wallet Address',
    body: 'Copy the wallet address you received from your order confirmation. Paste it in the "Address" field on Binance.',
    tip: 'Double-check the first and last 4 characters. Never manually type a wallet address.',
  },
  {
    num: '05',
    title: 'Choose TRC20 Network',
    body: 'Binance will ask you to select a network. Choose TRC20 (Tron). This is the recommended network — fee is only $0.01.',
    tip: 'DO NOT select ERC20 — fees can be $10–15. Always use TRC20 for AfricaTeamPay.',
  },
  {
    num: '06',
    title: 'Enter Exact Amount and Confirm',
    body: 'Enter the exact USDT amount from your order. Tap "Withdraw" and confirm with your 2FA code. The transfer arrives in 1–3 minutes.',
    tip: null,
  },
];

export default async function HowToBuyUsdtPage() {
  const t = await getTranslations('buy_usdt');
  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '60px 24px 80px' }}>
      <p className="label" style={{ marginBottom: 12 }}>{t('badge')}</p>
      <h1
        style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(36px, 6vw, 60px)',
          letterSpacing: '0.03em',
          marginBottom: 12,
        }}
      >
        {t('heading')}
      </h1>
      <p style={{ color: '#888', fontSize: 15, lineHeight: 1.7, marginBottom: 40 }}>
        {t('body')}
      </p>

      {/* P2P fast lane — Uganda */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(212,160,23,0.13), rgba(212,160,23,0.05))',
          border: '1px solid rgba(212,160,23,0.4)',
          borderRadius: 14,
          padding: '24px 28px',
          marginBottom: 36,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 22,
            letterSpacing: '0.04em',
            marginBottom: 10,
          }}
        >
          ⚡ In Uganda? Buy USDT Instantly
        </p>
        <p style={{ color: '#aaa', fontSize: 14, lineHeight: 1.7, marginBottom: 18 }}>
          The fastest way to get USDT in Uganda is through Africa Team&apos;s trusted P2P desk.
          Buy USDT with MTN MoMo or Airtel Money in minutes — no exchange account needed.
        </p>
        <a
          href="https://africateam-hub.vercel.app/p2p"
          target="_blank"
          rel="noreferrer"
          className="btn-gold"
          style={{ display: 'inline-flex' }}
        >
          Buy USDT on Africa Team P2P →
        </a>
      </div>

      {/* What you need */}
      <div className="card-gold" style={{ padding: '20px 24px', marginBottom: 32 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#D4A017', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
          What you need
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            'A smartphone (iPhone or Android)',
            'A debit or credit card (Visa/Mastercard)',
            'Your national ID or passport (for Binance verification)',
            'Your AfricaTeamPay order reference + wallet address',
          ].map(item => (
            <p key={item} style={{ fontSize: 14, color: '#ccc' }}>✓ {item}</p>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div style={{ marginBottom: 40 }}>
        {STEPS.map((s, i) => (
          <div
            key={s.num}
            style={{
              display: 'flex',
              gap: 20,
              marginBottom: i < STEPS.length - 1 ? 32 : 0,
            }}
          >
            {/* Number + connector */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'rgba(212,160,23,0.12)',
                  border: '1px solid rgba(212,160,23,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-bebas)',
                  fontSize: 18,
                  color: '#D4A017',
                  letterSpacing: '0.05em',
                }}
              >
                {s.num}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    width: 2,
                    flex: 1,
                    minHeight: 24,
                    background: 'rgba(212,160,23,0.12)',
                    marginTop: 6,
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div style={{ paddingTop: 8 }}>
              <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{s.title}</p>
              <p style={{ fontSize: 14, color: '#888', lineHeight: 1.7, marginBottom: s.tip ? 10 : 0 }}>
                {s.body}
              </p>
              {s.tip && (
                <p style={{
                  fontSize: 13,
                  color: '#D4A017',
                  padding: '8px 12px',
                  background: 'rgba(212,160,23,0.06)',
                  borderRadius: 6,
                  borderLeft: '2px solid rgba(212,160,23,0.4)',
                }}>
                  💡 {s.tip}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Safety note */}
      <div
        className="card"
        style={{ padding: '20px 24px', marginBottom: 32 }}
      >
        <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>🔒 Safety tips</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            'Only send USDT to wallet addresses you received directly from AfricaTeamPay',
            'Never share your Binance login, password, or 2FA codes with anyone',
            'Always verify the first and last 6 characters of a wallet address before sending',
            'If you made an error, contact Coach on WhatsApp immediately with your order reference',
          ].map(tip => (
            <p key={tip} style={{ fontSize: 13, color: '#777' }}>• {tip}</p>
          ))}
        </div>
      </div>

      {/* Alternatives to Binance */}
      <div className="card" style={{ padding: '20px 24px', marginBottom: 40 }}>
        <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Other exchanges that work</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['OKX', 'Bybit', 'Kraken', 'Coinbase', 'KuCoin', 'Huobi'].map(ex => (
            <span
              key={ex}
              style={{
                padding: '5px 12px',
                borderRadius: 6,
                fontSize: 13,
                background: 'var(--surface-2, #1A1A1A)',
                border: '1px solid var(--border)',
                color: '#999',
              }}
            >
              {ex}
            </span>
          ))}
        </div>
        <p style={{ fontSize: 12, color: '#444', marginTop: 10 }}>
          All work the same way — buy USDT, withdraw via TRC20 to the AfricaTeamPay wallet.
        </p>
      </div>

      {/* CTAs */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link href="/send" className="btn-gold" style={{ flex: 1, textAlign: 'center', padding: '14px 20px' }}>
          Place an Order →
        </Link>
        <Link href="/send-to-uganda" className="btn-outline" style={{ flex: 1, textAlign: 'center', padding: '14px 20px' }}>
          Send Money Home →
        </Link>
      </div>
    </div>
  );
}
