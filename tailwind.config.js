/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['var(--font-bebas)', 'sans-serif'],
        sora: ['var(--font-sora)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        gold: {
          DEFAULT: '#D4A017',
          muted: 'rgba(212,160,23,0.15)',
          border: 'rgba(212,160,23,0.3)',
        },
        surface: {
          DEFAULT: '#111111',
          2: '#1A1A1A',
        },
        bg: '#0A0A0A',
        border: 'rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
};
