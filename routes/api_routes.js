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
      burger_name: req.body.burger_name,
      devoured: false
    }).then(function(dbDrinks) {
      res.json(dbDrinks);
    });
  });

};
/*  // PUT route for updating drinks.
  app.put("/api/drinks/:id", function(req, res) {
    db.Drinks.update({
      //drink_name: req.body.drink_name,
      devoured:true
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(dbDrinks) {
      res.json(dbDrinks);
    });
  });

};*/
