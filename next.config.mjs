/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable persistent Webpack disk cache in dev mode to permanently prevent __webpack_modules__[moduleId] errors
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;