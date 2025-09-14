/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suppress hydration warnings in development
  reactStrictMode: true,
  swcMinify: true,
  
  // Handle hydration mismatches
  experimental: {
    suppressHydrationWarning: true,
  },
  
  // Webpack configuration to handle client-side only code
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
}

export default nextConfig;
