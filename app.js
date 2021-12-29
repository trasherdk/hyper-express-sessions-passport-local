var HyperExpress = require('hyper-express');
var LiveDirectory = require('live-directory');
var passport = require('passport');

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
/*
const LiveAssets = new LiveDirectory({ path: path.join(__dirname, 'public') });
app.use('/',(request, response) => {
  console.log('static', request.path)
  const file = LiveAssets.get(request.path);
  // Return a 404 if no asset/file exists on the derived path
  if (file === undefined) return response.status(404).send();
  // Set appropriate mime-type and serve file buffer as response body
  return response.type(file.extension).send(file.buffer);
});
*/
app.listen(port)
.then((socket) => console.log('Webserver started'))
.catch((error) => console.log('Failed to start webserver'));
