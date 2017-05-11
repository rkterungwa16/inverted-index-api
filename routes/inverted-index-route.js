import express from 'express';
import invertedIndex from '../src/inverted-index.js';

const router = express.Router();
const indexInstance = new invertedIndex('book.json');

route.post('/api/createIndex', (req, res) => {  
  res.json(indexInstance.createIndex();)    
});

route.post('/api/searchIndex', (req, res) => {
  const fileName = req.body.fileName;
  const terms = req.body.terms
  res.json(invertedIndex.searchIndex(fileName, terms))
});

module.exports = router;