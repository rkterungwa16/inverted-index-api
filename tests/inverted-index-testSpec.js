import myApp from '../src/inverted-index.js';

describe('Sum()', () => {    
  it('counts one word', () => {
    expect(myApp.sum(1, 2)).toEqual(3);
  });
});