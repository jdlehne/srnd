// ---DB duilt out for 3 ingredient for testing, should probably be 5?


module.exports = function(sequelize, DataTypes) {
  var Drinks = sequelize.define("Drinks", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    drink_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    added_by: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    ingredient_1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    ing_qty_1: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      validate: {
        min: 1,
        max: 40
      }
    },
    ingredient_2: {
      type: DataTypes.STRING(25),
      allownull: true,
    },
    ing_qty_2: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 40
      }
    },
    ingredient_3: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    ing_qty_3: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 40
      }
    },
    ingredient_4: {
      type: DataTypes.STRING(25),
      allownull: true
    },
    ing_qty_4: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 40
      }
    },
    ingredient_5: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    ing_qty_5: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 40
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },

  });
  return Drinks;
};
