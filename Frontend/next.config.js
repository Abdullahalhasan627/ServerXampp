/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'ar',
    localeDetection: true,
  },
  images: {
    domains: ['newgersyintl.com'],
  },
}

module.exports = nextConfig