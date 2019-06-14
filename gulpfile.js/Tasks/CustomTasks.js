const gulp = require('gulp');
const rimraf = require('rimraf');
const exec = require('child_process').exec;

module.exports = {
	CleanTask: function cleanTask() {
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
	},
	WebpackTask: function webpackTask() {
		let child;
		child = exec('webpack', function(error, stdout, stderr) {
			console.log('stdout: ' + stdout);
			if (stderr !== '') {
				console.log('stderr: ' + stderr);
			}
			if (error !== null) {
				console.log('exec error: ' + error);
			}
			return Promise.resolve();
		});

		return child;
	}
};
