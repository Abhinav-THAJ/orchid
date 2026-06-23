import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // API routes cannot be exported statically
  images: { unoptimized: true },
  /* config options here */
};

export default nextConfig;
