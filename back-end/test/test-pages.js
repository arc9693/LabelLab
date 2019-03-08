var expect  = require('chai').expect;
var request = require('request');
var fs = require('fs');
it('Main page content', function(done) {
    request('http://localhost:5000' , function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
});

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
