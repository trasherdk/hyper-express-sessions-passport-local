var ejs = require("ejs");
var path = require("path");
var base = path.resolve(__dirname, "../views");

async function render(fileName, data) {
  console.log('render')
  const templatePath = path.resolve(base, fileName);
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, data, { views: [base] }, (err, str) => {
      if (err) return reject(err);
      resolve(str);
    });
  });
}

module.exports = render;
