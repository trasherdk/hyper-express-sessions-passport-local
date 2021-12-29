var HyperExpress = require('hyper-express');
var LiveDirectory = require('live-directory');
var passport = require('passport');
var path = require('path')

var sessions = require('./boot/sessions')
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var myaccountRouter = require('./routes/myaccount');
var usersRouter = require('./routes/users');

require('./boot/db')();
require('./boot/auth')();

var port = 3000

var app = new HyperExpress.Server();

// Configure Sessions

app.use(sessions);
app.use(function(req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !! msgs.length;
  req.session.messages = [];
  next();
});

// Configure Passport

app.use(passport.authenticate('session'));

// Define server rendered html page routes.  
// See myaccountRouter for authorization example.

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/myaccount', myaccountRouter);
app.use('/users', usersRouter);

// Create static serve route to serve frontend assets

const LiveAssets = new LiveDirectory({ path: path.join(__dirname, 'public') });
app.get('/*',(req, res) => {
  const found = LiveAssets.get(req.path);
  if (!found) return res.status(404).send();
  return res.type(found.extension).send(found.buffer);
});

// Configure Hyperexpress not found and error handlers.

app.set_error_handler((req, res, error) => {
  console.log('error handler')
  res.status(500).send(JSON.stringify(error.toString()));
})
app.set_not_found_handler((req, res) => {
  res.status(404).send('not found');
})

app.listen(port)
.then((socket) => console.log('Webserver started'))
.catch((error) => console.log('Failed to start webserver'));
