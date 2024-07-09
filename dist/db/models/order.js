"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class Order extends sequelize_1.Model {
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
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        order_no: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        billing_info: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        shipping_info: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        additional_info: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        payment_method: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
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
        modelName: 'Order',
    });
    return Order;
};
