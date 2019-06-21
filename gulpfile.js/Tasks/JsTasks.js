const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const exec = require('child_process').exec;
const chalk = require('chalk');

module.exports = {
	ModuleTask: jsModuleTask,
	ExtensionTask: jsExtensionTask,
	VersionTask: jsVersionTask
};

function jsModuleTask() {
	return gulp.src('src/js/myModule/_*.js').pipe(concat('myModule.js')).pipe(gulp.dest('src/js/myModule'));
}

function jsExtensionTask() {
	return gulp
		.src([ 'src/js/_main.js', 'src/js/myExtension/_myExtension.js' ])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('src/js'));
}

function jsVersionTask() {
	let child;
	child = exec('node src/js/version/fetchVersion.js', function(error, stdout, stderr) {
		console.log(chalk.black.bgCyan('stdout: ' + stdout));
		if (stderr !== '') {
			console.log(chalk.black.bgRed('stderr: ' + stderr));
		}
		if (error !== null) {
			console.log(chalk.black.bgRed('exec error: ' + error));
		}
		return gulp
			.src([ 'src/js/main.js', 'src/js/version/_version.js' ])
			.pipe(concat('main.js'))
			.pipe(gulp.dest('src/js'));
	});

	return child;
}
