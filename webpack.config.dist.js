var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',

  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel?loose=all', exclude: /node_modules/ }
    ]
  },

  externals: {
    react: 'react'
  },

  output: {
    filename: 'dist/react-sanfona.js',
    libraryTarget: 'umd',
    library: 'ReactSanfona'
  },

  plugins: [
    new webpack.optimize.DedupePlugin()
  ],

  resolve: {
    extensions: ['', '.jsx', '.js']
  }
};
