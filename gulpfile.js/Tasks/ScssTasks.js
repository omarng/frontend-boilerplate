const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const files = require('./FilePaths');

module.exports = {
	BuildTask: scssMainTask,
	ProductionTask: scssMainTask
};

function scssMainTask() {
	return gulp
		.src(files.scssPath)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(postcss([ autoprefixer() ]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/resources/css'));
}

function scssMainTask() {
	return gulp
		.src(files.scssPath)
		.pipe(sass())
		.pipe(postcss([ autoprefixer(), cssnano() ]))
		.pipe(gulp.dest('dist/resources/css'));
}
