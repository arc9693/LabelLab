const express = require('express');

const router = express.Router();

/* GET all images */
router.get('/', (req, res, next) => {
  const sql = 'SELECT * FROM `Images`';
  db.query(sql, (err, result) => {
    if (err) {
    //  console.log(err.code, err.sqlMessage);
      res.status(500).send('Bad request');
      return;
    }
    res.status(200).send(result);
  });
});

/* Query labels */
router.get('/labels', (req, res, next) => {
  const sql = `SELECT ImageID FROM Labels WHERE Label='${req.query.q}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err.code, err.sqlMessage);
      return res.status(500).send('Bad request');
    }
    let response = [];
    for (let i = 0; i < result.length; i++) {
      response[i] = result[i].ImageID;
    }
    response = [...new Set(response)];
    return res.status(200).send(response);
  });
});

/* GET AN IMAGE AND ITS LABELS */
router.get('/:id', (req, res) => {
  const sql = `SELECT * FROM \`Images\` WHERE id=${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      // console.log(err.code, err.sqlMessage);
      res.status(500).send('Bad request');
      return;
    }
    if (result === 0) {
      res.status(404).send('Not found');
      return;
    }
    // console.log(result[0].ID);
    const sql2 = `SELECT * FROM Labels WHERE ImageID=${result[0].ID}`;
    db.query(sql2, (err2, result2) => {
      if (err2) {
        console.log(err2.code, err2.sqlMessage);
        return res.status(500).send('Bad request');
      }
      const response = {
        Image: result[0],
        Labels: result2,
      };
      return res.status(200).send(response);
    });
  });
});

/* DELETE AN IMAGE ELEMENT AND LABELS ASSOCIATED WITH IT */
router.delete('/:id', (req, res) => {
  const sql = `DELETE FROM Labels WHERE ImageID=${req.params.id}`;
  const sql2 = `DELETE FROM \`Images\` WHERE ID=${req.params.id}`;
  db.query(sql, (err) => {
    if (err) {
      // console.log(`${err.code} ${err.sqlMessage}`);
      res.status(500).send('Bad request');
      return;
    }
    db.query(sql2, (err2) => {
      if (err2) {
      // console.log(`${err2.code} ${err2.sqlMessage}`);
        res.status(500).send('Bad request');
        return;
      }
      res.status(200).send('success');
    });
  });
});


/* GET ALL LABELS OF AN IMAGE */
router.get('/:id/labels', (req, res) => {
  const sql = `SELECT * FROM Labels WHERE ImageID=${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      // console.log(err.code, err.sqlMessage);
      return res.status(500).send('Bad request');
    }
    return res.status(200).send(result);
  });
});

/* ADD A LABEL */
router.post('/:id/labels/add', (req, res) => {
  const sql = `INSERT INTO Labels (x,y,height,width,Label,ImageID) VALUES (${req.body.x}, ${req.body.y}, ${req.body.height},${req.body.width},'${req.body.Label}',${req.params.id})`;
  db.query(sql, (err) => {
    if (err) {
      console.log(err.code, err.sqlMessage, err);
      res.status(500).send('Bad request');
      return;
    }
    res.status(200).send('success');
  });
});

/* REMOVE A LABEL */
router.delete('/:id/labels/remove/:labelId', (req, res) => {
  const sql = `DELETE FROM Labels WHERE ImageID=${req.params.id} and ID=${req.params.labelId}`;
  db.query(sql, (err) => {
    if (err) {
      console.log(err.code, err.sqlMessage, err);
      res.status(500).send('Bad request');
      return;
    }
    res.status(200).send('success');
  });
});

module.exports = router;
