const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const minifyCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

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

gulp.task('sass', handleScssBuild);
gulp.task('sass:minify', handleMinifyCSS);
gulp.task('sass:watch', () => gulp.watch("src/scss/**/*.scss", handleScssBuild));
gulp.task('uglify', handleUglifyJS);
