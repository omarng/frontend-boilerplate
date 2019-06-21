const gulp = require('gulp');
const replace = require('gulp-replace');

const cbString = new Date().getTime();

module.exports = {
	MainTask: cacheBustTask
};

function cacheBustTask() {
	return gulp.src([ 'dist/index.html' ]).pipe(replace(/cb=\d+/g, 'cb=' + cbString)).pipe(gulp.dest('./dist/'));
}
