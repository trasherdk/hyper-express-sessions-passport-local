exports = module.exports = function() {
  
  function render(req, res) {
    res.render('login');
  }
  
  return [
    render
  ];
};
