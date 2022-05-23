const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
var rename = require('gulp-rename');
// const purgecss = require('gulp-purgecss')
function buildStyles() {
    return src('bkstylesheet/**/*.scss')
        .pipe(sass())
        // .pipe(purgecss({content: ['projects/forms42/src/**/*.html'] }))
        .pipe(rename('styles.css'))
        .pipe(dest('css'));
}
function watchTask() {
    watch(['bkstylesheet/**/*.scss'], buildStyles);
}
exports.default = series(buildStyles, watchTask);
