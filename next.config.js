/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Also ignore TypeScript errors during builds
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['trbconqznkpxyrrbpipu.supabase.co'], 
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  poweredByHeader: false, // Remove the X-Powered-By header for security
  reactStrictMode: true,
  output: 'standalone', // Better for containerized environments like Render
  distDir: '.next', // Explicitly set the build directory
};

module.exports = nextConfig; 