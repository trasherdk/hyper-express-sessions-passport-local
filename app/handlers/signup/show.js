exports = module.exports = function() {
  
  function render(req, res) {
    res.render('signup');
  }
  
  return [
    render
  ];
};
