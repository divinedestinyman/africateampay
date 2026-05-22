import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  const cookieLocale = cookieStore.get('locale')?.value;

  let locale = 'en';
  if (cookieLocale === 'fr' || cookieLocale === 'en') {
    locale = cookieLocale;
  } else {
    // Auto-detect from Accept-Language header
    try {
      const acceptLang = headers().get('accept-language') || '';
      if (/\bfr\b/i.test(acceptLang.split(',')[0])) {
        locale = 'fr';
      }
    } catch {}
  }

  const messages =
    locale === 'fr'
      ? (await import('../messages/fr.json')).default
      : (await import('../messages/en.json')).default;

  return { locale, messages };
});
