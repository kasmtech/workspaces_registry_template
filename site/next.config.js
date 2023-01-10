/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    name: 'Kasm Technologies',
    description: 'The official store for Kasm supported applications.',
    icon: '/img/logo.svg',
    listUrl: 'https://registry.kasmweb.com/list.json',
    contactUrl: 'https://kasmweb.com/support',
    schema: '1.0',
  },
  reactStrictMode: true,
  swcMinify: true,
  basePath: '/kasm-apps',
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig
