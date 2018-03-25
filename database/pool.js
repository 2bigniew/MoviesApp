const mysql = require('mysql');

const conConfig = {
  connectionLimit: 10,
  host: 'us-cdbr-iron-east-05.cleardb.net',
  user: 'bd7cda7106423d',
  password: '10942c9a',
  database: 'heroku_307692653aa85d1',
  stringifyObjects: true
};

const pool = mysql createPool(conConfig);

module.exports = pool;
