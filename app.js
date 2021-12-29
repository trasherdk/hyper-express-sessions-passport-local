var HyperExpress = require('hyper-express');
var LiveDirectory = require('live-directory');
var passport = require('passport');
var path = require('path')

var sessions = require('./boot/sessions')
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var myaccountRouter = require('./routes/myaccount');
var usersRouter = require('./routes/users');

var app = new HyperExpress.Server();

var port = 3000

require('./boot/db')();
require('./boot/auth')();

app.use(sessions);
app.use(function(req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !! msgs.length;
  req.session.messages = [];
  next();
});

app.use(passport.authenticate('session'));

// Define routes.
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/myaccount', myaccountRouter);
app.use('/users', usersRouter);

// Create static serve route to serve frontend assets
const LiveAssets = new LiveDirectory({ path: path.join(__dirname, 'public') });
app.get('/*',(request, response) => {
  const found = LiveAssets.get(request.path);
  if (!found) return response.status(404).send();
  return response.type(found.extension).send(found.buffer);
});

app.listen(port)
.then((socket) => console.log('Webserver started'))
.catch((error) => console.log('Failed to start webserver'));
