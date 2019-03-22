const express = require('express');
const sizeOf = require('image-size');

const router = express.Router();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// fileupload setup
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads/'));
  },
  filename(req, file, cb) {
    // console.log(file);
    crypto.pseudoRandomBytes(16, (err) => {
      if (err) {
      //  console.log(err);
        return cb(err);
      }
      //  console.log(file);
      return cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    });
  },
});

const upload = multer({ storage });
// POST an image
router.post('/', upload.single('file'), (req, res) => {
  // req.file is the `image` file
  // req.body will hold the text fields, if there were any
  if (!req.file) {
    // console.log('No file received');
    res.status(404).send('Error! in image upload.');
  } else {
    // console.log('File received');
    const dimesions = sizeOf(req.file.path);
    const sql = `INSERT INTO \`Images\`(\`name\`,height,width) VALUES ('${req.file.filename}',${dimesions.height},${dimesions.width})`;
    db.query(sql, (err) => {
      if (err) {
        // console.log(err.code, err.sqlMessage, err);
        res.status(500).send('Bad request');
        return;
      }
      res.status(200).send('Done');
    });
  }
});

module.exports = router;
