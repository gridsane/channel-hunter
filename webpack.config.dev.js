var path = require('path');
var webpack = require('webpack');

module.exports = {
  cache: true,
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    './src/client',
  ],
  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'bundle.js',
    publicPath: '/assets/',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'transform?brfs',
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'src'),
        query: {
          plugins: [
            ['react-transform', {
              'transforms': [{
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module'],
              }, {
                transform: 'react-transform-catch-errors',
                imports: ['react', 'redbox-react'],
              }],
            }],
          ],
        },
      },
    ],
  },
};
