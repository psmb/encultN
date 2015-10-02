import express from 'express';
import request from 'request';
import path from 'path';

import React from 'react';
import { RoutingContext, match } from 'react-router';
import { Provider } from 'react-redux';
import createLocation from 'history/lib/createLocation';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';

import store from 'redux/store';
import routes from 'redux/routes';

import { fetchQuestions } from 'redux/modules/voting';
import { fetchState as fetchWorldviews } from 'redux/modules/worldviews';



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

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Izm</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:300,400,500,700" type="text/css">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `;
}

function handleRender(req, res) {
  const location = createLocation(req.url);
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      res.status(500).send(error.message);
    } else if (renderProps === null) {
      res.status(404).send('Not found');
    } else {
      Promise.all([
        store.dispatch(fetchWorldviews()),
        store.dispatch(fetchQuestions()),
      ]).then(
        () => {
          const html = React.renderToString(
            <div>
              <Provider store={store}>
                {() =>
                  <RoutingContext {...renderProps}/>
                }
              </Provider>
            </div>
          );
          const initialState = store.getState();
          res.send(renderFullPage(html, initialState));
        }
      );
    }
  });
}

function handleApi(req, res) {
  const apiUrl = 'http://dev.enculturation.dev';
  const requestUrl = req.url.replace('/api/', '/');
  const url = apiUrl + requestUrl;
  request(url).pipe(res);
}

app.get('/api/*', handleApi);
app.get('*', handleRender);
app.listen(port);
