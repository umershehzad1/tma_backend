"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/index.ts
const sequelize_1 = require("sequelize");
const fs_1 = require("fs");
const path_1 = require("path");
const config_1 = __importDefault(require("../../config/config"));
const basename = 'index.ts';
const env = process.env.NODE_ENV || 'development';
const dbConfig = config_1.default[env];
const sequelize = new sequelize_1.Sequelize(dbConfig);
const db = {};
(0, fs_1.readdirSync)(__dirname)
    .filter((file) => {
    return (file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts');
})
    .forEach((file) => {
    const model = require((0, path_1.join)(__dirname, file))(sequelize, sequelize_1.DataTypes);
    db[model.name] = model;
});
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
