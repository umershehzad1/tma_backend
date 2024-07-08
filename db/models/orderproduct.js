'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    static associate(models) {
      OrderProduct.belongsTo(models.Order, {
        foreignKey: 'order_id'
      });
      OrderProduct.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
    }
  }
  OrderProduct.init({
    product_id: DataTypes.INTEGER,
    product_name: DataTypes.STRING,
    size: DataTypes.STRING,
    product_quantity: DataTypes.INTEGER,
    unit_price: DataTypes.DECIMAL,
    total_price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'OrderProduct',
  });
  return OrderProduct;
};
