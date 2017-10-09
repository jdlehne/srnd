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
      ingredient_2: req.body.ingredient_2,
      ing_qty_2: req.body.ing_qty_2,
      ingredient_3: req.body.ingredient_3,
      ing_qty_3: req.body.ing_qty_3,
      ingredient_4: req.body.ingredient_4,
      ing_qty_4: req.body.ing_qty_4,
      ingredient_5: req.body.ingredient_5,
      ing_qty_5: req.body.ing_qty_5,
      description: req.body.description,
    }).then(function(dbDrinks) {
      res.json(dbDrinks);
    });
  });

};
