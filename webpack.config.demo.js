'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',

  entry: {
    demo: ['webpack/hot/dev-server', './demo/index.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react']
        }
      },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'autoprefixer-loader?browsers=last 2 version',
          'sass-loader?outputStyle=expanded&includePaths[]=' +
          (path.resolve(__dirname, './src'))
        ]
      }
    ]
  },

  output: {
    filename: 'demo/bundle.js'
  },

  resolve: {
    extensions: ['.jsx', '.js']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    contentBase: './demo'
  }
};
