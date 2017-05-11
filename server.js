import http from 'http';
import dotenv from 'dotenv';
import fs from 'fs';
import url from 'url';
import multer from 'multer';
import express from 'express';
import bodyParser from 'body-parser';
import myApp from './src/inverted-index';

let app = express();

dotenv.config({ path: '.env.example' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${file.originalname}`);
  }
});

// Using multer for file upload
const upload = multer({ storage: storage });

let index;
const router = express.Router();
app.use('/api', router);

router.post('/createIndex', upload.array('files'), (req, res) => {
  const app = new myApp; 
  const files = req.files;
  const fileSpec = app.getMulterJson(files);
  index = app.createIndex(fileSpec.fileName, fileSpec.fileContentArr);
  res.status(200).json(index);    
});

router.post('/searchIndex', (req, res) => {
  const app = new myApp;
  const fileName = req.body.filename;
  const term = req.body.terms;
  res.status(200).json(app.searchIndex(index, fileName, term))
});

app.listen(process.env.PORT_DEV, () => {
  console.log('Server listening on', process.env.PORT_DEV);
});

module.exports = app;