# Inverted-Index-Api

[![Build Status](https://travis-ci.org/rkterungwa16/inverted-index-api.svg?branch=project-setup)](https://travis-ci.org/rkterungwa16/inverted-index-api.svg?branch=project-setup)
[![Coverage Status](https://coveralls.io/repos/github/rkterungwa16/inverted-index-api/badge.svg?branch=project-setup)](https://coveralls.io/github/rkterungwa16/inverted-index-api?branch=project-setup)

## Introduction
*  **`inverted-index-api`** is an App powered by Node.js.
*  It has the following features;
  *  Can create an index of words with the document and file location

## Dependencies

### Back End Dependencies
*  This app's functionality depends on multiple Python packages including;
  *  **[Node.js](http://nodejs.org/download/)** - The application is written in this server-side JavaScript environment.
  *  **[Dotenv](https://github.com/motdotla/dotenv)** - Loads environment variables from a .env file into process.env. 

## Installation and setup
*  Navigate to a directory of choice on `terminal`.
*  Clone this repository on that directory.
  *  Using SSH;

    >`git@github.com:rkterungwa16/inverted-index-api.git`

  *  Using HTTP;

    >`https://github.com/rkterungwa16/inverted-index-api.git`

*  Navigate to the repo's folder on your computer
  *  `cd inverted-index-api/`
*  Install the app's backend dependencies.
  *  `npm install`
*  Install the app's front end dependencies using ..
`
* Run the app
  *  `npm start`

  ```
  ```

## Tests
*  The tests have been written using **[Jasmine-node](https://github.com/mhevery/jasmine-node/)**.
*  They are run using the **`coverage`** tool in order to generate test coverage reports.
*  To run the tests
   * `npm test`