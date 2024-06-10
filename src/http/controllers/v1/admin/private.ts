import Collection from "@model/Collection";
import Product from "@model/Product";
import type {
	IAuthRequest,
	ICollectionByAdmin,
	IProductByAdmin,
} from "@type/index";
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

export async function addNewProduct(
	req: IAuthRequest<IProductByAdmin>,
	res: Response,
) {
	try {
		const { collectionId, description, handle, price, title } = req.body;
		const collection = await Collection.findByPk(Number(collectionId));
		if (!collection) {
			return res.status(404).send({
				message: "No Collection is found on the collectionId",
			});
		}

		const handle_url = generateHandleCollection(handle);
		const product = await Product.create({
			description,
			handle: handle_url,
			price: Number(price),
			title,
			collectionId: Number(collectionId),
		});
		return res.status(200).json({
			message: "Product created successfully",
			data: product,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			message: "Internal server error",
			error,
		});
	}
}
