"use strict";
var gulp = require('gulp');
var p = require('gulp-load-tasks')();

var tinylr = require('tiny-lr');

gulp.task('clean', function() {
   return gulp.src('dist')
       .pipe(p.clean());
});

gulp.task('less', function() {
  return gulp.src('app/less/*.less')
    .pipe(p.concat('main.css'))
    .pipe(p.less())
    .pipe(gulp.dest('app/styles'));
});

gulp.task('dev', function () {
  var lr = tinylr();
  lr.listen(35729);
  gulp.watch(['app/**/*.html', 'app/**/*.js', 'app/**/*.css'], function (evt) {
    lr.changed({
      body: {
        files: [evt.path]
      }
    });
  });

  gulp.watch(['app/less/*.less'], ['less']);
});

gulp.task('vendor', function() {
    return gulp.src([
            'app/bower_components/bootstrap/dist/css/bootstrap.min.css',
            'app/bower_components/font-awesome/css/font-awesome.min.css',
            'app/bower_components/font-awesome/fonts/**',
            'app/bower_components/jquery/dist/jquery.min.js',
            'app/bower_components/angular/angular.min.js'
        ], { base : 'app' })
        .pipe(gulp.dest('dist'));
});

gulp.task('copy', function() {
    return gulp.src([
            '!app/bower_components{,/**}',
            'app/**'
        ])
        .pipe(gulp.dest('dist'));
});

gulp.task('zip', function() {
    return gulp.src('dist/**')
        .pipe(p.zip('dist.zip'))
        .pipe(gulp.dest('.'));
});

gulp.task('build', ['copy', 'vendor'], function() {
    gulp.start('zip');
});

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
