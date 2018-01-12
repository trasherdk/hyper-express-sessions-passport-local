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



exports = module.exports = function() {
  return new Directory();
}
