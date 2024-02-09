/** @type {import('next').NextConfig} */
module.exports = {
    transpilePackages: ["@repo/ui"],
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "i.imgur.com",
        }
      ]
    },
    env: {
      NEXT_API_BASE_URL: process.env.NEXT_API_BASE_URL,
    },
    experimental: {
      missingSuspenseWithCSRBailout: false,
    }
};
