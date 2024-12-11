/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true
    }
};

export default nextConfig;
