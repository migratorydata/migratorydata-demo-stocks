const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/index.js',

  output: {
    path: __dirname + '/site',
    publicPath: '/',
    filename: 'bundle.js'
  },

  devServer: {
    static: './site'
  },

  // ignore optional dependency pako (used for compression feature by MigratoryData API Client)
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /pako/,
      contextRegExp: /migratorydata-client\/lib$/,
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/app/config.js", to: "" },
      ],
    }),
  ]
};