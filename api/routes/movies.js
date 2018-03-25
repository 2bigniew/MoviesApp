const express = require('express');
const router = express.Router();
const axios = require('axios');

const pool = require('../../database/pool');
const con = require('../../database/connection');
const queries = require('../../database/queries');
const helpers = require('../helpers/helpers');

router.get('/', (req, res, next) => {
  pool.getConnection((err, con) => {
    if (err) {
      res.send('Error ocured');
    } else {
      con.query(queries.showAllMovies, (err, result) => {
        if (err) res.status(500).json({
          message: 'SQL Error',
          error: err.errno
        });

        if (result.length === 0){
          res.status(200).json({
              message: 'There is not any movie in database'
          });
        } else {
          res.status(200).json({
            message: "All movies from database",
            data: result
          });
        }
        con.release();
      });
    }
  });
});

router.get('/:find', (req, res, next) => {
  con.query(queries.showMovie(req.query.Title), (err, result) => {
    if (err) res.status(500).json({
      message: 'SQL Error',
      error: err.errno
    });

    if (result.length === 0){
      res.status(200).json({
          message: `There is not movie '${req.query.Title}' in database`
      });
    } else {
      res.status(200).json({
        message: `result of search '${req.query.Title}'  in movies database`,
        data: result
      });
    }
  });
});

router.get('/list/:sort', (req, res, next) => {
  if(parseInt(req.query.Option) <=6) {
    con.query(queries.orderMovies(req.query.Option), (err, result) => {
      if(err) res.status(500).json({
        message: 'SQL Error',
        error: err.errno
      });

      if (result.length === 0) {
        res.status(200).json({
          message: 'There is not any movie in database'
        });
      } else {
        res.status(200).json({
          message: "All sorted movies from database",
          data: result
        });
      }
    });

  } else {
    res.status(200).json({
      message: 'No option available. Option should equal number between 1-6.'
    });
  }
});

//   if(req.query.Option <=6) {
//
//     con.query(queries.orderMovies(req.query.Option), (err, results) => {
//       if (err) res.status(500).json({
//         message: 'SQL Error',
//         error: err.errno
//       });
//
//         if(result.length === 0){
//           res.status(200).json({
//             message: 'There is not any movie in database'
//           });
//         } else {
//           res.status(200).json({
//             message: "All sorted movies from database",
//             data: result
//           });
//         }
//       });
//
//   } else {
//
//     res.status(200).json({
//       message: 'No option available. Option should equal number between 1-6.'
//     });
//   }
// });

router.post('/:title', (req, res, next) => {
  const movieTitle = helpers.validateTitle(req.params.title);
  axios.get('http://www.omdbapi.com/?s='+movieTitle+'&apikey=b3a0b8c6')
    .then(response => {
      con.query(queries.addMovie(
        response.data.Search[0].Title,
        response.data.Search[0].Year,
        response.data.Search[0].imdbID,
        response.data.Search[0].Type,
        response.data.Search[0].Poster
      ), (err, result) => {
        if(err) throw err;
      })
      res.status(201).json({
        message: `'${response.data.Search[0].Title}' movie was successfuly added to the database`,
        movieData: response.data.Search[0]
      });
    })
    .catch(error => res.status(404).json({
      error: '404 Not Found',
      message: `Cannot find movie '${movieTitle}' in OMDb API`
    }));
});

module.exports = router;
