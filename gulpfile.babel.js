'use strict'

import gulp from 'gulp';
import dotenv from 'dotenv';
import coverage from 'gulp-coverage';
import nodemon from 'gulp-nodemon';
import jasmineNode from 'gulp-jasmine-node';
import istanbulReport from 'gulp-istanbul-report';
import coveralls from 'gulp-coveralls';

import coverageFile from './coverage/coverage.json';

// Run app server
gulp.task('serve', () => 
  nodemon({
    script: 'index.js',
    ext: 'js html', 
    env: { 'NODE_ENV': process.env.NODE_ENV }
  })
);

// Generate coverage report
gulp.task('test', () => 
  gulp.src(coverageFile)
    .pipe(istanbulReport())
);

// Run tests 
gulp.task('run-tests', () => {
  return gulp.src(['tests/inverted-index-testSpec.js'])
    .pipe(jasmineNode())
});

// Generate coverage report
gulp.task('coverage', () => {
  return gulp.src('tests/inverted-index-testSpec.js')
    .pipe(coverage.instrument({
        pattern: ['src/inverted-index.js']
    }))
    .pipe(jasmineNode())
    .pipe(coverage.gather())
    .pipe(coverage.format({ report: 'lcov' }))
    .pipe(coveralls())
});

// Load code coverage to coveralls
gulp.task('coveralls', ['test'], () => {
  // If not running on CI environment it won't send lcov.info to coveralls
  if (!process.env.CI) {
    return;
  }

  return gulp.src('coverage/lcov.info')
    .pipe(coveralls())
});