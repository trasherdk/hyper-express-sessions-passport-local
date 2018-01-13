exports = module.exports = function(passport) {
  
  function authenticate(req, res, next) {
    var key = 'oauth2:' + req.query.state
      , state = req.session[key]
      , issuer;
    
    issuer = state.issuer;
    passport.authenticate(issuer)(req, res, next);
  }
  
  function something(req, res, next) {
    console.log('do something now');
    console.log(req.session);
    console.log(req.authInfo);
    
    var state = req.authInfo.state;
  }
  
  
  return [
    authenticate,
    something
  ];
};
