require('dotenv').load();

var express = require('express');
var db = require('./app/db/db')();

var dir = require('./app/directory')(db);
var federatedCredentials = require('./app/db/federatedcredentials')(db);


var passport = require('./app/authenticator')(dir);

// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(function(req, res, next) {
  console.log('# ' + req.url);
  console.log(req.session);
  next();
})

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Define routes.
app.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });

app.get('/signup', require('./app/handlers/signup/show')());
app.post('/signup', require('./app/handlers/signup/create')(dir));

app.get('/login', require('./app/handlers/login/prompt')());
app.post('/login', require('./app/handlers/login/authenticate')(passport));

app.get('/login/:issuer', require('./app/handlers/login/federate/initiate')(passport));
app.get('/login/oauth/callback', require('./app/handlers/login/oauth/callback')(passport, federatedCredentials, dir));
app.get('/login/oauth2/callback', require('./app/handlers/login/oauth2/callback')(passport, federatedCredentials, dir));

  
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    console.log(req.user);
    
    res.render('profile', { user: req.user });
  });

app.listen(3000);
