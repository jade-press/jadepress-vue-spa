
'use strict'

let
ugly = require('gulp-uglify')
,gulp = require('gulp')
,watch = require('gulp-watch')
,plumber = require('gulp-plumber')
,newer = require('gulp-newer')
,stylus = require('gulp-stylus')
,concat = require('gulp-concat')
,rename = require('gulp-rename')
,runSequence = require('run-sequence')
,_ = require('lodash')
,path = require('path')
,fs = require('fs')
,exec = require('child_process').exec

let
cssFolder = __dirname + '/public/css'
,jsFolder = __dirname + '/src'

,stylusOptions = {
	compress: true
}

gulp.task('stylus', function() {

	gulp.src(cssFolder + '/*.styl')
		
/*		.pipe(newer({
			dest: cssFolder
			,map: function(path) {
				return path.replace(/\.styl$/, '.css')
			}
		}))*/
		.pipe(plumber())
		.pipe(stylus(stylusOptions))
		.pipe(gulp.dest(cssFolder))

})

//build
gulp.task('build',  function (cb) {

	exec('NODE_ENV=production webpack -p', function (err, stdout, stderr) {
		cb(stdout)
		cb(stderr)
		cb(err)
	})

})

//dev server
gulp.task('server-dev',  function (cb) {

	exec('node --debug build/dev-server.js', function (err, stdout, stderr) {
		cb(stdout)
		cb(stderr)
		cb(err)
	})

})

//webpack
gulp.task('webpack-dev',  function (cb) {
	var devPort = require('./build/dev-config').port
	exec('webpack-dev-server --inline --hot --content-base public/ --history-api-fallback --open --port ' + devPort, function (err, stdout, stderr) {
		cb(stdout)
		cb(stderr)
		cb(err)
	})

})

gulp.task('watch',  function () {

	watch([cssFolder + '/*.styl', cssFolder + '/parts/*.styl'], function() {
		runSequence('stylus')
	})

	watch(jsFolder + '/**/*.js', function() {
		runSequence('build')
	})

})


gulp.task('default', ['dev'])

gulp.task('dev', function() {
	runSequence(['server-dev', 'webpack-dev', 'watch'])
})