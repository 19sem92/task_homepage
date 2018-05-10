var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    spritesmith = require('gulp.spritesmith'),
    rimraf      = require('rimraf'),
    rename      = require('gulp-rename'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer');


/* ------------ Server ------------- */

gulp.task('server', function() {
    browserSync.init({
        server: {
            port: 9000,
            baseDir: "assets"
        }
    });

    gulp.watch('assets/**/*').on('change', browserSync.reload);
});


/* ------------ Styles compile ------------- */
gulp.task('styles:compile', function () {
    return gulp.src('assets/styles/sass/main.sass')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 6 versions'],
            cascade: false
        }))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('assets/styles/css'));
});

/*------------- js -----------------*/


// gulp.task('js', function () {
//
//     return gulp.src([
//         'assets/js/src/main.js'
//     ])
//         .pipe(concat('main.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('assets/js/dist'))
// });

/* ------------ Delete ------------- */
// gulp.task('clean', function del(cb) {
//     return rimraf('assets/js/dist', cb);
// });

// gulp.task('copy', function() {
//     return gulp.src()
//         .pipe(gulp.dest('assets/js/dist'));
// });

gulp.task('watch', function() {
    gulp.watch('assets/styles/sass/**/*.sass', gulp.series('styles:compile'));
    // gulp.watch('assets/js/src/*.js', gulp.series(['js']));
});

gulp.task('default', gulp.series(
    gulp.parallel('styles:compile'),
    gulp.parallel('watch', 'server')
    )
);
