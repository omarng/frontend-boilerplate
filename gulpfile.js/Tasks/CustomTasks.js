const gulp = require('gulp');
const rimraf = require('rimraf');
const exec = require('child_process').exec;
const chalk = require('chalk');

module.exports = {
	CleanTask: cleanTask,
	WebpackTask: webpackTask
};

function cleanTask() {
	rimraf('dist/components', function() {
		console.log(chalk.black.bgCyan('components folder deleted successfully'));
	});
	rimraf('dist/articles', function() {
		console.log(chalk.black.bgCyan('articles folder deleted successfully'));
	});
	rimraf('dist/texts', function() {
		console.log(chalk.black.bgCyan('texts folder deleted successfully'));
	});
	return Promise.resolve();
}

function webpackTask() {
	let child;
	child = exec('webpack', function(error, stdout, stderr) {
		console.log(chalk.black.bgCyan('stdout: ' + stdout));
		if (stderr !== '') {
			console.log(chalk.black.bgRed('stderr: ' + stderr));
		}
		if (error !== null) {
			console.log(chalk.black.bgRed('exec error: ' + error));
		}
		return Promise.resolve();
	});

	return child;
}
