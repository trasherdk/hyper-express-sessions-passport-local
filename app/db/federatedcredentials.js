function FederatedCredentials(db) {
  this._db = db;
}

FederatedCredentials.prototype.create = function(credential, relations, cb) {
  relations = relations || {};
  
  var db = this._db;
  
  var data = {
    $issuer: credential.issuer,
    $subject: credential.subject
  }
  if (relations.user) {
    data['$user_id'] = relations.user.id;
  }
  
  
  db.run("INSERT INTO federated_credentials (issuer, subject, user_id) VALUES ($issuer, $subject, $user_id)", data, function(err) {
    if (err) { return cb(err); }
    return cb(null, { id: this.lastID });
  });
}



exports = module.exports = function(db) {
  return new FederatedCredentials(db);
};
