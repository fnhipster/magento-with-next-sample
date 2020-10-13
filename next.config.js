const path = require('path')

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      loader: 'graphql-tag/loader',
    })

    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(__dirname),
    }

    return config
  },
  async rewrites() {
    return [
      /**
       * Magento Proxy API
       */
      {
        source: '/store/:pathname*',
        destination: '/api/proxy',
      },
    ]
  },
}
