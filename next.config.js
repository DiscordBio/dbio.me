const localesConfig = require('./locales.config')
const dbioConfig = require('./dbio.config')

/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  register: true,
  dest: 'public',
  sw: 'service-worker.js'
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  i18n: {
    locales: localesConfig.map((locale) => locale.value),
    defaultLocale: localesConfig.find(el => el.default).value,
  },
  images: {
    domains: ['localhost', 'dbio.me', 'images.unsplash.com', 'cdn.discordapp.com', 'cdn.dbio.me'],
  },
  rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.dbio.me/:path*',
      }
    ]
  }
}

module.exports = withPWA(nextConfig);
