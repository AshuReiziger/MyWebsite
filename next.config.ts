import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Case-study images live in /public by default; Cloudinary and Google
    // Drive are secondary options for images too large or numerous to
    // commit to the repo.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
