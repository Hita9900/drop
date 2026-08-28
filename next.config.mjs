// next.config.mjs - ES Module syntax
import createNextIntlPlugin from 'next-intl/plugin';

// Initialize the plugin
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
                pathname: '/image/**',   // allows any image path under /image/
            },
            {
                protocol: 'https',
                hostname: 'image-cdn-fa.spotifycdn.com',
                pathname: '/**',   // allows any image path
            },
        ],
    },
};

// Export with the plugin applied
export default withNextIntl(nextConfig);