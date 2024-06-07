import Admin from "@model/Admin";
import type { IAdminUser, TRequest, IAdminLogin } from "@type/index";
import { comparePassword, hashPassword } from "@utils/bcrypt";
import { createToken } from "@utils/jsonwebtoken";
import type { Response } from "express";

export async function createAnAdminUser(
	req: TRequest<IAdminUser>,
	res: Response,
) {
	try {
		const { email, first_name, last_name, password } = req.body;
		const hash = hashPassword(password);

		const admin = await Admin.create(
			{
				email,
				first_name,
				last_name,
				password: hash,
			},
			{
				raw: true,
			},
		);

		return res.status(200).json({
			message: "Admin created successfully",
			data: admin,
		});
	} catch (error) {
		console.log(error);
	}
}

export async function loginAnAdminUser(
	req: TRequest<IAdminLogin>,
	res: Response,
) {
	try {
		const { email, password } = req.body;

		const admin = await Admin.findOne({ where: { email }, raw: true });
		if (!admin) {
			return res.status(404).send({
				message: "email/password incorrect",
			});
		}

		const isCorrect = comparePassword(password, admin.password);
		if (!isCorrect) {
			return res.status(404).send({
				message: "email/password incorrect",
			});
		}
		const token = createToken({
			email: admin.email,
			id: admin.id,
			isAdmin: "admin",
		});
		return res.status(200).send({
			message: "Admin logged in successfully",
			data: {
				token,
				admin,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			message: "Internal server error",
			error,
		});
	}
}
