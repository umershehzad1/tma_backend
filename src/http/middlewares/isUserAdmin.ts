import Admin from "@model/Admin";
import type { IAuthRequest } from "@type/index";
import { verifyToken } from "@utils/jsonwebtoken";
import type { NextFunction, Response } from "express";

export async function isUserAdmin(
	req: IAuthRequest,
	res: Response,
	next: NextFunction,
) {
	try {
		const isAdmin = req.user?.isAdmin;
		if (!isAdmin) {
			return res.status(401).send({
				message: "You are not authorized!",
			});
		}

		next();
	} catch (error) {
		return res.status(401).send({
			message: "Token is invalid",
			error,
		});
	}
}
