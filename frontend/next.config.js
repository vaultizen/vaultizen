/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compress: true,
  reactStrictMode: true,
  generateEtags: false, // reduces overhead

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Enable static optimization
  experimental: {
    optimizeCss: false, // disable to avoid critters error
  },

  // Prefetch and preload
  onDemandEntries: {
    // period (in ms) where the server will keep entries in the buffer
    maxInactiveAge: 25 * 1000,
    // number of entries that should be kept in the buffer
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;