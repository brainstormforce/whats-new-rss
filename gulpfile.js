const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const minifyCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const headerComment = require('gulp-header-comment');

function handleScssBuild() {
	return gulp.src("src/scss/**/*.scss")
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist'));
}

function handleMinifyCSS() {
	return handleScssBuild()
		.pipe(gulp.src("dist/*.css"))
		.pipe(rename('whats-new-rss.min.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('dist/'))
}

function handleUglifyJS() {
	return gulp.src('dist/*.js')
		.pipe(rename('whats-new-rss.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/'));
}

function handleFileHeaders() {
	return gulp.src('dist/**')
		.pipe(headerComment(`
		=== Whats New RSS ===

		Version: <%= pkg.version %>
		Generated on: <%= moment().format('Do MMMM, YYYY') %>
		Documentation: https://github.com/brainstormforce/whats-new-rss/blob/master/README.md
		`)).pipe(gulp.dest('dist/'))
}

function copyHooks() {
	return gulp.src('src/hooks/*.js')
    .pipe(gulp.dest('dist/hooks/'));
}

gulp.task('sass', handleScssBuild);
gulp.task('sass:minify', handleMinifyCSS);
gulp.task('sass:watch', () => gulp.watch("src/scss/**/*.scss", handleScssBuild));
gulp.task('copyHooks', copyHooks);
gulp.task('uglify', handleUglifyJS);
gulp.task('headers', handleFileHeaders);
