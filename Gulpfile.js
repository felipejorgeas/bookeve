var gulp = require('gulp');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var browserSync = require('browser-sync');

/* Sass task */
gulp.task('css', function () {
    gulp.src('css/style.css')
        .pipe(gulp.dest('css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('css'))
});

/* Reload task */
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/* Prepare Browser-sync for localhost */
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

/* Watch scss, js and html files, doing different things with each. */
gulp.task('default', ['css', 'browser-sync'], function () {
    /* Watch scss, run the sass task on change. */
    gulp.watch(['*.html', 'css/*.css', 'js/**/*.js', 'templates/*.html', 'views/*.html'], ['css', 'bs-reload']);
});