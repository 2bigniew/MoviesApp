const mysql = require('mysql');

const conConfig = {
  connectionLimit: 10,
  host: 'localhost',
  user: 'user1',
  password: '1234abc',
  database: 'movies_app',
  stringifyObjects: true
};

const pool = mysql.createPool(conConfig);

module.exports = pool;
