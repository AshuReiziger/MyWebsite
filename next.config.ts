import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Case-study images live in /public by default; Cloudinary is the
    // secondary option for images too large to commit to the repo.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
