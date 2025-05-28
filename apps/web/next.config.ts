import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"), // 👈 Esto hace que '@/...' funcione
    };
    return config;
  },
};

export default nextConfig;