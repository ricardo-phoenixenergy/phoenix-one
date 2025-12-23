import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(isProd && {
    basePath: '/phoenix-one',
    assetPrefix: '/phoenix-one/',
  })
}

export default nextConfig;