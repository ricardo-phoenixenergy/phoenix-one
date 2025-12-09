import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: '/phoenix-one', // Replace with your actual repository name
  assetPrefix: '/phoenix-one/', // Replace with your actual repository name
}

export default nextConfig;
