"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize_1.DataTypes.INTEGER
            },
            product_name: {
                type: sequelize_1.DataTypes.STRING
            },
            category_name: {
                type: sequelize_1.DataTypes.STRING
            },
            rating: {
                type: sequelize_1.DataTypes.DECIMAL
            },
            description: {
                type: sequelize_1.DataTypes.TEXT
            },
            feature_image: {
                type: sequelize_1.DataTypes.TEXT
            },
            discount_date: {
                type: sequelize_1.DataTypes.DATE
            },
            price: {
                type: sequelize_1.DataTypes.DECIMAL
            },
            size: {
                type: sequelize_1.DataTypes.STRING
            },
            discount: {
                type: sequelize_1.DataTypes.DECIMAL
            },
            is_featured: {
                type: sequelize_1.DataTypes.BOOLEAN
            },
            tags: {
                type: sequelize_1.DataTypes.STRING
            },
            total_orders: {
                type: sequelize_1.DataTypes.INTEGER
            },
            category_id: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: 'Categories',
                    key: 'id'
                }
            },
            is_top_selling: {
                type: sequelize_1.DataTypes.BOOLEAN
            },
            is_limited_stock: {
                type: sequelize_1.DataTypes.BOOLEAN
            },
            is_TMA_delivered: {
                type: sequelize_1.DataTypes.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: sequelize_1.DataTypes.DATE
            }
        });
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.dropTable('Products');
    })
};
