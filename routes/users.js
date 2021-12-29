var HyperExpress = require("hyper-express");
var crypto = require("crypto");

var render = require("../boot/render");
var db = require("../db");

var router = new HyperExpress.Router();

router.get("/new", function (req, res, next) {
  render("signup.ejs", {}, (err, str) => {
    if (err) throw err;    res.send(str);
  });
});

router.post("/", { expect_body: "urlencoded" }, function (req, res, next) {
  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    "sha256",
    function (err, hashedPassword) {
      if (err) throw err;
      db.run(
        "INSERT INTO users (username, hashed_password, salt, name) VALUES (?, ?, ?, ?)",
        [req.body.username, hashedPassword, salt, req.body.name],
        function (err) {
          if (err) throw err;

          var user = {
            id: this.lastID.toString(),
            username: req.body.username,
            displayName: req.body.name,
          };
          req.login(user, function (err) {
            if (err) throw err;
            res.redirect("/");
          });
        }
      );
    }
  );
});

module.exports = router;
