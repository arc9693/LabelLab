var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
const crypto = require('crypto');

//fileupload setup
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads/"))
  },
  filename: function (req, file, cb) {
    console.log(file);
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) {console.log(err);
        return cb(err);}
      console.log(file);
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    })
  }
})

var upload = multer({ storage: storage })
// POST an image
router.post('/', upload.single('file'), function (req, res, next) {
  // req.file is the `image` file
  // req.body will hold the text fields, if there were any
    if (!req.file) {
        console.log("No file received");
        res.status(404).send("Error! in image upload.");

      } else {
        console.log('file received');
        var sql = "INSERT INTO `Images`(`name`) VALUES ('" + req.file.filename + "')";
        var query = db.query(sql, function(err, result) {
          if(err)
          {
            console.log(err.code,err.sqlMessage,err);
            res.status(500).send("Bad request");
            return
          }
         res.status(200).send("Done");
        });
     }
});

module.exports = router;
