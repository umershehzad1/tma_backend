"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class Favourite extends sequelize_1.Model {
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
        modelName: 'Favourite',
    });
    return Favourite;
};
