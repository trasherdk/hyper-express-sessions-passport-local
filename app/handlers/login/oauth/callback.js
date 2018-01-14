exports = module.exports = function(passport, federatedCredentials, directory) {
  
  function authenticate(req, res, next) {
    var key = 'oauth:' + req.query.oauth_token
      , state = req.session[key]
      , issuer;
    
    issuer = state.issuer;
    // TODO: session = false
    passport.authenticate(issuer)(req, res, next);
  }
  
  function findAndLogIn(req, res, next) {
    console.log('logging it in!!!');
    console.log(req.session)
    
    var user = req.user;
    var state = req.authInfo.state;
    
    federatedCredentials.find(user.id, state.issuer, function(err, credential) {
      if (err) { return next(err); }
      if (!credential) { return next(); }
      
      console.log(err);
      console.log(credential);
      
      directory.get(credential.$user, function(err, user) {
        if (err) { return next(err); }
        console.log('got existing user!');
        console.log(user);
        
        req.login(user, function(err) {
          if (err) { return cb(err); }
          return res.redirect('/');
        });
      });
    });
  }
  
  function registerAndLogIn(req, res, next) {
    console.log('do something now');
    console.log(req.session);
    console.log(req.authInfo);
    console.log(req.user)
    
    var state = req.authInfo.state;
    
    
    var user = {
      username: req.body.username,
      password: req.body.password
    }
    
    // TODO: delete username prior to this
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
    findAndLogIn,
    registerAndLogIn
  ];
};
