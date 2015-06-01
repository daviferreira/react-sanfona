'use strict';

var webpack = require('webpack');

module.exports = {
  devtool: 'eval',

  entry: {
    demo: ['webpack/hot/dev-server', './demo/index.js']
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel?loose=all', exclude: /node_modules/ }
    ]
  },

  output: {
    filename: 'demo/bundle.js'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
