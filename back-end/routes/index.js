const express = require('express');

const router = express.Router();

/* GET all images */
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM `Images`';
  const query = db.query(sql, (err, result) => {
    if (err) {
    //  console.log(err.code, err.sqlMessage);
      res.status(500).send('Bad request');
      return;
    }
    res.status(200).send(result);
  });
});

/* GET AN IMAGE */
router.get('/:id', (req, res) => {
  const sql = `SELECT * FROM \`Images\` where id=${req.params.id}`;
  const query = db.query(sql, (err, result) => {
    if (err) {
      console.log(err.code, err.sqlMessage);
      res.status(500).send('Bad request');
      return;
    }
    if (result === 0) {
      res.status(404).send('Not found');
      return;
    }
    res.status(200).send(result);
  });
});

/* UPDATE AN IMAGE ELEMENT */

router.put('/:id', (req, res) => {
  let sql = `SELECT * FROM \`Images\` where id=${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      console.log(err.code, err.sqlMessage);
      res.status(500).send('Bad request');
      return;
    }
    if (result === 0) {
      res.status(404).send('Not found');
    }
  });

  sql = `UPDATE \`Images\` SET x = ${req.body.x}, y = ${req.body.y}, height=${req.body.height},width=${req.body.width},label="${req.body.label}",has_label="true" WHERE id=${req.params.id}`;
  query = db.query(sql, (err) => {
    if (err) {
      // console.log(err.code, err.sqlMessage, err);
      res.status(500).send('Bad request');
      return;
    }
    res.status(200).send('success');
  });
});

/* DELETE AN IMAGE ELEMENT */
router.delete('/:id', (req, res) => {
  const sql = `DELETE FROM \`Images\` where id=${req.params.id}`;
  const query = db.query(sql, (err) => {
    if (err) {
    //  console.log(`${err.code} ${err.sqlMessage}`);
      res.status(500).send('Bad request');
      return;
    }
    res.status(200).send('success');
  });
});
module.exports = router;
