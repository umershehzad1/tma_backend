"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// user.ts
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static associate(models) {
        User.hasMany(models.Order, {
            foreignKey: 'user_id'
        });
        // Add other associations as needed
    }
}
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
    sequelize,
    modelName: 'User',
});
exports.default = User;
