// Initialize modules
const gulp = require('gulp'); // const {src, dest, watch, series, parallel} = require('gulp');
const Scss = require('./Tasks/ScssTasks'); // Sass task
const Js = require('./Tasks/JsTasks'); // JS task
const Html = require('./Tasks/HtmlTasks'); // lbInclude task
const CacheBusting = require('./Tasks/CacheBustingTasks'); // CacheBusting task
const Watch = require('./Tasks/WatchTasks'); // Watch task
const Custom = require('./Tasks/CustomTasks'); // Custom task

// Production Build - default task - npm run start
exports.default = gulp.series(
	gulp.parallel(Scss.ProductionTask, gulp.series(Js.ModuleTask, Js.ExtensionTask), Html.MainTask),
	CacheBusting.MainTask,
	Custom.CleanTask
);

// Development Build - npm run build
exports.devBuild = gulp.series(
	gulp.parallel(Scss.BuildTask, gulp.series(Js.ModuleTask, Js.ExtensionTask, Js.VersionTask), Html.MainTask),
	CacheBusting.MainTask,
	Custom.CleanTask
);

// Development Build with watch mode - npm run start
exports.watch = gulp.series(
	gulp.parallel(Scss.BuildTask, gulp.series(Js.ModuleTask, Js.ExtensionTask, Js.VersionTask), Html.MainTask),
	CacheBusting.MainTask,
	Custom.CleanTask,
	gulp.parallel(Watch.ScssTask, Watch.HtmlTask, Watch.JsTask)
);

// Mini Task
exports.ScssTask = gulp.series(Scss.BuildTask, CacheBusting.MainTask);
exports.JsTask = gulp.series(Js.ModuleTask, Js.ExtensionTask, Js.VersionTask);
exports.HtmlTask = gulp.series(Html.MainTask, CacheBusting.MainTask, Custom.CleanTask);
exports.CbTask = gulp.series(CacheBusting.MainTask);
exports.VersionTask = gulp.series(Js.VersionTask);
