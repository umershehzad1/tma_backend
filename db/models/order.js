'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      Order.hasMany(models.OrderProduct, {
        foreignKey: 'order_id'
      });
    }
  }
  Order.init({
    order_no: DataTypes.STRING,
    billing_info: DataTypes.STRING,
    shipping_info: DataTypes.STRING,
    additional_info: DataTypes.STRING,
    payment_method: DataTypes.STRING,
    status: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
