module.exports = function (sequelize, DataTypes) {
    var DrinkRatings = sequelize.define("DrinkRatings", {
        starrating: {
            type: DataTypes.INTEGER(5)
        },
        totalvotes: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });

    DrinkRatings.associate = function (models) {
        DrinkRatings.belongsTo(models.Drinks, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return DrinkRatings;
};