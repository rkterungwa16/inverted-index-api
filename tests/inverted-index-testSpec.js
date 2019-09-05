import myApp from '../src/inverted-index';

const jsonOfFile = new myApp('book.json');
const emptyJson = new myApp('empty.json');
const invalidJson = new myApp('invalid.json');
const malformedJson = new myApp('malformed.json');
const malformed1Json = new myApp('malformed1.json');
const validJson = new myApp('bookone.json');
const multipleFiles = new myApp(['book.json', 'bookone.json']);

const value = jsonOfFile.getJson();
const validValue = validJson.getJson();
const multipleValue = multipleFiles.getJson();
const emptyValue = emptyJson.getJson();
const indexs = jsonOfFile.createIndex(value.fileName, value.fileContentArr);
const validIndex = validJson.createIndex(validValue.fileName, validValue.fileContentArr);
const multipleIndex = multipleFiles.createIndex(multipleValue.fileName, multipleValue.fileContentArr);
const emptyIndex = emptyJson.createIndex(emptyValue.fileName, emptyValue.fileContentArr);

describe('Inverted index class', () => {
  describe('Read book data', () => {
    it('Should return malformed json for fileContent = ""', () => {
      expect(invalidJson.getJson()).toEqual('malformed json');
    });

    it('Should return malformed json for fileContent = Hello world!', () => {
      expect(malformed1Json.getJson()).toEqual('malformed json');
    });

    it('Should return malformed json for fileContent of format [{ title: A text: B }]', () => {
      expect(malformedJson.getJson()).toEqual('malformed json');
    });

    it('Should return a valid file content with the format [{ title: A, text: B }]', () => {
      expect(jsonOfFile.getJson().fileContentArr[0]).toEqual([
        {
          title: 'An inquiry into the wealth of nations',

          text: 'This string seeks to help you understand the problem set' },
        {
          title: 'From third world to first world',

          text: 'This string is also to help you understand the problem set'
        }
      ]);
    });
  });

  describe('Populate index', () => {
    it('Should return object for typeof jsonOfFile.createIndex()', () => {
      expect(typeof jsonOfFile.createIndex(value.fileName, value.fileContentArr)).toEqual('object');
    });

    it('Should return a valid output for createIndex().fileName', () => {
      const values = jsonOfFile.getJson();
      const index = jsonOfFile.createIndex(values.fileName, values.fileContentArr);
      expect(index['book.json']).toEqual(
        { an: [0],
          inquiry: [0],
          into: [0],
          the: [0, 1],
          wealth: [0],
          of: [0],
          nations: [0],
          this: [0, 1],
          string: [0, 1],
          seeks: [0],
          to: [0, 1],
          help: [0, 1],
          you: [0, 1],
          understand: [0, 1],
          problem: [0, 1],
          set: [0, 1],
          from: [1],
          third: [1],
          world: [1],
          first: [1],
          is: [1],
          also: [1]
        });
    });

    it('Should return valid output for createIndex()[fileName]', () => {
      const values = validJson.getJson();
      expect(validJson.createIndex(values.fileName, values.fileContentArr)['bookone.json']).toEqual(
        { what: [0],
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
      const values = multipleFiles.getJson();
      expect(multipleFiles.createIndex(values.fileName, values.fileContentArr)).toEqual(
        { 'book.json':
        { an: [0],
          inquiry: [0],
          into: [0],
          the: [0, 1],
          wealth: [0],
          of: [0],
          nations: [0],
          this: [0, 1],
          string: [0, 1],
          seeks: [0],
          to: [0, 1],
          help: [0, 1],
          you: [0, 1],
          understand: [0, 1],
          problem: [0, 1],
          set: [0, 1],
          from: [1],
          third: [1],
          world: [1],
          first: [1],
          is: [1],
          also: [1] },
          'bookone.json':
          { what: [0],
            who: [0],
            gave: [0],
            you: [0],
            that: [0],
            planet: [1],
            crypton: [1],
            super: [1],
            man: [1] }
        });
    });
  });

  describe('Search index', () => {
    it('Should return object for typeof jsonOfFile.createIndex(fileName, fileContent)', () => {
      expect(typeof jsonOfFile.searchIndex(indexs, 'An')).toEqual('object');
    });

    it('Should return { book.json: { third world: [1] } } for searchIndex(Third World)', () => {
      expect(jsonOfFile.searchIndex(indexs, 'third world')).toEqual({ 'book.json': { 'third world': [1] } });
    });

    it('Should return { book.json: { third world: [1] } for searchIndex([Third, World])', () => {
      expect(jsonOfFile.searchIndex(indexs, ['third', 'world'])).toEqual({ 'book.json': { 'third world': [1] } });
    });

    it('Should return {book.json: { third world: [1] } for searchIndex(Third, World)', () => {
      expect(jsonOfFile.searchIndex(indexs, 'third', 'world')).toEqual({ 'book.json': { 'third world': [1] } });
    });

    it('Should return Search term(s) is not in document for searchIndex(zod)', () => {
      expect(jsonOfFile.searchIndex(indexs, 'zod')).toEqual('Search term(s) is not in document');
    });

    it('Should return { world: [1] } for searchIndex(index, zod world)', () => {
      expect(jsonOfFile.searchIndex(indexs, 'zod world')).toEqual({ 'book.json': { world: [1] } });
    });

    it('Should return Search terms(s) is not in document for searchIndex(indexs, planet crypton)', () => {
      expect(jsonOfFile.searchIndex(indexs, 'planet crypton')).toEqual('Search term(s) is not in document');
    });

    it('Should return { book.json: { world: [1] } } for searchIndex(world..)', () => {
      expect(jsonOfFile.searchIndex(indexs, 'world..')).toEqual({ 'book.json': { world: [1] } });
    });

    it('Should return { book.json: { world: [1] } } for searchIndex(indexs, WoRld)', () => {
      expect(jsonOfFile.searchIndex(indexs, 'WoRld')).toEqual({ 'book.json': { world: [1] } });
    });

    it('Should return { bookone.json: { what: [0] } } for searchIndex(validIndex, what)', () => {
      expect(validJson.searchIndex(validIndex, 'what')).toEqual({ 'bookone.json': { what: [0] } });
    });

    it('Should return { book.json: { set: [0, 1] } } for searchIndex(book.json, set)', () => {
      expect(jsonOfFile.searchIndex(indexs, 'book.json', 'set')).toEqual({ 'book.json': { set: [0, 1] } });
    });

    it('Should return Search terms(s) is not in document for empty json', () => {
      expect(emptyJson.searchIndex(emptyIndex, 'empty.json', 'is')).toEqual('Search term(s) is not in document');
    });

    it('Should search through all indexed files if filename is not passed', () => {
      expect(multipleFiles.searchIndex(multipleIndex, 'what')).toEqual({ 'bookone.json': { what: [0] } });
    });
  });
});