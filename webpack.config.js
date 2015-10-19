'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'eval-source-map',
	entry: [
		'webpack-hot-middleware/client?reload=true',
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/dist'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.IgnorePlugin(new RegExp("^(node-localstorage)$")),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	],
	resolve: {
		modulesDirectories: [
			'src',
			'node_modules'
		],
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader?optional[]=runtime&stage=0',
				exclude: /node_modules/,
				include: __dirname
			}, 
			{
				test: /\.json?$/,
				loader: 'json'
			},
			{
				test: /\.css?$/,
				loaders: ['style', 'raw'],
				include: __dirname
			}, 
			{ test: /\.(jpe?g|png|gif|svg)$/, 
				loader: 'url', 
				query: {limit: 10240} 
			}
		]
	}
};


