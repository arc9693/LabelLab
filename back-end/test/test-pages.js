var expect  = require('chai').expect;
var request = require('request');

it('Main page content', function(done) {
    request('http://localhost:5000' , function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
});
