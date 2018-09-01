'use strict';

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'development',

  devtool: 'eval',

  entry: {
    demo: ['webpack/hot/dev-server', './demo/index.js']
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/react']
            }
          }
        ],
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [autoprefixer];
              }
            }
          }
        ]
      }
    ]
  },

  output: {
    filename: 'demo/bundle.js'
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],

  devServer: {
    contentBase: './demo'
  }
};
