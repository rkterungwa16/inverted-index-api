'use strict'
var myApp = require('../src/inverted-index.js');

describe('Sum()', function() {
    
    it("counts one word", function() {
    expect(myApp.sum(1, 2)).toEqual(3);
  });
});
