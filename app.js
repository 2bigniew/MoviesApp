const express = require('express');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');

const app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

console.log('Hello world');
console.log('Hello world second time');
console.log('is it working?');

app.listen(app.get('port'), () => {
  console.log(`Node app is running on port ${app.get('port')}`);
})
