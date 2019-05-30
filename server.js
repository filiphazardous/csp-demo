// Mostly stolen from https://www.youtube.com/watch?v=JbfNWg6JS4U
// and https://github.com/shama/letswritecode/tree/master/content-security-policy
// Except for the fake database - that one's on me

"use strict";


var http = require('http');
var fs = require('fs');
var browserify = require('browserify');
var Db = require('./lib/db');
var db = new Db();
db.addCollection('comments', []);
var template = require('lodash').template(fs.readFileSync('index.html', 'utf8'));

var server = http.createServer((req, res) => {
  switch (req.url) {
    case '/index.js':
      browserify('index.js').bundle().pipe(res);
      break;
    case '/index.css':
      fs.createReadStream('index.css').pipe(res);
      break;
    case '/addComment':
      var comment = [];
      req.on('data', (data) => {
        comment.push(data);
      });
      req.on('end', (data) => {
        comment = comment.join('');
        db.comments.push({ date: Date.now(), comment });
        res.end();
      });
      break;
    default:
      var comments = db.comments.all();
      res.end(template({comments}));
  }
});

server.listen(8081, () => {
  console.log('Server running at http://localhost:8081');
});
