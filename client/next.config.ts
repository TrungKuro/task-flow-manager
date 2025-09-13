import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tfm-s3-images.s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
