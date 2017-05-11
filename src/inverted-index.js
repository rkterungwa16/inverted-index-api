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
    this.fileContentArr = [];
  }

  /**
  * Reads a valid JSON data from given file
  * @returns {object} a JSON array
  */
  getJson() {
    if (Array.isArray(this.fileName)) {
      this.fileName = this.fileName;
    } else {
      this.fileName = this.fileName.split(' ');
    }
    for (let i = 0; i < this.fileName.length; i += 1) {
      try {
        let fileContent = JSON.parse(fs.readFileSync(`fixtures/${this.fileName[i]}`));
        this.fileContentArr.push(fileContent);
      } catch (e) {
        return 'malformed json';   
      }
    }
    return { fileContentArr: this.fileContentArr, fileName: this.fileName };
  }
  
  /**
  * Collects originalname and path properties from multer object
  * @return { object } a object of filename and filecontent
  * @param { array }
  */
  getMulterJson(arrayOfFileObjects) {
    const fileName = [];
    const filePath = [];
    for (let i = 0; i < arrayOfFileObjects.length; i++) {
      fileName.push(arrayOfFileObjects[i].originalname);
      filePath.push(arrayOfFileObjects[i].path);
    }
    for (let i = 0; i < fileName.length; i++) {
      try {
        let fileContent = JSON.parse(fs.readFileSync(filePath[i]));
        this.fileContentArr.push(fileContent);
      } catch(e) {
        return 'invalid json'; 
      }     
    }
    return { fileContentArr: this.fileContentArr, fileName: fileName };
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
  * Creates an object with string keys and array values
  * @return an object with string keys and array of integer values
  * @param {array} an array of array
  */
  createIndexObj(uniqueWordsArr) {
    let indexObj = {};
    for (let s = 0; s < uniqueWordsArr.length; s += 1) {
       for (let p = 0; p < uniqueWordsArr[s].length; p += 1) {
          if (indexObj[uniqueWordsArr[s][p]]) {
            indexObj[uniqueWordsArr[s][p]].push(s);
          } else {
            indexObj[uniqueWordsArr[s][p]] = [s];
          }
       }
    }
    return indexObj;
  }

  /**
  * Creates an array of arrays of all the words for each document containing title and text
  * @returns an array of array of all words for each document
  * @param {array} an array of the title
  * @param {array} an array of the text
  * @param {array} a valid json document from the file
  */
  wordsFileDoc(titleArr, textArr, jsonDoc) {
    let docContent = [];
    let wordsPerDoc = [];
    for (let k = 0; k < jsonDoc.length; k += 1) {
      docContent = titleArr[k] + ' ' + textArr[k];
      docContent = docContent.split(' ');
      wordsPerDoc.push(docContent);
    }
    return wordsPerDoc;
  }
  
  /**
  * Creates unique words array from an array of words with duplicate words
  * @return {array} an array of array of unique words
  * @param {array} an array of arrays
  */
  uniqueWordsPerDoc(wordsDoc) {
    let uniqueWords = [];
    let words = [];
    for (let q = 0; q < wordsDoc.length; q += 1) {
      for (let x = 0; x < wordsDoc[q].length; x += 1) {
        wordsDoc[q][x] = wordsDoc[q][x].replace(/([^\w]+)/g, '').toLowerCase();
        this.addUniqueWords(wordsDoc[q][x], words);
      }
      if (words.length > 0) {
        uniqueWords.push(words);
      }   
      words = []; 
    } 
    return uniqueWords;
  }

  /**
  * Creates a index object from a given JSON array
  * @return {object} an index object
  */
  createIndex(filename, filecontentArr) {
    let arrOfTitle = [];
    let arrOfText = [];
    let indexObj = {};
    let index = {}; 
    const mydata = filecontentArr;
    let fileName = filename;
    // Create index object for each individual file
    for (let n = 0; n < mydata.length; n += 1) {
      let jsonData = mydata[n];
      // Group title and text in all documents into separate arrays
      for (let i = 0; i < jsonData.length; i += 1) {
        arrOfTitle.push(jsonData[i].title);
        arrOfText.push(jsonData[i].text);
      }
      // Create array collection of unique word tokens for each document
      let allWords = this.wordsFileDoc(arrOfTitle, arrOfText, jsonData);
      let uniqueWords = this.uniqueWordsPerDoc(allWords);  
      // Create index object
      indexObj = this.createIndexObj(uniqueWords);
      index[fileName[n]] = indexObj;
      arrOfTitle = [];
      arrOfText = [];
    } 
    let newIndex = {}
    for (let s = 0; s < fileName.length; s += 1) {
      newIndex[fileName[s]] = index[fileName[s]];
    }  
    return newIndex;
  }
  
  /**
  * Searches an index object with search terms
  * @returns {object} an object of the search results index fileName terms
  */
  searchIndex(createdIndex, terms) {
    const searchResult = {};
    const newNum = [];
    let word = '';
    let indexNum = [];
    let indexObj = createdIndex;
    let indexarr = [];
    let file = '';
    let searchObj = {};
    let fileName = [];
    let argArray = [];
    let test = /[.json]/.test(arguments[1]);
    if (arguments.length === 3 && test) {
      if (Array.isArray(arguments[2])) {
        indexarr = arguments[2];
      } else if (typeof arguments[2] === 'string') {
        indexarr.push(arguments[2]);
      }
      fileName.push(arguments[1]);
    } else if (arguments.length > 3 && test) {
      for (let u = 0; u < arguments.length; u += 1) {
          argArray.push(arguments[u])
      }
      argArray.splice(0, 2);
      indexarr = argArray;
    } else if (arguments.length > 2 && !test) {
        for (let z = 0; z < arguments.length; z += 1) {
          argArray.push(arguments[z])
        }
        argArray.splice(0, 1);
        indexarr = argArray;
        fileName = this.getJson().fileName;
    } else if (arguments.length === 2 && Array.isArray(terms)) {
      indexarr = arguments[1];
      fileName = this.getJson().fileName;
    } else if (arguments.length === 2 && typeof terms === 'string') {
      indexarr = arguments[1].split(' ');
      fileName = this.getJson().fileName;
    } else {
      return 'invalid search term';
    }
    // Check for word in index object 
    for (let s = 0; s < indexarr.length; s += 1) {
      // Remove any character not alphanumeric
      indexarr[s] = indexarr[s].replace(/([^\w]+)/g, '').toLowerCase();
      // Collect words and index number      
      for (let k = 0; k < fileName.length; k += 1) {
        if (indexarr[s] in indexObj[fileName[k]]) {
          word = word + indexarr[s] + ' ';
          indexNum = indexNum + indexObj[fileName[k]][indexarr[s]];
          file = fileName[k];
        } else {
          continue;
        }
      }     
    }
    if (indexNum.length === 0) {
      return 'Search term(s) is not in document';
    }
    // Remove trailing spaces
    word = word.split('').slice(0, word.length - 1).join('');
    // Remove any character not a digit
    indexNum = indexNum.replace(/([^\d]+)/g, '').split('');
    // Collect unique index numbers in array
    for (var z = 0; z < indexNum.length; z += 1) {
      indexNum[z] = parseInt(indexNum[z]);
      this.addUniqueWords(indexNum[z], newNum);
    }   
    searchResult[word] = newNum;
    searchObj[file] = searchResult;
    return searchObj;
  }
}