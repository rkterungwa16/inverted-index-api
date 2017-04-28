'use strict'
const gulp = require('gulp');
const dotenv = require('dotenv').config({path: '.env.example'});
const coverage = require('gulp-coverage');
const nodemon = require('gulp-nodemon');
const jasmineNode = require('gulp-jasmine-node');
const jasminePhantomJS = require('gulp-jasmine-phantom');
const istanbulReport = require('gulp-istanbul-report');
const coveralls = require('gulp-coveralls');

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
  });
});

// Task to generate coverage report
gulp.task('test', () => {
  gulp.src(['tests/inverted-index-testSpec.js'])
    .pipe(jasminePhantomJS(jasminePhantomOpts))
    .on('finish', function() {
      gulp.src(coverageFile)
        .pipe(istanbulReport())
    });
});

// Task to run tests 
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
          .pipe(coverage.format({ report: 'lcov' }))
          .pipe(coveralls());
});

// Task to load code coverage to coveralls
gulp.task('coveralls', ['test'], () => {
  // If not running on CI environment it won't send lcov.info to coveralls
  if (!process.env.CI) {
    return;
  }

  return gulp.src('coverage/lcov.info')
    .pipe(coveralls());
});