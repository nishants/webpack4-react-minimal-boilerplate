const
    path = require('path'),

    CleanPlugin = require('clean-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    HTMLWebpackPlugin    = require('html-webpack-plugin'),

    ROOT_DIR = path.join(__dirname, '..');

module.exports  = {
  output: {
    filename: '[name]-[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            } },
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: ['./src/global-style/_vars.scss', 'src/global-style/_base.scss']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanPlugin(['dist'], {
      root: ROOT_DIR
    }),

    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css'
    }),

    new HTMLWebpackPlugin({
      title: 'Boilerplate',
      filename: 'index.html',
      template: './src/index.html'
    }),
  ]
}
