var expect  = require('chai').expect;
var request = require('request');
var app = require('../app');
var server = require('http').createServer(app);
var fs = require('fs');

describe('CHECK ROUTES\n', function () {

  beforeEach( () => {
   server.listen(5000,function () { console.log('Server started!\n'); });
   } ),

  it('GET ALL IMAGES', function(done) {
      request('http://localhost:5000' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    }),

  it('Posting an image', function(done) {
    var formData = {
      file: fs.createReadStream(__dirname+'/test.jpg'),
    };
    request.post({url:'http://localhost:5000', formData: formData}, function(err,response,body){
      console.log(body);
      image=body;
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('Gets an image', function(done) {
    request('http://localhost:5000/1' , function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  afterEach( ( done ) => {
    server.close(function () { console.log('\nServer closed!');done() });
  })

});
