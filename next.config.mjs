/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
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
            }
        ],
    }
};

export default nextConfig;
