var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var production = process.env.NODE_ENV === 'production';
var path = require('path');

var plugins = [
	new CopyWebpackPlugin({
    patterns: [
			{ from: 'src/__tests__/example.cwg' }
    ]
  }),
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
	devtool: production ? false : 'eval',
	entry: './src/main.tsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/build/'
	},
	module: {
		rules: [
			{
				test: /\.modernizrrc$/,
				use: ['modernizr-loader', 'json-loader']
			},
			{
				test: /\.json$/,
				use: 'json-loader'
      },
      {
        test: /\.ts(x)?$/,
        use: [
          'awesome-typescript-loader'
        ],
        exclude: /node_modules/
      },
			{
				test: /\.js$/,
				use: 'babel-loader',
				include: path.join(__dirname, '/src'),
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test:   /\.(png|gif|jpe?g|svg)$/i,
				use: 'url-loader?limit=10000',
			}
		]
	},
	plugins: plugins,
	resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.tsx',
      '.ts'
    ],
		alias: {
			modernizr$: path.resolve(__dirname, '.modernizrrc')
		}
	}
};
