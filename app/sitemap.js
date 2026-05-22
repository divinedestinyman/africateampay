const BASE = 'https://africateampay.vercel.app';

export default function sitemap() {
  const routes = [
    { path: '', priority: 1.0, freq: 'daily' },
    { path: '/send-to-uganda', priority: 0.9, freq: 'weekly' },
    { path: '/pay-supplier', priority: 0.9, freq: 'weekly' },
    { path: '/calculate', priority: 0.8, freq: 'weekly' },
    { path: '/track', priority: 0.8, freq: 'daily' },
    { path: '/how-to-buy-usdt', priority: 0.7, freq: 'monthly' },
    { path: '/dispute', priority: 0.6, freq: 'monthly' },
    { path: '/trade-calculator', priority: 0.7, freq: 'monthly' },
    { path: '/suppliers', priority: 0.7, freq: 'weekly' },
    { path: '/corridors/china', priority: 0.9, freq: 'weekly' },
    { path: '/corridors/india', priority: 0.8, freq: 'weekly' },
    { path: '/corridors/turkey', priority: 0.8, freq: 'weekly' },
    { path: '/corridors/uae', priority: 0.8, freq: 'weekly' },
    { path: '/corridors/uk', priority: 0.8, freq: 'weekly' },
    { path: '/corridors/usa', priority: 0.8, freq: 'weekly' },
    { path: '/corridors/kenya', priority: 0.8, freq: 'weekly' },
    { path: '/corridors/germany', priority: 0.7, freq: 'weekly' },
    { path: '/corridors/japan', priority: 0.7, freq: 'weekly' },
    { path: '/corridors/from-usa', priority: 0.8, freq: 'weekly' },
    { path: '/corridors/from-uk', priority: 0.8, freq: 'weekly' },
    { path: '/corridors/from-uae', priority: 0.8, freq: 'weekly' },
    { path: '/corridors/from-saudi', priority: 0.8, freq: 'weekly' },
    { path: '/account/register', priority: 0.5, freq: 'monthly' },
    { path: '/account/login', priority: 0.5, freq: 'monthly' },
  ];

  return routes.map(({ path, priority, freq }) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority,
  }));
}
