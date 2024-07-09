// migrations/user.ts
'use strict';
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
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize_1.DataTypes.INTEGER
            },
            name: {
                type: sequelize_1.DataTypes.STRING
            },
            role: {
                type: sequelize_1.DataTypes.ENUM('admin', 'user', 'wholeseller'),
                defaultValue: 'user'
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                unique: true
            },
            password: {
                type: sequelize_1.DataTypes.STRING
            },
            phone: {
                type: sequelize_1.DataTypes.STRING
            },
            billing_address: {
                type: sequelize_1.DataTypes.STRING
            },
            shipping_information: {
                type: sequelize_1.DataTypes.STRING
            },
            image: {
                type: sequelize_1.DataTypes.STRING
            },
            google_token: {
                type: sequelize_1.DataTypes.TEXT
            },
            stripe_customer_id: {
                type: sequelize_1.DataTypes.STRING
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
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.dropTable('Users');
    })
};
