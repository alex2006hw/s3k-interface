var gulp = require('gulp');

var rimraf = require('gulp-rimraf');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');

gulp.task('default', ['css', 'watch']);

gulp.task('watch', function () {
    gulp.watch('public/**/*.scss', ['css']);
});

gulp.task('css', ['clean:css'], function () {
    return gulp.src(['public/stylesheets/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('clean:css', function () {
    return gulp.src('public/stylesheets/style.css', {
        read: false
    })
        .pipe(rimraf());
});
