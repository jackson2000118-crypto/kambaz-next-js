import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination:
          "https://webdev-server-qyfk.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
