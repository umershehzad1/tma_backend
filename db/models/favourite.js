'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    static associate(models) {
      Favourite.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      Favourite.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
    }
  }
  Favourite.init({
    product_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favourite',
  });
  return Favourite;
};
