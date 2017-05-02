import fs from 'fs';
import supertest from 'supertest';
import dotenv from 'dotenv';
import myApp from '../src/inverted-index';
import app from '../index.js';

dotenv.config({ path: '.env.example' });
const fileName = 'book.txt';
const jsonOfFile = new myApp(fileName);
const server = supertest.agent('process.env.PORT_DEV');

const indexSample = {
  an: [0],
  inquiry: [0],
  the: [0, 1],
  string: [0, 1],
  third: [1],
  world: [1],
  from: [1]
};

const fileContent = fs.readFileSync('fixtures/book.txt');
const index = jsonOfFile.createIndex(fileName, fileContent);

describe('Inverted index class', () => {
  describe('Read book data', () => {
    it("Should return 'invalid json' for fileContent = 'file content'", () => {
      expect(jsonOfFile.getJson()).toEqual('invalid json');
    });

    it("Should return 'empty json' for fileContent = ''", () => {
      expect(jsonOfFile.getJson()).toEqual('empty json');
    });

    it("Should return 'malformed json' for fileContent = '[{ title: 'A' text: 'B' }]", () => {
      expect(jsonOfFile.getJson()).toEqual('malformed json');
    });

    it("Should return ''[{ 'title': 'A', 'text': 'B' }]'' for fileContent = '[{ title: 'A', text: 'B' }]'", () => {
      expect(jsonOfFile.getJson()).toEqual([{ title: 'A', text: 'B' }]);
    });
  });

  describe('Populate index', () => {
    it("Should return 'object' for typeof jsonOfFile.createIndex('fileName', 'fileContent')", () => {
      expect(typeof jsonOfFile.createIndex(fileName, fileContent)).toEqual('object');
    });

    it("Should return 'empty json' for fileContent = ''", () => {
      expect(index[fileName]).toEqual({ a: [1, 2] });
    });

    it("Should return 'malformed json' for fileContent = '[{ title: 'A' text: 'B' }]", () => {
      expect(jsonOfFile.getJson).toEqual('malformed json');
    });

    it("Should return ''[{ 'title': 'A', 'text': 'B' }]'' for fileContent = '[{ 'title': 'A', 'text': 'B' }]'", () => {
      expect(jsonOfFile.getJson).toEqual([{ title: 'A', text: 'B' }]);
    });
  });

  describe('Populate index', () => {
    it("Should return 'object' for typeof jsonOfFile.createIndex('fileName', 'fileContent')", () => {
      expect(typeof jsonOfFile.createIndex('fileName', 'fileContent')).toEqual('object');
    });

    it('Should return indexSample for createIndex(fileName, fileContent)', () => {
      expect(jsonOfFile.createIndex(fileName, fileContent)).toEqual(indexSample);
    });

    it("Should return '{'a': [1,2]}' for index[fileName]", () => {
      expect(index[fileName]).toEqual({ a: [1, 2] });
    });
  });

  describe('Search index', () => {
    it("Should return 'object' for typeof jsonOfFile.createIndex(fileName, fileContent)", () => {
      expect(typeof jsonOfFile.createIndex(fileName, fileContent)).toEqual('object');
    });

    it("Should return { 'third world': [1] } for searchIndex(index, filename, 'Third World')", () => {
      expect(jsonOfFile.searchIndex(fileName, fileContent)).toEqual({ 'third world': [1] });
    });

    it("Should return { 'third world': [1] } for searchIndex(index, fileName, ['Third', 'World'])", () => {
      expect(jsonOfFile.searchIndex(index, fileName, ['Third', 'World'])).toEqual({ 'third world': [1] });
    });

    it("Should return { 'third world': [1] } for searchIndex(index, fileName, 'Third', 'World')", () => {
      expect(jsonOfFile.searchIndex(index, fileName, 'Third', 'World')).toEqual({ 'third world': [1] });
    });
  });
});

