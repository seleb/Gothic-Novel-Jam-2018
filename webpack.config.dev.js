const { merge } = require('webpack-merge');
const base = require('./webpack.config.base.js');

module.exports = merge(base, {
	devtool: 'inline-source-map',

	// watcher
	devServer: {
		static: {
			directory: './dist',
		},
		hot: true,
		port: 80,
	},
});
