import path from "node:path";
import express from "express";
import { APP_CONSTANTS } from "@config/app";
import { sequelize } from "@utils/sequelize";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import MAIN_ROUTER from "./routes";
const app = express();
app.use(helmet());

app.use(cors({
	allowedHeaders:"*"
}));

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", MAIN_ROUTER);
app.use("/data", express.static(path.join(__dirname, "../data")));

(async () => {
	try {
		// await sequelize.drop({
		// 	cascade: true,
		// });
		await sequelize.sync({ alter: true });
		console.log("Database is connected Successfully!");
		app.listen(APP_CONSTANTS.port, () => {
			console.log(`Server is running at : ${APP_CONSTANTS.port}`);
		});
	} catch (error) {
		console.log("Error while connection to database or express app", error);
	}
})();
