var webpack = require('webpack')
var path = require('path')

let config = {
	entry: {
		app: './src/index.js',
	},
	output: {
		filename: 'bundle.js',
		publicPath: '/js/',
		path: path.resolve(__dirname, 'public/js/'),
		libraryTarget: 'var',
	},
	externals: {
	 	'vue': 'Vue'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	devtool: '#eval-source-map',
	module: {
		loaders: [
			{
				test: /\.js[x]?$/,
				loaders: ['babel'],
				include: path.join(__dirname, '/src')
			}
			,{
				test: /\.(html|css)$/,
				loader: 'raw-loader'
			}
		]
	}
	,devServer: {
		hot: true
		,quiet: false
		,proxy: {
			'*': {
				target: 'http://localhost:9809',
				secure: false,
				ws: false,
				bypass: function(req, res, opt) {
					if(/\.json$/.test(req.path) || /\.bundle\.js/.test(req.path)) {
						console.log('bypass', req.path)
						return req.path
					}
				}
			}
		}
	}
}

if(process.env.NODE_ENV === 'production') {

	config.plugins = [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.MinChunkSizePlugin({
			minChunkSize: 51200, // ~50kb
		}),
		new webpack.optimize.UglifyJsPlugin({
			mangle:   true,
			compress: {
					warnings: false, // Suppress uglification warnings
			}
		})
    ,new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'production'"
      }
    })
	]

	delete config.devtool
	delete config.devServer

}

module.exports = config