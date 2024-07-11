"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    development: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'database_development',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'postgres',
    },
    test: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'database_test',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'postgres',
    },
    production: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'database_production',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'postgres',
    },
};
exports.default = config;
