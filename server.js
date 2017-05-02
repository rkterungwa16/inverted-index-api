import http from 'http';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser'

dotenv.config({ path: '.env.example' });
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello World\n');
// }).listen(process.env.PORT_DEV, '127.0.0.1');

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.post('/api/createIndex', (req, res) => {
	res.json(data);
});

app.post('/api/searchIndex', (req, res) => {
	res.json(data);
})

app.listen(process.env.PORT_DEV);
console.log('listening on port 9000');