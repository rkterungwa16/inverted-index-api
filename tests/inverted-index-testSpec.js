import fs from 'fs';
import myApp from '../src/inverted-index';

//const fileContent = JSON.parse(fs.readFileSync('fixtures/book.json'));
//const empFileContent = JSON.parse(fs.readFileSync('fixtures/empty.json'));
const jsonOfFile = new myApp('book.json');
const emptyJson = new myApp('empty.json');
const invalidJson = new myApp('invalid.json');
const malformedJson = new myApp('malformed');

describe('Inverted index class', () => {
  describe('Read book data', () => {
    it("Should return 'invalid json' for fileContent = 'file content'", () => {
      expect(invalidJson.__getJson()).toEqual('invalid json');
    });

    it("Should return 'empty json' for fileContent = ''", () => {
      expect(emptyJson.__getJson()).toEqual([{}]);
    });

    it("Should return 'malformed json' for fileContent of format '[{ title: 'A' text: 'B' }]", () => {
      expect(malformedJson.__getJson()).toEqual('malformed json');
    });

    it("Should return a valid file content with the format [{ 'title': 'A', 'text': 'B' }]", () => {
      expect(jsonOfFile.__getJson()).toEqual([
        {
          "title":"An inquiry into the wealth of nations",

          "text":"This string seeks to help you understand the problem set"},
        {
          "title":"From third world to first world",

          "text":"This string is also to help you understand the problem set"
        }
      ]);
    });
  });

  describe('Populate index', () => {
    it("Should return 'object' for typeof jsonOfFile.createIndex()", () => {
      expect(typeof jsonOfFile.createIndex()).toEqual('object');
    });

    it('Should return indexSample for createIndex()', () => {
      expect(jsonOfFile.createIndex()).toEqual(
        { 'book.json': 
          {  An: [ 0 ],
             inquiry: [ 0 ],
             into: [ 0 ],
             the: [ 0, 1 ],
             wealth: [ 0 ],
             of: [ 0 ],
             nations: [ 0 ],
             This: [ 0, 1 ],
             string: [ 0, 1 ],
             seeks: [ 0 ],
             to: [ 0, 1 ],
             help: [ 0, 1 ],
             you: [ 0, 1 ],
             understand: [ 0, 1 ],
             problem: [ 0, 1 ],
             set: [ 0, 1 ],
             From: [ 1 ],
             third: [ 1 ],
             world: [ 1 ],
             first: [ 1 ],
             is: [ 1 ],
             also: [ 1 ] 
          } 
        });
    });

    it("Should return a valid output for createIndex().fileName", () => {
      let index = jsonOfFile.createIndex();
      expect(index['book.json']).toEqual(
        {  An: [ 0 ],
           inquiry: [ 0 ],
           into: [ 0 ],
           the: [ 0, 1 ],
           wealth: [ 0 ],
           of: [ 0 ],
           nations: [ 0 ],
           This: [ 0, 1 ],
           string: [ 0, 1 ],
           seeks: [ 0 ],
           to: [ 0, 1 ],
           help: [ 0, 1 ],
           you: [ 0, 1 ],
           understand: [ 0, 1 ],
           problem: [ 0, 1 ],
           set: [ 0, 1 ],
           From: [ 1 ],
           third: [ 1 ],
           world: [ 1 ],
           first: [ 1 ],
           is: [ 1 ],
           also: [ 1 ] 
        });
    });
  });

  describe('Search index', () => {
    it("Should return 'object' for typeof jsonOfFile.createIndex(fileName, fileContent)", () => {
      expect(typeof jsonOfFile.searchIndex('An')).toEqual('object');
    });

    it("Should return { 'third world': [1] } for searchIndex(index, filename, 'Third World')", () => {
      expect(jsonOfFile.searchIndex('third world')).toEqual({ 'third world ': [1] });
    });

    it("Should return { 'third world': [1] } for searchIndex(index, fileName, ['Third', 'World'])", () => {
      expect(jsonOfFile.searchIndex(['third', 'world'])).toEqual({ 'third world ': [1] });
    });

    it("Should return { 'third world': [1] } for searchIndex(index, fileName, 'Third', 'World')", () => {
      expect(jsonOfFile.searchIndex('third', 'world')).toEqual({ 'third world ': [1] });
    });
  });
});