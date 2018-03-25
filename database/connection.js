const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'user1',
  password: '1234abc',
  database: 'movies_app',
  stringifyObjects: true
});

module.exports = con;
