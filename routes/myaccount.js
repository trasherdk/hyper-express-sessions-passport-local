var HyperExpress = require('hyper-express');
var router = new HyperExpress.Router();

var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var db = require('../db');

/* GET users listing. */
router.get('/',
  ensureLoggedIn(),
  function(req, res, next) {
    db.get('SELECT rowid AS id, username, name FROM users WHERE rowid = ?', [ req.user.id ], function(err, row) {
      if (err) { return next(err); }
    
      // TODO: Handle undefined row.
    
      var user = {
        id: row.id.toString(),
        username: row.username,
        displayName: row.name
      };
      res.render('profile', { user: user });
    });
  });

module.exports = router;
