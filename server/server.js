// This file is a mumbo-jumbo, that should be refactored
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import favicon from 'serve-favicon';
import proxy from 'express-http-proxy';
import path from 'path';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {RoutingContext, match} from 'react-router';
import {Provider} from 'react-redux';
import createLocation from 'history/lib/createLocation';

import getStore from 'redux/store';
import getRoutes from 'redux/routes';

import {fetchQuestions, initVotes, fetchWorldviews} from 'redux/modules/voting';

delete process.env.BROWSER;

const app = express();
const port = process.env.PORT || 3000;
const apiEndpoint = process.env.API_ENDPOINT || 'http://izm.io:8888';

const isDev = process.env.NODE_ENV === 'development';

app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

if (isDev) {
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
}
app.use('/static', express.static(path.join(__dirname, '../static'), { maxAge: 2678400000 }));
app.use(favicon(__dirname + '/../static/favicons/favicon.ico'));

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Izm</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:300,400,500,700" type="text/css">
        <link rel="apple-touch-icon" sizes="57x57" href="/static/favicons/apple-touch-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/static/favicons/apple-touch-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/static/favicons/apple-touch-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/static/favicons/apple-touch-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/static/favicons/apple-touch-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/static/favicons/apple-touch-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/static/favicons/apple-touch-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/static/favicons/apple-touch-icon-180x180.png">
        <link rel="icon" type="image/png" href="/static/favicons/favicon-32x32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="/static/favicons/android-chrome-192x192.png" sizes="192x192">
        <link rel="icon" type="image/png" href="/static/favicons/favicon-96x96.png" sizes="96x96">
        <link rel="icon" type="image/png" href="/static/favicons/favicon-16x16.png" sizes="16x16">
        <link rel="manifest" href="/static/favicons/manifest.json">
        <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5">
        <link rel="shortcut icon" href="/static/favicons/favicon.ico">
        <meta name="apple-mobile-web-app-title" content="Izm">
        <meta name="application-name" content="Izm">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="msapplication-TileImage" content="/static/favicons/mstile-144x144.png">
        <meta name="msapplication-config" content="/static/favicons/browserconfig.xml">
        <meta name="theme-color" content="#ec4401">
        ${isDev ? '' : '<link href="/static/build/styles.css?1" rel="stylesheet" />'}
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script defer src="/static/build/bundle.js"></script>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
        <script defer src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
        <!-- Yandex.Metrika counter -->
        <script type="text/javascript">
            (function (d, w, c) {
                (w[c] = w[c] || []).push(function() {
                    try {
                        w.yaCounter = new Ya.Metrika({
                            id:33181593,
                            clickmap:true,
                            trackLinks:true,
                            accurateTrackBounce:true,
                            webvisor:true
                        });
                    } catch(e) { }
                });

                var n = d.getElementsByTagName("script")[0],
                    s = d.createElement("script"),
                    f = function () { n.parentNode.insertBefore(s, n); };
                s.type = "text/javascript";
                s.async = true;
                s.src = "https://mc.yandex.ru/metrika/watch.js";

                if (w.opera == "[object Opera]") {
                    d.addEventListener("DOMContentLoaded", f, false);
                } else { f(); }
            })(document, window, "yandex_metrika_callbacks");
        </script>
        <noscript><div><img src="https://mc.yandex.ru/watch/33181593" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
        <!-- /Yandex.Metrika counter -->
      </body>
    </html>
    `;
}

function handleRender(req, res) {
  if (req.url === '/') {
    const preferedLocale = req.acceptsLanguages('ru', 'en') || 'ru';
    res.redirect(`/${preferedLocale}`);
  } else if (req.url.substring(0, 3) === '/en' || req.url.substring(0, 3) === '/ru') {
    const location = createLocation(req.url);
    const store = getStore(true);
    const routes = getRoutes(store);
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        res.status(500).send(error.message);
      } else if (renderProps === null) {
        res.status(404).send('Not found');
      } else {
        const promises = [
          store.dispatch(fetchWorldviews()),
          store.dispatch(fetchQuestions()),
        ];
        renderProps.routes.map(route => {
          if (route.onEnter) {
            promises.push(route.onEnter(renderProps));
          }
        });
        Promise.all(promises).then(
          () => {
            const votesFromCookies = {};
            Object.keys(req.cookies).map(key => {
              if (key.indexOf('vote_in_') === 0) {
                const questionId = key.slice(8);
                votesFromCookies[questionId] = req.cookies[key];
              }
            });
            store.dispatch(initVotes(votesFromCookies));
            const html = ReactDOMServer.renderToString(
              <div>
                <Provider store={store}>
                  <RoutingContext {...renderProps}/>
                </Provider>
              </div>
            );
            const initialState = store.getState();
            res.send(renderFullPage(html, initialState));
          }
        );
      }
    });
  } else {
    res.status(404).send('Not found');
  }
}


app.use('/api', proxy(apiEndpoint, {
  forwardPath: (req) => req.url,
}));
app.get('*', handleRender);
app.listen(port);
