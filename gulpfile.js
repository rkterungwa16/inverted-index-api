'use strict'
const gulp = require('gulp');
const dotenv = require('dotenv').config({path: '.env.example'});
const coverage = require('gulp-coverage');
const nodemon = require('gulp-nodemon');
const jasmineNode = require('gulp-jasmine-node');

// Task to run app server
gulp.task('serve', () => {
  nodemon({
    script: 'server.js',
    ext: 'js html', 
    env: { 'NODE_ENV': process.env.NODE_ENV }
  })
});

gulp.task('run-tests', () => {
    return gulp.src(['tests/**/*spec.js'])
    .pipe(jasmineNode());
});

// Task to generate coverage report
gulp.task('coverage', () => {
  return gulp.src('tests/**/*.js')
          .pipe(coverage.instrument({
              pattern: ['src/**/*.js'],
              debugDirectory: 'debug'
          }))
          .pipe(jasmineNode())
          .pipe(coverage.gather())
          .pipe(coverage.format())
          .pipe(gulp.dest('fixtures'));
});