const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');


module.exports = withPlugins([[{
    compress: true,
    devIndicators: {
        autoPrerender: false,
      },
      images: {
        domains: ['img-host.filestatic1.xyz','img-host.filestatic2.xyz'],
      },
      webpack(config, options) {
          config.module.rules.push({
              test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
              use: {
                  loader: 'url-loader',
                  options: {
                      limit: 1000000,
                      name: '[name].[ext]'
                  }
              },
  
          })
          return config;
      },
    env: {
        browser: true,
        SITE_URL:'https://unionmangas.xyz'
    },
}],[withImages()]]);

