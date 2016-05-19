var gulp = require('gulp')
	, jshint = require('gulp-jshint')
	, qunit = require('gulp-qunit');

gulp.task('jshint-stop-on-fail', function() {
	return gulp.src('src/**/*.js')
		.pipe(jshint({
			laxcomma : true,
			multistr : true
		}))
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});

gulp.task('run-tests', function() {
	return gulp.src('./test/test-runner.html')
		.pipe(qunit());
});

gulp.task('develop', function() {
	gulp.watch('src/**/*.js', ['jshint-stop-on-fail', 'run-tests']);
	gulp.watch('test/**/*.js', ['jshint-stop-on-fail', 'run-tests']);
});
