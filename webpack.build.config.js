var webpack = require("webpack");
var version = require("./package.json").version;
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StatsPlugin = require("stats-webpack-plugin");

var loaders = [
	{
		"test": /\.js?$/,
		"exclude": /node_modules/,
		"loader": "babel"
	},
	{
		"test": /\.vue?$/,
		"loader": "vue"
	}
];
var cssFileName;
if (process.env.FULL_BUNDLE !== "false") {
	cssFileName = "next-form.css";
} else {
	cssFileName = "next-form-core.css";
}

module.exports = [
	{
		entry: "./src/index.js",
		output: {
			path: "./dist",
			filename: "next-form.js",
			library: "NextForm",
			libraryTarget: "umd"
		},

		plugins: [
			new webpack.DefinePlugin({
				"process.env" : {
					NODE_ENV : JSON.stringify("production")
				}
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			}),
			new webpack.optimize.DedupePlugin(),
		
			new ExtractTextPlugin(cssFileName, { allChunks: true }),
			new StatsPlugin("../stats.json", {
				chunkModules: true
				//exclude: [/node_modules[\\\/]react/]
			})
		],

		module: {
			loaders
		},

		vue: {
			loaders: {
				css: ExtractTextPlugin.extract("css"),
				postcss: ExtractTextPlugin.extract("css"),
				sass: ExtractTextPlugin.extract("css!sass"),
			}
		},

		resolve: {
			packageAlias: "browser"
		}
	}

];