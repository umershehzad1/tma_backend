"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/index.ts
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("../../config/config"));
dotenv_1.default.config({ path: `${process.cwd()}/.env` });
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
console.log(`Running in environment: ${env}`);
const dbConfig = config_1.default[env];
if (!dbConfig) {
    throw new Error(`No config found for environment: ${env}`);
}
console.log(`Loaded config: ${JSON.stringify(dbConfig)}`);
const db = {};
let sequelize;
// Initialize Sequelize with direct connection parameters
sequelize = new sequelize_1.Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: Number(dbConfig.port),
    dialect: dbConfig.dialect,
    storage: dbConfig.seederStorage,
});
// Import models dynamically
fs
    .readdirSync(__dirname)
    .filter(file => {
    return (file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.ts' && // Adjusted to .ts extension
        file.indexOf('.test.ts') === -1);
})
    .forEach(file => {
    const model = require(path.join(__dirname, file)).default; // Import default export
    db[model.name] = model(sequelize, sequelize_1.DataTypes); // Initialize model with sequelize instance
});
// Apply associations if defined
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
// Set sequelize and Sequelize objects in db object
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
