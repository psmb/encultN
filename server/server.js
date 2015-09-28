import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

const isDev = process.env.NODE_ENV = 'development';
const isDebug = process.env.DEBUG;

if (isDev && isDebug && process.env.DEBUG.indexOf('shrimp:front') === 0) {
  const webpack = require('webpack');
  const makeConfig = require('../make-webpack-config.js');

  const config = makeConfig({
    sourcemaps: false,
    devtool: 'eval',
  });
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
} else {
  app.use('/static', express.static(path.join(__dirname, '../static')));
}

app.get('*', (req, res) => {
  res.send(
    '<!doctype html>' +
    '<html>' +
    '<head>' +
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
      '<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:300,400,500,700" type="text/css">' +
    '</head>' +
    '<body>' +
      '<div id="root"></div>' +
      '<script src="/static/bundle.js"></script>' +
    '</body>' +
    '</html>'
  );
});

app.listen(port);
