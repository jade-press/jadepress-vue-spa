
'use strict'

process.env.NODE_ENV = 'development'

let config0 = require('./config')
,port = config0.port
,MongoClient = require('mongodb').MongoClient
,pack = require('../../package.json')
,path = require('path')
,co = require('co')

let config = require('../../node_modules/jade-press/config-sample')
config.setting.theme = {
	path: path.resolve(__dirname, '../..')
	,name: pack.name
	,version: pack.version
}
config.setting.plugins = {}
config.setting.mongoStoreOptions.url = 'mongodb://127.0.0.1:27017/test0'
config.setting.dbLink = 'mongodb://127.0.0.1:27017/test0'
config.local.port = port

let init = require('jade-press').init

co(function* () {
	let dd = yield MongoClient.connect(config.setting.dbLink)
	yield dd.dropDatabase()
	let res = yield init(config)
	return Promise.resolve(res)
})
.then(function(app) {

	app.listen(port, config.setting.listenAddress, function() {
		console.log('' + new Date(), config.local.siteName, 'runs on port', port)


		// 2. run the nightwatch test suite against it
		// to run in additional browsers:
		//    1. add an entry in test/e2e/nightwatch.conf.json under "test_settings"
		//    2. add it to the --env flag below
		// For more information on Nightwatch's config file, see
		// http://nightwatchjs.org/guide#settings-file

		var spawn = require('cross-spawn')
		var runner = spawn(
			'./node_modules/.bin/nightwatch',
			[
				'--config', 'test/e2e/nightwatch.conf.js',
				'--env', 'chrome'
			],
			{
				stdio: 'inherit'
			}
		)

		runner.on('exit', function (code) {
			process.exit(code)
		})

		runner.on('error', function (err) {
			throw err
		})

	})
	
})

