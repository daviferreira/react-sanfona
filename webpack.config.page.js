'use strict';

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'eval',

  entry: {
    demo: ['./demo/index.js']
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['react']
        }
      },
      {
        test: /\.css$/,
        loaders: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            plugins() {
              return [
                autoprefixer
              ];
            }
          }
        }]
      }
    ]
  },

  output: {
    filename: 'page/bundle.js'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    contentBase: './page'
  }
};
