'use strict';

const gulp = require('gulp');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const colors = require('colors');

const bundleTask = function () {
	gulp.src('src/entry.js').pipe(webpack({
		output: {
			filename: 'bundle.js'
		}
	})).pipe(babel({
		presets: ['env']
	})).pipe(gulp.dest('static/js/')).on('end',function () {
		console.log('[Webpack] Compiled'.cyan);
	});

}

gulp.task('default', ['browser-sync'], function () {});

gulp.task('browser-sync', ['nodemon'], function () {
	browserSync.init(null, {
		proxy: "http://localhost:5000",
		files: ["static/**/*.*"],
		browser: "chrome",
		port: 7000,
	});
});

gulp.task('nodemon', function (cb) {

	var started = false;

	bundleTask();

	return nodemon({
		script: 'index.js',
		ignore: ['./.vscode/','./src/','./static/', 'gulpfile.js']
	}).on('start', function () {
		if (!started) {
			cb();
			started = true;
		}
	}).on('restart', function () {
		bundleTask();
	});
});