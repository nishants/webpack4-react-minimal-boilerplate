const
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    HTMLWebpackPlugin    = require("html-webpack-plugin"),

    isDevEnv    = process.env.NODE_ENV === "development",
    webpackMode = isDevEnv ? "development" : "production";

module.exports  = {
  mode: webpackMode,
  output: {
    filename: "[name]-[contenthash].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 2 } },
          "sass-loader",
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
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash].css"
    }),

    new HTMLWebpackPlugin({
      title: 'Boilerplate',
      filename: 'index.html',
      template: './src/index.html'
    }),
  ]

}