import { DATABASE_ENV } from "@config/database";
import { Sequelize } from "sequelize-typescript";
import path from "node:path";

export const sequelize = new Sequelize({
	dialect: DATABASE_ENV.type,
	database: DATABASE_ENV.name,
	username: DATABASE_ENV.username,
	password: DATABASE_ENV.password,
	models: [path.join(__dirname, "../models")],
});
console.log(__dirname, "model path");
