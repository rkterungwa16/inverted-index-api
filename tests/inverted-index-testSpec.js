import fs from 'fs';
import myApp from '../src/inverted-index';

const jsonOfFile = new myApp('book.json');
const emptyJson = new myApp('empty.json');
const invalidJson = new myApp('invalid.json');
const malformedJson = new myApp('malformed.json');
const malformed1Json = new myApp('malformed1.json');
const validJson = new myApp('bookone.json');
const multipleFiles = new myApp(['book.json', 'bookone.json']);

describe('Inverted index class', () => {
  describe('Read book data', () => {
    it("Should return 'invalid json' for fileContent = ''", () => {
      expect(invalidJson.getJson()).toEqual('invalid json');
    });

    it("Should return '[{}]' for fileContent = '[{}]'", () => {
      expect(emptyJson.getJson().fileContentArr[0]).toEqual([{}]);
    });

    it('Should return "malformed json" for fileContent ="Hello world!"', () => {
      expect(malformed1Json.getJson()).toEqual('malformed json');
    })

    it("Should return 'malformed json' for fileContent of format '[{ title: 'A' text: 'B' }]", () => {
      expect(malformedJson.getJson()).toEqual('malformed json');
    });

    it("Should return a valid file content with the format [{ 'title': 'A', 'text': 'B' }]", () => {
      expect(jsonOfFile.getJson().fileContentArr[0]).toEqual([
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
          {  an: [ 0 ],
             inquiry: [ 0 ],
             into: [ 0 ],
             the: [ 0, 1 ],
             wealth: [ 0 ],
             of: [ 0 ],
             nations: [ 0 ],
             this: [ 0, 1 ],
             string: [ 0, 1 ],
             seeks: [ 0 ],
             to: [ 0, 1 ],
             help: [ 0, 1 ],
             you: [ 0, 1 ],
             understand: [ 0, 1 ],
             problem: [ 0, 1 ],
             set: [ 0, 1 ],
             from: [ 1 ],
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
        {  an: [ 0 ],
           inquiry: [ 0 ],
           into: [ 0 ],
           the: [ 0, 1 ],
           wealth: [ 0 ],
           of: [ 0 ],
           nations: [ 0 ],
           this: [ 0, 1 ],
           string: [ 0, 1 ],
           seeks: [ 0 ],
           to: [ 0, 1 ],
           help: [ 0, 1 ],
           you: [ 0, 1 ],
           understand: [ 0, 1 ],
           problem: [ 0, 1 ],
           set: [ 0, 1 ],
           from: [ 1 ],
           third: [ 1 ],
           world: [ 1 ],
           first: [ 1 ],
           is: [ 1 ],
           also: [ 1 ] 
        });
      });

    it('Should return valid output for createIndex()[fileName]', () => {
      expect(validJson.createIndex()['bookone.json']).toEqual(
        {  what: [0],
           who: [0],
           gave: [0],
           you: [0],
           that: [0],
           planet: [1],
           crypton: [1],
           super: [1],
           man: [1]
        });
      });

    it('Should return valid output for multiple files', () => {
      expect(multipleFiles.createIndex()).toEqual(
        { 'book.json': 
          { an: [ 0 ],
            inquiry: [ 0 ],
            into: [ 0 ],
            the: [ 0, 1 ],
            wealth: [ 0 ],
            of: [ 0 ],
            nations: [ 0 ],
            this: [ 0, 1 ],
            string: [ 0, 1 ],
            seeks: [ 0 ],
            to: [ 0, 1 ],
            help: [ 0, 1 ],
            you: [ 0, 1 ],
            understand: [ 0, 1 ],
            problem: [ 0, 1 ],
            set: [ 0, 1 ],
            from: [ 1 ],
            third: [ 1 ],
            world: [ 1 ],
            first: [ 1 ],
            is: [ 1 ],
            also: [ 1 ] },
          'bookone.json': 
            { what: [ 0 ],
              who: [ 0 ],
              gave: [ 0 ],
              you: [ 0 ],
              that: [ 0 ],
              planet: [ 1 ],
              crypton: [ 1 ],
              super: [ 1 ],
              man: [ 1 ] } 
            });
          });
        });

  describe('Search index', () => {
    it("Should return 'object' for typeof jsonOfFile.createIndex(fileName, fileContent)", () => {
      expect(typeof jsonOfFile.searchIndex('An')).toEqual('object');
    });

    it("Should return { 'third world': [1] } for searchIndex('Third World')", () => {
      expect(jsonOfFile.searchIndex('third world')).toEqual({ 'third world': [1] });
    });

    it("Should return { 'third world': [1] } for searchIndex(['Third', 'World'])", () => {
      expect(jsonOfFile.searchIndex(['third', 'world'])).toEqual({ 'third world': [1] });
    });

    it("Should return { 'third world': [1] } for searchIndex('Third', 'World')", () => {
      expect(jsonOfFile.searchIndex('third', 'world')).toEqual({ 'third world': [1] });
    });

    it('Should return "Search term(s) is not in document" for searchIndex("zod")', () => {
      expect(jsonOfFile.searchIndex('zod')).toEqual('Search term(s) is not in document');
    });

    it('Should return { "world": [1] } for searchIndex("zod world")', () => {
      expect(jsonOfFile.searchIndex('zod world')).toEqual({ 'world': [1] });
    });

    it('Should return "Search terms(s) is not in document" for searchIndex("planet crypton")', () => {
      expect(jsonOfFile.searchIndex('planet crypton')).toEqual('Search term(s) is not in document');
    });

    it('Should return { "world": [1] } for searchIndex("world..")', () => {
      expect(jsonOfFile.searchIndex('world..')).toEqual({ 'world': [1] });
    });

    it('Should return {"world": [1]} for searchIndex("WoRld")', () => {
      expect(jsonOfFile.searchIndex('WoRld')).toEqual({ 'world': [1] });
    })

    it('Should return {"what": [1]} for searchIndex("what")', () => {
      expect(validJson.searchIndex('what')).toEqual({ 'what': [ 0 ] });
    });
  });
});