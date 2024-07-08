'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartProduct extends Model {
    static associate(models) {
      CartProduct.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      CartProduct.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
    }
  }
  CartProduct.init({
    product_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    product_size: DataTypes.STRING,
    product_quantity: DataTypes.INTEGER,
    cart_last_updated_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CartProduct',
  });
  return CartProduct;
};
