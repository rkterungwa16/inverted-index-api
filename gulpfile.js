'use strict'
const gulp = require('gulp');
const dotenv = require('dotenv').config({path: '.env.example'});
const coverage = require('gulp-coverage');
const nodemon = require('gulp-nodemon');
const jasmineNode = require('gulp-jasmine-node');
const jasminePhantomJS = require('gulp-jasmine-phantom');
const istanbulReport = require('gulp-istanbul-report');

const coverageFile = 'coverage/coverage.json';

const jasminePhantomOpts = {
  phantomjs: {
    hooks: 'jasmine-phantomjs-istanbul',
    coverageFile: coverageFile
  }
};

// Task to run app server
gulp.task('serve', () => {
  nodemon({
    script: 'server.js',
    ext: 'js html', 
    env: { 'NODE_ENV': process.env.NODE_ENV }
  })
});

gulp.task('test', function () {
  gulp.src(['tests/inverted-index-testSpec.js'])
    .pipe(jasminePhantomJS(jasminePhantomOpts))
    .on('finish', function() {
      gulp.src(coverageFile)
        .pipe(istanbulReport())
    });
});

gulp.task('run-tests', () => {
    return gulp.src(['tests/inverted-index-testSpec.js'])
    .pipe(jasmineNode());
});

// Task to generate coverage report
gulp.task('coverage', () => {
  return gulp.src('tests/inverted-index-testSpec.js')
          .pipe(coverage.instrument({
              pattern: ['src/inverted-index.js']
          }))
          .pipe(jasmineNode())
          .pipe(coverage.gather())
          .pipe(coverage.format())
          .pipe(gulp.dest('fixtures'));
});