"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class OrderProduct extends sequelize_1.Model {
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
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        product_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        product_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        size: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        product_quantity: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        unit_price: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: true
        },
        total_price: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: true
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'OrderProduct',
    });
    return OrderProduct;
};
