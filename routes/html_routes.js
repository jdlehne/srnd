
var path = require("path");

module.exports = function(app) {
  // route to main page
  app.get("/main", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/main.html"));
  });

  // send users to home page if no other route specified
  app.use(function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/home.html"));
  });

  app.use(function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/home.html"));
  });

}
