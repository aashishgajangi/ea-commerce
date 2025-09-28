/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@repo/database"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Handle Prisma binary files
      config.externals.push("@repo/database");
    }
    return config;
  },
};

export default nextConfig;
