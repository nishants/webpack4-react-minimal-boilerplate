const
    merge = require('webpack-merge'),
    UglifyJSPlugin = require("uglifyjs-webpack-plugin"),
    CompressionPlugin = require("compression-webpack-plugin"),

    baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  mode: "production",
  plugins: [
    new UglifyJSPlugin(),
    new CompressionPlugin(),
  ]
});
