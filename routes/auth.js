var HyperExpress = require('hyper-express');
var passport = require('passport');
var render = require('../boot/render')

var router = new HyperExpress.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  render("login.ejs", { hasMessages: false, messages: []}, (err, str) => {
    if (err) next(err);
    res.send(str);
  });
});

router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}));

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
