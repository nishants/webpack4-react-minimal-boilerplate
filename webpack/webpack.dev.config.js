const
    merge = require('webpack-merge'),

    baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  mode: "development",
});
