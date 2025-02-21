/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable production source maps for better debugging
  productionBrowserSourceMaps: false,

  // Optimize images
  images: {
    minimumCacheTTL: 60,
    formats: ['image/webp'],
  },

  // Enable React strict mode for better development practices
  reactStrictMode: true,

  // Enable SWC minification instead of Terser
  swcMinify: true,

  // Experimental features for better performance
  experimental: {
    // Enable optimizeCss for better CSS optimization
    optimizeCss: true,
    // Enable modern JavaScript features
    modern: true,
    // Enable server components
    serverComponents: true,
    // Enable granular chunks
    granularChunks: true,
  },

  // Webpack configuration for better optimization
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Split chunks more granularly
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 50000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          default: false,
          vendors: false,
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            reuseExistingChunk: true,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              return `npm.${packageName.replace('@', '')}`;
            },
            priority: 20,
            minChunks: 1,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
