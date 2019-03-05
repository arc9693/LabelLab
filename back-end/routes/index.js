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
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)
      console.log(file);
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    })
  }
})

var upload = multer({ storage: storage })
// POST an image
router.post('/', upload.single('image'), function (req, res, next) {
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
            console.log(err.code,err.sqlMessage);
            res.status(500).send("Bad request");
            return
          }
         res.status(200).send("Done");
        });
     }
});


/* GET all images */
router.get('/', function(req, res, next) {
  var sql = "SELECT * FROM `Images`";
  var query = db.query(sql, function(err, result) {
    if(err)
    {
      console.log(err.code,err.sqlMessage);
      res.status(500).send("Bad request");
      return
    }
   res.status(200).send(result);
  });
});

/*GET AN IMAGE*/
router.get('/:id',function (req,res,next) {
  var sql = "SELECT * FROM `Images` where id="+req.params.id;
  var query = db.query(sql, function(err, result) {
    if(err)
    { console.log(err.code,err.sqlMessage);
      res.status(500).send("Bad request");
      return
    }
    if(result==0)
    { res.status(404).send("Not found");
      return
    }
   res.status(200).send(result);
  });
})

/*UPDATE AN IMAGE ELEMENT*/

router.put('/:id',function (req,res,next) {
  var sql = "SELECT * FROM `Images` where id="+req.params.id;
  var query = db.query(sql, function(err, result) {
    if(err)
    { console.log(err.code,err.sqlMessage);
      res.status(500).send("Bad request");
      return
    }
    if(result==0)
    { res.status(404).send("Not found");
      return
    }});

   sql='UPDATE `Images` SET x = '+req.body.x+', y = '+req.body.y+', height='+req.body.height+',width='+req.body.width+',label="'+req.body.label+'",has_label="true" WHERE id='+req.params.id;
   query = db.query(sql, function(err, result) {
     if(err)
     { console.log(err.code,err.sqlMessage,err);
       res.status(500).send("Bad request");
       return
     }
   res.status(200).send("success");
  });
})

/*DELETE AN IMAGE ELEMENT*/
router.delete('/:id',function (req,res,next) {
  var sql = "DELETE FROM `Images` where id="+req.params.id;
  var query = db.query(sql, function(err, result) {
    if(err)
    { console.log(err.code+" "+err.sqlMessage);
      res.status(500).send("Bad request");
      return
    }
   res.status(200).send("success");
  });
})
module.exports = router;
