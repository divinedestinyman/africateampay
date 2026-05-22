const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  experimental: {
    serverComponentsExternalPackages: ['@react-pdf/renderer'],
  },
};

module.exports = withNextIntl(nextConfig);
