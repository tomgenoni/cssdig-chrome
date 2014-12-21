var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    compass     = require('gulp-compass');


//  combine js into single file
//===========================================

gulp.task('scripts', function() {
  gulp.src([
    './src/js/lib/jquery.min.js',
    './src/js/lib/cssbeautify.js',
    './src/js/lib/jquery.highlight.js',
    './src/js/local/helpers.js',
    './src/js/local/build-html.js',
    './src/js/local/button-control.js',
    './src/js/local/css-highlight.js'
    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./ext/js/'))
});



//  Default Gulp Task
//===========================================

gulp.task('default', ['scripts']);