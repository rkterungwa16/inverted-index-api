/**
* Creates an index from an array
* Allows a user to search text blocks in the array that contain a specified collection
* of words
*/
class invertedIndex {
  /**
  * Initializes the Class with the required file name
  */
  constructor(fileName) {
    // assign the file name to object property
    this.fileName = fileName;
  }

  /**
  * Reads a valid JSON data from given file
  * @returns {object} a JSON array
  */
  getJson() {
    // Return a valid json array
    this.fileName;
    const fileContent = this.fileName;
    return fileContent;
  }

  /**
  * Creates a index object from a given JSON array
  * @return {object} an index object
  */
  createIndex() {
    // Use json from getJson to create index
    const myFile = this.fileName;
    this.getJson();
    let index;
    return index;
  }
  
  /**
  * Searches an index object with search terms
  * @returns {object} an object of the search results
  */
  searchIndex(terms) {
    // use index from createIndex to search terms
    const newterms = terms;
    const fileName = this.fileName;
    this.createIndex();
  }
}

module.exports = invertedIndex;