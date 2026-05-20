import { Bebas_Neue, Sora, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'AfricaTeamPay — USDT Corridor Network',
  description:
    'Send money to China, UAE, UK & Kenya via USDT. 80% cheaper than your bank. Flat 1% fee. Uganda-based P2P desk.',
  openGraph: {
    title: 'AfricaTeamPay — USDT Corridor Network',
    description: '80% cheaper than your bank. Send UGX → USDT → anywhere.',
    url: 'https://africateampay.vercel.app',
    siteName: 'AfricaTeamPay',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${sora.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
