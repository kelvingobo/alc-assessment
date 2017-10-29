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
app.use(express.static(__dirname + '/build/default'));

// fs.readFile('images/manifest/icon-48x48.png', (err, data) => {
//   if (err) throw err;
//   http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write('<html><body><img src="data:image/jpeg;base64,')
//     res.write(Buffer.from(data).toString('base64'));
//     res.end('"/></body></html>');
//   }).listen(8124);
//   console.log('Server running at http://localhost:8124/');
// });

require('./app/routes')(app);
// return the index.html for all routes
app.get('*', function(req, res){
  res.sendFile("index.html", {root: '.'});
});

app.listen(port, () => {
  console.log('We are live on ' + port);
});
