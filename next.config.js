/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.supabase.co https://*.vercel-analytics.com;
      connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.vercel-analytics.com https://formspree.io;
      img-src 'self' data: https:;
      style-src 'self' 'unsafe-inline';
      font-src 'self';
    `.replace(/\n/g, ""),
  },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
