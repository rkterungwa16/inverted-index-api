import http from 'http';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.example' });

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(process.env.PORT_DEV, '127.0.0.1');