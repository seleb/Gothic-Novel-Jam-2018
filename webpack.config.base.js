const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const package = require('./package');

module.exports = {
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	module: {
		rules: [{
			test: /\.js(x)?$/, // source
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader'
			}
		}, {
			test: /\.strand$/,
			use: 'raw-loader'
		}, {
			test: /\.css$/, // stylesheets
			use: [
				'style-loader',
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						postcssOptions: {
							plugins: [
								require('autoprefixer')(),
								require('postcss-clean')(),
							],
						},
					},
				},
			]
		}, {
			test: /\.(png|woff)$/, // assets
			type: 'asset/inline',
		}]
	},
	entry: {
		index: './src/index.js'
	},
	output: {
		filename: '[name].[contenthash].bundle.js',
		clean: true,
		path: path.resolve(__dirname, 'public')
	},
	plugins: [
		new HtmlWebpackPlugin({ // creates index.html
			title: package.description,
			meta: {
				viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
			},
			minify: true,
			favicon: './src/assets/icon.png'
		})
	],
};
