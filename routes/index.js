var HyperExpress = require("hyper-express");

var render = require('../boot/render')

var router = new HyperExpress.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  render("index.ejs", { user: req.user }, (err, str) => {
    if (err) next(err);
    res.send(str);
  });
});

module.exports = router;
