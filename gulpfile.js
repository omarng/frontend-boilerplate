// Initialize modules
const gulp = require('gulp');
// const {src, dest, watch, series, parallel} = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const lbInclude = require('gulp-lb-include');
const rimraf = require('rimraf');
const exec = require('child_process').exec;

// File path variables
const files = {
	scssPath: 'src/scss/**/*.scss',
	jsPath: 'src/js/**/*.js',
	htmlPath: 'src/html/**/*.html'
};
// Sass task
function scssTask() {
	return gulp
		.src(files.scssPath)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(postcss([ autoprefixer(), cssnano() ]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/resources/css'));
}

// JS task
function jsMainTask() {
	return gulp.src('src/js/_main.js').pipe(concat('main.js')).pipe(gulp.dest('src/js'));
}
function jsModuleTask() {
	return gulp.src('src/js/myModule/_*.js').pipe(concat('myModule.js')).pipe(gulp.dest('src/js/myModule'));
}
function jsExtensionTask() {
	return gulp
		.src([ 'src/js/main.js', 'src/js/myExtension/_myExtension.js' ])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('src/js'));
}
function jsVersionTask() {
	let child;
	child = exec('node src/js/version/fetchVersion.js', function(error, stdout, stderr) {
		console.log('stdout: ' + stdout);
		if (stderr !== '') {
			console.log('stderr: ' + stderr);
		}
		if (error !== null) {
			console.log('exec error: ' + error);
		}
		return gulp
			.src([ 'src/js/main.js', 'src/js/version/_version.js' ])
			.pipe(concat('main.js'))
			.pipe(gulp.dest('src/js'));
	});

	return child;
}

// lbInclude task
const defaults = {
	'${pageTitle}': ''
};
function htmlTask() {
	return gulp.src(files.htmlPath).pipe(lbInclude({ varDefaults: defaults })).pipe(gulp.dest('dist/'));
}

// Cachebusting task
const cbString = new Date().getTime();
function cacheBustTask() {
	return gulp.src([ 'dist/index.html' ]).pipe(replace(/cb=\d+/g, 'cb=' + cbString)).pipe(gulp.dest('./dist/'));
}

// Watch task
function watchTask() {
	gulp.watch([ files.scssPath, files.jsPath ], gulp.parallel(scssTask, gulp.series(jsModuleTask, jsMainTask)));
}

// Custom task
function cleanTask() {
	rimraf('dist/components', function() {
		console.log('components folder deleted successfully');
	});
	rimraf('dist/articles', function() {
		console.log('articles folder deleted successfully');
	});
	rimraf('dist/texts', function() {
		console.log('texts folder deleted successfully');
	});
	return Promise.resolve();
}

// Default Task
exports.default = gulp.series(
	gulp.parallel(scssTask, gulp.series(jsModuleTask, jsMainTask), htmlTask),
	cacheBustTask,
	cleanTask
);

// Development Build
exports.devBuild = gulp.series(
	gulp.parallel(scssTask, gulp.series(jsModuleTask, jsMainTask, jsExtensionTask, jsVersionTask), htmlTask),
	cacheBustTask,
	cleanTask
);

// Build with watch mode
exports.watch = gulp.series(
	gulp.parallel(scssTask, gulp.series(jsModuleTask, jsMainTask), htmlTask),
	cacheBustTask,
	cleanTask,
	watchTask
);

// Mini Task
exports.ScssTask = gulp.series(scssTask, cacheBustTask);
exports.JsTask = gulp.series(jsModuleTask, jsMainTask, jsExtensionTask, jsVersionTask);
exports.HtmlTask = gulp.series(htmlTask, cacheBustTask, cleanTask);
exports.CbTask = gulp.series(cacheBustTask);
exports.JsVersionTask = gulp.series(jsVersionTask);
