module.exports = {
  mode: 'production',

  entry: './src/index.js',

  module: {
    rules: [
      {
        test: /\.js?$/,
        use: ['babel-loader'],
        exclude: [/node_modules/]
      }
    ]
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },

  output: {
    filename: 'react-sanfona.js',
    libraryTarget: 'umd',
    library: 'ReactSanfona',
    path: `${__dirname}/dist`,
  }
};
