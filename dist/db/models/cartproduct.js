"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class CartProduct extends sequelize_1.Model {
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
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        product_size: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        product_quantity: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        cart_last_updated_date: {
            type: sequelize_1.DataTypes.DATE,
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
        modelName: 'CartProduct',
    });
    return CartProduct;
};
