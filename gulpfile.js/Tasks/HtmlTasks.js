const gulp = require('gulp');
const lbInclude = require('gulp-lb-include');
const files = require('./FilePaths');

const defaults = {
	'${pageTitle}': ''
};

module.exports = {
	MainTask: htmlMainTask
};

function htmlMainTask() {
	return gulp.src(files.htmlPath).pipe(lbInclude({ varDefaults: defaults })).pipe(gulp.dest('dist/'));
}
