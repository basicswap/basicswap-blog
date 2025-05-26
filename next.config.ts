/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/basicswap-blog' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/basicswap-blog/' : '',
}

module.exports = nextConfig
