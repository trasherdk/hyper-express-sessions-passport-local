var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('mysqlitedb.db');

var sql = "CREATE TABLE IF NOT EXISTS users " +
"(id INTEGER PRIMARY KEY, username TEXT, " +
"hashed_password TEXT, family_name TEXT, given_name TEXT)";

db.run(sql);

var sql = "CREATE TABLE IF NOT EXISTS federated_credentials " +
"(id INTEGER PRIMARY KEY, issuer TEXT, " +
"subject TEXT)";

db.run(sql);



exports = module.exports = function() {
  return db;
};
