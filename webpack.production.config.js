'use strict';

var path = require('path');
var webpack = require('webpack');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
	entry: [
		path.join(__dirname, 'src/index.js')
	],
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
				screw_ie8: true
			}
		}),
		new StatsPlugin('webpack.stats.json', {
			source: false,
			modules: false
		}),
		new webpack.IgnorePlugin(new RegExp("^(node-localstorage)$")),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
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
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel-loader?optional[]=runtime&stage=0'
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
