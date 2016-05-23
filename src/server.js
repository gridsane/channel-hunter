import 'babel-polyfill';
import express from 'express';
import router from './server/router';
import bodyParser from 'body-parser';

const config = {
  port: parseInt(process.env.PORT || 3000),
};

const app = express();

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config.dev');

  webpackConfig.entry.push('webpack-hot-middleware/client');
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  const compiler = webpack(webpackConfig);

  app
    .use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
    }))
    .use(require('webpack-hot-middleware')(compiler))
    .get('/assets/style.css', (req, res) => res.send(''));
}

app
  .use(bodyParser.json())
  .use("/assets", express.static(__dirname + '/../assets'))
  .use(router(express.Router()))
  .listen(config.port, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log("Server listening on port " + config.port);
  });
