exports = module.exports = function(passport, federatedCredentials, directory) {
  
  function authenticate(req, res, next) {
    var key = 'oauth2:' + req.query.state
      , state = req.session[key]
      , issuer;
    
    issuer = state.issuer;
    // TODO: session = false
    passport.authenticate(issuer)(req, res, next);
  }
  
  function something(req, res, next) {
    console.log('do something now');
    console.log(req.session);
    console.log(req.authInfo);
    console.log(req.user)
    
    var state = req.authInfo.state;
    
    
    var user = {
      username: req.body.username,
      password: req.body.password
    }
    
    directory.create(req.user, function(err, user) {
      if (err) { return next(err); }
      
      console.log('CREATED USER!')
      console.log(user);
      
      var credential = {
        issuer: state.issuer,
        subject: req.user.id
      }
      
      federatedCredentials.create(credential, { user: user }, function(err, credential) {
        if (err) { return next(err); }
        
        console.log(err);
        console.log(credential);
        
        req.login(user, function(err) {
          if (err) { return cb(err); }
          return res.redirect('/');
        });
      });
    });
  }
  
  
  return [
    authenticate,
    something
  ];
};
