import fs from 'fs';

/**
* Creates an index from an array
* Allows a user to search text blocks in the array that contain a specified collection
* of words
*/
export default class invertedIndex {
  /**
  * Initializes the Class with the required file name
  * @param {string} fileName
  */
  constructor(fileName) {
    // assign the file name to object property
    this.fileName = fileName;
    this.fileContent = {};
  }

  /**
  * Reads a valid JSON data from given file
  * @returns {object} a JSON array
  */
  getJson() {
    // Return a valid json array
    try {
      this.fileContent = JSON.parse(fs.readFileSync(`fixtures/${this.fileName}`));
      return this.fileContent;
    } catch (e) {
      if (e.message === 'Unexpected end of JSON input') {
        return ('invalid json');
      } else {
          return 'malformed json';
      }   
    }
  }
  
  /**
  * Adds words not already in the array
  * @return {boolean} a true if unique word
  * @param {data} data for first parameter
  * @param {array} arr for second parameter
  */
  addUniqueWords(data, arr) {
    if (arr.indexOf(data) < 0) {
      arr.push(data);
      return true;
    } else {
      return false;
    }
  }

  /**
  * Creates a index object from a given JSON array
  * @return {object} an index object
  */
  createIndex() {
    const arrOfTitle = [];
    const arrOfText = [];
    const indexNumber= [];
    const allUniqueWords = [];
    const jsonData = this.getJson();
    let indexObj = {};
    let index = {};    

    // Group title and text in all documents into separate arrays
    for (let i = 0; i < jsonData.length; i++) {
      arrOfTitle.push(jsonData[i].title);
      arrOfText.push(jsonData[i].text);
      indexNumber.push(i);
    }

    // Create array collection of unique word tokens for each document
    for (let k = 0; k < jsonData.length; k += 1) {
      let docContent = [];
      docContent = arrOfTitle[k] + ' ' + arrOfText[k];
      docContent = docContent.split(' ');
      const uniqueWordsArr = [];
      for (let q = 0; q < docContent.length; q += 1) {
        docContent[q] = docContent[q].replace(/([^\w]+)/g, '').toLowerCase();
        this.addUniqueWords(docContent[q], uniqueWordsArr);
      }
      allUniqueWords.push(uniqueWordsArr);
   }
    
    // Create index object
    for (let s = 0; s < allUniqueWords.length; s += 1) { 
      for(let p = 0; p < allUniqueWords[s].length; p += 1) {
        if (allUniqueWords[s][p] in indexObj) {
          indexObj[allUniqueWords[s][p]].push(s);
        } else {
            indexObj[allUniqueWords[s][p]] = [s];
        }       
      }
    }
    index[this.fileName] = indexObj;
    return index;
  }
  
  /**
  * Searches an index object with search terms
  * @returns {object} an object of the search results
  */
  searchIndex(terms) {
    const searchResult = {};
    const newNum = [];
    let word = '';
    let searcTerms = {};
    let indexNum = [];
    let indexObj = this.createIndex();
    let indexarr;
    if (arguments.length > 1) {
      indexarr = arguments;
    }
    else if (Array.isArray(terms)) {
      indexarr = terms;
    } else if (typeof terms === 'string') {
      indexarr = terms.split(' ');
    } else {
      return 'invalid search term';
    }
    // Check for word in index object 
    for (let s = 0; s < indexarr.length; s += 1) {
      // Remove any character not alphanumeric
      indexarr[s] = indexarr[s].replace(/([^\w]+)/g, '').toLowerCase();
      // Collect words and index number
      if (indexarr[s] in indexObj[this.fileName]) {
        word = word + indexarr[s] + ' ';
        indexNum = indexNum + indexObj[this.fileName][indexarr[s]];
      } else {
        continue;
      }
    }
    if (indexNum.length === 0) {
      return 'Search term(s) is not in document';
    }
    // Collect unique index numbers in array
    indexNum = indexNum.split('');
    for (let z = 0; z < indexNum.length; z += 1) {
      indexNum[z] = parseInt(indexNum[z]);
      this.addUniqueWords(indexNum[z], newNum);
    }    
    searchResult[word] = newNum;
    return searchResult;
  }
}