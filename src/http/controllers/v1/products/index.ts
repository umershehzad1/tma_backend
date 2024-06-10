import ProductVariantsOption from "@model/ProductVariantsOptions";
import Product from "@model/Product";
import ProductImage from "@model/ProductImage";
import ProductVariants from "@model/ProductVariants";
import type { IAuthRequest } from "@type/index";
import type { Response } from "express";

export async function getSingleProductById(
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	req: IAuthRequest<{}, { productId: string }>,
	res: Response,
) {
	try {
		const { productId } = req.params;
		const product = await Product.findByPk(Number(productId), {
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
							model: ProductVariantsOption,
							as: "options",
						},
					],
				},
			],
		});
		if (!product) {
			return res.status(404).send({
				message: "Product not found",
			});
		}
		if (product.status === "draft") {
			return res.status(400).send({
				message: "Product is not active",
			});
		}
		return res.status(200).send({
			message: "Product fetched successfully",
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
