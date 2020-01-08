const withCSS = require('@zeit/next-css');
const withOffline = require('next-offline');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = phase => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return withOffline({
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
    env: {
      MIXPANEL_TOKEN: isDev
        ? 'aa1741e54e405450834aa5d3ba1086be'
        : '73d4c80ae4fe10053d8bfc5b3e8fa842',
    },
  });
};
