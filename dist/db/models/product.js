"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class Product extends sequelize_1.Model {
        static associate(models) {
            Product.belongsTo(models.Category, {
                foreignKey: 'category_id'
            });
            Product.hasMany(models.Inventory, {
                foreignKey: 'product_id'
            });
            Product.hasMany(models.OrderProduct, {
                foreignKey: 'product_id'
            });
            Product.hasMany(models.CartProduct, {
                foreignKey: 'product_id'
            });
            Product.hasMany(models.Favourite, {
                foreignKey: 'product_id'
            });
            Product.hasMany(models.Subscription, {
                foreignKey: 'product_id'
            });
        }
    }
    Product.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        product_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        category_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: true
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        feature_image: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        discount_date: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true
        },
        price: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false
        },
        size: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        discount: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: true
        },
        is_featured: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: true
        },
        tags: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        total_orders: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        category_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Categories',
                key: 'id'
            }
        },
        is_top_selling: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: true
        },
        is_limited_stock: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: true
        },
        is_TMA_delivered: {
            type: sequelize_1.DataTypes.BOOLEAN,
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
        modelName: 'Product',
    });
    return Product;
};
