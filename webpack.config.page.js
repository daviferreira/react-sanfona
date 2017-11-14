'use strict';

const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',

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
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      }
    })
  ]
};
