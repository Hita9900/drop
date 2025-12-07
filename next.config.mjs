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

export default nextConfig;
