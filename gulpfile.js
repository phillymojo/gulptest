var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');

gulp.task('styles', function(){
	return reload();
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {},
		ghostMode: false,
		middleware: [historyApiFallback()]
		})
});

function handleErrors(){
	var args = Array.prototype.slice.call(arguments);
	notify.onError({
		title: 'Compile Error',
		message: '<%= error.message %>'
	}).apply(this, args);
	this.emit('end');
};

function buildScripts(file,watch){
	var props = {
		entries: ['./scripts/'+file],
		cache: {},
		packageCache: {},
		transform: [babelify.configure({presets: ["es2015", "react"]})]
	};

	var bundler = watch ? watchify(browserify(props)) : browserify(props);

	function rebundle(){
		var stream = bundler.bundle();
		return stream
			.on('error', handleErrors)
			.pipe(source(file))
			.pipe(gulp.dest('./build/'))
			.pipe(reload({stream: true}))
	};

	bundler.on('update', function(){
		rebundle();
		gutil.log('Rebundle...');
	})

	return rebundle();
};

gulp.task('scripts', function(){
	return buildScripts('main.js', false);
});

gulp.task('default', ['scripts', 'browser-sync'], function(){
	gulp.watch('./build/css/**/*', function(){reload()});
	return buildScripts('main.js', true);
});
