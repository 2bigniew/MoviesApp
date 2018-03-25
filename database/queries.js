const queries = {
  addMovie: function(title, year, imdbID, type, poster) {
    return `INSERT INTO movies VALUES
(default, '${title}', '${year}', '${imdbID}', '${type}', '${poster}');`;
},
  showMovie: function(title) {
    return `SELECT
    id_movie AS 'Movie ID' ,
    title AS 'Title',
    m_year AS 'Year',
    imbdID ,
    m_type AS 'Type',
    poster AS 'Poster'
    FROM movies WHERE title like '%${title}%';`;
  },
  showAllMovies: `SELECT
    id_movie AS 'Movie ID',
    title AS 'Title',
    m_year AS 'Year',
    imbdID ,
    m_type AS 'Type',
    poster AS 'Poster'
    FROM movies;`,
  addComment: function(comment, movieId) {
    return `INSERT INTO comments VALUES (default, '${comment}', ${movieId});`;
  },
  showAllComments: `SELECT
    id_comment AS 'Comment ID',
    m_comment AS 'Comment',
    c.id_movie AS 'Movie ID',
    title AS 'Title'
    FROM comments c INNER JOIN movies m ON c.id_movie=m.id_movie;`,
  showComment: function(id_movie) {
    return `SELECT
    id_comment AS 'Comment ID',
    m_comment AS 'Comment',
    c.id_movie AS 'Movie ID',
    title AS 'Title'
    FROM comments c INNER JOIN movies m ON c.id_movie=m.id_movie
    WHERE c.id_movie = ${id_movie};`
  },
  orderMovies: function(num) {
    return `SELECT
    id_movie AS 'Movie ID',
    title AS 'Title',
    m_year AS 'Year',
    imbdID ,
    m_type AS 'Type',
    poster AS 'Poster'
    FROM movies ORDER BY ${num} ASC;`
  }
};

module.exports = queries;
