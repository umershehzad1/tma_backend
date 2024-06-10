import { type AnyZodObject, ZodError } from "zod";
import type { Request, Response, NextFunction } from "express";

export const schemaParseMiddleWare =
	(schema: AnyZodObject) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.parseAsync(req.body);
			next();
		} catch (error) {
			console.log(error);
			if (error instanceof ZodError) {
				return res.status(400).json({
					message: "Validation error",
					errors: error.errors.map((err) => err.message),
				});
			}

			return res.status(500).json({ message: "Internal server error" });
		}
	};
