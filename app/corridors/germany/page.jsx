import Calculator from '@/components/Calculator';

export const metadata = {
  title: 'Uganda → Germany Corridor | Pay European Suppliers | AfricaTeamPay',
  description: 'Pay German and EU industrial machinery, equipment suppliers from Uganda. UGX → USDT → EUR wire. 1% flat fee.',
};

const WA = process.env.NEXT_PUBLIC_COACH_WHATSAPP || '256784277664';

export default function GermanyPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 60px' }}>
        <div className="hero-glow" />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <span style={{ fontSize: 56 }}>🇩🇪</span>
          <p className="label" style={{ margin: '16px 0 12px' }}>Uganda → Germany / EU Corridor</p>
          <h1
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(36px, 7vw, 68px)',
              lineHeight: 1.0,
              letterSpacing: '0.03em',
              marginBottom: 20,
            }}
          >
            PAYING GERMAN SUPPLIERS?<br />
            <span style={{ color: '#D4A017' }}>UGX → USDT → EUR. 1% FEE.</span>
          </h1>
          <p style={{ color: '#aaa', fontSize: 16, lineHeight: 1.7, maxWidth: 620, marginBottom: 32 }}>
            Industrial machinery, engineering equipment, quality manufactured goods.
            Germany and the EU demand EUR bank transfers — no exceptions. Coach wires EUR directly
            to any German or EU IBAN. No correspondent bank nightmare. 1% flat fee.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#calculator" className="btn-gold">Calculate My Transfer →</a>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" className="btn-outline">
              WhatsApp Coach
            </a>
          </div>
        </div>
      </section>

      {/* ── What Ugandans buy ─────────────────────────────────── */}
      <section style={{ padding: '0 24px 64px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p className="label" style={{ marginBottom: 12 }}>Uganda → Germany Import Categories</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '0.03em',
              marginBottom: 28,
            }}
          >
            WHAT UGANDAN BUSINESSES BUY FROM GERMANY
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { icon: '🏭', cat: 'Industrial Machinery', note: 'Manufacturing equipment, production lines, CNC machines' },
              { icon: '🚗', cat: 'Automotive Parts', note: 'German car parts (BMW, Mercedes, VW), specialist tools' },
              { icon: '💊', cat: 'Pharmaceuticals', note: 'EU-certified medicines, medical devices, diagnostics' },
              { icon: '⚡', cat: 'Electrical Equipment', note: 'Generators, transformers, control systems' },
              { icon: '🌾', cat: 'Agri Equipment', note: 'Precision farming machinery, tractors, processing equipment' },
              { icon: '🔬', cat: 'Lab & Medical', note: 'Laboratory instruments, diagnostic equipment' },
            ].map(({ icon, cat, note }) => (
              <div key={cat} className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
                <p style={{ fontWeight: 600, marginBottom: 6, fontSize: 14 }}>{cat}</p>
                <p style={{ color: '#888', fontSize: 12, lineHeight: 1.6 }}>{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEPA + SWIFT guide ────────────────────────────────── */}
      <section style={{ padding: '48px 24px 64px', background: 'rgba(17,17,17,0.8)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p className="label" style={{ marginBottom: 12 }}>Payment methods for EU suppliers</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '0.03em',
              marginBottom: 24,
            }}
          >
            SEPA OR SWIFT — COACH HANDLES BOTH
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div className="card" style={{ padding: 24 }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#D4A017', marginBottom: 8 }}>PREFERRED</p>
              <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>SWIFT EUR Wire</p>
              <p style={{ color: '#aaa', fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>
                Coach&apos;s EUR account wires directly to your German supplier&apos;s IBAN.
                Standard international wire — accepted by every German/EU company.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#555', fontSize: 12 }}>Time</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#D4A017' }}>2–3 business days</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#555', fontSize: 12 }}>Fee</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#4CAF50' }}>1% + €25 wire</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#555', fontSize: 12 }}>Need</span>
                  <span style={{ color: '#888', fontSize: 12 }}>IBAN + BIC/SWIFT + beneficiary name</span>
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: 24 }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#888', marginBottom: 8 }}>FASTEST</p>
              <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>USDT (Growing in Germany)</p>
              <p style={{ color: '#aaa', fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>
                German B2B crypto adoption is growing. Tech companies, trading intermediaries,
                and some machinery dealers now accept USDT. Ask your supplier.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#555', fontSize: 12 }}>Time</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#D4A017' }}>1–2 hours</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#555', fontSize: 12 }}>Fee</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#4CAF50' }}>1% flat</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#555', fontSize: 12 }}>Need</span>
                  <span style={{ color: '#888', fontSize: 12 }}>Supplier USDT wallet (any chain)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="card" style={{ padding: 16, marginTop: 20 }}>
            <p className="label" style={{ marginBottom: 8 }}>What you need from your German supplier</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {['IBAN (starts with DE...)', 'BIC / SWIFT code', 'Beneficiary company name', 'Registered address', 'Invoice or proforma'].map(item => (
                <span key={item} style={{ background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.2)', borderRadius: 6, padding: '4px 12px', fontSize: 12, color: '#D4A017' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Calculator ────────────────────────────────────────── */}
      <section id="calculator" style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <p className="label" style={{ textAlign: 'center', marginBottom: 12 }}>Calculate now</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '0.03em',
              textAlign: 'center',
              marginBottom: 32,
            }}
          >
            HOW MUCH EUR WILL YOUR SUPPLIER RECEIVE?
          </h2>
          <div className="card" style={{ padding: 32 }}>
            <Calculator defaultCorridor="germany" />
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 64px', background: 'rgba(17,17,17,0.6)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', paddingTop: 48 }}>
          <p className="label" style={{ marginBottom: 12 }}>FAQ</p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '0.03em',
              marginBottom: 32,
            }}
          >
            GERMANY / EU CORRIDOR QUESTIONS
          </h2>
          {[
            {
              q: 'What bank details do I need from a German supplier?',
              a: 'IBAN (starts with DE + 20 digits), BIC/SWIFT code, company name, and registered address. EU companies are required to provide IBAN on invoices.',
            },
            {
              q: 'Can Coach pay any EU country (not just Germany)?',
              a: 'Yes. France, Netherlands, Italy, Austria, Belgium, Sweden, Poland — any EU/EEA country with an IBAN. Same 1% + wire fee applies.',
            },
            {
              q: 'How long does EUR wire take to Germany?',
              a: 'SWIFT to Germany: 1–3 business days. German banks process SWIFT efficiently. Coach provides the payment reference within 24 hours of sending.',
            },
            {
              q: 'Do German companies accept USDT?',
              a: 'Increasingly yes — especially tech intermediaries and trading companies. Traditional manufacturers typically do not. Ask your supplier; Coach can advise.',
            },
            {
              q: 'What is the minimum transfer?',
              a: 'Minimum €500 equivalent. EUR wire has a €25 fixed cost, so it makes sense on orders above €500.',
            },
          ].map(({ q, a }) => (
            <div key={q} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '20px 0' }}>
              <p style={{ fontWeight: 600, marginBottom: 8, color: '#F5F5F5' }}>{q}</p>
              <p style={{ color: '#888', lineHeight: 1.7, fontSize: 14 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section style={{ padding: '64px 24px', textAlign: 'center' }}>
        <div className="card-gold" style={{ maxWidth: 600, margin: '0 auto', padding: 40 }}>
          <p style={{ fontFamily: 'var(--font-bebas)', fontSize: 36, letterSpacing: '0.04em', marginBottom: 8 }}>
            PAYING A GERMAN OR EU SUPPLIER?
          </p>
          <p style={{ color: '#aaa', marginBottom: 28 }}>
            Send Coach the IBAN and invoice. EUR wired within 24 hours.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" className="btn-gold">
              WhatsApp Coach →
            </a>
            <a href="/send" className="btn-outline">
              Place Order Online →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
