/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  distDir: '../public',
  env: {
    name: 'd3vn0mi',
    description: 'Custom Kasm workspace registry by d3vn0mi.',
    icon: '/img/logo.svg',
    listUrl: 'https://kasmregistry.d3vn0mi.com/',
    contactUrl: 'https://github.com/d3vn0mi/d3vn0mi_kasm_workspace_registry/issues',
  },
  reactStrictMode: true,
  basePath: '/1.0',
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig
