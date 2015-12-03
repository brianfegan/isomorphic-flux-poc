var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function(){
	browserify('./scripts/main.js')
		.transform('reactify')
		.bundle()
		.pipe(source('main.js'))
		.pipe(gulp.dest('public/js'))
});

gulp.task('default',['browserify'], function(){
	return gulp.watch('scripts/**/*.*', ['browserify']);
});