exports = module.exports = function(passport) {
  
  return [
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' })
  ];
};
