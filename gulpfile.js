const gulp = require('gulp');

const rimraf = require('gulp-rimraf');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const react = require('gulp-react');
const babel = require('gulp-babel');

gulp.task('default', ['css', 'watch']);

gulp.task('watch', function () {
    gulp.watch('public/**/*.scss', ['css']);
    // gulp.watch('public/**/*.jsx', ['js']);
});

// gulp.task('js', ['clean:js'], function () {
//     return gulp.src(['public/js/**/*.jsx'])
//         .pipe(sourcemaps.init())
//         .pipe(plumber())
//         .pipe(react())
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('public/js'));
// });

// gulp.task('clean:js', function () {
//     return gulp.src('public/js/**/*.js', {
//         read: false
//     })
//         .pipe(rimraf());
// });


gulp.task('css', ['clean:css'], function () {
    return gulp.src(['public/style/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/style'));
});

gulp.task('clean:css', function () {
    return gulp.src('public/style/style.css', {
        read: false
    })
        .pipe(rimraf());
});
