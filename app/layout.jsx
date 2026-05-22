import { Bebas_Neue, Sora, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

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
  title: 'Send Money to Uganda | AfricaTeamPay — 1% Flat Fee',
  description:
    'Uganda's USDT Corridor Network. Pay suppliers in China, India, Turkey & UAE. Diaspora? Send money home to Uganda instantly. Flat 1% fee — 80% cheaper than your bank.',
  openGraph: {
    title: 'AfricaTeamPay — Uganda USDT Corridor Network',
    description: '80% cheaper than your bank. Flat 1% fee. Send UGX → USDT → anywhere.',
    url: 'https://africateampay.vercel.app',
    siteName: 'AfricaTeamPay',
    locale: 'en_US',
    type: 'website',
  },
  themeColor: '#D4A017',
  metadataBase: new URL('https://africateampay.vercel.app'),
};

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${bebasNeue.variable} ${sora.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
