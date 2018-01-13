var Strategy = require('passport-google-oauth20').Strategy;

exports = module.exports = function(directory) {
  function verify(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
  
  var options = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    scope: [ 'https://www.googleapis.com/auth/plus.login' ],
    callbackURL: '/login/oauth2/callback',
    //state: true
    state: 'generic'
  }
  return new Strategy(options, verify);
};
