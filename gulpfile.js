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

//gulp.task('copy', function(){
//	gulp.src('src/index.html')
//		.pipe(gulp.dest('dist'));
//	gulp.src('src/assets/**/*.*')
//		.pipe(gulp.dest('dist/assets'));
//});

gulp.task('default',['browserify'], function(){
	//return gulp.watch('public/js/**/*.*', ['browserify']);
	return gulp.watch('scripts/**/*.*', ['browserify']);
});