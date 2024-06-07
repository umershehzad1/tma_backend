import { z } from "zod";

const envVariables = z.object({
	PORT: z.string(),
	APP_JWT_SECRET: z.string({
		required_error: "Please Define APP_JWT_SECRET in env file",
	}),
	// NODE_ENV: z.string(),
	// APP_KEY: z.string(),
	// APP_DEBUG: z.string(),
	// APP_URL: z.string(),
	// DB_CONNECTION: z.string(),
	DB_HOST: z.string(),
	DB_PORT: z.string(),
	DB_DATABASE_NAME: z.string(),
	DB_USERNAME: z.string(),
	DB_PASSWORD: z.string(),
	DB_TYPE: z.enum(["postgres"]),

	// MAIL_DRIVER: z.string(),
	// MAIL_HOST: z.string(),
	// MAIL_PORT: z.string(),
	// MAIL_USERNAME: z.string(),
	// MAIL_PASSWORD: z.string(),
	// MAIL_ENCRYPTION: z.string(),
});
envVariables.parse(process.env);

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envVariables> {}
	}
}
