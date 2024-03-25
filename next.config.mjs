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
            }
        ],
    },
    experimental: {
        images: {
            allowFutureImage: true
        }
    }
};

export default nextConfig;
