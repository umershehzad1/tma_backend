import Collection from "@model/Collection";
import type { IAuthRequest, ICollectionByAdmin } from "@type/index";
import { generateHandleCollection } from "@utils/index";
import type { Response } from "express";

export async function addNewCollectionByAdmin(
	req: IAuthRequest<ICollectionByAdmin>,
	res: Response,
) {
	try {
		const { description, handle, title, tags } = req.body;
		const handle_url = generateHandleCollection(handle);
		const collection = await Collection.create({
			description,
			handle: handle_url,
			tags,
			title,
		});

		return res.status(200).json({
			message: "Collection created successfully",
			data: collection,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Internal server error",
			error,
		});
	}
}
