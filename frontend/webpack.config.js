const webpack = require('webpack');

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
    })
  ]
};