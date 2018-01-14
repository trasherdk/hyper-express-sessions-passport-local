var Strategy = require('passport-twitter').Strategy;

exports = module.exports = function(directory) {
  function verify(token, tokenSecret, profile, cb) {
    return cb(null, profile);
  }
  
  var options = {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: '/login/oauth/callback',
    state: 'generic'
  }
  return new Strategy(options, verify);
};
