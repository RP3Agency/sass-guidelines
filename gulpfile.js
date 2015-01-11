/**
 * Establish our gulp/node plugins for this project.
 */
var gulp			= require('gulp'),

	// Sass/Compass/related CSSy things
	sass			= require('gulp-ruby-sass'),
	autoprefixer	= require('gulp-autoprefixer'),
	minifycss		= require('gulp-minify-css'),
	sourcemaps		= require('gulp-sourcemaps'),

	// File system
	concat			= require('gulp-concat'),
	rename			= require('gulp-rename'),
	del				= require('del'),

	// Notifications and error handling
	gutil			= require('gulp-util');

/**
 * Set our source and destination variables
 */
var // Project
	project			= 'wawf',	// a short code for establishing things like
								// the resulting JavaScript file, etc.

	// Source files
	src				= __dirname,
	src_sass		= src + '/_sass',

	// Destination files, WordPress
	dest_css		= __dirname + '/css';


/**
 * Now, let's do things.
 */

// Styles
gulp.task('styles', function() {
	return gulp.src(src_sass + '/*.scss')
		.pipe(sass({
			bundleExec: true,
			require: ['susy', 'breakpoint']
		}))
		.on( 'error', gutil.log )
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dest_css))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest(dest_css));
});


// Clean
gulp.task('clean', function() {
	del( [dest_css], function( err ) {
		console.log( 'CSS directory deleted.' );
	});
});

// Default: right now, just running build
gulp.task('default', function() {
	gulp.start('styles');
});


// Watch: watch our files and do things when they change
gulp.task('watch', function() {
	// Watch .scss files
	gulp.watch( src_sass + '/**/*.scss', ['styles'] );
});
