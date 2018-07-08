var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json())

app.use('/css',express.static( 'public/css'));
app.use('/html',express.static( 'public/html'));
app.use('/img',express.static( 'public/img'));
app.use('/js',express.static( 'public/js'));

module.exports = app;
