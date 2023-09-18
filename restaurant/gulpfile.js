const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const babel = require("gulp-babel");
// const poli = require("@babel/polyfill");

gulp.task('copy', function (done) {
	gulp.src("src/*.*")
		.pipe(gulp.dest('dist/'));
	done();
});


gulp.task('js', function (done) {
	gulp.src("src/js/*.js")
		// .pipe(minify())
		.pipe(babel(
			{
				"presets": [
					[
						"@babel/preset-env",
						{
							"targets": {
								"edge": "18",
								"firefox": "52",
								"chrome": "49",
								"safari": "10"
							},
							"useBuiltIns": "usage",
							"corejs": "3.6.5"
						}
					]
				]
			}
		))
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.stream());
	browserSync.reload();
	done();
});


gulp.task('scss', function (done) {
	gulp.src("src/scss/*.scss")
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest("src/css"))
		.pipe(clean({ level: 2 }))
		.pipe(gulp.dest("dist/css"))
		.pipe(browserSync.stream());
	browserSync.reload();
	done();
});

gulp.task('server', function (done) {
	browserSync.init({
		server: "src/"
	});
	gulp.watch("src/scss/*.scss", gulp.series('scss'));
	gulp.watch('src/js/*.js', gulp.series('js'));
	gulp.watch("src/*.html").on('change', () => {
		browserSync.reload();
		done();
	});
	done();
});


gulp.task('default', gulp.series('copy', 'scss', 'server', 'js'));
