var gulp        = require('gulp');
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');

var babel = require('gulp-babel');

gulp.task('browserify', function () {
    return browserify({entries: './src/vericred-browser.js', debug: true})
      .transform("babelify", { presets: ["es2015"] })
      .bundle()
      .pipe(source('vericred.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest('./dist'));
});

gulp.task('es5ize', function () {
    return gulp.src("src/**/*.js")
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(gulp.dest("lib"));
});

gulp.task('default', ['browserify', 'es5ize']);
