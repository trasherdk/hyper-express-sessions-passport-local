var bcrypt = require('bcrypt');

function Directory(db) {
  this._db = db;
}

Directory.prototype.create = function(user, cb) {
  var db = this._db;
  var rounds = 10;
  
  function create(user, hashedPassword) {
    var values = {
      $username: user.username,
      $hashed_password: hashedPassword
    };
    if (user.name) {
      values['$family_name'] = user.name.familyName;
      values['$given_name'] = user.name.givenName;
    }

    db.run("INSERT INTO users (username, hashed_password, family_name, given_name) VALUES ($username, $hashed_password, $family_name, $given_name)",
    values, function(err) {
      if (err) { return cb(err); }
      return cb(null, { id: this.lastID });
    });
  }
  
  if (user.password) {
    bcrypt.hash(user.password, rounds, function(err, hashedPassword) {
      if (err) { return cb(err); }
      create(user, hashedPassword);
    });
  } else {
    create(user);
  }
}

Directory.prototype.find = function(id, cb) {
  var db = this._db;
  
  db.get("SELECT * FROM users WHERE id=$id;", {
    $id: id
  }, function(err, row) {
    if (err) { return cb(err); }
    var user = {
      id: row.id,
      username: row.username,
      name: {
        familyName: row.family_name,
        givenName: row.given_name
      }
    }
    return cb(null, user);
  });
}

Directory.prototype.authenticate = function(username, password, cb) {
  var db = this._db;
  
  db.get("SELECT * FROM users WHERE username=$username;", {
    $username: username
  }, function(err, row) {
    if (err) { return cb(err); }
    bcrypt.compare(password, row.hashed_password, function(err, valid) {
      if (err) { return cb(err); }
      if (!valid) { return cb(null, false); }
      var user = {
        id: row.id,
        username: row.username,
        name: {
          familyName: row.family_name,
          givenName: row.given_name
        }
      }
      return cb(null, user);
    });
  });
}



exports = module.exports = function(db) {
  return new Directory(db);
};
