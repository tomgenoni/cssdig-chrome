var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    sass        = require('gulp-sass'),
    notify      = require('gulp-notify');

function swallowError(error) {
  this.emit('end');
}

function reportError(error) {
  notify.onError().apply(this, arguments);
  this.emit('end');
}

//  combine js into single file
//===========================================

gulp.task('scripts', function() {
  gulp.src([
    './src/js/lib/jquery.min.js',
    './src/js/lib/cssbeautify.js',
    './src/js/lib/specificity.js',
    './src/js/lib/tablesorter.js',
    './src/js/local/helpers.js',
    './src/js/local/syntax-highlight.js',
    './src/js/local/build-html.js',
    './src/js/local/build-specificity.js',
    './src/js/local/button-control.js',
    './src/js/local/css-highlight.js',
    './src/js/local/tabs.js'
    ])
    .pipe(concat('cssdig.js'))
    .pipe(gulp.dest('./ext/js/'))
});

//  compile sass to css
//===========================================

gulp.task('sass', function () {
  gulp.src('assets/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('ext/css/'));
});


//  watch: monitor html and static assets updates
//===========================================

gulp.task('watch', function() {
  // watch task for sass
  gulp.watch('./assets/sass/**/*.scss', ['sass']);
  gulp.watch('./src/js/**/*.js', ['scripts']);

});

//  Default Gulp Task
//===========================================

gulp.task('default', ['sass', 'scripts', 'watch']);