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

FederatedCredentials.prototype.find = function(subject, issuer, cb) {
  var db = this._db;
  
  db.get("SELECT * FROM federated_credentials WHERE issuer=$issuer AND subject=$subject;", {
    $issuer: issuer,
    $subject: subject
  }, function(err, row) {
    if (err) { return cb(err); }
    if (!row) { return cb(null); }
    
    var obj = {
      id: row.id,
      issuer: row.issuer,
      subject: row.subject,
      $user: row.user_id
    }
    return cb(null, obj);
  });
}



exports = module.exports = function(db) {
  return new FederatedCredentials(db);
};
