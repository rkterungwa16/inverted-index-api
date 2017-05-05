import myApp from '../server.js';
import req from 'supertest';

const request = req(myApp);

describe('Sample unit test', () => {
  it('should return a valid json', (done) => {
    request
    .post('/api/searchIndex')
    .expect('Content-Type', 'application/json', done);
  });

  it('Should return { "third world": [ 1 ] }', (done) => {
  	request
  	.post('/api/searchIndex')
  	.expect({ 'an world': [ 0, 1 ] }, done);
  });

  it('Should return a valid json', (done) => {
  	request
  	.post('/api/createIndex')
  	.expect('Content-Type', 'application/json', done);
  });

  it('Should return valid index object', (done) => {
  	request
  	.post('/api/createIndex')
  	.expect({ 'book.json': 
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
     also: [ 1 ] } }, done);
  })
});