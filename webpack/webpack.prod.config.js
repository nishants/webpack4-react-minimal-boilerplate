// Load env vars
require('dotenv').config();

const
  merge = require('webpack-merge'),

  UglifyJSPlugin    = require('uglifyjs-webpack-plugin'),
  CompressionPlugin = require('compression-webpack-plugin'),
  S3Plugin          = require('webpack-s3-plugin'),
  { GenerateSW }    = require('workbox-webpack-plugin'),
  ManifestPlugin    = require('webpack-manifest-plugin'),

  baseConfig = require('./webpack.base.config'),
  deployConfig = {
    s3Options: {
      accessKeyId     : process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
    },
    s3UploadOptions   : {
      Bucket: process.env.S3_BUCKET,
      ContentEncoding(fileName) {
        if (/\.gz/.test(fileName)) {
          return 'gzip';
        }
      },
      ContentType(fileName) {
        if (/\.js/.test(fileName)) {
          return 'application/javascript';
        } if (/\.css/.test(fileName)) {
          return 'text/css';
        } if (/\.html/.test(fileName)) {
          return 'text/html';
        } else {
          return 'text/plain';
        }
      },
    },
    basePath: '/',
    cdnizerOptions    : {defaultCDNBase: process.env.CDN_BASE},
    CacheControl: 'max-age=94608000',
    Expires: new Date(Date.now() + 604800000),
    cloudfrontInvalidateOptions: {
      DistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,
      Items: ['/*']
    }
  };

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new ManifestPlugin({
      seed : {
        name        : 'My PWA app',
        short_name  : 'the app',
        start_url   : '/',
        display     : 'fullscreen',
        theme_color : '#000000',
        background_color: '#FFFFFF',
        icons: [{
          'src'   : 'data:image/x-icon;base64,<BASE_64_CODE>==', // or url
          'sizes' : '800x800',
          'type'  : 'image/png'
        }]
      }
    }),
    new GenerateSW({clientsClaim: true, skipWaiting:  true}),
    new UglifyJSPlugin(),
    new CompressionPlugin(),
    new S3Plugin(deployConfig)
  ]
});
