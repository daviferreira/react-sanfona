'use strict';

const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'production',

  entry: {
    demo: ['./demo/index.js']
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react']
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

  optimization: {
    minimize: true
  },

  output: {
    path: `${__dirname}/page`,
    filename: 'bundle.js'
  }
};
