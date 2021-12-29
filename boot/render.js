var ejs = require("ejs");
var path = require("path");
var base = path.resolve(__dirname, '../views')

function render(fileName, data, callback) {
  const templatePath = path.resolve(base, fileName)
  ejs.renderFile(
    templatePath,
    data,
    { views: [base] },
    callback
  );
};

module.exports = render