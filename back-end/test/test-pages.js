const { expect } = require('chai');
const request = require('request');
const fs = require('fs');
const app = require('../app');
const server = require('http').createServer(app);


describe('CHECK ROUTES\n', () => {
  beforeEach(() => {
    server.listen(5000, () => { console.log('Server started!\n'); });
  }),

  it('GET ALL IMAGES', (done) => {
    request('http://localhost:5000', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  }),

  it('Posting an image', (done) => {
    const formData = {
      file: fs.createReadStream(`${__dirname}/test.jpg`),
    };
    request.post({ url: 'http://localhost:5000', formData }, (err, response, body) => {
      console.log(body);
      image = body;
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('Gets an image', (done) => {
    request('http://localhost:5000/1', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  afterEach((done) => {
    server.close(() => { console.log('\nServer closed!'); done(); });
  });
});
