import Collection from "@model/Collection";
import type { IAuthRequest } from "@type/index";
import type { Response } from "express";

export async function getAllCollections(_req: IAuthRequest, res: Response) {
	try {
		const collections = await Collection.findAll({
			raw: true,
		});
		return res.status(200).json({
			message: "Collections fetched successfully",
			data: collections,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Internal server error",
			error,
		});
	}
}
