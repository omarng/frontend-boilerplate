const gulp = require('gulp');
const rimraf = require('rimraf');

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
	}
};
