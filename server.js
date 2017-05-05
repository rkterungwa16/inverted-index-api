import http from 'http';
import dotenv from 'dotenv';
import fs from 'fs';
import url from 'url';
import myApp from './src/inverted-index';

dotenv.config({ path: '.env.example' });

const file = 'fixtures/book.json';
const jsonOfFile = new myApp('book.json');
const term = ['An', 'world'];
let Url;

const apiUrls = (url) => {
  if (url.pathname === '/api/createIndex') {
    return jsonOfFile.createIndex()
  } else if (url.pathname === '/api/searchIndex') {
    return jsonOfFile.searchIndex(term);
  } else {
    return 'Please enter a valid url';
  }
};

const server = http.createServer((req, res) => {
  //fs.createReadStream(file).pipe(res);
  if (req.method === 'POST') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    Url = url.parse(req.url, true);
    res.end(JSON.stringify(apiUrls(Url)));
  } else {
    res.writeHead(405);
    res.end();
  }
});

server.listen(process.env.PORT_DEV, () => {
  console.log('Server listening on', process.env.PORT_DEV);
});

module.exports = server;