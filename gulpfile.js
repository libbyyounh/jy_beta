var gulp = require('gulp');
//var concat = require('gulp-concat');
var connect = require("gulp-connect");
var openpage = require('gulp-open');
//var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var modRewrite = require('connect-modrewrite');
var pkg = require("./package.json"),
    dirs = pkg.dirs;
//var less = require("gulp-less");
//var autoprefixer = require('gulp-autoprefixer');

//gulp.task('js', function() {
//  return gulp.src([
//    './src/js/jquery-extend.js',
//    './src/js/modal.js',
//    './src/js/toast.js',
//    './src/js/action.js',
//    './src/js/pull-to-refresh.js',
//    './src/js/infinite.js'
//  ])
//    .pipe(concat({ path: 'jquery-weui.js'}))
//    .pipe(gulp.dest('./dist/js/'));
//});
//
//gulp.task('less', function () {
//  return gulp.src(['./src/less/jquery-weui.less'])
//  .pipe(less())
//  .pipe(autoprefixer())
//  .pipe(gulp.dest('./dist/css/'));
//});
//
//gulp.task('copy', function() {
//  return gulp.src(['./src/lib/**/*'])
//    .pipe(gulp.dest('./dist/lib/'));
//});
//
//gulp.task('watch', function () {
//  gulp.watch('src/js/**/*.js', ['js']);
//  gulp.watch('src/less/**/*.less', ['less']);
//});

gulp.task('serverSrc', function () {
  connect.server({
      root: [dirs.src],
      port: 8001,
      livereload: true,
      middleware: function () {
          return [
              modRewrite([
                  '^/(.*)devData=([^&]*)(.*)$ http://localhost:8001/js/tempData/$2 [P]'
              ])
          ];
      }
    });
});
gulp.task('openSrc', function () {
    gulp.src('')
        .pipe(openpage({
            app: 'chrome',
            uri: 'http://localhost:8001'
        }));
});
gulp.task('html', function () {
    gulp.src(['./' + dirs.src + '/**/*.html',
        './' + dirs.src + '/**/*.js',
        './' + dirs.src + '/**/*.css',
        './' + dirs.src + '/**/*.json'])
        .pipe(connect.reload());
});
gulp.task('watchChange', function () {
    gulp.watch(['./' + dirs.src + '/**/*.html','./' + dirs.src + '/**/*.js', './' + dirs.src + '/**/*.css'], ['html']);
});
gulp.task('dev', [
    'watchChange',
    'serverSrc',
    'openSrc'
]);
gulp.task("default", ['dev']);

