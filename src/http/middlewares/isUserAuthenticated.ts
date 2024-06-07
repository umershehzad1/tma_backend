import Admin from "@model/Admin";
import type { IAuthRequest } from "@type/index";
import { verifyToken } from "@utils/jsonwebtoken";
import type { NextFunction, Response } from "express";

export async function isUserAuthenticated(
	req: IAuthRequest,
	res: Response,
	next: NextFunction,
) {
	try {
		const token = (req.headers.authorization?.split(" ")[1] as string) || "";
		const decodeToken = await verifyToken(token);
		if (decodeToken.isAdmin) {
			const admin = await Admin.findOne({
				where: {
					email: decodeToken.email,
				},
			});
			if (!admin) {
				return res.status(401).send({
					message: "Token is invalid",
				});
			}
			req.user = decodeToken;
			next();
		} else {
			return res.status(401).send({
				message: "UnAuthorized!",
			});
		}
	} catch (error) {
		return res.status(401).send({
			message: "Token is invalid",
			error,
		});
	}
}
