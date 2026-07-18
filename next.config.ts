import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* EduGlobe Academy — Next.js Configuration */

  // Image optimization for external image sources
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Experimental features
  experimental: {
    // Server Actions are stable in Next.js 16
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  // Environment variables exposed to the browser
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "EduGlobe Academy",
  },

  // Headers for security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
