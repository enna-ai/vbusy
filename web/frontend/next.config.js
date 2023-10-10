/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_API_BASE_URL: process.env.NEXT_API_BASE_URL,
    }
}

module.exports = nextConfig
