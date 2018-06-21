
const gulp = require('gulp'),
    gutil = require('gulp-util'),
    size = require('gulp-size'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps');

const paths = {
    js: {
        file: 'views.min.js',
        src: [
            'src/template.js',
            'src/views.js'
        ],
        dist: 'dist/'
    },
    sourcemaps: '../../sourcemaps'
}

gulp.task('js', () => {
    return gulp.src(paths.js.src)
        .pipe(sourcemaps.init())
        .pipe(concat(paths.js.file))
        .pipe(uglify().on('error', gutil.log))
        .pipe(sourcemaps.write(paths.sourcemaps, {
            addComment: false,
            includeContent: false
        }))
        .pipe(gulp.dest(paths.js.dist))
        .pipe(size())
        .on('error', gutil.log);
});

gulp.task('default', ['js'], () => {

});
