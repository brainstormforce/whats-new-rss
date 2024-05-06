const fs = require('fs');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const minifyCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const headerComment = require('gulp-header-comment');

const hookContent = `
function useWhatsNewRSS(args) {
	let wnr = null;
	useEffect(() => {
		if (!wnr) {
			wnr = new WhatsNewRSS(args);
		}
	}, [args])
}
export default useWhatsNewRSS;
`;

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

gulp.task('generate-react-files', function (done) {
	fs.readFile('dist/whats-new-rss.js', 'utf8', (err, data) => {
		if (err) throw err;

		fs.mkdir('dist/react/', function () {
			if (err) throw err;
		});

		gulp.src('dist/whats-new-rss.css').pipe(gulp.dest('dist/react/'))

		data = 'import { useEffect } from "react";\nimport "./whats-new-rss.css";\n' + data
		data += '\n' + hookContent;

		fs.writeFile('dist/react/useWhatsNewRSS.js', data, (err) => {
			if (err) throw err;
			done();
		});
	});
});

gulp.task('default', gulp.series('generate-react-files'));
gulp.task('sass', handleScssBuild);
gulp.task('sass:minify', handleMinifyCSS);
gulp.task('sass:watch', () => gulp.watch("src/scss/**/*.scss", handleScssBuild));
gulp.task('uglify', handleUglifyJS);
gulp.task('headers', handleFileHeaders);
