"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class Category extends sequelize_1.Model {
        static associate(models) {
            Category.hasMany(models.Product, {
                foreignKey: 'category_id'
            });
        }
    }
    Category.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        category_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        category_image: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        cloudinary_id: {
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
        modelName: 'Category',
    });
    return Category;
};
