/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },

      // NEW
      {
        protocol: "https",
        hostname: "s1.imgbb.ws",
      },
      {
        protocol: "https",
        hostname: "s2.imgbb.ws",
      },
    ],
  },
};

export default nextConfig;