
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


gulp.task('watch',  function () {

	watch([cssFolder + '/*.styl', cssFolder + '/parts/*.styl'], function() {
		runSequence('stylus')
	})

	watch(jsFolder + '/**/*.js', function() {
		runSequence('build')
	})

})


gulp.task('default', ['watch'])

