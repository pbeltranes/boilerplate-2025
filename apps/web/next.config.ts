import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),
      "ui": path.resolve(__dirname, "../../packages/ui/src"),
    };
    return config;
  },
  transpilePackages: ["ui"],
};

export default nextConfig;