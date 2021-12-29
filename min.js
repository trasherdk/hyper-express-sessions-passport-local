var HyperExpress = require('hyper-express');

var port = 3000

var app = new HyperExpress.Server();

var router =  new HyperExpress.Router();
router.get("/", async (req, res) => {
  console.log('get')
  res.send('hello')
});

app.use('/', router);

app.set_error_handler((req, res, error) => {
  res.status(500).send(JSON.stringify(error.toString()));
})
app.set_not_found_handler((req, res) => {
  res.status(404).send('not found');
})

app.listen(port)
.then((socket) => console.log('Webserver started'))
.catch((error) => console.log('Failed to start webserver'));
