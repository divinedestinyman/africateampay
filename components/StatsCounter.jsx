'use client';
import { useEffect, useRef, useState } from 'react';

function Counter({ target, prefix = '', suffix = '', duration = 2200 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const STATS = [
  { target: 4823, suffix: '+', label: 'Transfers Completed', sub: 'and growing every week' },
  { target: 1200000, prefix: 'USD ', label: 'Total Volume Sent', sub: 'across 15 corridors' },
  { target: 47, suffix: '+', label: 'Countries Reached', sub: 'from Uganda to the world' },
  { target: 50000, suffix: '+', label: 'Community Members', sub: 'in the Africa Team network' },
];

export default function StatsCounter() {
  return (
    <section style={{ padding: '64px 24px', background: 'rgba(17,17,17,0.5)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p className="label" style={{ textAlign: 'center', marginBottom: 12 }}>
          BY THE NUMBERS
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            textAlign: 'center',
            letterSpacing: '0.03em',
            marginBottom: 48,
          }}
        >
          BUILT ON TRUST, PROVEN BY VOLUME
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 24,
          }}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="card"
              style={{ padding: '32px 24px', textAlign: 'center' }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: 'clamp(44px, 6vw, 60px)',
                  color: '#D4A017',
                  lineHeight: 1,
                  letterSpacing: '0.02em',
                  marginBottom: 8,
                }}
              >
                <Counter
                  target={stat.target}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: 18,
                  letterSpacing: '0.05em',
                  marginBottom: 6,
                }}
              >
                {stat.label}
              </p>
              <p style={{ color: '#555', fontSize: 13 }}>{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
