// Node modules
var del = require('del');
var gulp = require('gulp');
var path = require('path');

// Gulp modules
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var csslint = require('gulp-csslint');
var csscomb = require('gulp-csscomb');
var minifycss = require('gulp-minify-css');
var rename = require("gulp-rename");

// Variables
var sources = {
  'stylesheets': path.join('.', 'less'),
  'openSans': path.join('.', 'node_modules', 'open-sans-fontface')
};
var destinations = {
  'css': path.join('.', 'dist', 'css'),
  'fonts': path.join('.', 'dist', 'fonts'),
  'docs': path.join('.', 'documentation', 'end-users')
};
var configs = {
  less: {
    strictMath: true
    // Less stylemaps are not supported by the gulp-less plugin, therefore gulp-sourcemaps is used
  },
  autoprefixer: {
    browsers: [
      "Android 2.3",
      "Android >= 4",
      "Chrome >= 20",
      "Firefox >= 24",
      "Explorer >= 8",
      "iOS >= 6",
      "Opera >= 12",
      "Safari >= 6"
    ],
    cascade: false,
    remove: true
  },
  csslint: {
    csslintrc: '.csslintrc'
  },
  minifycss: {
    compatibility: 'ie8'
  }
};

// Tasks
gulp.task('less-only', function() {
  return gulp.src(path.join(sources.stylesheets, 'bas-style-kit.less'))
    .pipe(less(configs.less))
    .pipe(gulp.dest(destinations.css))
    .pipe(gulp.dest(path.join(destinations.docs, destinations.css)));
});

gulp.task('less-no-min', function() {
  return gulp.src(path.join(sources.stylesheets, 'bas-style-kit.less'))
    .pipe(sourcemaps.init())
    .pipe(less(configs.less))
    .pipe(autoprefixer(configs.autoprefixer))
    .pipe(csscomb())
    .pipe(csslint(configs.csslint.csslintrc))
    .pipe(csslint.reporter())
    .pipe(sourcemaps.write(path.join('.', 'maps')))
    .pipe(gulp.dest(destinations.css))
    .pipe(gulp.dest(path.join(destinations.docs, destinations.css)));
});

gulp.task('less', function() {
  return gulp.src(path.join(sources.stylesheets, 'bas-style-kit.less'))
    .pipe(sourcemaps.init())
    .pipe(less(configs.less))
    .pipe(autoprefixer(configs.autoprefixer))
    .pipe(csscomb())
    .pipe(csslint(configs.csslint.csslintrc))
    .pipe(csslint.reporter())
    .pipe(minifycss(configs.minifycss))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write(path.join('.', 'maps')))
    .pipe(gulp.dest(destinations.css))
    .pipe(gulp.dest(path.join(destinations.docs, destinations.css)));
});

gulp.task('fonts', function() {
  return gulp.src(path.join(sources.openSans, 'fonts', '**/*.*'))
    .pipe(gulp.dest(path.join(destinations.fonts, 'open-sans')))
    .pipe(gulp.dest(path.join(destinations.docs, destinations.fonts, 'open-sans')));
});
