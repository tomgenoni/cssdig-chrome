var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    compass     = require('gulp-compass'),
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
    './src/js/lib/jquery.highlight.js',
    './src/js/local/helpers.js',
    './src/js/local/build-html.js',
    './src/js/local/button-control.js',
    './src/js/local/css-highlight.js'
    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./ext/js/'))
});

//  compass: compile sass to css
//===========================================

gulp.task('compass', function() {
  gulp.src('./assets/sass/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: './ext/css/',
      sass: './assets/sass'
    }))
    .on('error', reportError);
});


//  watch: monitor html and static assets updates
//===========================================

gulp.task('watch', function() {
  // watch task for sass
  gulp.watch('./assets/sass/*.scss', ['compass']);
  gulp.watch('./src/js/**/*.js', ['scripts']);

});

//  Default Gulp Task
//===========================================

gulp.task('default', ['compass', 'scripts', 'watch']);