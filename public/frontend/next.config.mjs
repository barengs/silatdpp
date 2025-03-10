/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    // async headers() {
    //     return [
    //       {
    //         source: '/:path*',
    //         headers: [
    //           {
    //             key: 'Set-Cookie',
    //             value: 'SameSite=None; Secure',
    //           },
    //         ],
    //       },
    //     ];
    //   },
    eslint: {
        dirs: ['pages', 'components']
    },  
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true
    }
};

export default nextConfig;
