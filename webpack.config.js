var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var precss = require('precss')
var postcssCssnext = require('postcss-cssnext')
var postcssImport = require('postcss-import')
var postcssUrl = require('postcss-url')

var plugins = {
    define: new webpack.DefinePlugin({
      __NODE_ENV__: JSON.stringify(process.env.NODE_ENV),
      'process.env': Object.keys(process.env).reduce(function(o, k) {
        o[k] = JSON.stringify(process.env[k]);
        return o;
      }, {})
    }),
    occurenceOrder: new webpack.optimize.OccurrenceOrderPlugin(),
    dedupe: new webpack.optimize.DedupePlugin(),
    replace: new webpack.HotModuleReplacementPlugin(),
    errors: new webpack.NoErrorsPlugin()
};

module.exports = {
	entry: path.resolve(__dirname, 'main.js'),
	output: {
		path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
		filename: 'main.js'
	},
	devServer: {
    host: '127.0.0.1',
		port: 4000,
    historyApiFallback: true // required to use browserHistory (i.e. no hash) for react-router
	},
  devtool: 'eval-source-map', // turn off for production build
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
			},
      {
        test:   /\.json$/,
        loader: 'json-loader'
      },
			{
        test:   /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
			{
				test: /\.(png|jpg|gif|svg|woff|ttf|otf|eot)$/,
				loader: 'url-loader?limit=8192'
			},
      {
        test: /node_modules\/auth0-lock\/.*\.js$/,
        loaders: [
          'transform-loader/cacheable?brfs',
          'transform-loader/cacheable?packageify'
        ]
      },
      {
        test: /node_modules\/auth0-lock\/.*\.ejs$/,
        loader: 'transform-loader/cacheable?ejsify'
      }
		]
	},
	postcss: function () {
    return [
      autoprefixer,
      precss,
      postcssImport({addDependencyTo: webpack}),
      postcssCssnext(),
      postcssUrl()
    ]
  },
	resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.json'],
    root: [path.resolve('./modules'), path.resolve('./routes/shared')]
  },
  // node: {
  //   fs: 'empty'
  // },
  plugins: [
    plugins.define,
    plugins.occurenceOrder,
    plugins.dedupe,
    plugins.replace,
    plugins.errors
  ]
}
