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
        ],
    },
};

// Export with the plugin applied
export default withNextIntl(nextConfig);