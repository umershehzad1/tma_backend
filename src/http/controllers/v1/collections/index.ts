import Collection from "@model/Collection";
import Product from "@model/Product";
import ProductImage from "@model/ProductImage";
import ProductVariants from "@model/ProductVariants";
import ProductVariantOptions from "@model/ProductVariantsOptions";
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

export async function getAllProductOfSingleCollection(
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	req: IAuthRequest<{}, { collection_id: number }>,
	res: Response,
) {
	try {
		const { collection_id } = req.params;
		const products = await Collection.findOne({
			include: [
				{
					model: Product,
					as: "product_list",
					include: [
						{
							model: ProductImage,
							as: "images",
						},
						{
							model: ProductVariants,
							as: "variants",
							include: [
								{
									model: ProductVariantOptions,
									as: "options",
								},
							],
						},
					],
				},
			],
			where: {
				id: Number(collection_id),
			},
		});
		return res.status(200).json({
			message: "Collections fetched successfully",
			data: products,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Internal server error",
			error,
		});
	}
}
