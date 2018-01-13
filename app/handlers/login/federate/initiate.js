exports = module.exports = function(passport) {
  
  function initiate(req, res, next) {
    var issuer = req.params.issuer;
    var state = {
      issuer: issuer
    };
    
    passport.authenticate(issuer, { state: state })(req, res, next);
  }
  
  
  return [
    initiate
  ];
};
