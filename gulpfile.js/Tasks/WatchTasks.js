const gulp = require('gulp');

module.exports = {
	MainTask: function watchTask() {
		gulp.watch(
			[ files.ScssPath, files.jsPath ],
			gulp.parallel(Scss.MainTask, gulp.series(Js.ModuleTask, Js.MainTask))
		);
	}
};
