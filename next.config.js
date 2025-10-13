/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self' blob: data:;
      script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://*.supabase.co https://*.vercel-analytics.com https://vercel.live;
      connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.vercel-analytics.com https://formspree.io https://vercel.live;
      img-src 'self' blob: data: https:;
      style-src 'self' 'unsafe-inline';
      font-src 'self' data:;
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
