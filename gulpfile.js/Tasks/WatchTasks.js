const gulp = require('gulp');
const Scss = require('./ScssTasks');
const Js = require('./JsTasks');
const Html = require('./HtmlTasks');
const files = require('./FilePaths');
const Custom = require('./CustomTasks');
const CacheBusting = require('./CacheBustingTasks');

module.exports = {
	ScssTask: function watchScssTask() {
		gulp.watch([ files.scssPath ], { delay: 1000 }, gulp.series([ Scss.BuildTask, CacheBusting.MainTask ]));
	},
	JsTask: function watchJsTask() {
		gulp.watch(
			[ files.jsModulePath, files.jsExtensionPath, files.jsMainPath ],
			{ delay: 3000 },
			gulp.series([ Js.ModuleTask, Js.ExtensionTask, Js.VersionTask, Custom.WebpackTask, CacheBusting.MainTask ])
		);
	},
	HtmlTask: function watchHtmlTask() {
		gulp.watch([ files.htmlPath ], { delay: 500 }, gulp.series([ Html.MainTask, Custom.CleanTask ]));
	}
};
