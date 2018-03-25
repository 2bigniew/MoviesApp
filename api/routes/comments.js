const express = require('express');
const router = express.Router();
const axios = require('axios');

const pool = require('../../database/pool');
const con = require('../../database/connection');
const queries = require('../../database/queries');

router.post('/:id&:comment', (req, res, next) => {
  const movieId = req.params.id;
  const comment = req.params.comment;
  pool.getConnection((err, con) => {
    if (err) {
      res.send('Error ocured');
    } else {
      con.query(queries.addComment(comment, movieId), (err, result) => {
        if (err) res.status(500).json({
          message: 'SQL Error. Make sure you passed corect movieId',
          error: err.errno
        });
        res.status(201).json({
          message: `Comment was added successfuly to movie(movieId: ${req.params.id})`,
          comment: req.params.comment
        });
        con.release();
      });
    }
  });
});

router.get('/', (req, res, next) => {
  pool.getConnection((err, con) => {
    if (err) {
      res.send('Error ocured');
    } else {
      con.query(queries.showAllComments, (err, result) => {
        if (err) res.status(500).json({
          message: 'SQL Error',
          error: err.errno
        });
        //res.send(JSON.stringify(results));
        //res.send('<h1>Movies comments</h1>'+result.map( x => `<p>${JSON.stringify(x)}</p>`).join(''));
        if (result.length === 0){
          res.status(200).json({
            message: 'There is not any comment in database'
          });
        } else {
          res.status(200).json({
            message: 'All comments from database',
            data: result
          });
        }
        con.release();
      });
    }
  });
});

router.get('/:find', (req, res, next) => {
  pool.getConnection((err, con) => {
    if (err) {
      res.send('Error ocured');
    } else {
      con.query(queries.showComment(req.query.Id), (err, result) => {
        if (err) res.status(500).json({
          message: 'SQL Error',
          error: err.errno
        });

        if (result.length === 0) {
          res.status(200).json({
            message: `There is not any comment to movie where MovieId=${req.query.Id}`
          });
        } else {
          res.status(200).json({
            message: `result of search where MovieID = '${req.query.Id}' in comments database`,
            data: result
          })
        }
        //res.send(`<h1>Movie ID: ${req.params.movieId} comment: </h1><p>${JSON.stringify(result[0])}</p>`);
        con.release();
      });
    }
  });  
});

module.exports = router;
