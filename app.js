const express = require('express');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');

const app = express();

const con = require('./database/connection');

if(con.state === 'disconnected'){
  con.connect( err => {
    if (err) throw err;
  });

const moviesRoutes = require('./api/routes/movies');
const commentsRoutes = require('./api/routes/comments');

app.use('/assetss', express.static(__dirname + '/public'));

app.use('/movies', moviesRoutes);
app.use('/comments', commentsRoutes);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  if(con.state === 'disconnected'){
    con.connect( err => {
      if (err) throw err;
    });
  }
  res.render('index');
});

module.exports = app;
