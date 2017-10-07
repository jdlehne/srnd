var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");

var app = express();
var PORT= process.env.PORT || 7000;

var db = require("./models");

app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(methodOverride("_method"));

require("./routes/api_routes.js")(app);
require("./routes/html_routes")(app);

db.sequelize.sync().then(function() {
  app.listen(process.env.PORT|| PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
