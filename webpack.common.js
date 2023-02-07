const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, 'src/index.ts'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		clean: true,
	},
	resolve: {
		extensions: ['.ts', '...'],
		alias: {
			core: path.resolve(__dirname, './src/core'),
			components: path.resolve(__dirname, './src/components'),
			pages: path.resolve(__dirname, './src/pages'),
			assets: path.resolve(__dirname, './src/assets'),
			styles: path.resolve(__dirname, './src/styles'),
			api: path.resolve(__dirname, './src/api'),
			utils: path.resolve(__dirname, './src/utils'),
			services: path.resolve(__dirname, './src/services'),
			tests: path.resolve(__dirname, './src/tests'),
			handlebars: 'handlebars/dist/handlebars.js',
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'index.html'),
			inject: 'body',
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src', 'assets/favicon.png'),
					to: '.',
				},
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: path.resolve(__dirname, 'tsconfig.json'),
							transpileOnly: true,
						},
					},
				],
				exclude: /(node_modules)/,
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: 'asset/resource',
				generator: {
					filename: 'style/[name][ext]',
				},
			},
		],
	},
	optimization: {
		minimizer: [new TerserPlugin()],
	},
};
