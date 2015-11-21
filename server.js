import path from 'path';
import express from 'express';
import router from './src/server/router';
import bodyParser from 'body-parser';

const config = {
  port: parseInt(process.env.PORT || 3000),
};

const app = express();

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.dev');

  webpackConfig.entry.push('webpack-hot-middleware/client');
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
} else {
  app.use("/assets", express.static(__dirname + "/assets"));
}

app
  .use(bodyParser.json())
  .use("/assets", express.static(__dirname + '/../assets'))
  .use('/api', router(express.Router()))
  .use(function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  })
  .listen(config.port, function (err) {
    if (err) {
      console.error(err);
    }

    console.log("Server listening on port " + config.port);
  });
