/**
 * Next.js Configuration with Maximum Type Safety
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  typescript: {
    // Always enforce rigorous type checking
    ignoreBuildErrors: false,
    // Always use the strictest TypeScript configuration
    tsconfigPath: "./tsconfig.json",
  },
  eslint: {
    // Enforce code quality during builds
    ignoreDuringBuilds: false,
    // Check all important directories
    dirs: ["app", "components", "lib", "utils", "__tests__"],
  },
  // Increase build-time type checking
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
