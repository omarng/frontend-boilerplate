const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const exec = require('child_process').exec;

module.exports = {
	ModuleTask: function jsModuleTask() {
		return gulp.src('src/js/myModule/_*.js').pipe(concat('myModule.js')).pipe(gulp.dest('src/js/myModule'));
	},
	ExtensionTask: function jsExtensionTask() {
		return gulp
			.src([ 'src/js/_main.js', 'src/js/myExtension/_myExtension.js' ])
			.pipe(concat('main.js'))
			.pipe(gulp.dest('src/js'));
	},
	VersionTask: function jsVersionTask() {
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
};
