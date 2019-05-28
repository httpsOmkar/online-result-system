const {LicenseWebpackPlugin} = require('license-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const productionPlugins = [
	new TerserPlugin({
		parallel: true,
		terserOptions: {
			ecma: 6,
			output: {
				comments: false,
			},
		},
	}),
	new LicenseWebpackPlugin({
		outputFilename: 'LICENSE',
		stats: {
			warnings: false,
			errors: true,
		},
	}),
	new webpack.BannerPlugin({
		banner: `Copyright ${new Date().getFullYear()} F4ERP. All rights reserved. LICENSES can be found at /LICENSE`,
	}),
];

module.exports = {
	entry: {
		index: './app/index.ts',
	},

	devtool: isProduction ? undefined : 'inline-source-map',

	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'templates')
	},

	plugins: [
		new CleanWebpackPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
		new HtmlWebpackPlugin({
			title: 'F4ERP Tracking console',
			lang: 'en-US',
			minify: isProduction,
			template: 'app/index.html.tera',
			inject: false,
		}),
		new SriPlugin({
			hashFuncNames: ['sha256', 'sha384'],
		}),

	],

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loaders: 'babel-loader!ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'file-loader?name=/public/assets/[name].[ext]',
			},
			{
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel-loader',

				options: {
					plugins: ['syntax-dynamic-import'],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				},

				test: /\.js$/
			},
			{
				test: /\.(scss|css)$/,

				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			}
		]
	},

	mode: 'development',

	optimization: {
		minimizer: [
			...(isProduction ? productionPlugins : []),
		],
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	}
};
