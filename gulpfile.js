var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var less = require('gulp-less');
var browserify = require('gulp-browserify');
var livereload = require('gulp-livereload');
var server = require('gulp-develop-server');
var isProduction = -1 !== process.argv.indexOf('--prod');

gulp.task('browserify', function () {
  var stream = gulp.src('src/app.js')
    .pipe(browserify({
      transform: ['reactify'],
      debug: true,
    }))
    .on('error', function () { console.log(arguments); });

    if (isProduction) {
      stream.pipe(uglify());
    }

    stream
      .pipe(rename('bundle.js'))
      .pipe(gulp.dest('assets/js'));
});

gulp.task('less', function () {
  var stream = gulp.src('src/styles/main.less')
    .pipe(less())
    .on('error', function () { console.log(arguments); });

  if (isProduction) {
      stream.pipe(minifycss());
  }

  stream
    .pipe(rename('main.css'))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('server', function () {
  server.listen({ path: 'src/server.js' }, livereload.listen);
});

gulp.task('build', ['browserify', 'less']);

gulp.task('default', ['build', 'server'], function () {
  gulp.watch(['src/**/*.js'], ['browserify']);
  gulp.watch(['src/**/*.less'], ['less']);

  gulp.watch(['assets/**/*'], function (files) {
    livereload.changed(files);
  });

  gulp.watch(['src/server.js', 'src/server/**', 'src/index.html'], function () {
    server.changed(function (error) {
      if (!error) {
        livereload.changed();
      }
    });
  });
});
