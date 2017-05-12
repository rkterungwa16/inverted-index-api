import req from 'supertest';
import myApp from '../server';

const request = req(myApp);

describe('Should return a valid content-type', () => {
  it('should return a valid json', (done) => {
    request
    .post('/api/searchIndex')
    .expect('Content-Type', 'application/json; charset=utf-8', done);
  });

  it('Should respond with an object', (done) => {
    request
    .post('/api/createIndex')
    .attach('files', './fixtures/book.json')
    .end((err, res) => {
      expect(typeof res.body).toEqual('object');
      done();
    });
  });

  it('Should respon with a valid index object', (done) => {
    request
    .post('/api/createIndex')
    .attach('files', './fixtures/book.json')
    .end((err, res) => {
      expect(res.body).toEqual({ 'book.json':
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
        also: [1] } });
      done();
    });
  });

  it('Should respond with a 200 status', (done) => {
    request
    .post('/api/createIndex')
    .attach('files', './fixtures/book.json')
    .end((err, res) => {
      expect(res.status).toEqual(200);
      done(err);
    });
  });

  it('Should respond with a valid search result', (done) => {
    request
    .post('/api/createIndex')
    .attach('files', './fixtures/book.json')
    .end(() => {
      request
      .post('/api/searchIndex')
      .send({
        terms: ['an', 'world'],
        filename: ['book.json']
      })
      .end((err, res) => {
        expect(res.status).toEqual(200);
        done(err);
      });
    });
  });
});