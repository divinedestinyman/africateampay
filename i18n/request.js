import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  const cookieLocale = cookieStore.get('locale')?.value;

  let locale = 'en';
  if (cookieLocale === 'fr' || cookieLocale === 'en' || cookieLocale === 'ar') {
    locale = cookieLocale;
  } else {
    // Auto-detect from Accept-Language header
    try {
      const acceptLang = headers().get('accept-language') || '';
      const primary = acceptLang.split(',')[0].toLowerCase();
      if (/\bfr\b/i.test(primary)) locale = 'fr';
      else if (/\bar\b/i.test(primary)) locale = 'ar';
    } catch {}
  }

  const messages =
    locale === 'fr'
      ? (await import('../messages/fr.json')).default
      : locale === 'ar'
      ? (await import('../messages/ar.json')).default
      : (await import('../messages/en.json')).default;

  return { locale, messages };
});
