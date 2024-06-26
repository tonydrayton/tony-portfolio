/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        deviceSizes: [320],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'en.m.wikipedia.org',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'cdn.discordapp.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'images.dog.ceo',
                port: ''
            }
        ],
    },
    env: {
        DISCORD_ID: process.env.DISCORD_ID
    }
};

export default nextConfig;
