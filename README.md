# Inverted Index Rest Api
Inverted Index Rest Api Example. Using Node.js, Express.

[![Build Status](https://travis-ci.org/rkterungwa16/inverted-index-api.svg?branch=project-setup)](https://travis-ci.org/rkterungwa16/inverted-index-api.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/rkterungwa16/inverted-index-api/badge.svg)](https://coveralls.io/github/rkterungwa16/inverted-index-api)
[![Maintainability](https://api.codeclimate.com/v1/badges/8a1735b0b7bfbe7203f3/maintainability)](https://codeclimate.com/github/rkterungwa16/inverted-index-api/maintainability)


## Requirements

 - [Node v10.15+](https://nodejs.org/en/download/current/)

## Getting Started

Clone the repo:

```bash
git clone https://github.com/rkterungwa16/inverted-index-api.git
cd inverted-index-api
```

Install dependencies:
```bash
npm i
```

Set environment variables:

```bash
cp .env.example .env
```

## Code Formatter

```bash
# format code using prettier
npm run format
```

## Code Lint
```bash
# lint code with TSLint
npm run lint
```
```bash
# try to fix TSLint errors
npm run fix:lint
```

## Unit tests and Coverage
```bash
npm test
```

## Running Locally

```bash
npm run start:dev
```

## Running in Production

```bash
npm start
```

## Testing Locally...

### Create Index
```bash
curl -X POST \
http://localhost:3300/api/v1/create-index \
    -H 'cache-control: no-cache' \
    -H 'content-type: multipart/form-data' \
    -F 'booksCollectionName=Food -F texts=@book.json'
```

### Search for words in books Collection
```bash
curl -X POST\
http://localhost:3300/api/v1/search \
    -H 'cache-control: no-cache' \
    -H 'content-type: application/json' \
    -d '{"booksCollectionName":"value1", "serchTerm":"value2"}'
```
