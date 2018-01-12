exports = module.exports = function(directory) {
  
  function registerAndLogIn(req, res, next) {
    var user = {
      username: req.body.username,
      password: req.body.password
    }
    
    directory.create(user, function(err, user) {
      if (err) { return next(err); }
      req.login(user, function(err) {
        if (err) { return cb(err); }
        next();
      });
    });
  }
  
  function redirect(req, res, next) {
    res.redirect('/');
  }
  
  return [
    registerAndLogIn,
    redirect
  ];
};
