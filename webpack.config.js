var path = require('path');
var webpack = require('webpack');

var STATIC_PATH = path.join(__dirname, './ps_crud/static/ps_crud/');
var JS_PATH = path.join('js');
var NODE_PATH = path.join(__dirname, 'node_modules')

config = {
  debug: true,
  devtool: 'source-map',
  context: STATIC_PATH,
  include: [path.resolve(JS_PATH)],
  entry: path.join(STATIC_PATH, JS_PATH, 'src', 'main.js'),
  output: {
    filename: path.join(JS_PATH, 'assets', '__[name].js'),
    path: STATIC_PATH,
    publicPath: "../"
  },
  resolveLoader: {
    root: NODE_PATH,
  },
  resolve: {
    unsafeCache: true,
    modulesDirectories: ['node_modules', 'bower_components'],
    alias: {
      'materialize-js': path.join(
        NODE_PATH, '/materialize-css/dist/js/materialize.min.js'
      ),
      jQuery: path.join(
        NODE_PATH, 'jquery/src/jquery.js'
      )
    }
  },
  module: {
    preLoaders: [{
      test: /jquery\/src\/selector-sizzle\.js$/,
      loader: 'string-replace',
      query: {
        search: '../external/sizzle/dist/sizzle',
        replace: 'sizzle'
      }
    }],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel?presets=es2015',
        exclude: /(node_modules|bower_components)/
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.$": "jquery",
      "window.jQuery": "jquery"
    })
  ]
}

if (process.env.NODE_ENV == 'production') {
  plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]
  config['plugins'].concat(plugins);
  config['debug'] = false;
}
module.exports = config ;
