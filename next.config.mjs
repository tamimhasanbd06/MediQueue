/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // এই অংশে * চিহ্ন দিয়ে সব হোস্টনেম allow করা যাবে
      },
    ],
  },
};

export default nextConfig;