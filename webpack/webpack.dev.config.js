const
    path = require('path'),
    merge = require('webpack-merge'),

    baseConfig = require('./webpack.base.config'),
    pathTo = relative => path.resolve(__dirname, relative);


module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    contentBase: pathTo('../dist')
  }
});
