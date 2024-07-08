'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    static associate(models) {
      Subscription.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      Subscription.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
    }
  }
  Subscription.init({
    user_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subscription',
  });
  return Subscription;
};
