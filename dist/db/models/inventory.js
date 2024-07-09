"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class Inventory extends sequelize_1.Model {
        static associate(models) {
            Inventory.belongsTo(models.Product, {
                foreignKey: 'product_id'
            });
        }
    }
    Inventory.init({
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
        product_size: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        inventory_quantity: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        inventory_price: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: true
        },
        inventory_discount: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: true
        },
        images: {
            type: sequelize_1.DataTypes.STRING,
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
        modelName: 'Inventory',
    });
    return Inventory;
};
