/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.supabase.co https://*.vercel-analytics.com https://vercel.live;
      connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.vercel-analytics.com https://formspree.io https://*.formspree.io https://vercel.live;
      img-src 'self' data: https:;
      style-src 'self' 'unsafe-inline';
      font-src 'self';
      frame-src 'self';
    `.replace(/\n/g, ""),
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
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
