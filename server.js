import http from 'http';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser'
import fs from 'fs';


dotenv.config({ path: '.env.example' });
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.json({message: 'welcome'});
});

app.post('/api/createIndex', (req, res) => {
	res.json({message: 'welcome'});
});

app.post('/api/searchIndex', (req, res) => {
	res.json(req.body);
})

app.listen(process.env.PORT_DEV);
console.log('listening on port 9000');