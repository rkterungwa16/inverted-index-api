import dotenv from 'dotenv';
import multer from 'multer';
import express from 'express';
import bodyParser from 'body-parser';
import myApp from './src/inverted-index';

const app = express();

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

// Create index from a json
router.post('/createIndex', upload.array('files'), (req, res) => {
  const mapp = new myApp();
  const files = req.files;
  const fileSpec = mapp.getMulterJson(files);
  index = mapp.createIndex(fileSpec.fileName, fileSpec.fileContentArr);
  res.status(200).json(index);
});

// Search index for created index
router.post('/searchIndex', (req, res) => {
  const mapp = new myApp();
  const fileName = req.body.filename;
  const term = req.body.terms;
  res.status(200).json(mapp.searchIndex(index, fileName, term));
});

app.listen(process.env.PORT_DEV, () => {
  console.log('Server listening on', process.env.PORT_DEV);
});

module.exports = app;