const http = require('http');
const dotenv = require('dotenv').config({path: '.env.example'});
const fs = require('fs');
const port = 9000;

http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
}).listen(process.env.PORT_DEV, '127.0.0.1');
console.log("Listening on 127.0.0.1:" + process.env.PORT_DEV);
