var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var production = process.env.NODE_ENV === 'production';
var path = require('path');

var plugins = [
	new CopyWebpackPlugin([
			{ from: 'src/__tests__/example.cwg' }
	]),
];

if(production) {
	plugins = plugins.concat([
		// This plugin minifies all the Javascript code of the final bundle
		new webpack.optimize.UglifyJsPlugin({
			mangle:   true,
			compress: {
				warnings: false, // Suppress uglification warnings
			},
		}),
		// this allows React to use the production build
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
	]);
}

module.exports = {
	debug: !production,
	devtool: production ? false : 'eval',
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/build/'
	},
	module: {
		loaders: [
			{
				test: /\.modernizrrc$/,
				loader: 'modernizr'
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.js$/,
				loader: 'babel',
				include: path.join(__dirname, '/src'),
				query: {
					presets: ['es2015', 'stage-0', 'react']
				}
			},
			{
				test: /\.css$/,
				loader: 'style!css'
			},
			{
				test:   /\.(png|gif|jpe?g|svg)$/i,
				loader: 'url?limit=10000',
			}
		]
	},
	plugins: plugins,
	resolve: {
		alias: {
			modernizr$: path.resolve(__dirname, '.modernizrrc')
		}
	}
};
