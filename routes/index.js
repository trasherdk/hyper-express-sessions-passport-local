var HyperExpress = require('hyper-express');

var router = new HyperExpress.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('get /')
  res.render('index', { user: req.user });
});

module.exports = router;
