// next.config.js

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
    `.replace(/\n/g, "")
  }
];

module.exports = {
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};
