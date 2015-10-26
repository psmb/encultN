import path from 'path';
import webpack from 'webpack';
import loadersByExtension from './utils/loadersByExtension.js';
const autoprefixer = 'autoprefixer?browsers=last 2 version';

const loadersByExt = loadersByExtension({
  'json': 'json',
  'png|jpg|gif': 'url?limit=5000',
  'woff|woff2': 'url?limit=1',
  'svg': 'url?limit=10000',
});


/** options
 * @option optimize {bool}    // optimize js if true
 * @option sourcemaps {bool}  // generate sourcemaps if true (!rewrite devtool!)
 * @option devtool {string}   // specify devtool
 */

module.exports = (options) => {
  const config = {
    entry: [
      './app/app',
    ],
    output: {
      path: path.join(__dirname, 'static'),
      filename: 'bundle.js',
      publicPath: '/static/',
    },
    plugins: [
      new webpack.DefinePlugin({
        OPTIMIZED: !!options.optimize,
        DEBUG: !options.optimize,
      }),
    ],

    resolve: {
      root: path.join(__dirname, 'app'),
      extensions: ['', '.js', '.jsx'],
      modulesDirectories: [
        'app',
        'node_modules',
      ],
    },

    resolveLoader: {
      root: [
        path.join(__dirname, 'node_modules'),
        __dirname,
      ],
    },

    module: {
      loaders: loadersByExt.concat([
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: path.join(__dirname, 'app'),
        },
        {
          test: /\.css$/,
          loader: 'style!css!' + autoprefixer,
        },
        {
          test: /\.scss$/,
          loader: 'style!css!' + autoprefixer + '!sass',
        },
        {
          test: require.resolve('react'),
          loader: 'imports?shim=es5-shim/es5-shim&sham=es5-shim/es5-sham',
        },
      ]),
    },
  };

  if (options.optimize) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.DedupePlugin(),
    );
    options.devtool = null;
    options.sourcemaps = null;
  } else {
    config.entry.unshift('webpack-hot-middleware/client');
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    );
  }

  if (options.sourcemaps) {
    config.devtool = '#inline-source-map';
  } else if (options.devtool) {
    config.devtool = options.devtool;
  }

  return config;
};
