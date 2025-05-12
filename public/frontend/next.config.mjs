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
    },
    webpack(config) {
        config.module.rules.push({
          test: /\.svg$/,
          issuer: /\.[jt]sx?$/,
          use: ['@svgr/webpack'],
        });
        return config;
      },
};

export default nextConfig;
