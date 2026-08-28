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
                hostname: 'i.scdn.co',   // from spotify
                pathname: '/image/**',
            },
            {
                protocol: 'https',
                hostname: '*.spotifycdn.com',  // from spotify-url-info api
                pathname: '/**',
            },
        ],
    },
};

// Export with the plugin applied
export default withNextIntl(nextConfig);