const mysql = require('mysql');

const conConfig = {
  host: 'localhost',
  user: 'user1',
  password: '1234abc',
  database: 'movies_app',
  stringifyObjects: true
};

const con = mysql.createConnection(conConfig);

module.exports = con;
