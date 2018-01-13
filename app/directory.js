var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mysqlitedb.db');

var sql = "CREATE TABLE IF NOT EXISTS users " +
"(id INTEGER PRIMARY KEY, username TEXT, " +
"password TEXT, family_name TEXT, given_name TEXT)";

db.run(sql);

function Directory() {

}

Directory.prototype.create = function(user, cb) {
  // TODO: bcrypt the password

  db.run("INSERT INTO users (username, password) VALUES ($username, $password)", {
    $username: user.username,
    $password: user.password
  }, function(err) {
    if (err) { return cb(err); }
    return cb(null, { id: this.lastID });
  });
}

Directory.prototype.find = function(id, cb) {
  db.get("SELECT * FROM users WHERE id=$id;", {
    $id: id
  }, function(err, row) {
    if (err) { return cb(err); }
    var user = {
      username: row.username,
      name: {
        familyName: row.family_name,
        givenName: row.given_name
      }
    }
    return cb(null, user);
  });
}



exports = module.exports = function() {
  return new Directory();
}
