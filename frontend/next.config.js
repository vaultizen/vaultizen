/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations
  swcMinify: true,          // Faster minification (enabled by default in Next.js 13+)
  compress: true,           // Enable gzip compression for static assets
  reactStrictMode: true,    // Catch potential issues in development

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
    formats: ['image/webp'], // Serve images in modern format (fallback provided)
  },

  // Remove console logs in production (keep error logs)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] } // Keep errors and warnings
      : false,
  },

  // Reduce server overhead (optional)
  generateEtags: false,

  // IMPORTANT: Do NOT add `output: 'export'` – this disables server-side features
  // and causes 404 on Vercel for dynamic routes and API routes.

  // For self-hosted production, uncomment:
  // output: 'standalone',
};

module.exports = nextConfig;