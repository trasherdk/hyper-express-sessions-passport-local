var sqlite3 = require('sqlite3');

console.log('sqlite3 user database started')

module.exports = new sqlite3.Database('db.sqlite3');
