const withCSS = require('@zeit/next-css');
const withOffline = require('next-offline');

module.exports = withOffline({
  ...withCSS({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]',
    },
  }),
  exportPathMap: function() {
    return {
      '/': { page: '/' },
    };
  },
  devIndicators: {
    autoPrerender: false,
  },
  generateInDevMode: true,
  workboxOpts: {
    runtimeCaching: [
      {
        // Match any request that ends with .png, .jpg, .jpeg or .svg.
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

        // Apply a cache-first strategy.
        handler: 'CacheFirst',

        options: {
          // Use a custom cache name.
          cacheName: 'images',

          // Only cache 100 images.
          expiration: {
            maxEntries: 100,
          },
        },
      },
    ],
  },
});
