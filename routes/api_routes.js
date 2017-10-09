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
      drink_name: req.body.drink_name,
      added_by: req.body.added_by,
      ingredient_1: req.body.ingredient_1,
      ing_qty_1: req.body.ing_qty_1,
      description: req.body.description,
    }).then(function(dbDrinks) {
      res.json(dbDrinks);
    });
  });

};
