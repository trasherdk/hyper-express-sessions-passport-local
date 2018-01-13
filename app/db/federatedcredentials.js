function FederatedCredentials(db) {
  this._db = db;
}

FederatedCredentials.prototype.create = function(credential, cb) {
  var db = this._db;
  
  db.run("INSERT INTO federated_credentials (issuer, subject) VALUES ($issuer, $subject)", {
    $issuer: credential.issuer,
    $subject: credential.subject
  }, function(err) {
    if (err) { return cb(err); }
    return cb(null, { id: this.lastID });
  });
}



exports = module.exports = function(db) {
  return new FederatedCredentials(db);
};
