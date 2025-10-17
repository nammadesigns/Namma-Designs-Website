/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live;
      connect-src 'self' https://formspree.io https://api.formspree.io https://*.vercel-analytics.com;
      img-src 'self' data:;
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

export default {
  output: "standalone",
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  async exportPathMap(defaultPathMap) {
    delete defaultPathMap["/NotFound"];
    return defaultPathMap;
  },
};

