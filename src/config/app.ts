import { configDotenv } from "dotenv";
configDotenv();
import "./env";
export const APP_CONSTANTS = {
	port: process.env.PORT,
	secret: process.env.APP_JWT_SECRET,
	// debug: process.env.APP_DEBUG === "true",
	// url: process.env.APP_URL,
	// key: process.env.APP_KEY,
};
