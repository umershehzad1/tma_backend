"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// user.ts
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize"); // Correct import for Sequelize
class User extends sequelize_1.Model {
    static associate(models) {
        User.hasMany(models.Order, {
            foreignKey: 'user_id'
        });
        // Add other associations as needed
    }
}
const sequelize = new sequelize_2.Sequelize('database', 'username', 'password', {
    dialect: 'postgres', // Example dialect, adjust as per your database type
    host: 'localhost',
    port: 5432,
});
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: sequelize_1.DataTypes.STRING,
    role: {
        type: sequelize_1.DataTypes.ENUM('admin', 'user', 'wholeseller'),
        defaultValue: 'user'
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    password: sequelize_1.DataTypes.STRING,
    phone: sequelize_1.DataTypes.STRING,
    billing_address: sequelize_1.DataTypes.STRING,
    shipping_information: sequelize_1.DataTypes.STRING,
    image: sequelize_1.DataTypes.STRING,
    google_token: sequelize_1.DataTypes.TEXT,
    stripe_customer_id: sequelize_1.DataTypes.STRING
}, {
    sequelize, // Use the correct sequelize instance here
    modelName: 'User',
});
exports.default = User;
