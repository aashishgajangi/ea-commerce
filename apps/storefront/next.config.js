/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Allow webpack to bundle the database package properly
      config.resolve.fallback = { fs: false };
    }
    return config;
  },
};

export default nextConfig;
