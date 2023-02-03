const path = require('path');

module.exports = {
	devtool: 'source-map',
	target: 'web',
	mode: 'development',
	devServer: {
		static: path.join(__dirname, 'dist'),
		compress: true,
		port: 3000,
		open: true,
		hot: true,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
};
