const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'us-cdbr-iron-east-05.cleardb.net',
  user: 'bd7cda7106423d',
  password: '10942c9a',
  database: 'heroku_307692653aa85d1',
  stringifyObjects: true,
  connectTimeout: 86400000
});

module.exports = con;
