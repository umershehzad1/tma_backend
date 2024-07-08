'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    static associate(models) {
      Inventory.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
    }
  }
  Inventory.init({
    product_id: DataTypes.INTEGER,
    product_size: DataTypes.STRING,
    inventory_quantity: DataTypes.INTEGER,
    inventory_price: DataTypes.DECIMAL,
    inventory_discount: DataTypes.DECIMAL,
    images: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Inventory',
  });
  return Inventory;
};
