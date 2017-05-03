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
    this.fileContent;
  }

  /**
  * Reads a valid JSON data from given file
  * @returns {object} a JSON array
  */
  __getJson() {
    // Return a valid json array
    try {
      this.fileContent = JSON.parse(fs.readFileSync( 'fixtures/' + this.fileName));
      return this.fileContent;
    } catch (e) {
      if (e.message === 'Unexpected end of JSON input') {
        return ('invalid json');
      } else {
          return ('malformed json');
      }   
    }
  }
  
  /**
  * Adds words not already in the array
  * @return {boolean} a true if unique word
  */
  __addUniqueWords(data, arr) {
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
    let arrOfTitle = [];
    let arrOfText = [];
    let indexNumber= [];
    let indexObj = {};
    let index = {};
    let allUniqueWords = [];
    let jsonData;
    jsonData = this.__getJson();



    // Group title and text in all documents into separate arrays
    for (let i=0; i<jsonData.length; i++) {
      arrOfTitle.push(jsonData[i].title);
      arrOfText.push(jsonData[i].text);
      indexNumber.push(i);
    }

    // Create array collection of unique word tokens for each document
    for (let k=0; k<jsonData.length; k++) {
      let docContent = [];
      docContent = arrOfTitle[k] + ' ' + arrOfText[k];
      docContent = docContent.split(' ');
      let uniqueWordsArr = [];
        for (let q=0; q<docContent.length; q++) {
            this.__addUniqueWords(docContent[q], uniqueWordsArr);
        }
        allUniqueWords.push(uniqueWordsArr);
   }
    
    // Create index object
    for (let s=0; s<allUniqueWords.length; s++) { 
      for(let p=0; p<allUniqueWords[s].length; p++) {
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
    // use index from createIndex to search terms
    const newterms = terms;
    const fileName = this.fileName;
    this.createIndex();
  }
}

module.exports = invertedIndex;