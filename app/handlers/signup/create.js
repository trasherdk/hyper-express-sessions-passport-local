exports = module.exports = function(directory) {
  
  function create(req, res, next) {
    var user = {
      username: req.body.username,
      password: req.body.password
    }
    
    directory.create(user, function(err, user) {
      console.log(err);
      console.log(user);
    });
  }
  
  return [
    create
  ];
};
