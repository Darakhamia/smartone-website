import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output for the Docker image deployed via Coolify
  output: "standalone",
};

export default nextConfig;
