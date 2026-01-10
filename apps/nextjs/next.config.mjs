/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.mjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  // allow cross-origin on https://strapi.joel-chapeau.fr
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NEXT_PUBLIC_BACKEND_HOST,
          },
        ],
      },
    ];
  },
  images: {
    minimumCacheTTL: 14400, // 4 hours
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
      {
        protocol: 'http',
        hostname: '*',
      },
    ],
  },
};

export default nextConfig;
