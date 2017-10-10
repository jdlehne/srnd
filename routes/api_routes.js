// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************
// Dependencies
var db = require("../models");
// Routes
// ======================================


var randomDrinkID;
//----Count method to track total entries, that number to be applied to random drink generator--//

module.exports = function (app) {

  app.get("/api/drinks", function (req, res) {
    db.Drinks.findAll({}).then(function (dbDrinks) {
      res.json(dbDrinks);
    });
  });



  // POST route for saving a new drink
  app.post("/api/drinks", function (req, res) {
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
    }).then(function (dbDrinks) {
      res.json(dbDrinks);
    });
  });

  app.get("/api/random/", function (req, res) {
    db.Drinks.count({}).then(function (count) {
      var totalEntries = count
      //console.log("total entries = " + totalEntries);
      var randomDrinkID = Math.floor((Math.random() * totalEntries) + 1);
      db.Drinks.findOne({
        where: {
          id: randomDrinkID
        }
      }).then(function (random) {
        res.json(random);
        //console.log(random);
      });
    });
  });

  app.get("/api/search", function (req, res) {
    db.Drinks.findAll({
      where: {
        drink_name: req.body.drink_name,
        ingredient_1: req.body.ingredient_1,
        ingredient_2: req.body.ingredient_2,
        ingredient_3: req.body.ingredient_3,
        ingredient_4: req.body.ingredient_4,
        ingredient_5: req.body.ingredient_5

      }
    }).then(function (results) {
      res.json(results);
    })
  })

};