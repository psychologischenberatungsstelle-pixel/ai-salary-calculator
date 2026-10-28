/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export für Vercel
  images: {
    unoptimized: true, // Für static export
  },
  trailingSlash: true, // SEO-freundliche URLs
};

export default nextConfig;
