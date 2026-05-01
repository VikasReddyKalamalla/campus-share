import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Faster builds and smaller bundles
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-tooltip',
    ],
  },
  // Compress responses
  compress: true,
  // Faster page loads — inline critical CSS
  poweredByHeader: false,
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
