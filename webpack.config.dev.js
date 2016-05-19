var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

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
    new webpack.PrefetchPlugin('react'),
    new webpack.PrefetchPlugin('react-transform-hmr'),
    new webpack.PrefetchPlugin('radium'),
    new webpack.PrefetchPlugin('redux-persist'),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        loader: 'transform?brfs',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        loader: 'babel',
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
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        loaders: [
          'style?singleton',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss',
          'sass',
        ],
      },
    ],
  },
  postcss: [autoprefixer],
};
