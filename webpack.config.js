module.exports = {
	entry: './scripts/main.js',
	output: {
		path: './public/js/',
		filename: "main.js"
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: ["babel"],
			query: {
				presets:['react', 'es2015']
			}
		}]
	}
}