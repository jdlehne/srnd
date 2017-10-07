// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************
// Dependencies
var db = require("../models");
// Routes
// ======================================
module.exports = function(app) {

  app.get("/api/drinks", function(req, res) {
    db.Drinks.findAll({}).then(function(dbDrinks) {
      res.json(dbDrinks);
    });
  });

  // POST route for saving a new drink
  app.post("/api/drinks", function(req, res) {
    db.Drinks.create({
    }).then(function(dbDrinks) {
      res.json(dbDrinks);
    });
  });


};
