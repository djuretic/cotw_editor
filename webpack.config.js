module.exports = {
	entry: './src',
	output: {
		path: 'build',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				include: __dirname + '/src',
				query: {
					presets: ['es2015', 'stage-0', 'react']
				}
			}
		]
	}
}