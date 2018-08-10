var express = require('express');
var app = express();
var pug = require('pug');
var LoginHelper = require('./login');
var config = require('../package').config;

app.use(express.urlencoded({extended : true}));

app.get('/login', function(req, res) {
	res.type('text/html');
  var loginFunction = pug.compileFile('./src/templates/login.pug', {});
  var html = loginFunction();
	res.status(200).send(html);
});

app.post('/login', function(req, res) {
	res.type('text/html');
  var credentials = {un: req.body.userEmail, pw: req.body.userPassword};
  const login = new LoginHelper(credentials);

  login.validateCredentials().then( data => {
    var welcomeFunction = pug.compileFile('./src/templates/welcome.pug', {});
    var html = welcomeFunction();
    res.status(200).send(html);
  }).catch(data => {
    var errorFunction = pug.compileFile('./src/templates/loginError.pug', {});
    var html = errorFunction();
    res.status(403).send(html);
  });
});

app.post('/logout', function(req, res) {
	res.type('text/html');
  var logout = pug.compileFile('./src/templates/login.pug', {});
  var html = logout();
	res.status(200).send(html);
});

app.listen(config.port);
console.log(`${config.port} is the magic port!`);
