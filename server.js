// Node.js notation for importing packages
const express = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const fs = require('fs');
const http = require('http');

// Spin up a server
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve static files from the main directory
app.use(express.static(__dirname + '/'));

require('./app/routes')(app);
// return the index.html for all routes
app.get('*', function(req, res){
  res.sendFile("index.html", {root: '.'});
});

app.listen(process.env.PORT || port, () => {
  console.log('We are live on ' + port);
});
