import fs from 'fs';
import path from 'path';

const baseUrl = 'https://nammadesigns.vercel.app';
const routes = ['/', '/about', '/ourworks', '/contact', '/feedback'];

const generateSitemap = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route === '/' ? 'weekly' : route === '/ourworks' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route === '/ourworks' ? '0.9' : route === '/about' ? '0.8' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully!');
};

generateSitemap();