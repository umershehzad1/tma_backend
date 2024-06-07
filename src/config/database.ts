import { configDotenv } from "dotenv";
configDotenv();
import "./env";
export const DATABASE_ENV = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	name: process.env.DB_DATABASE_NAME,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	type: process.env.DB_TYPE,
};
