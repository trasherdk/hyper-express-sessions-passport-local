var HyperExpress = require("hyper-express");

var render = require("../boot/render");

var router = new HyperExpress.Router();

/* GET home page. */
router.get("/", async (req, res) => {
  console.log('get')
  res.send(await render("index.ejs", { user: req.user }));
});

module.exports = router;
